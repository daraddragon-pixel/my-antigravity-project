/**
 * The Daily Chronograph - cPanel Editorial Desk Orchestrator
 * Coordinates all tabs: Posts, Editorial, Ads, Media, and Security.
 */

import { promptAdminAuth, signOutAdmin } from './admin-auth.js';
import { initPostEditor, renderAdminPostsList } from './post-editor.js';
import { initAdsManager } from './ads-manager.js';
import { initTickerManager } from './ticker-manager.js';
import { initBackupRestore } from './backup-restore.js';
import { PRESET_MEDIA_ASSETS } from '../data/bulletins-db.js';
import { showToast } from '../ui/toast.js';

export function initCPanelDesk(callbacks = {}) {
    setupHeaderButtons();
    setupTabSwitching();
    setupMediaTab();

    initPostEditor(callbacks.onArticlesMutated);
    initAdsManager();
    initTickerManager(callbacks.onEditorialUpdated);
    initBackupRestore(callbacks.onDatabaseRestored);

    // Make global methods available for HTML onclick triggers
    window.openAdminPanel = () => {
        promptAdminAuth(() => {
            const adminModal = document.getElementById("admin-panel-modal");
            if (adminModal) {
                adminModal.classList.add("active");
                adminModal.setAttribute("aria-hidden", "false");
                renderAdminPostsList();
            }
        });
    };

    window.closeAdminPanel = () => {
        const adminModal = document.getElementById("admin-panel-modal");
        if (adminModal) {
            adminModal.classList.remove("active");
            adminModal.setAttribute("aria-hidden", "true");
        }
    };

    window.signOutAdminPanel = () => {
        signOutAdmin();
    };
}

function setupHeaderButtons() {
    const headerBtn = document.getElementById("cpanel-header-btn");
    if (headerBtn) {
        headerBtn.onclick = () => {
            window.openAdminPanel();
        };
    }
}

function setupTabSwitching() {
    const tabButtons = Array.from(document.querySelectorAll(".admin-tab-btn"));
    const tabContents = Array.from(document.querySelectorAll(".admin-tab-content"));

    tabButtons.forEach(btn => {
        btn.onclick = () => {
            const targetId = btn.getAttribute("data-tab");
            
            tabButtons.forEach(b => {
                b.classList.remove("active");
                b.setAttribute("aria-selected", "false");
            });
            tabContents.forEach(c => {
                c.classList.remove("active");
            });

            btn.classList.add("active");
            btn.setAttribute("aria-selected", "true");

            const targetContent = document.getElementById(targetId);
            if (targetContent) {
                targetContent.classList.add("active");
            }

            if (targetId === "tab-posts") {
                renderAdminPostsList();
            }
        };
    });
}

function setupMediaTab() {
    const grid = document.getElementById("admin-media-preset-grid");
    const testUrlInput = document.getElementById("admin-media-test-url");
    const testBtn = document.getElementById("admin-media-test-btn");
    const useBtn = document.getElementById("admin-media-use-btn");
    const previewBox = document.getElementById("admin-media-test-preview");
    const previewImg = document.getElementById("admin-media-preview-img");

    if (grid) {
        grid.innerHTML = PRESET_MEDIA_ASSETS.map(asset => `
            <div class="preset-media-item" data-url="${asset.url}" style="border:1px solid var(--border-color); padding:0.4rem; cursor:pointer; text-align:center; background:var(--paper-bg);">
                <img src="${asset.url}" alt="${asset.name}" style="width:100%; height:70px; object-fit:cover; filter:grayscale(1);">
                <span class="mono-text text-sm" style="display:block; margin-top:0.3rem; font-size:0.75rem;">${asset.name}</span>
            </div>
        `).join("");

        grid.querySelectorAll(".preset-media-item").forEach(item => {
            item.onclick = () => {
                const url = item.getAttribute("data-url");
                const postImageInput = document.getElementById("admin-post-image");
                if (postImageInput) {
                    postImageInput.value = url;
                    showToast(`IMAGE "${url}" APPLIED TO POST FORM`);
                }
            };
        });
    }

    if (testBtn && testUrlInput && previewBox && previewImg) {
        testBtn.onclick = () => {
            const url = testUrlInput.value.trim();
            if (!url) return;
            previewImg.src = url;
            previewBox.style.display = "block";
        };
    }

    if (useBtn && testUrlInput) {
        useBtn.onclick = () => {
            const url = testUrlInput.value.trim();
            const postImageInput = document.getElementById("admin-post-image");
            if (postImageInput && url) {
                postImageInput.value = url;
                showToast("CUSTOM IMAGE APPLIED TO POST FORM");
            }
        };
    }
}
