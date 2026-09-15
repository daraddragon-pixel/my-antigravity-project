/**
 * The Daily Chronograph - cPanel Post Publishing & Archive Manager
 * Handles creating, updating, deleting, filtering, and live previewing articles.
 */

import { getArticles, setArticles } from '../data/articles-db.js';
import { getCustomArticles, setCustomArticles } from '../data/storage.js';
import { showToast } from '../ui/toast.js';

let activeArchiveCategory = "all";
let onArticlesMutatedCallback = null;

export function initPostEditor(onArticlesMutated) {
    onArticlesMutatedCallback = onArticlesMutated;
    setupPostForm();
    setupArchiveFilter();
    setupLivePreview();
    setupTranslationHelper();
}

export function renderAdminPostsList() {
    const container = document.getElementById("admin-posts-list-container");
    const countBadge = document.getElementById("admin-posts-count");
    if (!container) return;

    const articles = getArticles();
    const searchInput = document.getElementById("admin-archive-search");
    const query = searchInput ? searchInput.value.trim().toLowerCase() : "";

    let filtered = articles;
    if (activeArchiveCategory !== "all") {
        filtered = filtered.filter(a => a.category === activeArchiveCategory);
    }
    if (query) {
        filtered = filtered.filter(a => {
            const titleEn = a.en?.title?.toLowerCase() || "";
            const titleKm = a.km?.title?.toLowerCase() || "";
            const author = a.author?.toLowerCase() || "";
            return titleEn.includes(query) || titleKm.includes(query) || author.includes(query);
        });
    }

    if (countBadge) countBadge.textContent = `${filtered.length} DISPATCHES`;

    if (filtered.length === 0) {
        container.innerHTML = `<p class="mono-text text-sm" style="opacity:0.6; text-align:center; padding:1.5rem;">No matching dispatches found in archive.</p>`;
        return;
    }

    container.innerHTML = filtered.map(art => {
        const isCustom = art.id.startsWith("custom-");
        return `
            <div class="admin-post-item" data-id="${art.id}">
                <div class="admin-post-info">
                    <div style="display:flex; gap:0.4rem; align-items:center;">
                        <span class="admin-post-cat mono-text">${art.category.toUpperCase()}</span>
                        ${isCustom ? `<span class="mono-text" style="font-size:0.7rem; background:rgba(0,128,0,0.1); color:#008000; padding:0.1rem 0.3rem; border-radius:2px;">CUSTOM</span>` : ""}
                    </div>
                    <h4 class="admin-post-title">${art.en?.title || art.km?.title || "Untitled Dispatch"}</h4>
                    <span class="mono-text text-sm" style="opacity:0.7;">BY ${art.author || "EDITORIAL"} &bull; ${art.date || "TODAY"}</span>
                </div>
                <div class="admin-post-actions">
                    <button type="button" class="post-edit-btn mono-text" data-id="${art.id}">EDIT</button>
                    <button type="button" class="post-delete-btn mono-text" data-id="${art.id}" style="color:var(--accent-red, #b00);">DELETE</button>
                </div>
            </div>
        `;
    }).join("");

    // Bind Edit & Delete buttons
    container.querySelectorAll(".post-edit-btn").forEach(btn => {
        btn.onclick = () => loadArticleIntoForm(btn.getAttribute("data-id"));
    });

    container.querySelectorAll(".post-delete-btn").forEach(btn => {
        btn.onclick = () => deleteArticleById(btn.getAttribute("data-id"));
    });
}

