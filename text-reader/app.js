/**
 * Standalone Text-to-Speech Reader
 * Combined Native SpeechSynthesis + Google Translate TTS Fallback
 */

// --- Default Preset Texts ---
const PRESETS = {
    "pres-km-1": "សួស្តីពិភពលោក! នេះគឺជាកម្មវិធីអានអត្ថបទដោយសេរី។ ប្រព័ន្ធនេះជួយសម្រួលដល់ការអានភាសាខ្មែរ ដោយរួមបញ្ចូលទាំងការអានជាសំឡេងស្រីយ៉ាងពីរោះ។ សូមសាកល្បងបញ្ចូលអត្ថបទផ្សេងទៀតរបស់អ្នកនៅទីនេះ។",
    "pres-en-1": "Hello world! This is a free standalone Text-to-Speech reader. Try writing your own text here or modifying the playback speed and pitch sliders to customize the reading experience."
};

// --- App State ---
let currentLanguage = "km";
let theme = localStorage.getItem("reader_theme") || "light";
let history = JSON.parse(localStorage.getItem("reader_history")) || [];
let ttsInstance = null;
let ttsAudioPlayer = null;
let ttsAudioQueue = [];
let ttsAudioIndex = 0;

// --- DOM Elements ---
const textInput = document.getElementById("text-input");
const charCounter = document.getElementById("char-counter");
const clearBtn = document.getElementById("clear-btn");
const langSelect = document.getElementById("lang-select");
const speedSlider = document.getElementById("speed-slider");
const speedVal = document.getElementById("speed-val");
const pitchSlider = document.getElementById("pitch-slider");
const pitchVal = document.getElementById("pitch-val");
const speakBtn = document.getElementById("speak-btn");
const stopBtn = document.getElementById("stop-btn");
const themeToggle = document.getElementById("theme-toggle");
const historyList = document.getElementById("history-list");
const clearHistoryBtn = document.getElementById("clear-history-btn");

// --- Initialization ---
document.addEventListener("DOMContentLoaded", () => {
    initTheme();
    loadHistory();
    setupEventListeners();
    updateCharCounter();
});

// --- Core Logic ---

function initTheme() {
    document.documentElement.setAttribute("data-theme", theme);
    themeToggle.textContent = theme === "dark" ? "DAY EDITION" : "NIGHT EDITION";
}

function toggleTheme() {
    theme = theme === "light" ? "dark" : "light";
    localStorage.setItem("reader_theme", theme);
    initTheme();
}

function updateCharCounter() {
    const len = textInput.value.length;
    charCounter.textContent = `${len} / 2000 CHARS`;
}

// --- Text-to-Speech Controllers ---

function toggleTTS() {
    const text = textInput.value.trim();
    if (!text) {
        showToast("Please enter some text first / សូមបញ្ចូលអត្ថបទជាមុនសិន");
        return;
    }

    if (('speechSynthesis' in window && window.speechSynthesis.speaking) || ttsAudioPlayer) {
        stopTTS();
        return;
    }

    // Save to history
    saveToHistory(text);

    const speed = parseFloat(speedSlider.value);
    const pitch = parseFloat(pitchSlider.value);
    const lang = langSelect.value;

    if (lang === "km") {
        // Native Khmer voices check
        const voices = window.speechSynthesis.getVoices();
        const kmVoices = voices.filter(v => {
            const l = v.lang.toLowerCase();
            return l.startsWith("km") || l.includes("kh") || v.name.toLowerCase().includes("khmer");
        });

        if (kmVoices.length > 0) {
            playNativeTTS(text, kmVoices, speed, pitch, "km-KH");
        } else {
            // Google Translate Online Fallback
            playGoogleTTSQueue(text, "km");
        }
    } else {
        // English playback
        playNativeTTS(text, null, speed, pitch, "en-US");
    }
}

