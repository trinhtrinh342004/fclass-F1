import { readFileSync } from "node:fs";
import vm from "node:vm";

const source = readFileSync(new URL("../src/main.js", import.meta.url), "utf8");
const start = source.indexOf("let alphabetAgSpeechRequestId = 0;");
const end = source.indexOf("function launchAlphabetAgConfetti", start);

if (start < 0 || end < 0) {
  throw new Error("A-G speech function not found.");
}

const utterances = [];
const voice = { name: "Microsoft Aria Online (Natural)", lang: "en-US" };
const synthesis = {
  paused: false,
  resumeCount: 0,
  speak(utterance) {
    utterances.push(utterance);
  },
  resume() {
    this.resumeCount += 1;
    this.paused = false;
  },
};

class SpeechUtterance {
  constructor(text) {
    this.text = text;
  }
}

const context = {
  window: { speechSynthesis: synthesis },
  SpeechSynthesisUtterance: SpeechUtterance,
  activeSpeechButton: null,
  activeUtterance: null,
  stopCount: 0,
  getBestEnglishVoice: () => voice,
};

context.stopCurrentSpeech = () => {
  context.stopCount += 1;
  context.activeSpeechButton?.classList.remove("playing", "loading");
  context.activeSpeechButton = null;
};

vm.createContext(context);
const alphabetAgSpeak = vm.runInContext(
  `${source.slice(start, end)}\nalphabetAgSpeak;`,
  context
);

function createTrigger() {
  const classes = new Set();
  return {
    classes,
    classList: {
      add: (...names) => names.forEach((name) => classes.add(name)),
      remove: (...names) => names.forEach((name) => classes.delete(name)),
    },
  };
}

const fallback = { textContent: "" };
const activity = { querySelector: () => fallback };

for (const letter of "ABCDEFG") {
  for (let area = 0; area < 3; area += 1) {
    const trigger = createTrigger();
    alphabetAgSpeak(letter, activity, trigger);
    if (!trigger.classes.has("playing")) {
      throw new Error(`${letter} click area ${area + 1} is missing its playing state.`);
    }
  }
}

if (utterances.length !== 21) {
  throw new Error(`Expected 21 utterances, received ${utterances.length}.`);
}
if (context.stopCount !== 21) {
  throw new Error(`Expected 21 cancel calls, received ${context.stopCount}.`);
}

utterances.forEach((utterance, index) => {
  const expectedLetter = "ABCDEFG"[Math.floor(index / 3)];
  if (utterance.text !== expectedLetter) {
    throw new Error(`Expected ${expectedLetter}, received ${utterance.text}.`);
  }
  if (
    utterance.lang !== "en-US"
    || utterance.rate !== 0.9
    || utterance.pitch !== 1
    || utterance.voice !== voice
  ) {
    throw new Error(`Invalid speech settings for ${expectedLetter}.`);
  }
});

context.activeUtterance.onend();
if (context.activeSpeechButton !== null || context.activeUtterance !== null) {
  throw new Error("Playing state was not cleaned up.");
}

console.log("A-G speech runtime check PASSED: 21/21 click paths.");
