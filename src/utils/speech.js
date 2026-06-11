const VOICE_WAIT_TIMEOUT = 800;

let cachedVoices = [];
let speechRequestId = 0;

function getSpeechSynthesis() {
  return typeof window !== "undefined" && "speechSynthesis" in window
    ? window.speechSynthesis
    : null;
}

function refreshVoices() {
  const synthesis = getSpeechSynthesis();
  if (!synthesis) return [];
  const voices = synthesis.getVoices();
  if (voices.length) cachedVoices = voices;
  return voices.length ? voices : cachedVoices;
}

function waitForVoices(timeout = VOICE_WAIT_TIMEOUT) {
  const synthesis = getSpeechSynthesis();
  if (!synthesis || refreshVoices().length) return Promise.resolve();

  return new Promise((resolve) => {
    let settled = false;
    const finish = () => {
      if (settled) return;
      settled = true;
      synthesis.removeEventListener?.("voiceschanged", finish);
      resolve();
    };

    synthesis.addEventListener?.("voiceschanged", finish, { once: true });
    setTimeout(finish, timeout);
  });
}

export function getBestEnglishVoice() {
  const voices = refreshVoices();
  if (!voices.length) return null;

  const preferredEnglish = voices.filter((voice) => {
    const language = (voice.lang || "").toLowerCase();
    return language.startsWith("en-us") || language.startsWith("en-gb");
  });
  const allEnglish = voices.filter((voice) => (voice.lang || "").toLowerCase().startsWith("en"));
  const candidates = preferredEnglish.length ? preferredEnglish : allEnglish;
  if (!candidates.length) return null;

  const preferredNames = [
    /Microsoft (Aria|Jenny|Ava|Emma)/i,
    /Google (US|UK) English/i,
    /Samantha/i,
    /Daniel/i,
    /Karen/i,
    /Serena/i,
    /natural|neural|premium/i,
  ];

  for (const pattern of preferredNames) {
    const voice = candidates.find((candidate) => pattern.test(candidate.name));
    if (voice) return voice;
  }

  return candidates[0];
}

export function stopSpeaking() {
  const synthesis = getSpeechSynthesis();
  speechRequestId += 1;
  if (synthesis && (synthesis.speaking || synthesis.pending)) {
    synthesis.cancel();
  }
}

export async function speakEnglish(text, options = {}) {
  const synthesis = getSpeechSynthesis();
  const speechText = String(text || "").trim();
  if (!synthesis || !speechText || typeof SpeechSynthesisUtterance === "undefined") {
    options.onerror?.();
    return null;
  }

  const requestId = ++speechRequestId;
  synthesis.cancel();
  await waitForVoices(options.voiceTimeout);
  if (requestId !== speechRequestId) return null;

  const utterance = new SpeechSynthesisUtterance(speechText);
  utterance.lang = options.lang || "en-US";
  utterance.rate = options.rate ?? 0.86;
  utterance.pitch = options.pitch ?? 1;
  utterance.volume = options.volume ?? 1;
  utterance.voice = options.voice || getBestEnglishVoice();
  utterance.onstart = () => options.onstart?.();
  utterance.onend = () => options.onend?.();
  utterance.onerror = (event) => options.onerror?.(event);

  synthesis.speak(utterance);
  return utterance;
}

const synthesis = getSpeechSynthesis();
if (synthesis) {
  refreshVoices();
  synthesis.addEventListener?.("voiceschanged", refreshVoices);
}