function playNativeTTS(text, kmVoices, speed, pitch, langCode) {
    if (!('speechSynthesis' in window)) {
        showToast("TTS NOT SUPPORTED IN THIS BROWSER");
        return;
    }

    ttsInstance = new SpeechSynthesisUtterance(text);
    ttsInstance.rate = speed;
    ttsInstance.pitch = pitch;

    const voices = window.speechSynthesis.getVoices();
    let voice = null;

    if (kmVoices) {
        // Prefer local voices since they support pitch control (unlike cloud voices)
        const localKm = kmVoices.filter(v => v.localService === true);
        const searchPool = localKm.length > 0 ? localKm : kmVoices;
        
        voice = searchPool.find(v => {
            const name = v.name.toLowerCase();
            return name.includes("sreypich") || name.includes("female") || name.includes("google") || name.includes("online");
        }) || searchPool[0];
        ttsInstance.lang = "km-KH";
    } else {
        // Prefer local English voices so the pitch slider works (e.g. Microsoft Zira/David, Apple Samantha)
        const enVoices = voices.filter(v => v.lang.toLowerCase().startsWith("en"));
        const localEn = enVoices.filter(v => v.localService === true);
        const searchPool = localEn.length > 0 ? localEn : enVoices;
        
        voice = searchPool.find(v => {
            const name = v.name.toLowerCase();
            return name.includes("female") || name.includes("zira") || name.includes("samantha");
        }) || searchPool[0];
        ttsInstance.lang = "en-US";
    }

    if (voice) {
        ttsInstance.voice = voice;
    }

    ttsInstance.onstart = () => {
        setPlaybackUI(true);
    };

    ttsInstance.onend = () => {
        setPlaybackUI(false);
    };

    ttsInstance.onerror = (e) => {
        console.error("Speech Synthesis Error:", e);
        setPlaybackUI(false);
    };

    window.speechSynthesis.speak(ttsInstance);
}

function playGoogleTTSQueue(text, langCode) {
    // Split sentences strictly on delimiters
    const sentences = text.split(/([។\.\?\!])/);
    const chunks = [];
    let currentChunk = "";

    for (let i = 0; i < sentences.length; i++) {
        const segment = sentences[i];
        if (!segment) continue;
        if (currentChunk.length + segment.length < 150) {
            currentChunk += segment;
        } else {
            if (currentChunk.trim()) {
                chunks.push(currentChunk.trim());
            }
            currentChunk = segment;
        }
    }
    if (currentChunk.trim()) {
        chunks.push(currentChunk.trim());
    }

    if (chunks.length === 0) return;

    ttsAudioQueue = chunks;
    ttsAudioIndex = 0;

    setPlaybackUI(true);
    playNextTTSChunk(langCode);
}

function playNextTTSChunk(langCode) {
    if (ttsAudioIndex >= ttsAudioQueue.length) {
        stopTTS();
        return;
    }

    const text = ttsAudioQueue[ttsAudioIndex];
    const url = `https://translate.google.com/translate_tts?ie=UTF-8&tl=${langCode}&client=tw-ob&q=${encodeURIComponent(text)}`;
    
    const speed = parseFloat(speedSlider.value);
    
    ttsAudioPlayer = new Audio(url);
    ttsAudioPlayer.defaultPlaybackRate = speed;
    
    ttsAudioPlayer.onended = () => {
        ttsAudioIndex++;
        playNextTTSChunk(langCode);
    };
    ttsAudioPlayer.onerror = (e) => {
        console.error("Google TTS failed chunk, skipping:", e);
        ttsAudioIndex++;
        playNextTTSChunk(langCode);
    };

    ttsAudioPlayer.play().then(() => {
        if (ttsAudioPlayer) {
            ttsAudioPlayer.playbackRate = speed;
        }
    }).catch(err => {
        console.error("Audio Playback Blocked or Offline:", err);
        showToast("AUDIO PLAYBACK BLOCKED OR OFFLINE");
        stopTTS();
    });
}

