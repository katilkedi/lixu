import { safeSpeak } from "../../utils/tts-init";

export const normalizeText = (t: string) =>
  t.toLowerCase().trim().replace(/[^a-zçğıöşü ]/gi, "");

export const correctionMap: Record<string, string> = {
  quebec: "kebi",
  gül: "gün",
};

export const normalizeWithMap = (w: string) => correctionMap[w] || w;

export const compareWords = (expected: string, actual: string): string | null => {
  if (expected.length !== actual.length) return null;
  const diffs: string[] = [];
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

import { generateStoryFromMistakes } from "../../utils/ai-helper";

export async function generateStory(mistakenLetters: Record<string, number>): Promise<{ title: string; words: string[] }> {
  return generateStoryFromMistakes(mistakenLetters);
}

export const speakWord = (word: string) => {
  if (word) safeSpeak(word);
};

export const speakSentence = (words: string[], startIndex: number, setHighlighted: (arr: number[]) => void) => {
  const sentence: string[] = [];
  const indices: number[] = [];

  for (let i = startIndex; i < words.length; i++) {
    sentence.push(words[i]);
    indices.push(i);
    if (words[i].includes(".")) break;
  }

  if (sentence.length > 0) {
    setHighlighted(indices);
    safeSpeak(sentence.join(" "));
    setTimeout(() => setHighlighted([]), sentence.length * 600);
  }
};
