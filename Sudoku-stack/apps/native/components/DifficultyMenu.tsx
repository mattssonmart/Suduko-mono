import React from 'react';
import { View, Text, Pressable, Modal } from 'react-native';
import { styles } from '../App.styles';

type Difficulty = 'easy' | 'medium' | 'hard';

interface DifficultyMenuProps {
  isVisible: boolean;
  onClose: () => void;
  onSelectDifficulty: (difficulty: Difficulty) => void;
}

const DIFFICULTIES: { label: string; value: Difficulty }[] = [
  { label: 'LÄTT', value: 'easy' },
  { label: 'MEDEL', value: 'medium' },
  { label: 'SVÅR', value: 'hard' },
];

const DifficultyMenu = ({ isVisible, onClose, onSelectDifficulty }: DifficultyMenuProps) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>SVÅRIGHETSGRAD</Text>

          {DIFFICULTIES.map(({ label, value }) => (
            <Pressable
              key={value}
              style={({ pressed }) => [
                styles.menuButton,
                pressed && { opacity: 0.7 },
              ]}
              onPress={() => onSelectDifficulty(value)}
            >
              <Text style={styles.menuButtonText}>{label}</Text>
            </Pressable>
          ))}

          <Pressable onPress={onClose}>
            <Text style={styles.cancelButtonText}>AVBRYT</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default DifficultyMenu;