function loadArticleIntoForm(id) {
    const articles = getArticles();
    const art = articles.find(a => a.id === id);
    if (!art) return;

    document.getElementById("admin-post-id").value = art.id;
    document.getElementById("admin-post-category").value = art.category || "world";
    document.getElementById("admin-post-author").value = art.author || "";
    document.getElementById("admin-post-image").value = art.image || "";

    document.getElementById("admin-post-title-en").value = art.en?.title || "";
    document.getElementById("admin-post-subtitle-en").value = art.en?.subtitle || art.en?.subTitle || "";
    document.getElementById("admin-post-preview-en").value = art.en?.preview || "";
    document.getElementById("admin-post-content-en").value = (art.en?.content || "").replace(/<br\s*[\/]?>/gi, "\n\n");

    document.getElementById("admin-post-title-km").value = art.km?.title || "";
    document.getElementById("admin-post-subtitle-km").value = art.km?.subtitle || art.km?.subTitle || "";
    document.getElementById("admin-post-preview-km").value = art.km?.preview || "";
    document.getElementById("admin-post-content-km").value = (art.km?.content || "").replace(/<br\s*[\/]?>/gi, "\n\n");

    showToast(`LOADED "${(art.en?.title || art.id).substring(0, 25)}..." INTO EDITOR`);
}

function deleteArticleById(id) {
    const confirmed = confirm("Are you sure you want to permanently delete this dispatch?");
    if (!confirmed) return;

    const articles = getArticles().filter(a => a.id !== id);
    setArticles(articles);

    const custom = getCustomArticles().filter(a => a.id !== id);
    setCustomArticles(custom);

    renderAdminPostsList();
    if (typeof onArticlesMutatedCallback === "function") {
        onArticlesMutatedCallback();
    }
    showToast("DISPATCH PERMANENTLY REMOVED");
}

function setupPostForm() {
    const form = document.getElementById("admin-post-form");
    const clearBtn = document.getElementById("admin-post-clear");

    if (clearBtn) {
        clearBtn.onclick = () => {
            form.reset();
            document.getElementById("admin-post-id").value = "";
            showToast("EDITOR FORM CLEARED");
        };
    }

    if (form) {
        form.onsubmit = (e) => {
            e.preventDefault();

            const existingId = document.getElementById("admin-post-id").value;
            const category = document.getElementById("admin-post-category").value;
            const author = document.getElementById("admin-post-author").value.trim().toUpperCase() || "STAFF CORRESPONDENT";
            const image = document.getElementById("admin-post-image").value.trim() || "assets/images/vintage_typewriter.png";

            const titleEn = document.getElementById("admin-post-title-en").value.trim();
            const subtitleEn = document.getElementById("admin-post-subtitle-en").value.trim();
            const previewEn = document.getElementById("admin-post-preview-en").value.trim();
            const rawContentEn = document.getElementById("admin-post-content-en").value.trim();
            const contentEn = rawContentEn.replace(/\n\n+/g, "<br><br>").replace(/\n/g, "<br>");

            const titleKm = document.getElementById("admin-post-title-km").value.trim();
            const subtitleKm = document.getElementById("admin-post-subtitle-km").value.trim();
            const previewKm = document.getElementById("admin-post-preview-km").value.trim();
            const rawContentKm = document.getElementById("admin-post-content-km").value.trim();
            const contentKm = rawContentKm.replace(/\n\n+/g, "<br><br>").replace(/\n/g, "<br>");

            const id = existingId || `custom-${Date.now()}`;
            const wordCountCalc = `${rawContentEn.split(/\s+/).filter(Boolean).length || 500} WORDS`;
            const readTimeCalc = `${Math.max(1, Math.ceil(rawContentEn.split(/\s+/).filter(Boolean).length / 200))} MIN READ`;

            const articleObj = {
                id,
                category,
                author,
                date: "JULY 15, 2026",
                dateKm: "១៥ កក្កដា ២០២៦",
                wordCount: wordCountCalc,
                wordCountKm: wordCountCalc,
                readTime: readTimeCalc,
                readTimeKm: readTimeCalc,
                image,
                en: {
                    title: titleEn || "UNTITLED TELEGRAM DISPATCH",
                    subtitle: subtitleEn,
                    preview: previewEn || rawContentEn.substring(0, 150) + "...",
                    content: contentEn
                },
                km: {
                    title: titleKm || titleEn || "ទូរលេខព័ត៌មាន",
                    subtitle: subtitleKm || subtitleEn,
                    preview: previewKm || previewEn || "សង្ខេបព័ត៌មាន...",
                    content: contentKm || contentEn
                }
            };

            const articles = getArticles();
            const existingIdx = articles.findIndex(a => a.id === id);
            if (existingIdx > -1) {
                articles[existingIdx] = articleObj;
            } else {
                articles.unshift(articleObj);
            }
            setArticles(articles);

            // Save to custom articles in storage
            const custom = getCustomArticles();
            const customIdx = custom.findIndex(a => a.id === id);
            if (customIdx > -1) {
                custom[customIdx] = articleObj;
            } else {
                custom.unshift(articleObj);
            }
            setCustomArticles(custom);

            form.reset();
            document.getElementById("admin-post-id").value = "";
            renderAdminPostsList();
            if (typeof onArticlesMutatedCallback === "function") {
                onArticlesMutatedCallback();
            }
            showToast(`DISPATCH "${articleObj.en.title.substring(0, 20)}..." PUBLISHED!`);
        };
    }
}

