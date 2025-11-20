import React, { useCallback, useEffect, useMemo, useState, useRef } from "react";
import { View, Text, ScrollView, TouchableOpacity, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useVoice, VoiceMode } from "react-native-voicekit";
import { RootStackParamList } from "../../constants/home-types";
import { stories } from "../../constants/stories";
import { normalizeText, normalizeWithMap, compareWords, tutucu, mistakenLetters, generateStory, speakWord, speakSentence } from "./StoryLogic";
import { DropdownButton, StoryModal, WordText } from "./StoryComponents";
import { styles } from "./StoryStyles";
import { getTopScores, saveTopScore } from "../../utils/storage";
import { useCooldown } from "../../utils/cooldown";
import { playRecordSound, playCompletionSound } from "../../utils/sound-effects";
import { getSettings } from "../../utils/settings";

type Props = NativeStackScreenProps<RootStackParamList, "Story">;

const resolveStoryIndex = (storyKey?: string) => {
  if (!storyKey) {
    return 0;
  }
  const idx = stories.findIndex((item) => item.title === storyKey);
  return idx === -1 ? 0 : idx;
};

const StoryScreen: React.FC<Props> = ({ navigation, route }) => {
  const initialIndex = useMemo(() => resolveStoryIndex(route.params?.storyKey), [route.params?.storyKey]);

  const { listening, transcript, startListening, stopListening } = useVoice({
    locale: "tr-TR",
    mode: VoiceMode.Continuous,
    enablePartialResults: true
  });

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [recognized, setRecognized] = useState<string>("");
  const [storyIndex, setStoryIndex] = useState<number>(initialIndex);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [warning, setWarning] = useState<string>("");
  const [finished, setFinished] = useState<boolean>(false);
  const [highlightedWords, setHighlightedWords] = useState<number[]>([]);
  const [sessionActive, setSessionActive] = useState(false);
  const [fontSize, setFontSize] = useState(24);
  const withCooldown = useCooldown(500);

  useEffect(() => {
    const loadFontSize = async () => {
      const settings = await getSettings();
      setFontSize(24 * settings.fontSize); // Base 24 * multiplier
    };
    loadFontSize();
  }, []);
  const scrollViewRef = React.useRef<ScrollView>(null);

  const restart = useCallback(() => {
    stopListening();
    setSessionActive(false);
    setCurrentIndex(0);
    setRecognized("");
    setWarning("");
    setFinished(false);
    setHighlightedWords([]);
  }, [stopListening]);

  const applyStory = useCallback((index: number) => {
    setStoryIndex(index);
    restart();
  }, [restart]);

  useEffect(() => {
    const idx = resolveStoryIndex(route.params?.storyKey);
    if (idx !== storyIndex) {
      applyStory(idx);
    }
  }, [route.params?.storyKey, storyIndex, applyStory]);

  const storyWords = useMemo(() => stories[storyIndex]?.words ?? [], [storyIndex]);

  const handleMicToggle = useCallback(() => {
    if (listening) {
      stopListening();
      setSessionActive(false);
    } else {
      startListening();
      setSessionActive(true);
    }
  }, [listening, startListening, stopListening]);

  useEffect(() => {
    if (!listening && sessionActive) {
      setSessionActive(false);
    }
  }, [listening, sessionActive]);

  useFocusEffect(
    useCallback(() => {
      return () => {
        stopListening();
        setSessionActive(false);
      };
    }, [stopListening])
  );

  useEffect(() => {
    if (!transcript || storyWords.length === 0) return;

    const norm = normalizeText(transcript);
    const words = norm.split(" ").filter(Boolean);
    const lastRaw = words[words.length - 1] || "";
    const fixed = normalizeWithMap(lastRaw);

    setRecognized(fixed);

    setCurrentIndex((prev) => {
      const target = normalizeText(storyWords[prev] || "");

      if (fixed === target && target.length > 0) {
        setWarning("");
        const nextIndex = prev === storyWords.length - 1 ? prev : prev + 1;
        
        // Auto-scroll to current word
        if (scrollViewRef.current && nextIndex > 0) {
          setTimeout(() => {
            // Calculate approximate position
            const wordsPerRow = 6;
            const rowHeight = 60;
            const targetRow = Math.floor(nextIndex / wordsPerRow);
            scrollViewRef.current?.scrollTo({ y: targetRow * rowHeight, animated: true });
          }, 100);
        }
        
        if (prev === storyWords.length - 1) {
          setFinished(true);
          stopListening();
          const finalScore = storyWords.length;
          saveTopScore("story", finalScore).then((isNewRecord) => {
            if (isNewRecord) {
              playRecordSound();
            }
            playCompletionSound();
          });
          return prev;
        }
        return nextIndex;
      } else {
        const msg = compareWords(target, fixed);
        tutucu(target, fixed);
        if (msg) {
          setWarning(msg);
        }
        return prev;
      }
    });
  }, [transcript, storyWords, stopListening]);

  return (
    <SafeAreaView edges={["top", "left", "right"]} style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#3A2B26" />
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Text style={styles.backText}>←</Text>
          </TouchableOpacity>
          <View>
            <Text style={styles.headerTitle}>Hikayeler</Text>
            <Text style={styles.headerSubtitle}>Sesli okuma pratikleri</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.title}>📖 {stories[storyIndex].title}</Text>

          <StoryModal
            visible={isModalVisible}
            data={stories}
            onSelect={withCooldown(({ index }) => {
              applyStory(index);
              setIsModalVisible(false);
            })}
            onClose={withCooldown(() => setIsModalVisible(false))}
          />

          <ScrollView 
            ref={scrollViewRef}
            style={styles.storyWrapper} 
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.storyContainer}>
              {(() => {
                // Group words into sentences
                const sentences: number[][] = [];
                let currentSentence: number[] = [];
                
                storyWords.forEach((word, idx) => {
                  currentSentence.push(idx);
                  if (word.includes(".") || word.includes("!") || word.includes("?")) {
                    sentences.push([...currentSentence]);
                    currentSentence = [];
                  }
                });
                if (currentSentence.length > 0) {
                  sentences.push(currentSentence);
                }
                
                // Find current sentence
                const currentSentenceIndex = sentences.findIndex(s => s.includes(currentIndex));
                const activeSentence = currentSentenceIndex >= 0 ? sentences[currentSentenceIndex] : [];
                
                return storyWords.map((word, idx) => {
                  const isInCurrentSentence = activeSentence.includes(idx);
                  const isCurrent = idx === currentIndex;
                  
                  return (
                    <WordText 
                      key={`${word}-${idx}`} 
                      word={word} 
                      isCurrent={isCurrent}
                      isInCurrentSentence={isInCurrentSentence}
                      isPastSentence={currentSentenceIndex >= 0 && sentences.findIndex(s => s.includes(idx)) < currentSentenceIndex}
                      fontSize={fontSize}
                    />
                  );
                });
              })()}
            </View>
          </ScrollView>
        </View>

        <View style={styles.feedbackCard}>
          <Text style={styles.recognized}>{recognized}</Text>
          {warning !== "" && <Text style={styles.warning}>{warning}</Text>}
          {finished && <Text style={styles.congrats}>🎉 Tebrikler, hikayeyi tamamladın! 🎉</Text>}

          <View style={styles.buttonContainer}>
            {!finished && (
              <TouchableOpacity
                style={[styles.button, listening ? styles.stopButton : styles.startButton]}
                onPress={withCooldown(handleMicToggle)}
              >
                <Text style={styles.buttonText}>{listening ? "Durdur" : "Başlat"}</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity style={[styles.button, styles.restartButton]} onPress={withCooldown(restart)}>
              <Text style={styles.buttonText}>Baştan başla</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.button, styles.ttsButton]} onPress={withCooldown(() => speakWord(storyWords[currentIndex] || ""))}>
              <Text style={styles.buttonText}>Kelime oku</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.button, styles.ttsButton]} onPress={withCooldown(() => speakSentence(storyWords, currentIndex, setHighlightedWords))}>
              <Text style={styles.buttonText}>Cümle oku</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default StoryScreen;
