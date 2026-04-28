"use client";

declare global {
  interface Window {
    webkitSpeechRecognition?: typeof SpeechRecognition;
    SpeechRecognition?: typeof SpeechRecognition;
  }
}

export type SupportedLanguage = "en" | "hi" | "hinglish";

const languageMap: Record<SupportedLanguage, string> = {
  en: "en-IN",
  hi: "hi-IN",
  hinglish: "hi-IN",
};

export function getSpeechRecognition() {
  if (typeof window === "undefined") return null;
  return window.SpeechRecognition || window.webkitSpeechRecognition || null;
}

export function speakText(text: string, language: SupportedLanguage) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) {
    return;
  }

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = languageMap[language];
  utterance.rate = 0.96;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
}

export function createRecognizer(
  language: SupportedLanguage,
  onResult: (text: string) => void,
  onError: (error: string) => void,
) {
  const Recognition = getSpeechRecognition();
  if (!Recognition) return null;

  const recognition = new Recognition();
  recognition.lang = languageMap[language];
  recognition.continuous = false;
  recognition.interimResults = true;

  recognition.onresult = (event: SpeechRecognitionEvent) => {
    const transcript = Array.from(event.results)
      .map((entry) => entry[0].transcript)
      .join(" ");
    onResult(transcript);
  };

  recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
    onError(event.error);
  };

  return recognition;
}