function setupArchiveFilter() {
    const searchInput = document.getElementById("admin-archive-search");
    if (searchInput) {
        searchInput.oninput = () => renderAdminPostsList();
    }

    const pills = document.querySelectorAll(".filter-pill");
    pills.forEach(pill => {
        pill.onclick = () => {
            pills.forEach(p => p.classList.remove("active"));
            pill.classList.add("active");
            activeArchiveCategory = pill.getAttribute("data-filter") || "all";
            renderAdminPostsList();
        };
    });
}

function setupLivePreview() {
    const toggleBtn = document.getElementById("admin-preview-toggle-btn");
    const previewBox = document.getElementById("admin-live-preview-box");
    const closeBtn = document.getElementById("admin-preview-close-btn");
    const previewContent = document.getElementById("admin-live-preview-content");

    if (!toggleBtn || !previewBox || !previewContent) return;

    toggleBtn.onclick = () => {
        const titleEn = document.getElementById("admin-post-title-en").value || "Title Preview";
        const contentEn = document.getElementById("admin-post-content-en").value || "Content preview...";
        const author = document.getElementById("admin-post-author").value || "AUTHOR";

        previewContent.innerHTML = `
            <h3>${titleEn}</h3>
            <p class="mono-text text-sm">BY ${author}</p>
            <div class="modal-article-body">${contentEn.replace(/\n\n+/g, "<br><br>")}</div>
        `;
        previewBox.style.display = "block";
    };

    if (closeBtn) {
        closeBtn.onclick = () => {
            previewBox.style.display = "none";
        };
    }
}

function setupTranslationHelper() {
    const translateBtn = document.getElementById("admin-translate-btn");
    if (!translateBtn) return;

    translateBtn.onclick = async () => {
        const titleEn = document.getElementById("admin-post-title-en").value.trim();
        const previewEn = document.getElementById("admin-post-preview-en").value.trim();
        const contentEn = document.getElementById("admin-post-content-en").value.trim();

        if (!titleEn && !contentEn) {
            alert("Please fill in English fields first to auto-translate.");
            return;
        }

        showToast("TRANSLATING DISPATCH TO KHMER...");
        try {
            if (titleEn) {
                const res = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(titleEn)}&langpair=en|km`);
                const data = await res.json();
                if (data?.responseData?.translatedText) {
                    document.getElementById("admin-post-title-km").value = data.responseData.translatedText;
                }
            }
            if (previewEn) {
                const res = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(previewEn)}&langpair=en|km`);
                const data = await res.json();
                if (data?.responseData?.translatedText) {
                    document.getElementById("admin-post-preview-km").value = data.responseData.translatedText;
                }
            }
            showToast("AUTO-TRANSLATION APPLIED");
        } catch (err) {
            console.warn("Translation API notice:", err);
            showToast("TRANSLATION SERVICE BUSY");
        }
    };
}
