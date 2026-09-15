/**
 * The Daily Chronograph - Live News Ticker Controller
 * Continuous marquee of latest flashes, financial spot values, and custom telegrams.
 */

import { TICKER_ITEMS_EN, TICKER_ITEMS_KM } from '../data/bulletins-db.js';
import { getTickerBulletins } from '../data/storage.js';

let currentLanguage = "en";

export function initTicker(lang = "en") {
    currentLanguage = lang;
    renderTickerFeed();
}

export function updateTickerLanguage(lang) {
    currentLanguage = lang;
    renderTickerFeed();
}

export function renderTickerFeed() {
    const tickerContent = document.getElementById("ticker-content");
    if (!tickerContent) return;

    const customBulletins = getTickerBulletins();
    let items = currentLanguage === "km" ? [...TICKER_ITEMS_KM] : [...TICKER_ITEMS_EN];

    if (customBulletins && customBulletins.length > 0) {
        items = [...customBulletins, ...items];
    }

    tickerContent.innerHTML = items.join(" &nbsp;&bull;&nbsp; ") + " &nbsp;&bull;&nbsp; " + items.join(" &nbsp;&bull;&nbsp; ");
}
