// Simple rule-based AI for generating questions
// This can be replaced with a real AI API later

export type MathQuestion = {
  prompt: string;
  answer: number;
  options: number[];
  difficulty: 'easy' | 'medium' | 'hard';
};

export type WordPuzzle = {
  prompt: string;
  answer: string;
  solution: string;
  hint: string;
  options: string[];
};

export type SoundChallenge = {
  letter: string;
  options: string[];
  answer: string;
};

export type LetterMatch = {
  upper: string;
  options: string[];
  answer: string;
};

// Disleksili çocuklar için özel hazırlanmış kelimeler
// - Basit, kısa kelimeler (1-2 hece)
// - Görsel ve somut nesneler
// - Günlük hayatta sık kullanılan
// - Benzer harflerden kaçınıldı
const meaningfulWords: string[] = [
  // 1 hece - En basit
  'el', 'at', 'su', 'ay', 'ev', 'ok', 'gül', 'göl',
  
  // 2 hece - Basit ve görsel hayvanlar
  'kedi', 'kuş', 'balık', 'ayı', 'aslan', 'fil', 'zürafa', 'köpek', 'tavşan', 'kaplan',
  
  // 2 hece - Basit ve görsel nesneler
  'araba', 'masa', 'sandalye', 'kitap', 'kalem', 'top', 'oyun', 'bisiklet', 'uçak', 'gemi',
  'tren', 'otobüs', 'kapı', 'pencere', 'bahçe', 'park', 'okul', 'ev',
  
  // 2 hece - Meyveler ve yiyecekler
  'elma', 'armut', 'muz', 'portakal', 'çilek', 'ekmek', 'süt', 'peynir', 'yumurta',
  
  // 2 hece - Renkler
  'kırmızı', 'mavi', 'yeşil', 'sarı', 'turuncu', 'pembe', 'siyah', 'beyaz',
  
  // 2 hece - Aile ve insanlar
  'anne', 'baba', 'kardeş', 'çocuk', 'bebek', 'öğrenci', 'öğretmen',
  
  // 2 hece - Doğa
  'güneş', 'yıldız', 'ağaç', 'çiçek', 'gül', 'göl', 'deniz',
];

const consonants = ['b', 'c', 'ç', 'd', 'f', 'g', 'ğ', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'r', 's', 'ş', 't', 'v', 'y', 'z'];
const vowels = ['a', 'e', 'ı', 'i', 'o', 'ö', 'u', 'ü'];

export const generateMathQuestion = (difficulty: 'easy' | 'medium' | 'hard' = 'medium', score: number = 0): MathQuestion => {
  // Adaptive difficulty based on score
  let effectiveDifficulty = difficulty;
  if (score > 15) effectiveDifficulty = 'hard';
  else if (score > 8) effectiveDifficulty = 'medium';
  else effectiveDifficulty = 'easy';
  
  let a: number, b: number, isAddition: boolean;
  
  if (effectiveDifficulty === 'easy') {
    a = Math.floor(Math.random() * 15) + 5;
    b = Math.floor(Math.random() * 15) + 5;
    isAddition = Math.random() > 0.3;
  } else if (effectiveDifficulty === 'medium') {
    a = Math.floor(Math.random() * 30) + 10;
    b = Math.floor(Math.random() * 30) + 10;
    isAddition = Math.random() > 0.4;
    // Add multiplication sometimes
    if (Math.random() > 0.7 && score > 10) {
      a = Math.floor(Math.random() * 8) + 2;
      b = Math.floor(Math.random() * 8) + 2;
      return {
        prompt: `${a} × ${b} = ?`,
        answer: a * b,
        options: generateOptions(a * b),
        difficulty: effectiveDifficulty,
      };
    }
  } else {
    a = Math.floor(Math.random() * 50) + 20;
    b = Math.floor(Math.random() * 50) + 20;
    isAddition = Math.random() > 0.5;
    // Add multiplication and division
    if (Math.random() > 0.6) {
      a = Math.floor(Math.random() * 10) + 3;
      b = Math.floor(Math.random() * 10) + 3;
      return {
        prompt: `${a} × ${b} = ?`,
        answer: a * b,
        options: generateOptions(a * b),
        difficulty: effectiveDifficulty,
      };
    }
  }
  
  const big = Math.max(a, b);
  const small = Math.min(a, b);
  const prompt = isAddition ? `${a} + ${b}` : `${big} - ${small}`;
  const answer = isAddition ? a + b : big - small;
  
  return {
    prompt: `${prompt} = ?`,
    answer,
    options: generateOptions(answer),
    difficulty: effectiveDifficulty,
  };
};

