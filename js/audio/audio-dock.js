/**
 * The Daily Chronograph - Persistent Floating Audio Dock
 * Docked mini-player UI allowing uninterrupted narration while browsing the site.
 */

import { isAudioPlaying, stopAudioNarration, getCurrentPlayingArticle, setPlaybackSpeed, getPlaybackSpeed, setTTSStateCallback } from './tts-engine.js';
import { updateMediaSession, clearMediaSession } from './media-session.js';
import { TRANSLATIONS } from '../data/translations.js';

let dockContainer = null;
let currentLanguage = "en";
let onOpenArticleCallback = null;

export function initAudioDock(lang = "en", onOpenArticle = null) {
    currentLanguage = lang;
    onOpenArticleCallback = onOpenArticle;
    dockContainer = document.getElementById("persistent-audio-dock");

    setTTSStateCallback((state) => {
        renderDockUI(state);
    });
}

export function updateAudioDockLanguage(lang) {
    currentLanguage = lang;
    const art = getCurrentPlayingArticle();
    if (art && isAudioPlaying()) {
        renderDockUI({ isPlaying: true, article: art, speed: getPlaybackSpeed() });
    }
}

function renderDockUI(state) {
    if (!dockContainer) {
        dockContainer = document.getElementById("persistent-audio-dock");
        if (!dockContainer) return;
    }

    const t = TRANSLATIONS[currentLanguage];

    if (!state.isPlaying || !state.article) {
        dockContainer.classList.remove("active");
        dockContainer.setAttribute("aria-hidden", "true");
        clearMediaSession();
        return;
    }

    const art = state.article;
    const contentLang = art[currentLanguage] || art.en;
    const speed = state.speed || getPlaybackSpeed();

    dockContainer.classList.add("active");
    dockContainer.setAttribute("aria-hidden", "false");

    dockContainer.innerHTML = `
        <div class="audio-dock-inner">
            <div class="audio-dock-left">
                <div class="audio-pulse-indicator">
                    <span></span><span></span><span></span>
                </div>
                <div class="audio-dock-info">
                    <span class="audio-dock-status mono-text">${t.audioDock.playing} (${art.category.toUpperCase()})</span>
                    <h4 class="audio-dock-title">${contentLang.title}</h4>
                    <span class="audio-dock-author mono-text">${t.by} ${art.author}</span>
                </div>
            </div>

            <div class="audio-dock-controls">
                <button id="audio-dock-speed-btn" class="dock-control-btn mono-text" title="${t.audioDock.speed}">
                    ${speed}x
                </button>
                <button id="audio-dock-view-btn" class="dock-control-btn mono-text" title="${t.audioDock.openArticle}">
                    📄 ${t.audioDock.openArticle}
                </button>
                <button id="audio-dock-stop-btn" class="dock-control-btn dock-stop-btn mono-text" title="${t.audioDock.close}">
                    ✕ ${t.stop}
                </button>
            </div>
        </div>
    `;

    // Speed toggle binding (cycles 1.0x -> 1.25x -> 1.5x -> 1.0x)
    const speedBtn = document.getElementById("audio-dock-speed-btn");
    if (speedBtn) {
        speedBtn.onclick = () => {
            const current = getPlaybackSpeed();
            const nextSpeed = current === 1.0 ? 1.25 : (current === 1.25 ? 1.5 : 1.0);
            setPlaybackSpeed(nextSpeed);
            speedBtn.textContent = `${nextSpeed}x`;
        };
    }

    // View article binding
    const viewBtn = document.getElementById("audio-dock-view-btn");
    if (viewBtn) {
        viewBtn.onclick = () => {
            if (typeof onOpenArticleCallback === "function") {
                onOpenArticleCallback(art.id);
            }
        };
    }

    // Stop button binding
    const stopBtn = document.getElementById("audio-dock-stop-btn");
    if (stopBtn) {
        stopBtn.onclick = () => {
            stopAudioNarration();
        };
    }

    // Update Lock-Screen metadata
    updateMediaSession(art, currentLanguage, {
        onStop: () => stopAudioNarration()
    });
}
