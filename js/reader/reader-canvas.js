/**
 * The Daily Chronograph - Reading Canvas Controller
 * Implements distraction-free reading, drop caps, font scaling, audio sync, and scroll progress.
 */

import { getArticles } from '../data/articles-db.js';
import { TRANSLATIONS } from '../data/translations.js';
import { getSavedBookmarks, setSavedBookmarks } from '../data/storage.js';
import { showToast } from '../ui/toast.js';
import { playArticleAudio, stopAudioNarration, isAudioPlaying, getCurrentPlayingArticle } from '../audio/tts-engine.js';
import { updateScrollProgress, resetScrollProgress } from './scroll-progress.js';
import { renderSmartBrevityCard } from './smart-brevity.js';
import { initQuoteClipping, hideTooltip } from './quote-clipping.js';

let readerFontSizeMultiplier = 1.0;
let currentLanguage = "en";
let activeArticleId = null;
let onBookmarkChangeCallback = null;

export function initReaderCanvas(lang = "en", onBookmarkChange = null) {
    currentLanguage = lang;
    onBookmarkChangeCallback = onBookmarkChange;

    const modalClose = document.getElementById("modal-close");
    const articleModal = document.getElementById("article-modal");
    const fontDecBtn = document.getElementById("reader-font-dec");
    const fontIncBtn = document.getElementById("reader-font-inc");

    if (modalClose) modalClose.onclick = closeArticleReader;
    if (articleModal) {
        articleModal.onclick = (e) => {
            if (e.target === articleModal) closeArticleReader();
        };
    }

    if (fontIncBtn) {
        fontIncBtn.onclick = () => {
            if (readerFontSizeMultiplier < 1.6) {
                readerFontSizeMultiplier += 0.1;
                applyFontSize();
            }
        };
    }

    if (fontDecBtn) {
        fontDecBtn.onclick = () => {
            if (readerFontSizeMultiplier > 0.8) {
                readerFontSizeMultiplier -= 0.1;
                applyFontSize();
            }
        };
    }

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") closeArticleReader();
    });
}

export function updateReaderLanguage(lang) {
    currentLanguage = lang;
    if (activeArticleId) {
        openArticleReader(activeArticleId);
    }
}

export function openArticleReader(id) {
    const articles = getArticles();
    const art = articles.find(a => a.id === id);
    if (!art) return;

    activeArticleId = id;
    const t = TRANSLATIONS[currentLanguage];
    const bookmarks = getSavedBookmarks();
    const isSaved = bookmarks.includes(art.id);
    const contentLang = art[currentLanguage] || art.en;

    const dateStr = currentLanguage === "km" ? art.dateKm : art.date;
    const wordCountStr = currentLanguage === "km" ? art.wordCountKm : art.wordCount;
    const readTimeStr = currentLanguage === "km" ? art.readTimeKm : art.readTime;
    const categoryUpper = currentLanguage === "km" ? t.nav[art.category] || art.category : art.category.toUpperCase();

    const articleModal = document.getElementById("article-modal");
    const modalContent = document.getElementById("modal-article-content");
    const readerTtsBtn = document.getElementById("reader-tts");
    const readerBookmarkBtn = document.getElementById("reader-bookmark");
    const readerPrintBtn = document.getElementById("reader-print");

    if (!articleModal || !modalContent) return;

    // Render Article Body with Smart Brevity Card & Drop Caps
    const brevityCardHtml = renderSmartBrevityCard(art, currentLanguage);

    modalContent.innerHTML = `
        <div class="reader-canvas-content">
            <span class="card-category">${categoryUpper}</span>
            <h2 class="reader-title">${contentLang.title}</h2>
            ${contentLang.subTitle || contentLang.subtitle ? `<p class="lead">${contentLang.subTitle || contentLang.subtitle}</p>` : ""}
            
            <div class="modal-meta mono-text">
                <span>${t.by} ${art.author} &bull; ${dateStr}</span>
                <span>${wordCountStr} &bull; ${readTimeStr}</span>
            </div>

            ${brevityCardHtml}

            ${art.image ? `
            <div class="reader-cover-img-wrap">
                <img src="${art.image}" alt="${contentLang.title}">
            </div>
            ` : ""}

            <div class="modal-article-body drop-cap-lead">
                ${contentLang.content}
            </div>
        </div>
    `;

    // Reset font multiplier
    readerFontSizeMultiplier = 1.0;
    applyFontSize();

    // Bind TTS Button
    if (readerTtsBtn) {
        const currentlyPlaying = isAudioPlaying() && getCurrentPlayingArticle()?.id === art.id;
        readerTtsBtn.textContent = currentlyPlaying ? t.stop : t.speak;
        readerTtsBtn.className = `control-btn mono-text ${currentlyPlaying ? "active" : ""}`;
        
        readerTtsBtn.onclick = () => {
            if (isAudioPlaying()) {
                stopAudioNarration();
                readerTtsBtn.textContent = t.speak;
                readerTtsBtn.classList.remove("active");
            } else {
                playArticleAudio(art, currentLanguage);
                readerTtsBtn.textContent = t.stop;
                readerTtsBtn.classList.add("active");
            }
        };
    }

    // Bind Bookmark Button
    if (readerBookmarkBtn) {
        readerBookmarkBtn.textContent = isSaved ? t.unsave : t.save;
        readerBookmarkBtn.className = `control-btn mono-text ${isSaved ? "active" : ""}`;
        readerBookmarkBtn.onclick = () => {
            const currentBookmarks = getSavedBookmarks();
            const idx = currentBookmarks.indexOf(art.id);
            if (idx > -1) {
                currentBookmarks.splice(idx, 1);
                readerBookmarkBtn.textContent = t.save;
                readerBookmarkBtn.classList.remove("active");
                showToast(t.toastUnbookmarked);
            } else {
                currentBookmarks.push(art.id);
                readerBookmarkBtn.textContent = t.unsave;
                readerBookmarkBtn.classList.add("active");
                showToast(t.toastBookmarked);
            }
            setSavedBookmarks(currentBookmarks);
            if (typeof onBookmarkChangeCallback === "function") {
                onBookmarkChangeCallback();
            }
        };
    }

    // Bind Print Button
    if (readerPrintBtn) {
        readerPrintBtn.textContent = t.print;
        readerPrintBtn.onclick = () => {
            window.print();
        };
    }

    // Bind Scroll Tracker to Modal Container
    const modalContainer = articleModal.querySelector(".modal-container");
    if (modalContainer) {
        modalContainer.scrollTop = 0;
        resetScrollProgress();
        modalContainer.onscroll = () => {
            updateScrollProgress(modalContainer);
        };
    }

    // Init Quote Selection Tooltip
    initQuoteClipping(modalContent, art, currentLanguage);

    // Show modal
    articleModal.classList.add("active");
    articleModal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
}

export function closeArticleReader() {
    const articleModal = document.getElementById("article-modal");
    if (articleModal) {
        articleModal.classList.remove("active");
        articleModal.setAttribute("aria-hidden", "true");
    }
    document.body.style.overflow = "";
    resetScrollProgress();
    hideTooltip();
    activeArticleId = null;
}

function applyFontSize() {
    const bodyEl = document.querySelector(".modal-article-body");
    if (bodyEl) {
        bodyEl.style.fontSize = `${readerFontSizeMultiplier * 1.15}rem`;
        bodyEl.style.lineHeight = `${1.65 + (readerFontSizeMultiplier - 1.0) * 0.2}`;
    }
}
