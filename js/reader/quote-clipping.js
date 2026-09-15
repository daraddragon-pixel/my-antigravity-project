/**
 * The Daily Chronograph - Quote Clipping & Text Selection Tooltip
 * Allows readers to highlight passages and copy formatted quotes with dateline citation.
 */

import { showToast } from '../ui/toast.js';

let tooltipEl = null;

export function initQuoteClipping(readerContainer, article, currentLanguage = "en") {
    if (!readerContainer) return;

    if (!tooltipEl) {
        tooltipEl = document.createElement("div");
        tooltipEl.id = "quote-clip-tooltip";
        tooltipEl.className = "quote-clip-tooltip mono-text";
        tooltipEl.innerHTML = `
            <button id="clip-copy-btn" class="clip-btn">📋 COPY QUOTE</button>
        `;
        document.body.appendChild(tooltipEl);

        tooltipEl.querySelector("#clip-copy-btn").onclick = () => {
            const selection = window.getSelection();
            const text = selection.toString().trim();
            if (text && article) {
                const author = article.author || "The Daily Chronograph";
                const date = currentLanguage === "km" ? article.dateKm : article.date;
                const formattedQuote = `“${text}”\n— ${author}, ${date} (The Daily Chronograph)`;
                
                navigator.clipboard.writeText(formattedQuote).then(() => {
                    showToast("QUOTE CLIPPED TO CLIPBOARD");
                }).catch(() => {
                    showToast("COPIED TO CLIPBOARD");
                });
            }
            hideTooltip();
        };
    }

    const handleSelection = () => {
        const selection = window.getSelection();
        if (!selection || selection.isCollapsed) {
            hideTooltip();
            return;
        }

        const text = selection.toString().trim();
        if (text.length < 5) {
            hideTooltip();
            return;
        }

        const range = selection.getRangeAt(0);
        const rect = range.getBoundingClientRect();

        if (rect && rect.width > 0) {
            tooltipEl.style.top = `${window.scrollY + rect.top - 42}px`;
            tooltipEl.style.left = `${window.scrollX + rect.left + (rect.width / 2) - 60}px`;
            tooltipEl.classList.add("active");
        }
    };

    readerContainer.addEventListener("mouseup", handleSelection);
    readerContainer.addEventListener("keyup", handleSelection);
}

export function hideTooltip() {
    if (tooltipEl) {
        tooltipEl.classList.remove("active");
    }
}
