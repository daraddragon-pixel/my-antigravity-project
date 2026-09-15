/**
 * The Daily Chronograph - cPanel Editorial & Ticker Manager
 * Manages masthead settings, live ticker bulletins, and meteorological defaults.
 */

import { getEditorialSettings, setEditorialSettings, getTickerBulletins, setTickerBulletins } from '../data/storage.js';
import { showToast } from '../ui/toast.js';

let onEditorialUpdatedCallback = null;

export function initTickerManager(onEditorialUpdated) {
    onEditorialUpdatedCallback = onEditorialUpdated;
    setupEditorialForm();
    setupBulletinsManager();
}

function setupEditorialForm() {
    const form = document.getElementById("admin-editorial-form");
    const titleInput = document.getElementById("admin-masthead-title");
    const volInput = document.getElementById("admin-masthead-vol");
    const priceInput = document.getElementById("admin-masthead-price");
    const estInput = document.getElementById("admin-masthead-est");
    const resetBtn = document.getElementById("admin-editorial-reset");

    const current = getEditorialSettings();
    if (current) {
        if (titleInput) titleInput.value = current.mastheadTitle || "";
        if (volInput) volInput.value = current.volNo || "";
        if (priceInput) priceInput.value = current.price || "";
        if (estInput) estInput.value = current.est || "";
    }

    if (form) {
        form.onsubmit = (e) => {
            e.preventDefault();
            const mastheadTitle = titleInput ? titleInput.value.trim() : "ANR DAILY NEWS";
            const volNo = volInput ? volInput.value.trim() : "VOL. CXXIV NO. 42";
            const price = priceInput ? priceInput.value.trim() : "PRICE: ONE BIT";
            const est = estInput ? estInput.value.trim() : "EST. 1902";

            const settings = { mastheadTitle, volNo, price, est };
            setEditorialSettings(settings);
            
            if (typeof onEditorialUpdatedCallback === "function") {
                onEditorialUpdatedCallback(settings);
            }
            showToast("MASTHEAD SETTINGS SAVED");
        };
    }

    if (resetBtn) {
        resetBtn.onclick = () => {
            setEditorialSettings(null);
            if (titleInput) titleInput.value = "ANR DAILY NEWS";
            if (volInput) volInput.value = "VOL. CXXIV NO. 42";
            if (priceInput) priceInput.value = "PRICE: ONE BIT";
            if (estInput) estInput.value = "EST. 1902";
            
            if (typeof onEditorialUpdatedCallback === "function") {
                onEditorialUpdatedCallback(null);
            }
            showToast("MASTHEAD RESTORED TO DEFAULT");
        };
    }
}

function setupBulletinsManager() {
    const newBulletinInput = document.getElementById("admin-new-bulletin-input");
    const addBulletinBtn = document.getElementById("admin-add-bulletin-btn");
    const bulletinsContainer = document.getElementById("admin-bulletins-list");

    const renderManagerList = () => {
        if (!bulletinsContainer) return;
        const bulletins = getTickerBulletins() || [
            "STOCK TICKER REPLACED BY NEURAL INTENT PRICING ACROSS CONTINENTS.",
            "NEW ZEPPELIN ROUTE ESTABLISHED BETWEEN FRANKFURT AND TOKYO.",
            "OFFLINE-FIRST WEB ARCHITECTURES SURPASS CLOUD PLATFORMS IN USER RETENTION."
        ];

        bulletinsContainer.innerHTML = bulletins.map((b, i) => `
            <div class="admin-bulletin-item" style="display:flex; justify-content:space-between; align-items:center; padding:0.4rem; border-bottom:1px solid var(--border-light);">
                <span class="mono-text text-sm">${i + 1}. ${b}</span>
                <button type="button" class="bulletin-delete-btn mono-text" data-idx="${i}" style="color:var(--accent-red, #b00); background:none; border:none; cursor:pointer;">✕</button>
            </div>
        `).join("");

        bulletinsContainer.querySelectorAll(".bulletin-delete-btn").forEach(btn => {
            btn.onclick = () => {
                const idx = parseInt(btn.getAttribute("data-idx"), 10);
                const current = getTickerBulletins() || bulletins;
                current.splice(idx, 1);
                setTickerBulletins(current);
                renderManagerList();
                if (typeof onEditorialUpdatedCallback === "function") {
                    onEditorialUpdatedCallback();
                }
                showToast("BULLETIN ALERT REMOVED");
            };
        });
    };

    if (addBulletinBtn && newBulletinInput) {
        addBulletinBtn.onclick = () => {
            const val = newBulletinInput.value.trim().toUpperCase();
            if (!val) return;

            const current = getTickerBulletins() || [];
            current.unshift(val);
            setTickerBulletins(current);
            newBulletinInput.value = "";
            renderManagerList();

            if (typeof onEditorialUpdatedCallback === "function") {
                onEditorialUpdatedCallback();
            }
            showToast("NEW LIVE BULLETIN BROADCASTED");
        };
    }

    renderManagerList();
}
