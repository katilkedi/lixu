import React from "react";
import { View, Text, TouchableOpacity, FlatList, Modal } from "react-native";
import { styles } from "./StoryStyles";

interface DropdownButtonProps {
  onPress: () => void;
  label: string;
}

export const DropdownButton: React.FC<DropdownButtonProps> = ({ onPress, label }) => (
  <TouchableOpacity style={styles.dropdownButton} onPress={onPress}>
    <Text style={styles.buttonText}>{label}</Text>
  </TouchableOpacity>
);

interface ModalProps {
  visible: boolean;
  data: { title: string; words: string[] }[];
  onSelect: (payload: { index: number; item: { title: string; words: string[] } }) => void;
  onClose: () => void;
}

export const StoryModal: React.FC<ModalProps> = ({ visible, data, onSelect, onClose }) => (
  <Modal visible={visible} transparent animationType="slide">
    <View style={styles.modalOverlay}>
      <View style={styles.modalContent}>
        <Text style={styles.modalTitle}>Hikayeler</Text>

        <FlatList
          data={data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              style={[styles.modalItem, item.title.includes("AI") && { backgroundColor: "#e0ffe0" }]}
              onPress={() => onSelect({ index, item })}
            >
              <Text style={styles.modalItemText}>{item.title}</Text>
            </TouchableOpacity>
          )}
        />

        <TouchableOpacity style={styles.modalClose} onPress={onClose}>
          <Text style={styles.modalCloseText}>Kapat</Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
);

interface WordProps {
  word: string;
  isCurrent: boolean;
  isInCurrentSentence: boolean;
  isPastSentence: boolean;
}

const dyslexiaColorPalette = [
  { test: /[bdpqBDPQ]/, color: "#E45858", backgroundColor: "rgba(228, 88, 88, 0.18)" },
  { test: /[mnMN]/, color: "#2C9DA7", backgroundColor: "rgba(44, 157, 167, 0.18)" },
  { test: /[gğqGĞQ]/, color: "#E79C21", backgroundColor: "rgba(231, 156, 33, 0.18)" },
  { test: /[çÇşŞ]/, color: "#AC5BCB", backgroundColor: "rgba(172, 91, 203, 0.2)" },
  { test: /[aeıioöuüAEIİOÖUÜ]/, color: "#1E4B99", backgroundColor: "rgba(30, 75, 153, 0.15)" },
];

const getDyslexiaLetterStyle = (char: string) => {
  const palette = dyslexiaColorPalette.find((item) => item.test.test(char));
  if (palette) {
    return {
      color: palette.color,
      backgroundColor: palette.backgroundColor,
    };
}
  return {
    color: "#3A2B26",
    backgroundColor: "transparent",
  };
};

export const WordText: React.FC<WordProps & { fontSize?: number }> = ({ word, isCurrent, isInCurrentSentence, isPastSentence, fontSize: customFontSize }) => {
  // Base font sizes
  const baseFontSize = customFontSize || 24;
  const currentFontSize = customFontSize ? customFontSize * 1.3 : 30;
  const sentenceFontSize = customFontSize ? customFontSize * 1.1 : 26;
  
  // Past sentences: very faded
  if (isPastSentence) {
    return (
      <Text style={{ fontSize: baseFontSize, marginRight: 6, color: "rgba(58, 43, 38, 0.05)" }}>
        {word}{" "}
      </Text>
    );
  }

  // Future sentences: extremely faded
  if (!isInCurrentSentence) {
    return (
      <Text style={{ fontSize: baseFontSize, marginRight: 6, color: "rgba(58, 43, 38, 0.03)" }}>
        {word}{" "}
      </Text>
    );
  }

  // Current sentence: visible with shadow effect, current word highlighted
  const fontSize = isCurrent ? currentFontSize : sentenceFontSize;
  const fontWeight = isCurrent ? "bold" : "normal";
  const backgroundColor = isCurrent ? "rgba(255, 200, 0, 0.3)" : "transparent";
  const textShadowColor = isCurrent ? "rgba(0, 0, 0, 0.3)" : "rgba(0, 0, 0, 0.15)";
  const textShadowOffset = isCurrent ? { width: 2, height: 2 } : { width: 1, height: 1 };
  const textShadowRadius = isCurrent ? 3 : 1;

  return (
    <Text style={{ 
      fontSize, 
      marginRight: 6, 
      color: "#3A2B26", 
      lineHeight: fontSize * 1.4, 
      fontWeight, 
      backgroundColor, 
      paddingHorizontal: isCurrent ? 4 : 0, 
      borderRadius: isCurrent ? 6 : 0,
      textShadowColor,
      textShadowOffset,
      textShadowRadius,
    }}>
      {word.split("").map((ch, i) => {
        const letterStyle = getDyslexiaLetterStyle(ch);
        return (
          <Text
            key={`${ch}-${i}`}
            style={{
              color: letterStyle.color,
              backgroundColor: isCurrent ? letterStyle.backgroundColor : "transparent",
              paddingHorizontal: isCurrent ? 1 : 0,
              borderRadius: isCurrent ? 4 : 0,
              textShadowColor: isCurrent ? "rgba(0, 0, 0, 0.2)" : "rgba(0, 0, 0, 0.1)",
              textShadowOffset: isCurrent ? { width: 1, height: 1 } : { width: 0.5, height: 0.5 },
              textShadowRadius: isCurrent ? 2 : 1,
            }}
          >
            {ch}
          </Text>
        );
      })}
      {" "}
    </Text>
  );
};
