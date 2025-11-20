import Tts from "react-native-tts";
import { words } from "../../constants/game-words";
import { Alert } from "react-native";

export const shuffleArray = (array: any[]) =>
  array
    .map((a) => ({ sort: Math.random(), value: a }))
    .sort((a, b) => a.sort - b.sort)
    .map((a) => a.value);

// Dyslexia-friendly color palette
export const getLetterColor = (ch: string) => {
  if ("bdpqBDPQ".includes(ch)) return "#E45858"; // Red for b, d, p, q
  if ("mnMN".includes(ch)) return "#2C9DA7"; // Teal for m, n
  if ("gğqGĞQ".includes(ch)) return "#E79C21"; // Orange for g, ğ, q
  if ("çÇşŞ".includes(ch)) return "#AC5BCB"; // Purple for ç, ş
  if ("aeıioöuüAEIİOÖUÜ".includes(ch)) return "#1E4B99"; // Blue for vowels
  return "#3A2B26"; // Dark brown for others
};

// Word emoji mapping
export const getWordEmoji = (word: string): string => {
  const wordLower = word.toLowerCase();
  const emojiMap: Record<string, string> = {
    'kedi': '🐱', 'bahçe': '🌳', 'tilki': '🦊', 'güneş': '☀️',
    'pembe': '🌸', 'masa': '🪑', 'kalem': '✏️', 'kitap': '📚',
    'araba': '🚗', 'kapı': '🚪', 'domates': '🍅', 'ilkokul': '🏫',
    'öğrenci': '👨‍🎓', 'öğretmen': '👩‍🏫', 'çocuklar': '👶',
    'bahçede': '🌳', 'okulda': '🏫', 'portakal': '🍊', 'çilek': '🍓',
    'kütüphane': '📚', 'hastane': '🏥', 'market': '🛒',
  };
  return emojiMap[wordLower] || '📝';
};

// Kelime tamamlama işlemi
export const handleSyllablePress = (
  syllable: string,
  currentWord: typeof words[0],
  selectedSyllables: string[],
  setSelectedSyllables: Function,
  setScore: Function,
  score: number,
  goNextWord: Function
) => {
  const expected = currentWord.syllables[selectedSyllables.length];
  if (syllable === expected) {
    setSelectedSyllables([...selectedSyllables, syllable]);
    Tts.speak(syllable);

    if (selectedSyllables.length + 1 === currentWord.syllables.length) {
      setScore(score + 1);
      goNextWord();
    }
  } else {
    Alert.alert(`Yanlış hece! Doğru sıra: ${expected}`);
  }
};
