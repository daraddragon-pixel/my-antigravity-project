/**
 * The Daily Chronograph - Firebase Cloud Firestore Synchronization
 * Enables multi-device publishing and real-time cloud sync.
 */

import { getFirebaseConfig, setFirebaseConfig, removeFirebaseConfig, getCustomArticles, getEditorialSettings, getTickerBulletins } from './storage.js';
import { getArticles } from './articles-db.js';

let firestoreDb = null;
let isFirebaseConnected = false;
let unsubscribeFirestoreArticles = null;
let unsubscribeFirestoreSettings = null;

/**
 * Robust Firebase Config Parser (Supports JSON, JS objects, const config = { ... })
 */
export function parseFirebaseConfig(raw) {
    if (!raw || typeof raw !== "string") return null;
    const str = raw.trim();

    // 1. Try pure JSON parse first
    try {
        const parsed = JSON.parse(str);
        if (parsed && typeof parsed === "object" && (parsed.apiKey || parsed.projectId)) {
            return parsed;
        }
    } catch (e) {}

    // 2. Extract object block { ... } if wrapped in code / variable declaration / script tag
    const firstBrace = str.indexOf('{');
    const lastBrace = str.lastIndexOf('}');
    if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
        const objText = str.substring(firstBrace, lastBrace + 1);
        
        // Try JS Function evaluation on object literal
        try {
            const evaluated = new Function(`"use strict"; return (${objText});`)();
            if (evaluated && typeof evaluated === "object" && (evaluated.apiKey || evaluated.projectId)) {
                return evaluated;
            }
        } catch (e) {}

        // Try regex cleaning for standard JSON
        try {
            const cleaned = objText
                .replace(/\/\*[\s\S]*?\*\/|([^:]|^)\/\/.*$/gm, '$1') // remove comments
                .replace(/,\s*}/g, '}') // remove trailing commas
                .replace(/([a-zA-Z0-9_$]+)\s*:/g, '"$1":') // quote keys
                .replace(/'([^']*)'/g, '"$1"'); // replace single quotes with double quotes
            const parsedCleaned = JSON.parse(cleaned);
            if (parsedCleaned && (parsedCleaned.apiKey || parsedCleaned.projectId)) {
                return parsedCleaned;
            }
        } catch (e) {}
    }

    // 3. Fallback direct Regex extraction of known Firebase properties
    const extractField = (name) => {
        const match = str.match(new RegExp(`['"]?${name}['"]?\\s*:\\s*['"]([^'"]+)['"]`, 'i'));
        return match ? match[1].trim() : undefined;
    };

    const apiKey = extractField('apiKey');
    const authDomain = extractField('authDomain');
    const projectId = extractField('projectId');
    const storageBucket = extractField('storageBucket');
    const messagingSenderId = extractField('messagingSenderId');
    const appId = extractField('appId');
    const measurementId = extractField('measurementId');

    if (apiKey || projectId) {
        const res = {};
        if (apiKey) res.apiKey = apiKey;
        if (authDomain) res.authDomain = authDomain;
        if (projectId) res.projectId = projectId;
        if (storageBucket) res.storageBucket = storageBucket;
        if (messagingSenderId) res.messagingSenderId = messagingSenderId;
        if (appId) res.appId = appId;
        if (measurementId) res.measurementId = measurementId;
        return res;
    }

    return null;
}

/**
 * Initializes Firebase Firestore from saved configuration
 */
