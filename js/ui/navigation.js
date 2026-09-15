/**
 * The Daily Chronograph - Navigation & Article Feed Grid Controller
 * Manages category routing, bookmark tracking, hero slider, and opinions.
 */

import { getArticles } from '../data/articles-db.js';
import { BULLETINS } from '../data/bulletins-db.js';
import { TRANSLATIONS } from '../data/translations.js';
import { getSavedBookmarks, setSavedBookmarks } from '../data/storage.js';
import { showToast } from './toast.js';

let currentCategory = "all";
let currentLanguage = "en";
let currentSearchQuery = "";
let heroSliderInterval = null;
let heroSliderIdx = 0;
let onOpenArticleCallback = null;

export function initNavigation(lang = "en", onOpenArticle = null) {
    currentLanguage = lang;
    onOpenArticleCallback = onOpenArticle;

    setupNavLinks();
    setupBookmarkHeaderButton();
    setupNewsletter();
    renderAllFeeds();
}

export function updateNavigationLanguage(lang) {
    currentLanguage = lang;
    renderAllFeeds();
    updateBookmarkCountUI();
}

export function setSearchQuery(query) {
    currentSearchQuery = query;
    renderArticlesGrid();
}

export function getCurrentCategory() {
    return currentCategory;
}

export function renderAllFeeds() {
    renderArticlesGrid();
    renderBulletinsSidebar();
    renderOpinionsSidebar();
    updateBookmarkCountUI();
}

function setupNavLinks() {
    const navLinks = document.querySelectorAll(".nav-link");
    navLinks.forEach(link => {
        link.onclick = (e) => {
            e.preventDefault();
            navLinks.forEach(l => l.classList.remove("active"));
            link.classList.add("active");

            currentCategory = link.getAttribute("data-category") || "all";
            currentSearchQuery = "";
            const searchInput = document.getElementById("search-input");
            if (searchInput) searchInput.value = "";

            renderArticlesGrid();
        };
    });
}

function setupBookmarkHeaderButton() {
    const bookmarkBtn = document.getElementById("bookmark-toggle-btn");
    if (bookmarkBtn) {
        bookmarkBtn.onclick = () => {
            currentCategory = "saved";
            const navLinks = document.querySelectorAll(".nav-link");
            navLinks.forEach(l => l.classList.remove("active"));
            const savedLink = Array.from(navLinks).find(l => l.getAttribute("data-category") === "saved");
            if (savedLink) savedLink.classList.add("active");

            renderArticlesGrid();
            updateBookmarkCountUI();
        };
    }
}

export function updateBookmarkCountUI() {
    const countEl = document.getElementById("bookmark-count");
    const bookmarks = getSavedBookmarks();
    if (countEl) countEl.textContent = bookmarks.length;
}

