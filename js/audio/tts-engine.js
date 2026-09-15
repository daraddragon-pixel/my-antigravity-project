/**
 * The Daily Chronograph - Text-to-Speech Engine
 * Multi-speed SpeechSynthesis (English) + Chunked Google Translate Audio Stream (Khmer).
 */

import { TRANSLATIONS } from '../data/translations.js';
import { showToast } from '../ui/toast.js';

let ttsInstance = null;
let ttsAudioPlayer = null;
let ttsAudioQueue = [];
let ttsAudioIndex = 0;
let playbackSpeed = 1.0;
let isSpeaking = false;
let currentArticlePlaying = null;
let onStateChangeCallback = null;

export function setTTSStateCallback(cb) {
    onStateChangeCallback = cb;
}

function notifyStateChange(state) {
    isSpeaking = state.isPlaying;
    if (onStateChangeCallback) {
        onStateChangeCallback({
            isPlaying: isSpeaking,
            article: currentArticlePlaying,
            speed: playbackSpeed,
            progress: state.progress || 0,
            ...state
        });
    }
}

export function setPlaybackSpeed(speed) {
    playbackSpeed = speed;
    if (ttsInstance) {
        ttsInstance.rate = speed;
    }
    if (ttsAudioPlayer) {
        ttsAudioPlayer.playbackRate = speed;
    }
    notifyStateChange({ isPlaying: isSpeaking });
}

export function getPlaybackSpeed() {
    return playbackSpeed;
}

export function isAudioPlaying() {
    return isSpeaking;
}

export function getCurrentPlayingArticle() {
    return currentArticlePlaying;
}

/**
 * Starts narration of an article
 */
export function playArticleAudio(art, currentLanguage = "en") {
    if (isSpeaking) {
        stopAudioNarration();
    }

    currentArticlePlaying = art;
    const t = TRANSLATIONS[currentLanguage];
    const contentLang = art[currentLanguage] || art.en;
    
    // Clean text for speech
    const cleanContent = (contentLang.content || "").replace(/<[^>]*>/g, " ");
    const isKm = currentLanguage === "km";
    
    const fullSpeechText = isKm
        ? `${contentLang.title}។ ${contentLang.subTitle || ""}។ និពន្ធដោយ ${art.author}។ ${cleanContent}`
        : `${contentLang.title}. ${contentLang.subTitle || ""}. Written by ${art.author}. ${cleanContent}`;

    if (isKm) {
        const voices = 'speechSynthesis' in window ? window.speechSynthesis.getVoices() : [];
        const kmVoices = voices.filter(v => {
            const l = v.lang.toLowerCase();
            return l.startsWith("km") || l.includes("kh") || v.name.toLowerCase().includes("khmer");
        });

        if (kmVoices.length > 0) {
            playNativeSpeech(fullSpeechText, kmVoices[0], "km-KH", t);
        } else {
            playGoogleTTSStream(fullSpeechText, t);
        }
    } else {
        const voices = 'speechSynthesis' in window ? window.speechSynthesis.getVoices() : [];
        const enVoice = voices.find(v => v.lang.toLowerCase().startsWith("en"));
        playNativeSpeech(fullSpeechText, enVoice, "en-US", t);
    }
}

function playNativeSpeech(text, voice, langCode, t) {
    if (!('speechSynthesis' in window)) {
        showToast(t.toastTtsUnsupported);
        return;
    }

    window.speechSynthesis.cancel();
    ttsInstance = new SpeechSynthesisUtterance(text);
    ttsInstance.rate = playbackSpeed;
    ttsInstance.pitch = 0.95;
    ttsInstance.lang = langCode;
    if (voice) ttsInstance.voice = voice;

    ttsInstance.onstart = () => {
        isSpeaking = true;
        notifyStateChange({ isPlaying: true });
    };

    ttsInstance.onend = () => {
        isSpeaking = false;
        notifyStateChange({ isPlaying: false });
    };

    ttsInstance.onerror = (e) => {
        console.warn("SpeechSynthesis error:", e);
        isSpeaking = false;
        notifyStateChange({ isPlaying: false });
    };

    window.speechSynthesis.speak(ttsInstance);
}

function playGoogleTTSStream(text, t) {
    const sentences = text.split(/([។\.\?\!])/);
    const chunks = [];
    let currentChunk = "";

    for (let i = 0; i < sentences.length; i++) {
        const segment = sentences[i];
        if (!segment) continue;
        if (currentChunk.length + segment.length < 140) {
            currentChunk += segment;
        } else {
            if (currentChunk.trim()) chunks.push(currentChunk.trim());
            currentChunk = segment;
        }
    }
    if (currentChunk.trim()) chunks.push(currentChunk.trim());
    if (chunks.length === 0) return;

    ttsAudioQueue = chunks;
    ttsAudioIndex = 0;
    isSpeaking = true;
    notifyStateChange({ isPlaying: true, progress: 0 });

    playNextGoogleChunk(t);
}

function playNextGoogleChunk(t) {
    if (ttsAudioIndex >= ttsAudioQueue.length || !isSpeaking) {
        stopAudioNarration();
        return;
    }

    const text = ttsAudioQueue[ttsAudioIndex];
    const url = `https://translate.google.com/translate_tts?ie=UTF-8&tl=km&client=tw-ob&q=${encodeURIComponent(text)}`;
    
    ttsAudioPlayer = new Audio(url);
    ttsAudioPlayer.playbackRate = playbackSpeed;

    ttsAudioPlayer.onended = () => {
        ttsAudioIndex++;
        const progress = Math.round((ttsAudioIndex / ttsAudioQueue.length) * 100);
        notifyStateChange({ isPlaying: true, progress });
        playNextGoogleChunk(t);
    };

    ttsAudioPlayer.onerror = (e) => {
        console.warn("Google TTS chunk error, skipping:", e);
        ttsAudioIndex++;
        playNextGoogleChunk(t);
    };

    ttsAudioPlayer.play().catch(err => {
        console.warn("Google TTS play failed:", err);
        showToast("AUDIO PLAYBACK BLOCKED OR OFFLINE");
        stopAudioNarration();
    });
}

/**
 * Stops all ongoing speech synthesis and audio queues
 */
export function stopAudioNarration() {
    if ('speechSynthesis' in window && window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
    }
    
    if (ttsAudioPlayer) {
        ttsAudioPlayer.pause();
        ttsAudioPlayer.src = "";
        ttsAudioPlayer = null;
    }

    ttsAudioQueue = [];
    ttsAudioIndex = 0;
    isSpeaking = false;
    notifyStateChange({ isPlaying: false });
}