const generateOptions = (answer: number): number[] => {
  const options = new Set<number>([answer]);
  const range = Math.max(5, Math.floor(answer * 0.3));
  while (options.size < 3) {
    const delta = Math.floor(Math.random() * (range * 2 + 1)) - range;
    const candidate = Math.max(0, answer + delta);
    if (candidate !== answer) {
      options.add(candidate);
    }
  }
  return Array.from(options).sort(() => Math.random() - 0.5);
};

export const generateWordPuzzle = (): WordPuzzle => {
  const word = meaningfulWords[Math.floor(Math.random() * meaningfulWords.length)];
  const wordLength = word.length;
  const missingIndex = Math.floor(Math.random() * wordLength);
  const missingLetter = word[missingIndex];
  
  const prompt = word.split('').map((ch, i) => i === missingIndex ? '_' : ch).join('');
  
  const options = [missingLetter.toUpperCase()];
  while (options.length < 3) {
    const randomLetter = vowels[Math.floor(Math.random() * vowels.length)].toUpperCase();
    if (!options.includes(randomLetter)) {
      options.push(randomLetter);
    }
  }
  
  const hints = [
    `Eksik harfi tamamla`,
    `"${word}" kelimesini oluştur`,
    `Sesi dinle ve harfi bul`,
  ];
  
  return {
    prompt,
    answer: missingLetter.toUpperCase(),
    solution: word,
    hint: hints[Math.floor(Math.random() * hints.length)],
    options: options.sort(() => Math.random() - 0.5),
  };
};

export const generateSoundChallenge = (): SoundChallenge => {
  const letter = consonants[Math.floor(Math.random() * consonants.length)].toUpperCase();
  const wordsStartingWithLetter = meaningfulWords.filter(w => 
    w.toLowerCase().startsWith(letter.toLowerCase())
  );
  
  if (wordsStartingWithLetter.length === 0) {
    // Fallback
    return {
      letter: 'B',
      options: ['Balık', 'Elma', 'Arı'],
      answer: 'Balık',
    };
  }
  
  const answer = wordsStartingWithLetter[0];
  const otherWords = meaningfulWords
    .filter(w => !w.toLowerCase().startsWith(letter.toLowerCase()))
    .sort(() => Math.random() - 0.5)
    .slice(0, 2);
  
  const options = [answer, ...otherWords].sort(() => Math.random() - 0.5);
  
  return {
    letter,
    options: options.map(w => w.charAt(0).toUpperCase() + w.slice(1)),
    answer: answer.charAt(0).toUpperCase() + answer.slice(1),
  };
};

export const generateLetterMatch = (): LetterMatch => {
  const upper = consonants[Math.floor(Math.random() * consonants.length)].toUpperCase();
  const lower = upper.toLowerCase();
  
  const options = [lower];
  while (options.length < 3) {
    const randomLower = consonants[Math.floor(Math.random() * consonants.length)].toLowerCase();
    if (!options.includes(randomLower) && randomLower !== lower) {
      options.push(randomLower);
    }
  }
  
  return {
    upper,
    options: options.sort(() => Math.random() - 0.5),
    answer: lower,
  };
};

