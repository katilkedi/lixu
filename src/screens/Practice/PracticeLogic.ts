import Tts from "react-native-tts";

export const normalizeText = (t: string) =>
  t.toLowerCase().trim().replace(/[^a-zçğıöşü ]/gi, "");

export const compareWords = (expected: string, actual: string): string | null => {
  if (expected.length !== actual.length) return null;
  let diffs: string[] = [];
  for (let i = 0; i < expected.length; i++) {
    if (expected[i] !== actual[i]) diffs.push(`${expected[i]} yerine ${actual[i]}`);
  }
  if (diffs.length === 1) return `Sanırım '${diffs[0]}' harfini karıştırdın.`;
  return null;
};

export let mistakenLetters: Record<string, number> = {};

export const tutucu = (expected: string, actual: string): void => {
  if (expected.length !== actual.length) return;
  for (let i = 0; i < expected.length; i++) {
    if (expected[i] !== actual[i]) {
      const wrongLetter = expected[i];
      mistakenLetters[wrongLetter] = (mistakenLetters[wrongLetter] || 0) + 1;
    }
  }
};

export const speakWord = (word: string) => {
  if (word) Tts.speak(word);
};
