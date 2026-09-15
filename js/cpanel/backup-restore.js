/**
 * The Daily Chronograph - cPanel Backup, Restore & Security
 * Handles database export, snapshot restoration, factory reset, and Firebase Cloud actions.
 */

import { exportDatabaseSnapshot, importDatabaseSnapshot, factoryResetDatabase, setFirebaseConfig } from '../data/storage.js';
import { updateMasterPasscode } from './admin-auth.js';
import { initFirebaseCloud, disconnectFirebase, pushLocalToCloud, parseFirebaseConfig } from '../data/firebase-sync.js';
import { showToast } from '../ui/toast.js';

export function initBackupRestore(onResetOrRestore) {
    setupBackupUI(onResetOrRestore);
    setupSecurityForm();
    setupFirebaseCloudUI();
}

function setupBackupUI(onResetOrRestore) {
    const backupBtn = document.getElementById("admin-backup-btn");
    const restoreBtn = document.getElementById("admin-restore-btn");
    const factoryResetBtn = document.getElementById("admin-factory-reset-btn");
    const backupTextarea = document.getElementById("admin-backup-data");

    if (backupBtn) {
        backupBtn.onclick = () => {
            const snapshot = exportDatabaseSnapshot();
            const jsonStr = JSON.stringify(snapshot, null, 2);
            if (backupTextarea) {
                backupTextarea.value = jsonStr;
                backupTextarea.select();
                navigator.clipboard.writeText(jsonStr).then(() => {
                    showToast("SNAPSHOT COPIED TO CLIPBOARD");
                }).catch(() => {
                    showToast("SNAPSHOT GENERATED IN TEXTAREA");
                });
            }
        };
    }

    if (restoreBtn) {
        restoreBtn.onclick = () => {
            if (!backupTextarea || !backupTextarea.value.trim()) {
                alert("Please paste the backup JSON block first into the textarea.");
                return;
            }
            try {
                const snapshotObj = JSON.parse(backupTextarea.value.trim());
                importDatabaseSnapshot(snapshotObj);
                if (typeof onResetOrRestore === "function") {
                    onResetOrRestore();
                }
                showToast("COMPLETE DATABASE RESTORED SUCCESSFULLY");
            } catch (err) {
                console.error("Restore failed:", err);
                alert("Error parsing backup JSON: " + err.message);
            }
        };
    }

    if (factoryResetBtn) {
        factoryResetBtn.onclick = () => {
            const confirmed = confirm("⚠️ DANGER: Are you sure you want to perform a FACTORY RESET?\nThis will erase all custom articles, custom ads, and ticker alerts!");
            if (confirmed) {
                const secondConfirm = confirm("FINAL CONFIRMATION: Reset all records to original seed state?");
                if (secondConfirm) {
                    factoryResetDatabase();
                    if (typeof onResetOrRestore === "function") {
                        onResetOrRestore();
                    }
                    showToast("FACTORY RESET COMPLETED");
                }
            }
        };
    }
}

function setupSecurityForm() {
    const form = document.getElementById("admin-passcode-change-form");
    const currentInput = document.getElementById("admin-current-passcode");
    const newInput = document.getElementById("admin-new-passcode");
    const confirmInput = document.getElementById("admin-confirm-passcode");

    if (form) {
        form.onsubmit = (e) => {
            e.preventDefault();
            const cur = currentInput ? currentInput.value.trim() : "";
            const nxt = newInput ? newInput.value.trim() : "";
            const conf = confirmInput ? confirmInput.value.trim() : "";

            if (!cur || !nxt) {
                alert("Please fill in both current and new passcodes.");
                return;
            }
            if (nxt !== conf) {
                alert("New passcode and confirmation do not match.");
                return;
            }

            try {
                updateMasterPasscode(cur, nxt);
                form.reset();
            } catch (err) {
                alert(err.message);
            }
        };
    }
}

function setupFirebaseCloudUI() {
    const saveBtn = document.getElementById("admin-firebase-save-btn");
    const pushBtn = document.getElementById("admin-firebase-push-btn");
    const disconnectBtn = document.getElementById("admin-firebase-disconnect-btn");
    const configInput = document.getElementById("admin-firebase-config-input");

    if (saveBtn && configInput) {
        saveBtn.onclick = () => {
            const rawVal = configInput.value.trim();
            if (!rawVal) {
                alert("Please paste your Firebase Config block first.");
                return;
            }
            const parsed = parseFirebaseConfig(rawVal);
            if (!parsed) {
                alert("Could not parse valid Firebase keys. Ensure apiKey and projectId are present.");
                return;
            }
            setFirebaseConfig(parsed);
            initFirebaseCloud();
            showToast("CONNECTED & SAVED FIREBASE CLOUD CONFIG");
        };
    }

    if (pushBtn) {
        pushBtn.onclick = async () => {
            try {
                const count = await pushLocalToCloud();
                showToast(`🔥 SUCCESS: ${count} ARTICLES & SETTINGS PUSHED TO CLOUD!`);
            } catch (err) {
                alert(err.message);
            }
        };
    }

    if (disconnectBtn) {
        disconnectBtn.onclick = () => {
            disconnectFirebase();
            if (configInput) configInput.value = "";
            showToast("DISCONNECTED FROM FIREBASE CLOUD");
        };
    }
}
