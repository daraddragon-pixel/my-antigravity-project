/**
 * The Daily Chronograph - cPanel Vintage Ads Manager
 * Handles configuring and rendering custom left and right sidebar advertising blocks.
 */

import { getCustomAds, setCustomAds } from '../data/storage.js';
import { TRANSLATIONS } from '../data/translations.js';
import { showToast } from '../ui/toast.js';

export function initAdsManager() {
    const adsForm = document.getElementById("admin-ads-form");
    const leftTextarea = document.getElementById("admin-ad-left");
    const rightTextarea = document.getElementById("admin-ad-right");
    const clearBtn = document.getElementById("admin-ads-clear-btn");

    const currentAds = getCustomAds();
    if (leftTextarea) leftTextarea.value = currentAds.left || "";
    if (rightTextarea) rightTextarea.value = currentAds.right || "";

    if (adsForm) {
        adsForm.onsubmit = (e) => {
            e.preventDefault();
            const left = leftTextarea ? leftTextarea.value.trim() : "";
            const right = rightTextarea ? rightTextarea.value.trim() : "";

            setCustomAds({ left, right });
            renderCustomAds();
            showToast("ADVERTISING SLOTS UPDATED");
        };
    }

    if (clearBtn) {
        clearBtn.onclick = () => {
            if (leftTextarea) leftTextarea.value = "";
            if (rightTextarea) rightTextarea.value = "";
            setCustomAds({ left: "", right: "" });
            renderCustomAds();
            showToast("CUSTOM ADS CLEARED — DEFAULT RESTORED");
        };
    }

    renderCustomAds();
}

export function renderCustomAds(currentLanguage = "en") {
    const leftContainer = document.getElementById("left-ad-container");
    const rightContainer = document.getElementById("right-ad-container");
    const savedAds = getCustomAds();
    const t = TRANSLATIONS[currentLanguage] || TRANSLATIONS.en;

    if (leftContainer) {
        if (savedAds.left && savedAds.left.trim() !== "") {
            leftContainer.innerHTML = savedAds.left;
        } else {
            leftContainer.innerHTML = `
                <div class="vintage-ad">
                    <div class="ad-border">
                        <p class="ad-title mono-text" id="ad-title-text">${t.adTitle}</p>
                        <p class="ad-body" id="ad-body-text">${t.adBody}</p>
                        <span class="ad-sub" id="ad-sub-text">${t.adSub}</span>
                    </div>
                </div>
            `;
        }
    }

    if (rightContainer) {
        if (savedAds.right && savedAds.right.trim() !== "") {
            rightContainer.innerHTML = savedAds.right;
        } else {
            rightContainer.innerHTML = "";
        }
    }
}