export function renderArticlesGrid() {
    const grid = document.getElementById("main-articles-grid");
    if (!grid) return;

    const articles = getArticles();
    const t = TRANSLATIONS[currentLanguage];
    const bookmarks = getSavedBookmarks();

    let filtered = articles.filter(a => a.category !== "opinion");

    if (currentCategory === "saved") {
        filtered = articles.filter(a => bookmarks.includes(a.id));
    } else if (currentCategory !== "all") {
        filtered = filtered.filter(a => a.category === currentCategory);
    }

    if (currentSearchQuery) {
        const q = currentSearchQuery.toLowerCase();
        filtered = articles.filter(a => {
            const contentLang = a[currentLanguage] || a.en;
            return contentLang.title.toLowerCase().includes(q) ||
                   contentLang.preview.toLowerCase().includes(q) ||
                   (contentLang.content && contentLang.content.toLowerCase().includes(q));
        });
    }

    if (filtered.length === 0) {
        grid.innerHTML = `
            <div class="news-card hero">
                <span class="card-category">${t.emptyArchive}</span>
                <h2 class="card-title">${t.noCorrespondence}</h2>
                <p class="card-body-preview">${t.emptyDesc}</p>
            </div>
        `;
        return;
    }

    grid.innerHTML = "";
    filtered.forEach((art, index) => {
        const isHero = index === 0 && currentCategory === "all" && !currentSearchQuery;
        const isSaved = bookmarks.includes(art.id);
        const bookmarkIcon = isSaved ? "★" : "☆";
        const contentLang = art[currentLanguage] || art.en;
        const readTimeStr = currentLanguage === "km" ? art.readTimeKm : art.readTime;
        const categoryUpper = currentLanguage === "km" ? t.nav[art.category] || art.category : art.category.toUpperCase();

        if (isHero) {
            grid.innerHTML += `
                <article class="news-card hero" id="hero-article-card">
                    <span class="card-category" id="hero-card-category">${categoryUpper}</span>
                    <h3 class="card-title" id="hero-card-title">${contentLang.title}</h3>
                    <div class="card-meta">
                        <span id="hero-card-meta">${t.by} ${art.author} &bull; ${readTimeStr}</span>
                        <button class="bookmark-icon-btn" id="hero-card-bookmark" title="${isSaved ? t.unsave : t.save}">
                            ${bookmarkIcon}
                        </button>
                    </div>
                    <div class="hero-slider-wrap">
                        <div class="slides-container"></div>
                        <div class="slider-controls mono-text">
                            <button class="slide-nav-btn prev-slide">[◀] PREV</button>
                            <span class="slide-indicator">01 / 05</span>
                            <button class="slide-nav-btn next-slide">NEXT [▶]</button>
                        </div>
                    </div>
                    <p class="card-body-preview drop-cap" id="hero-card-preview">${contentLang.preview}</p>
                    <span class="read-more-btn" id="hero-card-readmore">${t.readDispatch} &rarr;</span>
                </article>
            `;
        } else {
            grid.innerHTML += `
                <article class="news-card">
                    <span class="card-category">${categoryUpper}</span>
                    <h3 class="card-title" data-id="${art.id}">${contentLang.title}</h3>
                    <div class="card-meta">
                        <span>${t.by} ${art.author} &bull; ${readTimeStr}</span>
                        <button class="bookmark-icon-btn" data-id="${art.id}" title="${isSaved ? t.unsave : t.save}">
                            ${bookmarkIcon}
                        </button>
                    </div>
                    ${art.image ? `
                    <div class="card-img-wrap" data-id="${art.id}">
                        <img src="${art.image}" alt="${contentLang.title} Image">
                    </div>
                    ` : ""}
                    <p class="card-body-preview">${contentLang.preview}</p>
                    <span class="read-more-btn" data-id="${art.id}">${t.readDispatch} &rarr;</span>
                </article>
            `;
        }
    });

    // Bind card click triggers to open reader canvas
    grid.querySelectorAll(".card-title, .card-img-wrap, .read-more-btn").forEach(el => {
        el.onclick = (e) => {
            const id = el.getAttribute("data-id");
            if (id && typeof onOpenArticleCallback === "function") {
                onOpenArticleCallback(id);
            }
        };
    });

    // Bind bookmark buttons
    grid.querySelectorAll(".bookmark-icon-btn").forEach(btn => {
        btn.onclick = (e) => {
            e.stopPropagation();
            const id = btn.getAttribute("data-id");
            if (id) toggleBookmarkAction(id);
        };
    });

    initHeroSlider();
}

function initHeroSlider() {
    const sliderWrap = document.querySelector(".hero-slider-wrap");
    if (!sliderWrap) return;

    if (heroSliderInterval) {
        clearInterval(heroSliderInterval);
        heroSliderInterval = null;
    }

    const articles = getArticles();
    const slideArticles = articles.filter(a => a.image).slice(0, 5);
    const container = sliderWrap.querySelector(".slides-container");
    const indicator = sliderWrap.querySelector(".slide-indicator");

    if (!container || slideArticles.length === 0) return;

    container.innerHTML = slideArticles.map((art, idx) => {
        const contentLang = art[currentLanguage] || art.en;
        const activeClass = idx === 0 ? "active" : "";
        return `
            <div class="hero-slide ${activeClass}" data-index="${idx}">
                <img src="${art.image}" alt="${contentLang.title}">
            </div>
        `;
    }).join("");

    const showSlide = (idx) => {
        const slides = container.querySelectorAll(".hero-slide");
        if (slides.length === 0) return;

        if (idx >= slides.length) idx = 0;
        if (idx < 0) idx = slides.length - 1;

        heroSliderIdx = idx;
        slides.forEach((slide, sIdx) => {
            slide.classList.toggle("active", sIdx === heroSliderIdx);
        });

        if (indicator) {
            indicator.textContent = `${String(heroSliderIdx + 1).padStart(2, '0')} / ${String(slides.length).padStart(2, '0')}`;
        }

        const currentArt = slideArticles[heroSliderIdx];
        if (currentArt) {
            const isKm = currentLanguage === "km";
            const contentLang = currentArt[currentLanguage] || currentArt.en;
            const t = TRANSLATIONS[currentLanguage];
            const catLabel = isKm ? (t.nav[currentArt.category] || currentArt.category) : currentArt.category.toUpperCase();
            const readTimeStr = isKm ? currentArt.readTimeKm : currentArt.readTime;

            const catEl = document.getElementById("hero-card-category");
            const titleEl = document.getElementById("hero-card-title");
            const metaEl = document.getElementById("hero-card-meta");
            const prevEl = document.getElementById("hero-card-preview");
            const bookmarkEl = document.getElementById("hero-card-bookmark");

            if (catEl) catEl.textContent = catLabel;
            if (titleEl) titleEl.textContent = contentLang.title;
            if (metaEl) metaEl.innerHTML = `${t.by} ${currentArt.author} &bull; ${readTimeStr}`;
            if (prevEl) prevEl.textContent = contentLang.preview;

            if (bookmarkEl) {
                const isSaved = getSavedBookmarks().includes(currentArt.id);
                bookmarkEl.textContent = isSaved ? "★" : "☆";
                bookmarkEl.title = isSaved ? t.unsave : t.save;
            }
        }
    };

    const startAutoplay = () => {
        stopAutoplay();
        heroSliderInterval = setInterval(() => showSlide(heroSliderIdx + 1), 5000);
    };

    const stopAutoplay = () => {
        if (heroSliderInterval) {
            clearInterval(heroSliderInterval);
            heroSliderInterval = null;
        }
    };

    const prevBtn = sliderWrap.querySelector(".prev-slide");
    const nextBtn = sliderWrap.querySelector(".next-slide");

    if (prevBtn) {
        prevBtn.onclick = (e) => {
            e.stopPropagation();
            showSlide(heroSliderIdx - 1);
            startAutoplay();
        };
    }

    if (nextBtn) {
        nextBtn.onclick = (e) => {
            e.stopPropagation();
            showSlide(heroSliderIdx + 1);
            startAutoplay();
        };
    }

    sliderWrap.onmouseenter = stopAutoplay;
    sliderWrap.onmouseleave = startAutoplay;

    // Hero title & read more clicks
    const heroTitle = document.getElementById("hero-card-title");
    const heroReadMore = document.getElementById("hero-card-readmore");
    const heroBookmark = document.getElementById("hero-card-bookmark");

    if (heroTitle) {
        heroTitle.onclick = () => {
            const activeArt = slideArticles[heroSliderIdx];
            if (activeArt && typeof onOpenArticleCallback === "function") {
                onOpenArticleCallback(activeArt.id);
            }
        };
    }
    if (heroReadMore) {
        heroReadMore.onclick = () => {
            const activeArt = slideArticles[heroSliderIdx];
            if (activeArt && typeof onOpenArticleCallback === "function") {
                onOpenArticleCallback(activeArt.id);
            }
        };
    }
    if (heroBookmark) {
        heroBookmark.onclick = (e) => {
            e.stopPropagation();
            const activeArt = slideArticles[heroSliderIdx];
            if (activeArt) toggleBookmarkAction(activeArt.id);
        };
    }

    showSlide(0);
    startAutoplay();
}