export const getMeaningfulWords = (count: number = 20): string[] => {
  const shuffled = [...meaningfulWords].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, meaningfulWords.length));
};

export const analyzeMistakenLetters = (mistakenLetters: Record<string, number>): string[] => {
  // Get top 3 most mistaken letters
  const entries = Object.entries(mistakenLetters);
  entries.sort((a, b) => b[1] - a[1]);
  return entries.slice(0, 3).map(([letter]) => letter);
};

export const generateStoryFromMistakes = async (mistakenLetters: Record<string, number>): Promise<{ title: string; words: string[] }> => {
  const topMistakes = analyzeMistakenLetters(mistakenLetters);
  
  // Create a story that focuses on the mistaken letters with sentence structure
  const storyWords: string[] = [];
  
  // Common Turkish words that contain the mistaken letters
  const wordBank: Record<string, string[]> = {
    'b': ['baba', 'bebek', 'balık', 'bulut', 'bahçe', 'beyaz', 'beyaz'],
    'd': ['dede', 'deniz', 'doktor', 'dondurma', 'dünya', 'dün', 'dün'],
    'p': ['papa', 'pencere', 'portakal', 'pembe', 'park', 'pazar', 'pazar'],
    'q': ['kalem', 'kırmızı', 'kuş', 'kitap', 'kutu', 'kutu'],
    'g': ['güneş', 'gemi', 'gül', 'gözlük', 'güzel', 'güzel'],
    'm': ['masa', 'mavi', 'meyve', 'müzik', 'mama', 'mama'],
    'n': ['nar', 'ne', 'nasıl', 'nereye', 'nere', 'nere'],
    'ş': ['şemsiye', 'şeker', 'şarkı', 'şapka', 'şimdi', 'şimdi'],
    'ç': ['çiçek', 'çocuk', 'çilek', 'çanta', 'çok', 'çok'],
    'ı': ['ılık', 'ısı', 'ırmak', 'ıslak', 'ıslak'],
    'i': ['inek', 'isim', 'iyi', 'insan', 'için', 'için'],
    'ö': ['öğrenci', 'öğretmen', 'ödev', 'önce', 'önce'],
    'ü': ['üzüm', 'üç', 'üzgün', 'üst', 'üst'],
  };
  
  // Build story with words containing mistaken letters, forming sentences
  const usedWords = new Set<string>();
  let sentenceCount = 0;
  
  for (const letter of topMistakes) {
    const words = wordBank[letter.toLowerCase()] || [];
    for (const word of words) {
      if (!usedWords.has(word) && storyWords.length < 20) {
        storyWords.push(word);
        usedWords.add(word);
        sentenceCount++;
        
        // Add sentence ending every 4-6 words
        if (sentenceCount % 5 === 0 && storyWords.length < 20) {
          storyWords[storyWords.length - 1] = storyWords[storyWords.length - 1] + ".";
        }
      }
    }
  }
  
  // Fill remaining with general words if needed, forming sentences
  while (storyWords.length < 15) {
    const word = meaningfulWords[Math.floor(Math.random() * meaningfulWords.length)];
    if (!usedWords.has(word)) {
      storyWords.push(word);
      usedWords.add(word);
      sentenceCount++;
      
      if (sentenceCount % 5 === 0 && storyWords.length < 20) {
        storyWords[storyWords.length - 1] = storyWords[storyWords.length - 1] + ".";
      }
    }
  }
  
  // Ensure last word has period
  if (storyWords.length > 0 && !storyWords[storyWords.length - 1].includes(".")) {
    storyWords[storyWords.length - 1] = storyWords[storyWords.length - 1] + ".";
  }
  
  const title = topMistakes.length > 0 
    ? `Özel Alıştırma: ${topMistakes.join(', ')} Harfleriyle`
    : 'Özel Pratik Alıştırma';
  
  return { title, words: storyWords };
};

