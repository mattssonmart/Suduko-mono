import React from 'react';
import { View, Text, Pressable, Modal } from 'react-native';
import { styles } from '../App.styles';

interface DifficultyMenuProps {
  isVisible: boolean;
  onClose: () => void;
  onSelectDifficulty: (difficulty: 'easy' | 'medium' | 'hard') => void;
}

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
          
          <Pressable style={styles.menuButton} onPress={() => onSelectDifficulty('easy')}>
            <Text style={styles.menuButtonText}>LÄTT</Text>
          </Pressable>
          
          <Pressable style={styles.menuButton} onPress={() => onSelectDifficulty('medium')}>
            <Text style={styles.menuButtonText}>MEDEL</Text>
          </Pressable>
          
          <Pressable style={styles.menuButton} onPress={() => onSelectDifficulty('hard')}>
            <Text style={styles.menuButtonText}>SVÅR</Text>
          </Pressable>

          <Pressable onPress={onClose}>
            <Text style={styles.cancelButtonText}>AVBRYT</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default DifficultyMenu;