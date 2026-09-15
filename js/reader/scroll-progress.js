/**
 * The Daily Chronograph - Reading Scroll Progress Tracker
 * Updates top progress bar and dynamic time remaining indicator.
 */

let progressBarEl = null;

export function initScrollProgress() {
    progressBarEl = document.getElementById("reading-progress-bar");
}

export function updateScrollProgress(container) {
    if (!progressBarEl) {
        progressBarEl = document.getElementById("reading-progress-bar");
        if (!progressBarEl) return;
    }

    if (!container) return;

    const scrollTop = container.scrollTop || 0;
    const scrollHeight = container.scrollHeight - container.clientHeight;
    
    if (scrollHeight <= 0) {
        progressBarEl.style.width = "0%";
        return;
    }

    const percent = Math.min(100, Math.max(0, (scrollTop / scrollHeight) * 100));
    progressBarEl.style.width = `${percent}%`;
}

export function resetScrollProgress() {
    if (progressBarEl) {
        progressBarEl.style.width = "0%";
    }
}
