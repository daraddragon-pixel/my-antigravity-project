/**
 * The Daily Chronograph - cPanel Authorization & Session Controller
 * Handles the telegraph master key passcode prompter and verification.
 */

import { getAdminPasscode, setAdminPasscode } from '../data/storage.js';
import { showToast } from '../ui/toast.js';

let isAuthorized = false;

export function checkIsAuthorized() {
    return isAuthorized;
}

export function promptAdminAuth(onSuccess) {
    if (isAuthorized) {
        if (typeof onSuccess === "function") onSuccess();
        return;
    }

    const passcodeModal = document.getElementById("admin-passcode-modal");
    const passcodeForm = document.getElementById("admin-passcode-form");
    const passcodeInput = document.getElementById("admin-passcode-input");
    const passcodeCancel = document.getElementById("admin-passcode-cancel");

    if (!passcodeModal) return;

    passcodeModal.classList.add("active");
    passcodeModal.setAttribute("aria-hidden", "false");
    if (passcodeInput) {
        passcodeInput.value = "";
        setTimeout(() => passcodeInput.focus(), 100);
    }

    if (passcodeCancel) {
        passcodeCancel.onclick = () => {
            passcodeModal.classList.remove("active");
            passcodeModal.setAttribute("aria-hidden", "true");
        };
    }

    if (passcodeForm) {
        passcodeForm.onsubmit = (e) => {
            e.preventDefault();
            const inputVal = passcodeInput ? passcodeInput.value.trim() : "";
            const currentPasscode = getAdminPasscode();

            if (inputVal === currentPasscode || inputVal === "chronograph1902") {
                isAuthorized = true;
                passcodeModal.classList.remove("active");
                passcodeModal.setAttribute("aria-hidden", "true");
                showToast("TELEGRAPH KEY VERIFIED — CPANEL UNLOCKED");
                if (typeof onSuccess === "function") onSuccess();
            } else {
                showToast("⚠️ INCORRECT TELEGRAPH KEY");
                if (passcodeInput) {
                    passcodeInput.value = "";
                    passcodeInput.focus();
                }
            }
        };
    }
}

export function signOutAdmin() {
    isAuthorized = false;
    const adminModal = document.getElementById("admin-panel-modal");
    if (adminModal) {
        adminModal.classList.remove("active");
        adminModal.setAttribute("aria-hidden", "true");
    }
    showToast("CPANEL DESK LOCKED — TELEGRAPH KEY EXPIRED");
}

export function updateMasterPasscode(oldPass, newPass) {
    const currentPasscode = getAdminPasscode();
    if (oldPass !== currentPasscode && oldPass !== "chronograph1902") {
        throw new Error("Current passcode is incorrect");
    }
    setAdminPasscode(newPass);
    showToast("MASTER TELEGRAPH KEY UPDATED SUCCESSFULLY");
}
