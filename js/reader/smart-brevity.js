/**
 * The Daily Chronograph - Smart Brevity & Executive Summary Engine
 * Generates 30-second bulleted takeaways to combat reader fatigue.
 */

import { TRANSLATIONS } from '../data/translations.js';

export function renderSmartBrevityCard(article, currentLanguage = "en") {
    const t = TRANSLATIONS[currentLanguage];
    const contentLang = article[currentLanguage] || article.en;
    
    // Check if custom keyTakeaways exist or generate from preview + content
    let takeaways = article.keyTakeaways;
    if (!takeaways || takeaways.length === 0) {
        // Fallback: create structured points from preview sentences
        const isKm = currentLanguage === "km";
        const delimiter = isKm ? "។" : ".";
        const sentences = (contentLang.preview || "").split(delimiter).filter(s => s.trim().length > 10);
        takeaways = sentences.length > 0 ? sentences.map(s => s.trim()) : [contentLang.preview];
    }

    return `
        <div class="smart-brevity-card">
            <div class="brevity-header">
                <span class="brevity-badge mono-text">${t.smartBrevity.tabBriefing}</span>
                <span class="brevity-title-label mono-text">${t.smartBrevity.keyTakeaways}</span>
            </div>
            <ul class="brevity-list">
                ${takeaways.map(point => `<li><strong>${currentLanguage === "km" ? "• " : "• "}</strong>${point}</li>`).join("")}
            </ul>
        </div>
    `;
}
