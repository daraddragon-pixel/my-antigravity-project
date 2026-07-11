/**
 * The Daily Chronograph - Core Application Logic
 * Interactive newspaper operations, bookmarking, searching, speech synthesis, and animations.
 */

// --- Article Mock Database ---
const ARTICLES_DB = [
    {
        id: "hero-1",
        category: "technology",
        title: "The Rise of the Silicon Telegraph",
        subTitle: "How Autonomous Agent Networks are Re-wiring the Global Communication Grid",
        author: "ALEXIS VANCE",
        date: "JULY 11, 2026",
        wordCount: "1,200 WORDS",
        readTime: "5 MIN READ",
        preview: "In an era saturated with high-speed fiber lines and chaotic social algorithms, an unexpected shift is occurring. Developers and theorists are looking backward, constructing a simplified, high-integrity 'Silicon Telegraph' run entirely by autonomous agent networks...",
        content: `
            <p class="lead">In an era saturated with high-speed fiber lines and chaotic social algorithms, an unexpected shift is occurring. Developers and theorists are looking backward, constructing a simplified, high-integrity "Silicon Telegraph" run entirely by autonomous agent networks.</p>
            <p>For decades, the internet expanded under the assumption that more bandwidth, higher frame rates, and louder notifications equated to human progress. Yet, the resulting digital landscape has grown increasingly noisy, fragmented, and vulnerable to systemic failures. Enter the Silicon Telegraph: a modern protocol that strip-mines the clutter, returning to asynchronous, low-bandwidth, semantic exchanges.</p>
            <div class="modal-img-wrap">
                <img src="assets/images/silicon_telegraph.png" alt="Silicon Telegraph Illustration">
            </div>
            <p>At its core, this telegraphic web does not transfer bloated video files or tracking scripts. Instead, it transmits raw semantic intents. Autonomous artificial agents coordinate transactions, resolve complex logical queries, and write summarized news dispatches directly to client screens using compact textual scripts. The user experience is reminiscent of late-nineteenth-century newsprint: clean, static, and deeply analytical.</p>
            <p>Critics argue that removing multimedia components limits accessibility and richness. However, proponents like Dr. Clara Sterling of the Zurich Institute of Decelerated Media believe otherwise: "We don't need fewer pixels; we need more focus. By encoding transactions in simple text frames, we prevent the attention-hacking mechanics that dominate modern software. We let the mind digest information instead of constantly reacting to it."</p>
            <p>It remains to be seen whether the general public will trade their dopamine-inducing feeds for the quiet rustle of the digital newsprint, but for a growing faction of engineers, researchers, and writers, the Silicon Telegraph represents the only path forward out of the digital wilderness.</p>
        `,
        image: "assets/images/silicon_telegraph.png"
    },
    {
        id: "world-1",
        category: "world",
        title: "Zeppelin Cargo Routes Re-open",
        subTitle: "Decarbonizing Logistics via the Stratosphere",
        author: "H. G. WELLS JR.",
        date: "JULY 10, 2026",
        wordCount: "850 WORDS",
        readTime: "4 MIN READ",
        preview: "The global logistics industry has taken a colossal step backward—and upward. The first fleet of solar-hydrogen freight airships took off from Frankfurt yesterday, carrying heavy electronic components destined for Tokyo...",
        content: `
            <p class="lead">The global logistics industry has taken a colossal step backward—and upward. The first fleet of solar-hydrogen freight airships took off from Frankfurt yesterday, carrying heavy electronic components destined for Tokyo.</p>
            <p>As maritime shipping channels face increasing climate-induced disruptions and high carbon levies, logistics giants are reviving a relic of the early 20th century. Modern zeppelins, equipped with lightweight solar panel membranes and non-flammable hydrogen-helium mixtures, are proving to be exceptionally efficient heavy-lifters.</p>
            <div class="modal-img-wrap">
                <img src="assets/images/zeppelin_routes.png" alt="Zeppelin Freighter illustration">
            </div>
            <p>While a container ship requires weeks to traverse ocean routes, and cargo planes consume enormous quantities of fossil fuels, these stratospheric giants cruise silently at 150 kilometers per hour. Operating on solar energy during the day and gravity-adjusting ballast control systems, they emit zero carbon emissions.</p>
            <p>"We are not racing," says shipping operator Marcus Thorne. "We are establishing a steady, predictable conveyor belt in the skies. It's a return to slow, clean, high-capacity transport."</p>
        `,
        image: "assets/images/zeppelin_routes.png"
    },
    {
        id: "tech-2",
        category: "technology",
        title: "The Inevitable Return to Monospace",
        subTitle: "Standardized Terminals Capture Developer Focus",
        author: "C. J. STROUD",
        date: "JULY 09, 2026",
        wordCount: "620 WORDS",
        readTime: "3 MIN READ",
        preview: "In visual design, trends are cyclical. In developer tools, they are brutalist. Standardized monospaced editors are replacing flashy graphical interfaces, as programmers seek maximum speed and zero distraction...",
        content: `
            <p class="lead">In visual design, trends are cyclical. In developer tools, they are brutalist. Standardized monospaced editors are replacing flashy graphical interfaces, as programmers seek maximum speed and zero distraction.</p>
            <p>For years, developers were treated to heavy IDEs, filled with icons, graphs, and multi-colored highlights. But the latest studies in cognitive load indicate that these busy layouts actually impede focus. The solution? A return to raw terminals, command-line interfaces, and monochromatic monospace setups.</p>
            <p>Software development is fundamentally an exercise in writing, reading, and reasoning. The monospaced character set, with its uniform width and predictable grid, respects the developer's cognitive budget. The lack of visual fluff is not a limitation; it is a feature that forces programmers to think clearly and write cleanly.</p>
        `,
        image: "assets/images/monospace_return.png"
    },
    {
        id: "culture-1",
        category: "culture",
        title: "The Rebirth of Vintage Stationery",
        subTitle: "Why the Keyboard Generation is Buying Fountain Pens",
        author: "ELEANOR BRON",
        date: "JULY 08, 2026",
        wordCount: "940 WORDS",
        readTime: "4 MIN READ",
        preview: "Boutique ink sales have spiked by 300 percent this fiscal year. As digital exhaustion peaks, professionals are rediscovering the tactile tactile satisfaction of physical correspondence on heavy, cotton-fiber paper...",
        content: `
            <p class="lead">Boutique ink sales have spiked by 300 percent this fiscal year. As digital exhaustion peaks, professionals are rediscovering the tactile satisfaction of physical correspondence on heavy, cotton-fiber paper.</p>
            <p>There is a unique finality to ink on paper. Unlike a cursor that can delete, edit, or backspace, a pen stroke is a permanent commitment. In a world where everything is editable, temporary, and liquid, physical stationery offers an anchor of solid reality.</p>
            <div class="modal-img-wrap">
                <img src="assets/images/vintage_stationery.png" alt="Stationery illustration">
            </div>
            <p>Writers, engineers, and executives are forming letter-writing clubs, hosting fountain pen assemblies, and sourcing custom paper weights. In doing so, they are not rejecting technology, but establishing boundaries against its encroachment into their personal thoughts.</p>
        `,
        image: "assets/images/vintage_stationery.png"
    },
    {
        id: "opinion-1",
        category: "opinion",
        title: "The Case for Decelerated Media",
        subTitle: "Why Speed is Poison to Truth",
        author: "ARTHUR PENHALIGON",
        date: "JULY 11, 2026",
        wordCount: "750 WORDS",
        readTime: "3 MIN READ",
        preview: "The rush to be first has ruined the ability to be correct. We must slow down our reporting cycles to save public discourse from collapsing into immediate, unverified speculation...",
        content: `
            <p class="lead">The rush to be first has ruined the ability to be correct. We must slow down our reporting cycles to save public discourse from collapsing into immediate, unverified speculation.</p>
            <p>Instantaneous news updates demand instantaneous reactions. We write comments before we read articles; we publish opinions before we check facts. This velocity is profitable for platforms, but toxic to societies. A newspaper should not be a firehose; it should be a curated filter that publishes only after reflection, editing, and deliberate investigation.</p>
        `,
        image: "assets/images/decelerated_media.png"
    },
    {
        id: "opinion-2",
        category: "opinion",
        title: "Machines That Think, Humans That Feel",
        subTitle: "Redefining the Human Edge in a Automated World",
        author: "DR. EMILY CHEN",
        date: "JULY 07, 2026",
        wordCount: "980 WORDS",
        readTime: "4 MIN READ",
        preview: "As artificial intelligence learns to synthesize facts and produce coherent texts, humans must retreat to what we do best: feeling, questioning, and making ethical judgments...",
        content: `
            <p class="lead">As artificial intelligence learns to synthesize facts and produce coherent texts, humans must retreat to what we do best: feeling, questioning, and making ethical judgments.</p>
            <p>If a machine can write a perfect stock report or summary in microseconds, it is foolish to compete with it on raw analytical speed. Instead, the writer's goal must shift toward emotional depth, philosophical nuance, and critical interrogation. The future of journalism belongs not to information compilers, but to human storytellers who can navigate the complex web of moral accountability.</p>
        `,
        image: "assets/images/think_feel.png"
    }
];

