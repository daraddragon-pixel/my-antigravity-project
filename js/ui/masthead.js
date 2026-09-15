/**
 * The Daily Chronograph - Masthead & Live Clock Controller
 * Handles dateline updates, Khmer numbers translation, and weather stamp.
 */

import { getEditorialSettings } from '../data/storage.js';
import { WEATHER_DESCRIPTIONS } from '../data/bulletins-db.js';
import { TRANSLATIONS } from '../data/translations.js';
import { showToast } from './toast.js';

let clockInterval = null;
let currentLanguage = "en";

export function initMasthead(lang = "en") {
    currentLanguage = lang;
    initClock();
    initWeather();
    renderEditorialSettings();
}

export function updateMastheadLanguage(lang) {
    currentLanguage = lang;
    renderEditorialSettings();
}

export function renderEditorialSettings() {
    const custom = getEditorialSettings();
    const t = TRANSLATIONS[currentLanguage];

    const titleEl = document.getElementById("masthead-title-text");
    const volEl = document.getElementById("masthead-vol");
    const priceEl = document.getElementById("masthead-price");
    const estEl = document.getElementById("masthead-est");

    if (custom) {
        if (titleEl && custom.mastheadTitle) titleEl.innerHTML = custom.mastheadTitle;
        if (volEl && custom.volNo) volEl.textContent = custom.volNo;
        if (priceEl && custom.price) priceEl.textContent = custom.price;
        if (estEl && custom.est) estEl.textContent = custom.est;
    } else {
        if (titleEl) titleEl.innerHTML = t.mastheadTitle;
        if (volEl) volEl.textContent = t.volNo;
        if (priceEl) priceEl.textContent = t.price;
        if (estEl) estEl.textContent = t.est;
    }
}

function initClock() {
    if (clockInterval) clearInterval(clockInterval);

    const liveTimeEl = document.getElementById("live-time");
    if (!liveTimeEl) return;

    const updateTime = () => {
        const now = new Date();
        const daysEn = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];
        const monthsEn = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"];
        
        const daysKm = ["ថ្ងៃអាទិត្យ", "ថ្ងៃច័ន្ទ", "ថ្ងៃអង្គារ", "ថ្ងៃពុធ", "ថ្ងៃព្រហស្បតិ៍", "ថ្ងៃសុក្រ", "ថ្ងៃសៅរ៍"];
        const monthsKm = ["មករា", "កុម្ភៈ", "មីនា", "មេសា", "ឧសភា", "មិថុនា", "កក្កដា", "សីហា", "កញ្ញា", "តុលា", "វិច្ឆិកា", "ធ្នូ"];

        const isKm = currentLanguage === "km";
        const days = isKm ? daysKm : daysEn;
        const months = isKm ? monthsKm : monthsEn;

        const dayName = days[now.getDay()];
        const monthName = months[now.getMonth()];
        const date = now.getDate();
        const year = now.getFullYear();

        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');

        if (isKm) {
            const khmerDigits = ["០", "១", "២", "៣", "៤", "៥", "៦", "៧", "៨", "៩"];
            const toKhmerNum = (numStr) => numStr.toString().split("").map(c => khmerDigits[c] || c).join("");
            const timeStr = `${toKhmerNum(hours)}:${toKhmerNum(minutes)}:${toKhmerNum(seconds)}`;
            liveTimeEl.textContent = `${dayName}, ថ្ងៃទី ${toKhmerNum(date)} ខែ ${monthName} ឆ្នាំ ${toKhmerNum(year)} — ${timeStr}`;
        } else {
            liveTimeEl.textContent = `${dayName}, ${monthName} ${date}, ${year} — ${hours}:${minutes}:${seconds}`;
        }
    };

    updateTime();
    clockInterval = setInterval(updateTime, 1000);
}

function initWeather() {
    const cityInput = document.getElementById("weather-city");
    const cityBtn = document.getElementById("weather-city-btn");

    const updateWeatherCity = () => {
        const city = cityInput ? cityInput.value.trim() : "";
        if (!city) return;

        const randomWeather = WEATHER_DESCRIPTIONS[Math.floor(Math.random() * WEATHER_DESCRIPTIONS.length)];
        const weatherData = randomWeather[currentLanguage] || randomWeather.en;
        const t = TRANSLATIONS[currentLanguage];

        const tempEl = document.getElementById("widget-temp");
        const descEl = document.getElementById("widget-desc");
        const topWidget = document.getElementById("weather-widget");

        if (tempEl) tempEl.textContent = weatherData.temp;
        if (descEl) descEl.textContent = weatherData.desc;
        if (topWidget) topWidget.innerHTML = `${city.toUpperCase()} ${weatherData.temp} <span class="weather-icon">${t.weatherIconCloud}</span>`;

        showToast(`${t.weatherUpdate} ${city.toUpperCase()}`);
    };

    if (cityBtn) cityBtn.onclick = updateWeatherCity;
    if (cityInput) {
        cityInput.onkeypress = (e) => {
            if (e.key === "Enter") updateWeatherCity();
        };
    }
}
