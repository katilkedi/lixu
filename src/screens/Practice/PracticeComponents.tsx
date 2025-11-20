import React from "react";
import { View, Text, TouchableOpacity, FlatList, Modal } from "react-native";
import { styles } from "./PracticeStyles";

interface DropdownButtonProps {
  onPress: () => void;
  label: string;
}

export const DropdownButton: React.FC<DropdownButtonProps> = ({ onPress, label }) => (
  <TouchableOpacity style={styles.dropdownButton} onPress={onPress}>
    <Text style={styles.buttonText}>{label}</Text>
  </TouchableOpacity>
);

interface WordProps {
  word: string;
  isCurrent: boolean;
}

export const WordText: React.FC<WordProps> = ({ word, isCurrent }) => {
  const fontSize = isCurrent ? 32 : 24;
  const color = isCurrent ? "#3A2B26" : "rgba(58, 43, 38, 0.4)";
  return (
    <Text style={{ fontSize, marginRight: 6, color, fontWeight: isCurrent ? "bold" : "normal" }}>
      {word}{" "}
    </Text>
  );
};

interface ModalProps {
  visible: boolean;
  data: { title: string; words: string[] }[];
  onSelect: (index: number) => void;
  onClose: () => void;
}

export const WordModal: React.FC<ModalProps> = ({ visible, data, onSelect, onClose }) => (
  <Modal visible={visible} transparent animationType="slide">
    <View style={styles.modalOverlay}>
      <View style={styles.modalContent}>
        <Text style={styles.modalTitle}>Kelime Setleri</Text>

        <FlatList
          data={data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              style={styles.modalItem}
              onPress={() => onSelect(index)}
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