// --- Quick Bulletins ---
const BULLETINS = [
    { time: "18:45", text: "GOLD STANDARD INDEX RISES 2.3% IN LATE TRADING." },
    { time: "17:30", text: "LONDON UNDERGROUND ANNOUNCES EXPERIMENTAL STEAM CARRIAGE REMOVAL." },
    { time: "15:10", text: "PARISIAN ARTISTS DEBATE DRAFTING RULES ON MATHEMATICAL DRAWINGS." },
    { time: "12:05", text: "TRANSATLANTIC TELEGRAM CABLE SUFFERS MINOR MAGNETIC INTERFERENCE." },
    { time: "09:00", text: "WEATHER OFFICE PREDICTS DENSE SOOTY MIST OVER THAMES ESTUARY." }
];

// --- Market / News Ticker Feed ---
const TICKER_ITEMS = [
    "DOW JONES NEWS PRINT INDEX... +1.45%",
    "SILVER BULLION SPOT... 24.50s",
    "BTC TELEGRAPHIC NETWORK... VALUE UP",
    "WEATHER WARNING: SEA GALES IN SOUTH CHANNEL",
    "FINE COAL CO. REPORTS STABLE INVENTORY",
    "NEW PAPER MILL OPENS IN MANCHESTER",
    "CABLE CONNECTIVITY CONFIRMED FROM HALIFAX TO VALENTIA"
];

