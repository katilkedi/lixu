export type WordData = {
  word: string;
  syllables: string[];
};

export const words: WordData[] = [
  // Basit 2 hece
  { word: "kedi", syllables: ["ke", "di"] },
  { word: "bahçe", syllables: ["bah", "çe"] },
  { word: "tilki", syllables: ["til", "ki"] },
  { word: "güneş", syllables: ["gü", "neş"] },
  { word: "pembe", syllables: ["pem", "be"] },
  { word: "masa", syllables: ["ma", "sa"] },
  { word: "kalem", syllables: ["ka", "lem"] },
  { word: "kitap", syllables: ["ki", "tap"] },
  { word: "araba", syllables: ["a", "ra", "ba"] },
  { word: "kapı", syllables: ["ka", "pı"] },
  
  // Orta 3 hece
  { word: "domates", syllables: ["do", "ma", "tes"] },
  { word: "ilkokul", syllables: ["il", "ko", "kul"] },
  { word: "öğrenci", syllables: ["öğ", "ren", "ci"] },
  { word: "öğretmen", syllables: ["öğ", "ret", "men"] },
  { word: "çocuklar", syllables: ["ço", "cuk", "lar"] },
  { word: "bahçede", syllables: ["bah", "çe", "de"] },
  { word: "okulda", syllables: ["o", "kul", "da"] },
  { word: "evde", syllables: ["ev", "de"] },
  
  // Biraz daha zor 3-4 hece
  { word: "türbişon", syllables: ["tür", "bi", "şon"] },
  { word: "portakal", syllables: ["por", "ta", "kal"] },
  { word: "çilek", syllables: ["çi", "lek"] },
  { word: "kütüphane", syllables: ["kü", "tüp", "ha", "ne"] },
  { word: "hastane", syllables: ["has", "ta", "ne"] },
  { word: "market", syllables: ["mar", "ket"] },
];