/**
 * The Daily Chronograph - Local Storage & Snapshot Management
 * Handles all browser offline persistence and full database snapshots.
 */

import { INITIAL_ARTICLES_DB, setArticles } from './articles-db.js';

export const STORAGE_KEYS = {
    LANG: "chronograph_lang",
    THEME: "chronograph_theme",
    BOOKMARKS: "chronograph_bookmarks",
    CUSTOM_ARTICLES: "anr_custom_articles",
    CUSTOM_ADS: "anr_custom_ads",
    EDITORIAL_SETTINGS: "anr_editorial_settings",
    TICKER_BULLETINS: "anr_ticker_bulletins",
    ADMIN_PASSCODE: "anr_admin_passcode",
    FIREBASE_CONFIG: "anr_firebase_config"
};

export function getSavedLanguage() {
    return localStorage.getItem(STORAGE_KEYS.LANG) || "en";
}

export function setSavedLanguage(lang) {
    localStorage.setItem(STORAGE_KEYS.LANG, lang);
}

export function getSavedTheme() {
    return localStorage.getItem(STORAGE_KEYS.THEME) || "light";
}

export function setSavedTheme(theme) {
    localStorage.setItem(STORAGE_KEYS.THEME, theme);
}

export function getSavedBookmarks() {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEYS.BOOKMARKS)) || [];
    } catch (e) {
        return [];
    }
}

export function setSavedBookmarks(bookmarks) {
    localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(bookmarks));
}

export function getCustomArticles() {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEYS.CUSTOM_ARTICLES)) || [];
    } catch (e) {
        return [];
    }
}

export function setCustomArticles(articles) {
    localStorage.setItem(STORAGE_KEYS.CUSTOM_ARTICLES, JSON.stringify(articles));
}

export function getCustomAds() {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEYS.CUSTOM_ADS)) || { left: "", right: "" };
    } catch (e) {
        return { left: "", right: "" };
    }
}

export function setCustomAds(ads) {
    localStorage.setItem(STORAGE_KEYS.CUSTOM_ADS, JSON.stringify(ads));
}

export function getEditorialSettings() {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEYS.EDITORIAL_SETTINGS)) || null;
    } catch (e) {
        return null;
    }
}

export function setEditorialSettings(settings) {
    localStorage.setItem(STORAGE_KEYS.EDITORIAL_SETTINGS, JSON.stringify(settings));
}

export function getTickerBulletins() {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEYS.TICKER_BULLETINS)) || null;
    } catch (e) {
        return null;
    }
}

export function setTickerBulletins(bulletins) {
    localStorage.setItem(STORAGE_KEYS.TICKER_BULLETINS, JSON.stringify(bulletins));
}

export function getAdminPasscode() {
    return localStorage.getItem(STORAGE_KEYS.ADMIN_PASSCODE) || "chronograph1902";
}

export function setAdminPasscode(code) {
    localStorage.setItem(STORAGE_KEYS.ADMIN_PASSCODE, code);
}

export function getFirebaseConfig() {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEYS.FIREBASE_CONFIG)) || null;
    } catch (e) {
        return null;
    }
}

export function setFirebaseConfig(config) {
    localStorage.setItem(STORAGE_KEYS.FIREBASE_CONFIG, JSON.stringify(config));
}

export function removeFirebaseConfig() {
    localStorage.removeItem(STORAGE_KEYS.FIREBASE_CONFIG);
}

/**
 * Merges seed articles with custom articles stored locally
 */
export function loadMergedArticles() {
    const custom = getCustomArticles();
    const articlesMap = new Map();
    
    // Seed articles first
    INITIAL_ARTICLES_DB.forEach(art => articlesMap.set(art.id, art));
    
    // Custom/modified articles override seed
    custom.forEach(art => articlesMap.set(art.id, art));
    
    const merged = Array.from(articlesMap.values());
    setArticles(merged);
    return merged;
}

/**
 * Exports a full portable JSON snapshot
 */
export function exportDatabaseSnapshot() {
    return {
        version: "2.0",
        timestamp: Date.now(),
        customArticles: getCustomArticles(),
        customAds: getCustomAds(),
        editorialSettings: getEditorialSettings(),
        tickerBulletins: getTickerBulletins()
    };
}

/**
 * Imports a snapshot JSON object
 */
export function importDatabaseSnapshot(backupObj) {
    if (!backupObj || typeof backupObj !== "object") {
        throw new Error("Invalid snapshot format");
    }
    
    if (Array.isArray(backupObj.customArticles)) {
        setCustomArticles(backupObj.customArticles);
    }
    if (backupObj.customAds) {
        setCustomAds(backupObj.customAds);
    }
    if (backupObj.editorialSettings) {
        setEditorialSettings(backupObj.editorialSettings);
    }
    if (backupObj.tickerBulletins) {
        setTickerBulletins(backupObj.tickerBulletins);
    }
    
    return loadMergedArticles();
}

/**
 * Resets all custom overrides to seed state
 */
export function factoryResetDatabase() {
    localStorage.removeItem(STORAGE_KEYS.CUSTOM_ARTICLES);
    localStorage.removeItem(STORAGE_KEYS.CUSTOM_ADS);
    localStorage.removeItem(STORAGE_KEYS.EDITORIAL_SETTINGS);
    localStorage.removeItem(STORAGE_KEYS.TICKER_BULLETINS);
    localStorage.removeItem(STORAGE_KEYS.ADMIN_PASSCODE);
    localStorage.removeItem(STORAGE_KEYS.FIREBASE_CONFIG);
    
    setArticles([...INITIAL_ARTICLES_DB]);
    return INITIAL_ARTICLES_DB;
}