// --- App State ---
let currentCategory = "all";
let searchQuery = "";
let bookmarkedArticles = JSON.parse(localStorage.getItem("chronograph_bookmarks")) || [];
let readerFontSizeMultiplier = 1.0;
let ttsInstance = null;

// --- DOM Elements ---
const articlesGrid = document.getElementById("main-articles-grid");
const bulletinsList = document.getElementById("bulletins-list");
const opinionList = document.getElementById("opinion-list");
const tickerContent = document.getElementById("ticker-content");
const liveTimeEl = document.getElementById("live-time");
const themeToggle = document.getElementById("theme-toggle");
const bookmarkToggleBtn = document.getElementById("bookmark-toggle-btn");
const bookmarkCountEl = document.getElementById("bookmark-count");
const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
const navLinks = document.querySelectorAll(".nav-link");

// Weather Elements
const widgetTemp = document.getElementById("widget-temp");
const widgetDesc = document.getElementById("widget-desc");
const weatherWidgetTop = document.getElementById("weather-widget");
const weatherCityInput = document.getElementById("weather-city");
const weatherCityBtn = document.getElementById("weather-city-btn");

// Newsletter Elements
const newsletterForm = document.getElementById("newsletter-form");
const newsletterEmail = document.getElementById("newsletter-email");
const newsletterStatus = document.getElementById("newsletter-status");
const stampConfirmed = document.getElementById("stamp-confirmed");

// Modal Elements
const articleModal = document.getElementById("article-modal");
const modalArticleContent = document.getElementById("modal-article-content");
const modalClose = document.getElementById("modal-close");
const fontDecBtn = document.getElementById("reader-font-dec");
const fontIncBtn = document.getElementById("reader-font-inc");
const readerTtsBtn = document.getElementById("reader-tts");
const readerBookmarkBtn = document.getElementById("reader-bookmark");
const readerPrintBtn = document.getElementById("reader-print");

// --- Initialization ---
document.addEventListener("DOMContentLoaded", () => {
    initClock();
    initTicker();
    initTheme();
    renderBulletins();
    renderOpinions();
    renderArticles();
    updateBookmarkUI();
    setupEventListeners();
});

// --- Functions ---