function toggleBookmarkAction(id) {
    const t = TRANSLATIONS[currentLanguage];
    const bookmarks = getSavedBookmarks();
    const idx = bookmarks.indexOf(id);

    if (idx > -1) {
        bookmarks.splice(idx, 1);
        showToast(t.toastUnbookmarked);
    } else {
        bookmarks.push(id);
        showToast(t.toastBookmarked);
    }

    setSavedBookmarks(bookmarks);
    updateBookmarkCountUI();
    renderArticlesGrid();
}

export function renderBulletinsSidebar() {
    const list = document.getElementById("bulletins-list");
    if (!list) return;

    list.innerHTML = BULLETINS.map(b => {
        const text = currentLanguage === "km" ? b.km : b.en;
        const meta = currentLanguage === "km" ? "ទាន់ហេតុការណ៍" : "FLASH";
        return `
            <div class="bulletin-item">
                <span class="bulletin-meta mono-text">${b.time} &bull; ${meta}</span>
                <p class="bulletin-text">${text}</p>
            </div>
        `;
    }).join("");
}

export function renderOpinionsSidebar() {
    const list = document.getElementById("opinion-list");
    if (!list) return;

    const articles = getArticles();
    const opinions = articles.filter(a => a.category === "opinion");

    list.innerHTML = opinions.map(op => {
        const contentLang = op[currentLanguage] || op.en;
        return `
            <div class="opinion-item">
                <span class="opinion-author mono-text">${op.author}</span>
                <h4 class="opinion-title"><a href="#" data-id="${op.id}">${contentLang.title}</a></h4>
                <p class="opinion-lead">${contentLang.preview}</p>
            </div>
        `;
    }).join("");

    list.querySelectorAll(".opinion-title a").forEach(link => {
        link.onclick = (e) => {
            e.preventDefault();
            const id = link.getAttribute("data-id");
            if (id && typeof onOpenArticleCallback === "function") {
                onOpenArticleCallback(id);
            }
        };
    });
}

function setupNewsletter() {
    const form = document.getElementById("newsletter-form");
    const emailInput = document.getElementById("newsletter-email");
    const statusEl = document.getElementById("newsletter-status");
    const stampEl = document.getElementById("stamp-confirmed");

    if (form) {
        form.onsubmit = (e) => {
            e.preventDefault();
            const email = emailInput ? emailInput.value.trim() : "";
            const t = TRANSLATIONS[currentLanguage];
            if (email && statusEl) {
                statusEl.textContent = t.subscribing;
                if (emailInput) emailInput.disabled = true;
                const submitBtn = form.querySelector("button");
                if (submitBtn) submitBtn.disabled = true;

                setTimeout(() => {
                    statusEl.textContent = t.subscribedAt + email.toUpperCase();
                    if (stampEl) stampEl.classList.add("active");
                    showToast(t.subscribedToast);
                }, 1200);
            }
        };
    }
}
