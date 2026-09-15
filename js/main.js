/**
 * The Daily Chronograph (ANR Daily News) - Master Application Bootstrap
 * High-performance ES Module orchestrator coordinating Data, Audio, Reader UX, cPanel, and UI.
 */

import { loadMergedArticles } from './data/storage.js';
import { TRANSLATIONS } from './data/translations.js';
import { getSavedLanguage, setSavedLanguage } from './data/storage.js';
import { initFirebaseCloud } from './data/firebase-sync.js';

import { initTheme, updateThemeLanguage } from './ui/theme.js';
import { initMasthead, updateMastheadLanguage, renderEditorialSettings } from './ui/masthead.js';
import { initTicker, updateTickerLanguage } from './ui/ticker.js';
import { initNavigation, updateNavigationLanguage, renderAllFeeds } from './ui/navigation.js';
import { initSearch } from './ui/search.js';
import { showToast } from './ui/toast.js';

import { initAudioDock, updateAudioDockLanguage } from './audio/audio-dock.js';
import { initReaderCanvas, openArticleReader, updateReaderLanguage } from './reader/reader-canvas.js';
import { initScrollProgress } from './reader/scroll-progress.js';
import { initCPanelDesk } from './cpanel/cpanel-main.js';
import { renderCustomAds } from './cpanel/ads-manager.js';

let currentLanguage = "en";

function initializeApp() {
    console.log("⚡ Bootstrapping The Daily Chronograph (Modular Architecture)...");

    // 1. Load language preference
    currentLanguage = getSavedLanguage();

    // 2. Load and merge database
    loadMergedArticles();

    // 3. Initialize UI Subsystems
    initTheme(currentLanguage);
    initMasthead(currentLanguage);
    initTicker(currentLanguage);
    initNavigation(currentLanguage, (articleId) => {
        openArticleReader(articleId);
    });
    initSearch();
    renderCustomAds(currentLanguage);

    // 4. Initialize Audio & Reader Engines
    initScrollProgress();
    initAudioDock(currentLanguage, (articleId) => {
        openArticleReader(articleId);
    });
    initReaderCanvas(currentLanguage, () => {
        renderAllFeeds();
    });

    // 5. Initialize cPanel Editorial Desk
    initCPanelDesk({
        onArticlesMutated: () => {
            renderAllFeeds();
        },
        onEditorialUpdated: () => {
            renderEditorialSettings();
            initTicker(currentLanguage);
        },
        onDatabaseRestored: () => {
            loadMergedArticles();
            renderAllFeeds();
            renderEditorialSettings();
            renderCustomAds(currentLanguage);
            initTicker(currentLanguage);
        }
    });

    // 6. Initialize Cloud Sync
    initFirebaseCloud(() => {
        loadMergedArticles();
        renderAllFeeds();
    });

    // 7. Setup Language Switcher Button
    setupLanguageToggle();

    // 8. Translate Static HTML Labels
    translateStaticUI();

    // Global helper for opening article
    window.openArticleModal = (id) => openArticleReader(id);

    console.log("✅ The Daily Chronograph initialized successfully.");
}

function setupLanguageToggle() {
    const langBtn = document.getElementById("language-toggle");
    if (langBtn) {
        langBtn.textContent = currentLanguage === "km" ? "ENGLISH" : "ភាសាខ្មែរ";
        langBtn.onclick = () => {
            currentLanguage = currentLanguage === "km" ? "en" : "km";
            setSavedLanguage(currentLanguage);
            langBtn.textContent = currentLanguage === "km" ? "ENGLISH" : "ភាសាខ្មែរ";

            // Notify all modules of language change
            translateStaticUI();
            updateThemeLanguage(currentLanguage);
            updateMastheadLanguage(currentLanguage);
            updateTickerLanguage(currentLanguage);
            updateNavigationLanguage(currentLanguage);
            updateAudioDockLanguage(currentLanguage);
            updateReaderLanguage(currentLanguage);
            renderCustomAds(currentLanguage);

            showToast(currentLanguage === "km" ? "ភាសាត្រូវបានផ្លាស់ប្តូរទៅជា ភាសាខ្មែរ" : "Language switched to English");
        };
    }
}

function translateStaticUI() {
    const t = TRANSLATIONS[currentLanguage];

    const safeText = (id, text) => {
        const el = document.getElementById(id);
        if (el && text) el.textContent = text;
    };
    const safeHTML = (id, html) => {
        const el = document.getElementById(id);
        if (el && html) el.innerHTML = html;
    };

    safeText("ticker-title-text", t.bulletins);
    safeText("search-btn", t.find);
    safeText("sidebar-left-title", t.latestFlashes);
    safeText("sidebar-right-title", t.opinionEditorial);
    safeText("weather-detail-title", t.meteorologicalStamp);
    safeText("weather-city-btn", t.update);
    safeText("newsletter-title-text", t.subscribeDispatch);
    safeText("newsletter-desc-text", t.deliveredMailbox);
    safeText("newsletter-btn-text", t.engrave);
    safeHTML("footer-logo-text", t.footerLogo);
    safeText("footer-desc-text", t.footerDesc);
    safeText("footer-copyright-text", t.copyright);

    const searchInput = document.getElementById("search-input");
    if (searchInput) searchInput.placeholder = t.searchPlaceholder;

    const cityInput = document.getElementById("weather-city");
    if (cityInput) cityInput.placeholder = t.enterCityPlaceholder;

    // Update Navigation Labels
    const navLinks = document.querySelectorAll(".nav-link");
    navLinks.forEach(link => {
        const cat = link.getAttribute("data-category");
        if (cat && t.nav[cat]) {
            link.textContent = t.nav[cat];
        }
    });
}

// Auto-run on DOM ready
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeApp);
} else {
    initializeApp();
}
