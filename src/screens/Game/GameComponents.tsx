import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { getLetterColor, getWordEmoji } from "./GameLogic";
import { styles } from "./GameStyles";

interface Props {
  currentWordSyllables: string[];
  selectedSyllables: string[];
  shuffledSyllables: string[];
  handleSyllablePress: (syl: string) => void;
  currentWord?: string;
}

export const WordDisplay: React.FC<Props> = ({ currentWordSyllables, selectedSyllables, currentWord }) => (
  <View style={styles.wordContainer}>
    {currentWord && (
      <Text style={styles.wordEmoji}>{getWordEmoji(currentWord)}</Text>
    )}
    {currentWordSyllables.map((_, idx) => (
      <View key={idx} style={styles.syllableBox}>
        <Text style={styles.syllableText}>
          {selectedSyllables[idx] || "_"}
        </Text>
      </View>
    ))}
  </View>
);

export const SyllableList: React.FC<Props> = ({ shuffledSyllables, handleSyllablePress }) => (
  <View style={styles.syllableListContainer}>
    {shuffledSyllables.map((syl, idx) => (
      <TouchableOpacity
        key={idx}
        style={styles.syllableButton}
        onPress={() => handleSyllablePress(syl)}
      >
        <Text style={styles.syllableText}>
          {syl.split("").map((ch, i) => {
            const color = getLetterColor(ch);
            return (
              <Text
                key={i}
                style={{ 
                  color, 
                  fontSize: 22, 
                  fontWeight: "bold",
                  backgroundColor: color !== "#3A2B26" ? `${color}20` : "transparent",
                  paddingHorizontal: 1,
                  borderRadius: 3,
                }}
              >
                {ch}
              </Text>
            );
          })}
        </Text>
      </TouchableOpacity>
    ))}
  </View>
);