// Live clock updates in typewriter style
function initClock() {
    const updateTime = () => {
        const now = new Date();
        const days = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];
        const months = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"];

        const dayName = days[now.getDay()];
        const monthName = months[now.getMonth()];
        const date = now.getDate();
        const year = now.getFullYear();

        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');

        liveTimeEl.textContent = `${dayName}, ${monthName} ${date}, ${year} — ${hours}:${minutes}:${seconds}`;
    };
    updateTime();
    setInterval(updateTime, 1000);
}

// Infinite scrolling news ticker
function initTicker() {
    tickerContent.innerHTML = TICKER_ITEMS.join(" &nbsp;&bull;&nbsp; ") + " &nbsp;&bull;&nbsp; " + TICKER_ITEMS.join(" &nbsp;&bull;&nbsp; ");
}

// Handle retro/dark theme state
function initTheme() {
    const savedTheme = localStorage.getItem("chronograph_theme") || "light";
    document.documentElement.setAttribute("data-theme", savedTheme);
    updateThemeButtonText(savedTheme);
}

function updateThemeButtonText(theme) {
    themeToggle.textContent = theme === "dark" ? "DAY EDITION" : "NIGHT EDITION";
}

// Render Bulletins left sidebar
function renderBulletins() {
    bulletinsList.innerHTML = BULLETINS.map(b => `
        <div class="bulletin-item">
            <span class="bulletin-meta">${b.time} &bull; FLASH</span>
            <p class="bulletin-text">${b.text}</p>
        </div>
    `).join("");
}

// Render Opinions right sidebar
function renderOpinions() {
    const opinions = ARTICLES_DB.filter(a => a.category === "opinion");
    opinionList.innerHTML = opinions.map(op => `
        <div class="opinion-item">
            <span class="opinion-author">${op.author}</span>
            <h4 class="opinion-title"><a href="#" onclick="openArticleModal('${op.id}'); return false;">${op.title}</a></h4>
            <p class="opinion-lead">${op.preview}</p>
        </div>
    `).join("");
}

// Render main article feed
function renderArticles() {
    articlesGrid.innerHTML = "";

    // Filter logic
    let filtered = ARTICLES_DB.filter(a => a.category !== "opinion");

    if (currentCategory === "saved") {
        filtered = ARTICLES_DB.filter(a => bookmarkedArticles.includes(a.id));
    } else if (currentCategory !== "all") {
        filtered = filtered.filter(a => a.category === currentCategory);
    }

    if (searchQuery) {
        const query = searchQuery.toLowerCase();
        filtered = ARTICLES_DB.filter(a =>
            a.title.toLowerCase().includes(query) ||
            a.preview.toLowerCase().includes(query) ||
            a.content.toLowerCase().includes(query)
        );
    }

    if (filtered.length === 0) {
        articlesGrid.innerHTML = `
            <div class="news-card hero">
                <span class="card-category">EMPTY ARCHIVE</span>
                <h2 class="card-title">NO CORRESPONDENCE FOUND</h2>
                <p class="card-body-preview">Our telegram operators search the files but found nothing matching. Adjust your filters or query term to retrieve archived articles.</p>
            </div>
        `;
        return;
    }

    filtered.forEach((art, index) => {
        const isHero = index === 0 && currentCategory === "all" && !searchQuery;
        const isSaved = bookmarkedArticles.includes(art.id);
        const cardClass = isHero ? "news-card hero" : "news-card";
        const dropCapClass = isHero ? "drop-cap" : "";
        const bookmarkIcon = isSaved ? "★" : "☆";

        articlesGrid.innerHTML += `
            <article class="${cardClass}">
                <span class="card-category">${art.category.toUpperCase()}</span>
                <h3 class="card-title" onclick="openArticleModal('${art.id}')">${art.title}</h3>
                <div class="card-meta">
                    <span>BY ${art.author} &bull; ${art.readTime}</span>
                    <button class="bookmark-icon-btn" onclick="toggleBookmark('${art.id}', event)" title="Bookmark article">
                        ${bookmarkIcon}
                    </button>
                </div>
                ${art.image ? `
                <div class="card-img-wrap" onclick="openArticleModal('${art.id}')">
                    <img src="${art.image}" alt="${art.title} Image">
                </div>
                ` : ""}
                <p class="card-body-preview ${dropCapClass}">${art.preview}</p>
                <span class="read-more-btn" onclick="openArticleModal('${art.id}')">READ DISPATCH &rarr;</span>
            </article>
        `;
    });
}

