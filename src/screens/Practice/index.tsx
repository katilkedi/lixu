import React, { useState, useEffect, useCallback, useMemo } from "react";
import { View, Text, ScrollView, TouchableOpacity, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useVoice, VoiceMode } from "react-native-voicekit";
import { RootStackParamList } from "../../constants/home-types";
import { normalizeText, compareWords, tutucu, speakWord } from "./PracticeLogic";
import { DropdownButton, WordText, WordModal } from "./PracticeComponents";
import { styles } from "./PracticeStyles";
import { getMeaningfulWords, generateMathQuestion, type MathQuestion } from "../../utils/ai-helper";
import { getTopScores, saveTopScore } from "../../utils/storage";
import { useCooldown } from "../../utils/cooldown";
import { playCorrectAnswerSound, playRecordSound, playCompletionSound } from "../../utils/sound-effects";

type Props = NativeStackScreenProps<RootStackParamList, "Practice">;

const Practice: React.FC<Props> = ({ route, navigation }) => {
  const { listening, transcript, startListening, stopListening } = useVoice({
    locale: "tr-TR",
    mode: VoiceMode.Continuous,
    enablePartialResults: true
  });

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [recognized, setRecognized] = useState<string>("");
  const [wordSetIndex, setWordSetIndex] = useState<number>(0);
  const [currentWords, setCurrentWords] = useState<string[]>(() => getMeaningfulWords(20));
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [warning, setWarning] = useState<string>("");
  const [mistakeCount, setMistakeCount] = useState<number>(0);
  const [finished, setFinished] = useState<boolean>(false);
  const [mathScore, setMathScore] = useState(0);
  const [mathFeedback, setMathFeedback] = useState<string | null>(null);
  const [mathQuestion, setMathQuestion] = useState<MathQuestion>(() => generateMathQuestion('medium', 0));
  const [mode, setMode] = useState<"syllable" | "numbers">(route.params?.mode === "numbers" ? "numbers" : "syllable");
  const [mathLock, setMathLock] = useState(false);
  const [mathCorrect, setMathCorrect] = useState(false);
  const [topScore, setTopScore] = useState(0);
  const withCooldown = useCooldown(500);

  const wordSets = useMemo(() => [
    { title: "Basit Kelimeler (1 Hece)", words: getMeaningfulWords(15).filter(w => w.length <= 4) },
    { title: "Orta Kelimeler (1-2 Hece)", words: getMeaningfulWords(20) },
    { title: "Karma Kelimeler", words: getMeaningfulWords(25) },
  ], []);

  useEffect(() => {
    const loadTopScore = async () => {
      const scores = await getTopScores();
      setTopScore(mode === "numbers" ? scores.practiceNumbers : scores.practiceSyllable);
    };
    loadTopScore();
  }, [mode]);

  useEffect(() => {
    if (route.params?.mode === "numbers") {
      setMode("numbers");
      setMathScore(0);
      setMathFeedback(null);
      setMathCorrect(false);
      setMathQuestion(generateMathQuestion('medium', 0));
      if (listening) {
        stopListening();
      }
      navigation.setParams({ mode: undefined });
    }
  }, [route.params?.mode, listening, stopListening, navigation]);

  const restart = useCallback(() => {
    setCurrentIndex(0);
    setRecognized("");
    setWarning("");
    setMistakeCount(0);
    setFinished(false);
  }, []);

  const isNumbersMode = mode === "numbers";

  useEffect(() => {
    if (!transcript || isNumbersMode) return;

    const norm = normalizeText(transcript);
    const words = norm.split(" ").filter(Boolean);
    const lastRaw = words[words.length - 1] || "";

    setRecognized(lastRaw);

    setCurrentIndex((prev) => {
      const target = normalizeText(currentWords[prev] || "");

      if (lastRaw === target && target.length > 0) {
        setWarning("");
        if (prev === currentWords.length - 1) {
          setFinished(true);
          stopListening();
          const finalScore = currentWords.length - mistakeCount;
          saveTopScore("practiceSyllable", finalScore).then((isNewRecord) => {
            if (isNewRecord) {
              setTopScore(finalScore);
              playRecordSound();
            }
            playCompletionSound();
          });
          return prev;
        }
        return prev + 1;
      } else {
        const msg = compareWords(target, lastRaw);
        tutucu(target, lastRaw);
        if (msg) {
          setWarning(msg);
          setMistakeCount((c) => c + 1);
        }
        return prev;
      }
    });
  }, [transcript, currentWords, stopListening, isNumbersMode, mistakeCount]);

  const handleSelectWordSet = (index: number) => {
    if (isNumbersMode) {
      setMode("syllable");
    }
    setWordSetIndex(index);
    const nextSet = wordSets[index];
    setCurrentWords(nextSet.words ?? []);
    restart();
    setIsModalVisible(false);
  };

  const handleMathAnswer = withCooldown((value: number) => {
    if (mathLock) return;
    if (value === mathQuestion.answer) {
      setMathLock(true);
      setMathCorrect(true);
      const newScore = mathScore + 1;
      setMathScore(newScore);
      setMathFeedback("Harika! Doğru cevap 🎉");
      
      saveTopScore("practiceNumbers", newScore).then((isNewRecord) => {
        if (isNewRecord) {
          setTopScore(newScore);
          playRecordSound();
        } else {
          playCorrectAnswerSound();
        }
      });
      
      setTimeout(() => {
        setMathQuestion(generateMathQuestion('medium', newScore));
        setMathFeedback(null);
        setMathCorrect(false);
        setMathLock(false);
      }, 1500);
    } else if (value < mathQuestion.answer) {
      setMathCorrect(false);
      setMathFeedback("Biraz daha büyük bir sayı dene.");
    } else {
      setMathCorrect(false);
      setMathFeedback("Daha küçük bir sayı denemelisin.");
    }
  });

  return (
    <SafeAreaView edges={["top", "left", "right"]} style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#3A2B26" />
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                  <Text style={styles.backText}>←</Text>
                </TouchableOpacity>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Pratikler</Text>
          <Text style={styles.headerSubtitle}>
            {isNumbersMode ? "Sayı oyunları ile ritim tut" : "Sesli heceler ve tekrar çalışmaları"}
          </Text>
        </View>

        <View style={styles.card}>
          {!isNumbersMode && (
            <>
              <DropdownButton label="Kelime Setini Seç" onPress={withCooldown(() => setIsModalVisible(true))} />
              <Text style={styles.title}>{wordSets[wordSetIndex].title}</Text>
              {topScore > 0 && (
                <Text style={styles.topScoreText}>🏆 En Yüksek Skor: {topScore}</Text>
              )}
            </>
          )}
          {isNumbersMode && (
            <View style={styles.modeSwitchRow}>
              <Text style={styles.title}>Sayılar</Text>
              {topScore > 0 && (
                <Text style={styles.topScoreText}>🏆 En Yüksek Skor: {topScore}</Text>
              )}
            </View>
          )}

          <WordModal
            visible={isModalVisible}
            data={wordSets}
            onSelect={handleSelectWordSet}
            onClose={withCooldown(() => setIsModalVisible(false))}
          />

          {isNumbersMode ? (
            <View style={styles.mathCard}>
              <Text style={styles.mathQuestion}>{mathQuestion.prompt}</Text>
              <View style={styles.mathOptions}>
                {mathQuestion.options.map((option) => (
                  <TouchableOpacity
                    key={`math-${option}`}
                    style={[styles.mathOption, mathCorrect && option === mathQuestion.answer && styles.mathOptionCorrect]}
                    onPress={() => handleMathAnswer(option)}
                  >
                    <Text style={styles.mathOptionLabel}>{option}</Text>
                  </TouchableOpacity>
                ))}
              </View>
              {mathFeedback ? <Text style={[styles.mathFeedback, mathCorrect && styles.mathFeedbackCorrect]}>{mathFeedback}</Text> : null}
              <Text style={styles.mathScore}>Puan: {mathScore}</Text>
            </View>
          ) : (
            <ScrollView style={styles.storyWrapper} showsVerticalScrollIndicator={false}>
              <View style={styles.storyContainer}>
                {currentWords.map((word, idx) => (
                  <WordText key={`${word}-${idx}`} word={word} isCurrent={idx === currentIndex} />
                ))}
              </View>
            </ScrollView>
          )}
        </View>

        {isNumbersMode ? (
          <View style={styles.mathHintCard}>
            <Text style={styles.mathHintTitle}>İpucu</Text>
            <Text style={styles.mathHintText}>Soruları yüksek sesle okuyarak ritim tutabilir ve zihinden işlem pratiği yapabilirsin.</Text>
          </View>
        ) : (
          <View style={styles.feedbackCard}>
            <Text style={styles.recognized}>{recognized}</Text>
            {warning !== "" && <Text style={styles.warning}>{warning}</Text>}
            <Text style={styles.counter}>Hata Sayısı: {mistakeCount}</Text>
            {finished && <Text style={styles.congrats}>🎉 Tebrikler, heceleri tamamladın! 🎉</Text>}

            <View style={styles.buttonContainer}>
              {!finished && (
                <TouchableOpacity style={[styles.button, listening ? styles.stopButton : styles.startButton]} onPress={withCooldown(listening ? stopListening : startListening)}>
                  <Text style={styles.buttonText}>{listening ? "Durdur" : "Başlat"}</Text>
                </TouchableOpacity>
              )}

              <TouchableOpacity style={[styles.button, styles.restartButton]} onPress={withCooldown(restart)}>
                <Text style={styles.buttonText}>Baştan başla</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, styles.ttsButton]}
                onPress={withCooldown(() => currentWords[currentIndex] && speakWord(currentWords[currentIndex]))}
                disabled={!currentWords[currentIndex]}
              >
                <Text style={styles.buttonText}>Kelimeyi oku</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Practice;