export function initFirebaseCloud(onSyncCallback) {
    const rawConfig = getFirebaseConfig();
    const statusBadge = document.getElementById("cloud-status-badge");
    const configInput = document.getElementById("admin-firebase-config-input");

    if (configInput && rawConfig && !configInput.value) {
        configInput.value = typeof rawConfig === "string" ? rawConfig : JSON.stringify(rawConfig, null, 2);
    }

    if (!rawConfig || typeof firebase === "undefined") {
        if (statusBadge) {
            statusBadge.innerHTML = "⚪ LOCALSTORAGE MODE";
            statusBadge.style.color = "var(--ink-black)";
        }
        return;
    }

    try {
        const config = typeof rawConfig === "string" ? parseFirebaseConfig(rawConfig) : rawConfig;

        if (config && (config.apiKey || config.projectId)) {
            if (!firebase.apps || !firebase.apps.length) {
                firebase.initializeApp(config);
            }
            firestoreDb = firebase.firestore();
            isFirebaseConnected = true;

            if (statusBadge) {
                statusBadge.innerHTML = "🟢 CLOUD SYNC ACTIVE (FIRESTORE)";
                statusBadge.style.color = "#008000";
            }

            listenToCloudData(onSyncCallback);
        } else {
            throw new Error("Unable to parse valid Firebase config keys");
        }
    } catch (err) {
        console.warn("Firebase initialization skipped / format error:", err);
        if (statusBadge) {
            statusBadge.innerHTML = "⚠️ CONFIG ERROR (FALLBACK LOCAL)";
            statusBadge.style.color = "#d97706";
        }
    }
}

/**
 * Listens for real-time article and editorial updates from Firestore
 */
export function listenToCloudData(onSyncCallback) {
    if (!firestoreDb) return;

    // Listen to real-time dispatches
    if (unsubscribeFirestoreArticles) unsubscribeFirestoreArticles();
    unsubscribeFirestoreArticles = firestoreDb.collection("dispatches").onSnapshot(snapshot => {
        const cloudArticles = [];
        snapshot.forEach(doc => {
            cloudArticles.push(doc.data());
        });

        if (cloudArticles.length > 0 && typeof onSyncCallback === "function") {
            onSyncCallback(cloudArticles);
        }
    }, err => {
        console.warn("Firestore realtime sync notice:", err);
    });
}

/**
 * Batch-pushes all current articles and settings to Firestore
 */
export async function pushLocalToCloud() {
    if (!isFirebaseConnected || !firestoreDb) {
        throw new Error("Please connect Firebase first before pushing data.");
    }

    const allArticles = getArticles();
    const batch = firestoreDb.batch();

    allArticles.forEach(art => {
        const docRef = firestoreDb.collection("dispatches").doc(art.id);
        batch.set(docRef, art, { merge: true });
    });

    await batch.commit();

    const editorialSettings = getEditorialSettings() || {
        mastheadTitle: "ANR DAILY NEWS",
        volNo: "VOL. CXXIV NO. 42",
        price: "PRICE: ONE BIT",
        est: "EST. 1902"
    };

    const tickerBulletins = getTickerBulletins() || [
        "STOCK TICKER REPLACED BY NEURAL INTENT PRICING ACROSS CONTINENTS.",
        "NEW ZEPPELIN ROUTE ESTABLISHED BETWEEN FRANKFURT AND TOKYO.",
        "OFFLINE-FIRST WEB ARCHITECTURES SURPASS CLOUD PLATFORMS IN USER RETENTION."
    ];

    await firestoreDb.collection("site_meta").doc("editorial").set({
        ...editorialSettings,
        tickerBulletins,
        updatedAt: Date.now()
    }, { merge: true });

    return allArticles.length;
}

/**
 * Disconnects Firebase Firestore connection
 */
export function disconnectFirebase() {
    if (unsubscribeFirestoreArticles) {
        unsubscribeFirestoreArticles();
        unsubscribeFirestoreArticles = null;
    }
    if (unsubscribeFirestoreSettings) {
        unsubscribeFirestoreSettings();
        unsubscribeFirestoreSettings = null;
    }
    removeFirebaseConfig();
    firestoreDb = null;
    isFirebaseConnected = false;

    const statusBadge = document.getElementById("cloud-status-badge");
    if (statusBadge) {
        statusBadge.innerHTML = "⚪ LOCALSTORAGE MODE";
        statusBadge.style.color = "var(--ink-black)";
    }
}

export function getIsFirebaseConnected() {
    return isFirebaseConnected;
}

export function getFirestoreDb() {
    return firestoreDb;
}