// --- Bookmarking Actions ---
function toggleBookmark(id, event) {
    if (event) event.stopPropagation();

    const index = bookmarkedArticles.indexOf(id);
    if (index > -1) {
        bookmarkedArticles.splice(index, 1);
        showToast("ARTICLE REMOVED FROM ARCHIVE");
    } else {
        bookmarkedArticles.push(id);
        showToast("ARTICLE ARCHIVED LOCALLY");
    }

    localStorage.setItem("chronograph_bookmarks", JSON.stringify(bookmarkedArticles));
    updateBookmarkUI();
    renderArticles();
}

function updateBookmarkUI() {
    const count = bookmarkedArticles.length;
    bookmarkCountEl.textContent = count;

    // Update active state of Saved menu item
    if (currentCategory === "saved") {
        navLinks.forEach(link => link.classList.remove("active"));
        const savedLink = Array.from(navLinks).find(l => l.getAttribute("data-category") === "saved");
        if (savedLink) savedLink.classList.add("active");
    }
}

// --- Toast alert helper ---
function showToast(msg) {
    const existing = document.querySelector(".toast-msg");
    if (existing) existing.remove();

    const toast = document.createElement("div");
    toast.className = "toast-msg";
    toast.textContent = msg;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// --- Article Reader Modal ---
function openArticleModal(id) {
    const art = ARTICLES_DB.find(a => a.id === id);
    if (!art) return;

    const isSaved = bookmarkedArticles.includes(art.id);

    // Populate content
    modalArticleContent.innerHTML = `
        <span class="card-category">${art.category.toUpperCase()}</span>
        <h2>${art.title}</h2>
        ${art.subTitle ? `<p class="lead">${art.subTitle}</p>` : ""}
        <div class="modal-meta">
            <span>BY ${art.author} &bull; ${art.date}</span>
            <span>${art.wordCount} &bull; ${art.readTime}</span>
        </div>
        <div>
            ${art.content}
        </div>
    `;

    // Reset size adjustment
    readerFontSizeMultiplier = 1.0;
    applyFontSize();

    // Reset TTS
    stopTTS();

    // Set Save Button state
    updateModalBookmarkBtn(isSaved);

    // Connect controls to current article ID
    readerBookmarkBtn.onclick = () => {
        toggleBookmark(art.id);
        const active = bookmarkedArticles.includes(art.id);
        updateModalBookmarkBtn(active);
    };

    readerTtsBtn.onclick = () => toggleTTS(art);
    readerPrintBtn.onclick = () => window.print();

    // Show modal
    articleModal.classList.add("active");
    articleModal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden"; // Disable background scrolling
}

function updateModalBookmarkBtn(isBookmarked) {
    readerBookmarkBtn.textContent = isBookmarked ? "UNSAVE" : "SAVE";
    readerBookmarkBtn.classList.toggle("active", isBookmarked);
}

function closeArticleModal() {
    articleModal.classList.remove("active");
    articleModal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "auto";
    stopTTS();
}

function applyFontSize() {
    modalArticleContent.style.fontSize = `${readerFontSizeMultiplier * 1.15}rem`;
}

// --- Text to Speech (TTS) ---
function toggleTTS(art) {
    if ('speechSynthesis' in window) {
        if (window.speechSynthesis.speaking) {
            stopTTS();
            return;
        }

        // Gather speech text
        const textContent = `${art.title}. Subtitle: ${art.subTitle || ""}. By ${art.author}. ${modalArticleContent.innerText}`;
        ttsInstance = new SpeechSynthesisUtterance(textContent);
        ttsInstance.rate = 1.0;
        ttsInstance.pitch = 0.95; // slightly lower pitch for vintage voice broadcast feel

        ttsInstance.onend = () => {
            readerTtsBtn.textContent = "SPEAK";
            readerTtsBtn.classList.remove("active");
        };

        window.speechSynthesis.speak(ttsInstance);
        readerTtsBtn.textContent = "STOP";
        readerTtsBtn.classList.add("active");
    } else {
        showToast("SPEECH SYNTHESIS NOT SUPPORTED IN BROWSER");
    }
}

function stopTTS() {
    if ('speechSynthesis' in window && window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
    }
    readerTtsBtn.textContent = "SPEAK";
    readerTtsBtn.classList.remove("active");
}

// --- Mock Weather Updater ---
const WEATHER_DESCRIPTIONS = [
    { desc: "OVERCAST SOOTY MIST", temp: "12°C" },
    { desc: "HEAVY SOUTHEAST GALE", temp: "8°C" },
    { desc: "DRY SAND SIROCCO", temp: "34°C" },
    { desc: "CRISP BALMY SUNSHINE", temp: "21°C" },
    { desc: "BITING SLEET FROST", temp: "1°C" },
    { desc: "PATCHY THUNDER SHOWER", temp: "16°C" }
];

function updateWeather() {
    const city = weatherCityInput.value.trim().toUpperCase() || "LONDON";
    const rand = WEATHER_DESCRIPTIONS[Math.floor(Math.random() * WEATHER_DESCRIPTIONS.length)];

    // Update labels
    widgetTemp.textContent = rand.temp;
    widgetDesc.textContent = `${rand.desc}`;

    let weatherChar = "☁";
    if (rand.desc.includes("SUNSHINE")) weatherChar = "☼";
    if (rand.desc.includes("GALE") || rand.desc.includes("SHOWER")) weatherChar = "⛈";
    if (rand.desc.includes("FROST")) weatherChar = "❄";

    weatherWidgetTop.innerHTML = `${city} ${rand.temp} <span class="weather-icon">${weatherChar}</span>`;
    showToast(`TELEGRAPH RECEIVED: WEATHER UPDATED FOR ${city}`);
    weatherCityInput.value = "";
}

// --- Events Setup ---
function setupEventListeners() {
    // Theme Toggle
    themeToggle.addEventListener("click", () => {
        const current = document.documentElement.getAttribute("data-theme") || "light";
        const next = current === "dark" ? "light" : "dark";
        document.documentElement.setAttribute("data-theme", next);
        localStorage.setItem("chronograph_theme", next);
        updateThemeButtonText(next);
        showToast(next === "dark" ? "NIGHT EDITION ACTIVE" : "DAY EDITION ACTIVE");
    });

    // Nav Category Clicks
    navLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            navLinks.forEach(l => l.classList.remove("active"));
            link.classList.add("active");

            currentCategory = link.getAttribute("data-category");
            searchQuery = ""; // Reset search on category toggle
            searchInput.value = "";
            renderArticles();
        });
    });

    // Saved Articles Toggle Button
    bookmarkToggleBtn.addEventListener("click", () => {
        currentCategory = "saved";
        renderArticles();
        updateBookmarkUI();
    });

    // Search Operations
    const performSearch = () => {
        searchQuery = searchInput.value.trim();
        renderArticles();
    };
    searchBtn.addEventListener("click", performSearch);
    searchInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") performSearch();
    });

    // Weather manual update
    weatherCityBtn.addEventListener("click", updateWeather);
    weatherCityInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") updateWeather();
    });

    // Modal close actions
    modalClose.addEventListener("click", closeArticleModal);
    articleModal.addEventListener("click", (e) => {
        if (e.target === articleModal) closeArticleModal();
    });
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") closeArticleModal();
    });

    // Modal Font adjustments
    fontIncBtn.addEventListener("click", () => {
        if (readerFontSizeMultiplier < 1.6) {
            readerFontSizeMultiplier += 0.1;
            applyFontSize();
        }
    });
    fontDecBtn.addEventListener("click", () => {
        if (readerFontSizeMultiplier > 0.8) {
            readerFontSizeMultiplier -= 0.1;
            applyFontSize();
        }
    });

    // Newsletter submit + typewriter rubber stamp trigger
    newsletterForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const email = newsletterEmail.value.trim();
        if (email) {
            newsletterStatus.textContent = "ENGRAVING DISPATCH RECORD...";
            newsletterEmail.disabled = true;
            newsletterForm.querySelector("button").disabled = true;

            setTimeout(() => {
                newsletterStatus.textContent = "SUBSCRIBED AT ADDRESS: " + email.toUpperCase();
                stampConfirmed.classList.add("active");
                showToast("SUBSCRIBED SUCCESSFULLY. RECORD ENGRAVED.");
            }, 1500);
        }
    });
}
