export type SyllableGroup = {
  title: string;
  syllables: string[];
};

export const syllablesList: SyllableGroup[] = [
  {
    title: "Açık Heceler (CV)",
    syllables: [
      "ba", "be", "bi", "bo", "bu", "bü",
      "ca", "ce", "ci", "co", "cu", "cü",
      "da", "de", "di", "do", "du", "dü",
      "fa", "fe", "fi", "fo", "fu", "fü"
    ]
  },
  {
    title: "Kapalı Heceler (CVC)",
    syllables: [
      "bal", "ben", "bir", "bol", "bur",
      "can", "cey", "cin", "cor", "cun",
      "dal", "den", "dik", "dol", "dur",
      "fal", "fer", "fil", "fos", "ful"
    ]
  },
  {
    title: "Karışan Sessizler (b-d-p-g)",
    syllables: [
      "ba", "da", "pa", "ga",
      "bal", "dal", "pal", "gal",
      "abi", "adi", "api", "agi",
      "aba", "ada", "apa", "aga",
      "bop", "dop", "pop", "gop",
      "bik", "dik", "pik", "gik"
    ]
  },
  {
    title: "İnce Sesliler",
    syllables: [
      "ce", "çi", "şe", "şi",
      "le", "li", "me", "mi",
      "ke", "ki", "te", "ti",
      "bey", "mey", "sey", "ley"
    ]
  },
  {
    title: "Kalın Sesliler",
    syllables: [
      "ka", "ko", "ku", "kı",
      "ma", "mo", "mu", "mı",
      "ta", "to", "tu", "tı",
      "şa", "şı", "şu", "şo",
      "bra", "bro", "bru"
    ]
  },
  {
    title: "İkiz Sessiz Başlangıçlar",
    syllables: [
      "pla", "ple", "pli", "plo", "plu",
      "bra", "bre", "bri", "bro", "bru",
      "fra", "fre", "fri", "fro", "fru",
      "gra", "gre", "gri", "gro", "gru"
    ]
  },
  {
    title: "Uzatmalı Heceler",
    syllables: [
      "ala", "ele", "ili", "olo", "ulu",
      "ara", "ere", "iri", "oro", "uru",
      "aya", "eyi", "iyi", "oyo", "uyu",
      "ana", "ene", "ini", "ono", "unu"
    ]
  },
  {
    title: "Ritimli Çiftler",
    syllables: [
      "ba-ba", "da-da", "ma-ma",
      "sa-sa", "ta-ta", "pa-pa",
      "la-la", "na-na", "ra-ra",
      "ka-ka", "ga-ga", "fa-fa"
    ]
  }
];