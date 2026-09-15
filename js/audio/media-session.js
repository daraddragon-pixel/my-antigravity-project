/**
 * The Daily Chronograph - Media Session Controller
 * Connects audio narration state with OS lock-screen, smartwatch, and browser tab controls.
 */

export function updateMediaSession(article, currentLanguage, handlers = {}) {
    if (!('mediaSession' in navigator) || !article) return;

    const contentLang = article[currentLanguage] || article.en;
    const title = contentLang.title || "The Daily Chronograph Dispatch";
    const author = `By ${article.author || "Editorial Staff"}`;

    navigator.mediaSession.metadata = new MediaMetadata({
        title: title,
        artist: author,
        album: currentLanguage === "km" ? "ការអានកាលប្បវត្តិប្រចាំថ្ងៃ" : "The Daily Chronograph Audio Edition",
        artwork: [
            { src: article.image || "assets/images/vintage_typewriter.png", sizes: "512x512", type: "image/png" }
        ]
    });

    if (handlers.onPlay) {
        navigator.mediaSession.setActionHandler('play', handlers.onPlay);
    }
    if (handlers.onPause) {
        navigator.mediaSession.setActionHandler('pause', handlers.onPause);
    }
    if (handlers.onStop) {
        navigator.mediaSession.setActionHandler('stop', handlers.onStop);
    }
}

export function clearMediaSession() {
    if ('mediaSession' in navigator) {
        navigator.mediaSession.playbackState = "none";
    }
}
