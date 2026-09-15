/**
 * The Daily Chronograph - Theme Controller
 * Handles switching between Day and Night (Retro Inked Paper) modes.
 */

import { getSavedTheme, setSavedTheme } from '../data/storage.js';
import { TRANSLATIONS } from '../data/translations.js';

let currentTheme = "light";
let currentLanguage = "en";

export function initTheme(lang = "en") {
    currentLanguage = lang;
    currentTheme = getSavedTheme();
    document.documentElement.setAttribute("data-theme", currentTheme);

    const toggleBtn = document.getElementById("theme-toggle");
    if (toggleBtn) {
        updateButtonLabel(toggleBtn);
        toggleBtn.onclick = () => {
            currentTheme = currentTheme === "dark" ? "light" : "dark";
            document.documentElement.setAttribute("data-theme", currentTheme);
            setSavedTheme(currentTheme);
            updateButtonLabel(toggleBtn);
        };
    }
}

export function updateThemeLanguage(lang) {
    currentLanguage = lang;
    const toggleBtn = document.getElementById("theme-toggle");
    if (toggleBtn) {
        updateButtonLabel(toggleBtn);
    }
}

function updateButtonLabel(btn) {
    const t = TRANSLATIONS[currentLanguage];
    btn.textContent = currentTheme === "dark" ? t.dayEdition : t.nightEdition;
}