function stopTTS() {
    // Native TTS cancel
    if ('speechSynthesis' in window && window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
    }

    // Google Audio cancel
    if (ttsAudioPlayer) {
        ttsAudioPlayer.pause();
        ttsAudioPlayer.src = "";
        ttsAudioPlayer = null;
    }
    ttsAudioQueue = [];
    ttsAudioIndex = 0;

    setPlaybackUI(false);
}

function setPlaybackUI(isPlaying) {
    if (isPlaying) {
        speakBtn.disabled = true;
        stopBtn.disabled = false;
        langSelect.disabled = true;
    } else {
        speakBtn.disabled = false;
        stopBtn.disabled = true;
        langSelect.disabled = false;
    }
}

// --- History Managers ---

function loadHistory() {
    historyList.innerHTML = "";
    if (history.length === 0) {
        historyList.innerHTML = `<p class="empty-state mono-text">No recent entries / មិនមានកំណត់ត្រាថ្មី</p>`;
        clearHistoryBtn.classList.add("hidden");
        return;
    }

    clearHistoryBtn.classList.remove("hidden");
    history.forEach((item, index) => {
        const div = document.createElement("div");
        div.className = "history-item";
        div.onclick = () => {
            textInput.value = item.text;
            langSelect.value = item.lang;
            updateCharCounter();
            showToast("TEXT LOADED FROM LOG");
        };

        const shortText = item.text;
        const timeStr = item.time;
        const langLabel = item.lang === "km" ? "KHMER" : "ENGLISH";

        div.innerHTML = `
            <p class="history-text-preview">${shortText}</p>
            <div class="history-meta">
                <span>${langLabel} &bull; ${timeStr}</span>
                <button class="history-delete-btn" onclick="deleteHistory(${index}, event)">DELETE</button>
            </div>
        `;
        historyList.appendChild(div);
    });
}

function saveToHistory(text) {
    // Remove if duplicate exists
    history = history.filter(item => item.text !== text);
    
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    history.unshift({
        text: text,
        lang: langSelect.value,
        time: timeStr
    });

    // Cap at 10 items
    if (history.length > 10) history.pop();

    localStorage.setItem("reader_history", JSON.stringify(history));
    loadHistory();
}

function deleteHistory(index, event) {
    if (event) event.stopPropagation();
    history.splice(index, 1);
    localStorage.setItem("reader_history", JSON.stringify(history));
    loadHistory();
    showToast("LOG ENTRY REMOVED");
}

function clearAllHistory() {
    history = [];
    localStorage.removeItem("reader_history");
    loadHistory();
    showToast("ALL LOGS CLEARED");
}

// --- Event Handlers ---

function setupEventListeners() {
    // Inputs & Sliders
    textInput.addEventListener("input", () => {
        updateCharCounter();
    });

    clearBtn.addEventListener("click", () => {
        textInput.value = "";
        updateCharCounter();
        showToast("TEXT CLEARED");
    });

    speedSlider.addEventListener("input", (e) => {
        speedVal.textContent = `${parseFloat(e.target.value).toFixed(1)}x`;
    });

    pitchSlider.addEventListener("input", (e) => {
        pitchVal.textContent = parseFloat(e.target.value).toFixed(1);
    });

    // Controls
    speakBtn.addEventListener("click", toggleTTS);
    stopBtn.addEventListener("click", stopTTS);
    themeToggle.addEventListener("click", toggleTheme);
    clearHistoryBtn.addEventListener("click", clearAllHistory);

    // Preset buttons
    document.querySelectorAll(".preset-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const key = btn.getAttribute("data-text");
            if (PRESETS[key]) {
                textInput.value = PRESETS[key];
                langSelect.value = key.includes("-km-") ? "km" : "en";
                updateCharCounter();
                showToast("PRESET TEXT LOADED");
            }
        });
    });

    // Handle voice changes asynchronously
    if ('speechSynthesis' in window) {
        window.speechSynthesis.onvoiceschanged = () => {
            // Trigger browser to preload voices
            window.speechSynthesis.getVoices();
        };
    }
}

// --- Toast message ---
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
