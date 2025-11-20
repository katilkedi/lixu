import React, { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { View, Text, TouchableOpacity, Alert, StatusBar, ScrollView, Animated } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { words } from "../../constants/game-words";
import { styles } from "./GameStyles";
import { shuffleArray, handleSyllablePress } from "./GameLogic";
import { WordDisplay, SyllableList } from "./GameComponents";
import { RootStackParamList } from "../../constants/home-types";
import { generateWordPuzzle, generateSoundChallenge, generateLetterMatch, type WordPuzzle, type SoundChallenge, type LetterMatch } from "../../utils/ai-helper";
import { getTopScores, saveTopScore } from "../../utils/storage";
import { useCooldown } from "../../utils/cooldown";
import { playSuccessSound, playRecordSound, playCorrectAnswerSound } from "../../utils/sound-effects";
import { useFont } from "../../utils/FontContext";
import { safeSpeak, safeSetDefaultRate, safeSetDefaultPitch } from "../../utils/tts-init";

type Props = NativeStackScreenProps<RootStackParamList, "Game">;

type GameMode = "syllable" | "word" | "sound" | "letter";
type WordPuzzle = { prompt: string; answer: string; solution: string; hint: string; options: string[] };
type SoundChallenge = { letter: string; options: string[]; answer: string };
type LetterMatch = { upper: string; options: string[]; answer: string };

const gameTabs = [
  { key: "syllable" as GameMode, title: "Hece Tamamlama", description: "Heceleri sırayla diz", icon: "🧩" },
  { key: "word" as GameMode, title: "Kelime Bulmaca", description: "Eksik harfi seç", icon: "🔤" },
  { key: "sound" as GameMode, title: "Ses Avı", description: "Doğru sesi yakala", icon: "🎧" },
  { key: "letter" as GameMode, title: "Harf Çifti", description: "Büyük-küçük eşleştir", icon: "🔡" },
];

// AI-generated questions will be created dynamically

const Game: React.FC<Props> = ({ route, navigation }) => {
  const { fontFamily } = useFont();
  const initialTab = route.params?.gameKey ?? "syllable";
  const [activeGame, setActiveGame] = useState<GameMode>(initialTab);
  
  // Dynamic font style
  const fontStyle = { fontFamily: fontFamily === 'System' ? undefined : fontFamily };
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [selectedSyllables, setSelectedSyllables] = useState<string[]>([]);
  const [shuffledSyllables, setShuffledSyllables] = useState<string[]>(shuffleArray(words[0].syllables));
  const [syllableScore, setSyllableScore] = useState(0);
  const [wordPuzzle, setWordPuzzle] = useState<WordPuzzle>(() => generateWordPuzzle());
  const [wordFeedback, setWordFeedback] = useState<string | null>(null);
  const [wordScore, setWordScore] = useState(0);
  const [soundChallenge, setSoundChallenge] = useState<SoundChallenge>(() => generateSoundChallenge());
  const [soundFeedback, setSoundFeedback] = useState<string | null>(null);
  const [soundScore, setSoundScore] = useState(0);
  const [letterMatch, setLetterMatch] = useState<LetterMatch>(() => generateLetterMatch());
  const [letterFeedback, setLetterFeedback] = useState<string | null>(null);
  const [letterScore, setLetterScore] = useState(0);
  const [topScores, setTopScores] = useState({ gameSyllable: 0, gameWord: 0, gameSound: 0, gameLetter: 0 });
  const successAnim = useRef(new Animated.Value(0)).current;
  const withCooldown = useCooldown(500);

  const triggerSuccess = useCallback(() => {
    successAnim.setValue(0);
    Animated.sequence([
      Animated.timing(successAnim, { toValue: 0.8, duration: 180, useNativeDriver: true }),
      Animated.timing(successAnim, { toValue: 0, duration: 320, useNativeDriver: true }),
    ]).start();
  }, [successAnim]);

  useEffect(() => {
    const loadTopScores = async () => {
      const scores = await getTopScores();
      setTopScores({
        gameSyllable: scores.gameSyllable,
        gameWord: scores.gameWord,
        gameSound: scores.gameSound,
        gameLetter: scores.gameLetter,
      });
    };
    loadTopScores();
  }, []);

  useEffect(() => {
    if (route.params?.gameKey && route.params.gameKey !== activeGame) {
      setActiveGame(route.params.gameKey);
      // Generate new AI questions when switching games
      if (route.params.gameKey === "word") {
        setWordPuzzle(generateWordPuzzle());
      } else if (route.params.gameKey === "sound") {
        setSoundChallenge(generateSoundChallenge());
      } else if (route.params.gameKey === "letter") {
        setLetterMatch(generateLetterMatch());
      }
    }
  }, [route.params?.gameKey, activeGame]);

  const currentWord = words[currentWordIndex];

  const goNextWord = () => {
    const nextIndex = currentWordIndex + 1;
    if (nextIndex >= words.length) {
      saveTopScore("gameSyllable", syllableScore).then((isNewRecord) => {
        if (isNewRecord) {
          setTopScores(prev => ({ ...prev, gameSyllable: syllableScore }));
          playRecordSound();
          Alert.alert("Oyun bitti!", `Toplam skorun: ${syllableScore}\n🎉 Yeni rekor! 🎉`);
        } else {
          playCompletionSound();
          Alert.alert("Oyun bitti!", `Toplam skorun: ${syllableScore}`);
        }
      });
      setCurrentWordIndex(0);
      setSyllableScore(0);
      setShuffledSyllables(shuffleArray(words[0].syllables));
      setSelectedSyllables([]);
      triggerSuccess();
      return;
    }

    setCurrentWordIndex(nextIndex);
    setSelectedSyllables([]);
    setShuffledSyllables(shuffleArray(words[nextIndex].syllables));
    playSuccessSound();
    triggerSuccess();
  };

  const handleWordAnswer = withCooldown((letter: string) => {
    if (letter === wordPuzzle.answer) {
      const newScore = wordScore + 1;
      setWordScore(newScore);
      setWordFeedback(`Doğru! Kelime: ${wordPuzzle.solution}`);
      saveTopScore("gameWord", newScore).then((isNewRecord) => {
        if (isNewRecord) {
          setTopScores(prev => ({ ...prev, gameWord: newScore }));
          playRecordSound();
        } else {
          playSuccessSound();
        }
      });
      setTimeout(() => {
        setWordPuzzle(generateWordPuzzle());
        setWordFeedback(null);
      }, 1000);
      triggerSuccess();
    } else {
      setWordFeedback("Tekrar dene, sesi dikkatle dinle.");
    }
  });

  const handleSoundAnswer = withCooldown((word: string) => {
    if (word === soundChallenge.answer) {
      const newScore = soundScore + 1;
      setSoundScore(newScore);
      setSoundFeedback("Harika! Doğru kelimeyi seçtin.");
      saveTopScore("gameSound", newScore).then((isNewRecord) => {
        if (isNewRecord) {
          setTopScores(prev => ({ ...prev, gameSound: newScore }));
          playRecordSound();
        } else {
          playSuccessSound();
        }
      });
      setTimeout(() => {
        setSoundChallenge(generateSoundChallenge());
        setSoundFeedback(null);
      }, 1000);
      triggerSuccess();
    } else {
      setSoundFeedback("Bu sesle başlamıyor, tekrar dene.");
    }
  });

  const handleLetterAnswer = withCooldown((letter: string) => {
    if (letter === letterMatch.answer) {
      const newScore = letterScore + 1;
      setLetterScore(newScore);
      setLetterFeedback("Bravo! Doğru eşleştirdin.");
      saveTopScore("gameLetter", newScore).then((isNewRecord) => {
        if (isNewRecord) {
          setTopScores(prev => ({ ...prev, gameLetter: newScore }));
          playRecordSound();
        } else {
          playSuccessSound();
        }
      });
      setTimeout(() => {
        setLetterMatch(generateLetterMatch());
        setLetterFeedback(null);
      }, 1000);
      triggerSuccess();
    } else {
      setLetterFeedback("Biraz daha dikkatli bak.");
    }
  });

  // Always shuffle options on every render
  const shuffledWordOptions = useMemo(() => shuffleArray([...wordPuzzle.options]), [wordPuzzle, wordScore]);
  const shuffledSoundOptions = useMemo(() => shuffleArray([...soundChallenge.options]), [soundChallenge, soundScore]);
  const shuffledLetterOptions = useMemo(() => shuffleArray([...letterMatch.options]), [letterMatch, letterScore]);

  const renderGameContent = () => {
    if (activeGame === "word") {
      return (
        <View style={styles.puzzleCard}>
          <Text style={[styles.sectionTitle, fontStyle]}>Kelime Bulmaca</Text>
          {topScores.gameWord > 0 && (
            <Text style={[styles.topScoreText, fontStyle]}>🏆 En Yüksek: {topScores.gameWord}</Text>
          )}
          <Text style={[styles.puzzlePrompt, fontStyle]}>{wordPuzzle.prompt}</Text>
          <Text style={[styles.puzzleHint, fontStyle]}>{wordPuzzle.hint}</Text>
          <View style={styles.puzzleOptions}>
            {shuffledWordOptions.map((option) => (
              <TouchableOpacity key={`word-${option}`} style={styles.puzzleOption} onPress={() => handleWordAnswer(option)}>
                <Text style={[styles.puzzleOptionLabel, fontStyle]}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.puzzleFooter}>
            <Text style={[styles.puzzleScore, fontStyle]}>Puan: {wordScore}</Text>
            {wordFeedback ? <Text style={[styles.puzzleFeedback, fontStyle]}>{wordFeedback}</Text> : null}
          </View>
        </View>
      );
    }

    if (activeGame === "sound") {
      return (
        <View style={styles.puzzleCard}>
          <Text style={[styles.sectionTitle, fontStyle]}>Ses Avı</Text>
          {topScores.gameSound > 0 && (
            <Text style={[styles.topScoreText, fontStyle]}>🏆 En Yüksek: {topScores.gameSound}</Text>
          )}
          <Text style={[styles.puzzlePrompt, fontStyle]}>{soundChallenge.letter} harfiyle başlayan kelime hangisi?</Text>
          <View style={styles.puzzleOptions}>
            {shuffledSoundOptions.map((option) => (
              <TouchableOpacity key={`sound-${option}`} style={styles.puzzleOption} onPress={() => handleSoundAnswer(option)}>
                <Text style={[styles.puzzleOptionWord, fontStyle]}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.puzzleFooter}>
            <Text style={[styles.puzzleScore, fontStyle]}>Puan: {soundScore}</Text>
            {soundFeedback ? <Text style={[styles.puzzleFeedback, fontStyle]}>{soundFeedback}</Text> : null}
          </View>
        </View>
      );
    }

    if (activeGame === "letter") {
      return (
        <View style={styles.puzzleCard}>
          <Text style={[styles.sectionTitle, fontStyle]}>Harf Çifti</Text>
          {topScores.gameLetter > 0 && (
            <Text style={[styles.topScoreText, fontStyle]}>🏆 En Yüksek: {topScores.gameLetter}</Text>
          )}
          <Text style={[styles.puzzlePrompt, fontStyle]}>{letterMatch.upper}</Text>
          <Text style={[styles.puzzleHint, fontStyle]}>Bu harfin küçük hâlini seç</Text>
          <View style={styles.puzzleOptions}>
            {shuffledLetterOptions.map((option) => (
              <TouchableOpacity key={`letter-${option}`} style={styles.puzzleOption} onPress={() => handleLetterAnswer(option)}>
                <Text style={[styles.puzzleOptionLabel, fontStyle]}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.puzzleFooter}>
            <Text style={[styles.puzzleScore, fontStyle]}>Puan: {letterScore}</Text>
            {letterFeedback ? <Text style={[styles.puzzleFeedback, fontStyle]}>{letterFeedback}</Text> : null}
          </View>
        </View>
      );
    }

    return (
      <View style={styles.syllableCard}>
        <Text style={[styles.title, fontStyle]}>Hece Oyunu</Text>
        {topScores.gameSyllable > 0 && (
          <Text style={[styles.topScoreText, fontStyle]}>🏆 En Yüksek: {topScores.gameSyllable}</Text>
        )}
        <Text style={[styles.wordTitle, fontStyle]}>Heceleri sırayla seç</Text>

        <WordDisplay 
          currentWordSyllables={currentWord.syllables} 
          selectedSyllables={selectedSyllables} 
          shuffledSyllables={[]} 
          handleSyllablePress={() => {}}
          currentWord={currentWord.word}
        />

        <SyllableList
          shuffledSyllables={shuffledSyllables}
          currentWordSyllables={[]}
          selectedSyllables={[]}
          handleSyllablePress={(s) =>
            handleSyllablePress(s, currentWord, selectedSyllables, setSelectedSyllables, setSyllableScore, syllableScore, goNextWord)
          }
        />

        <View style={styles.scoreRow}>
          <Text style={styles.scoreLabel}>Skor</Text>
          <Text style={styles.scoreValue}>{syllableScore}</Text>
        </View>

        <TouchableOpacity style={styles.ttsButton} onPress={withCooldown(() => safeSpeak(currentWord.word))}>
          <Text style={styles.ttsText}>Kelimeyi oku</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView edges={["top", "left", "right"]} style={styles.safeArea}>
        <StatusBar barStyle="light-content" backgroundColor="#3A2B26" />
        <View style={styles.container}>

          <View style={styles.header}>
            
            {/* ← GERİ BUTONU EKLENDİ */}
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
              <Text style={styles.backText}>←</Text>
            </TouchableOpacity>
            {/* ← GERİ BUTONU BİTİŞ */}
            
            <Text style={[styles.headerTitle, fontStyle]}>Oyunlar</Text>
            <Text style={[styles.headerSubtitle, fontStyle]}>Harf yakalama, kelime ve ses avı</Text>
          </View>

          <View style={styles.card}>
            <Animated.View pointerEvents="none" style={[styles.successOverlay, { opacity: successAnim }]} />
            {renderGameContent()}
          </View>
        </View>
      </SafeAreaView>
  );

};

export default Game;
