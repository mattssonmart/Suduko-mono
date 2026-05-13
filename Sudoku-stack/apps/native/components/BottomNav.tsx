import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Trophy, Settings, PlusCircle } from 'lucide-react-native';
import { styles } from '../App.styles';

interface BottomNavProps {
  onNewGamePress: () => void;
}

const BottomNav = ({ onNewGamePress }: BottomNavProps) => {
  return (
    <View style={styles.bottomNav}>
      <Pressable style={styles.navItem} onPress={onNewGamePress}>
        <PlusCircle color="#FFFFFF" size={24} />
        <Text style={styles.navText}>Nytt spel</Text>
      </Pressable>

      <Pressable style={styles.navItem} onPress={() => console.log("Highscore")}>
        <Trophy color="#FFFFFF" size={24} />
        <Text style={styles.navText}>Highscore</Text>
      </Pressable>

      <Pressable style={styles.navItem} onPress={() => console.log("Settings")}>
        <Settings color="#FFFFFF" size={24} />
        <Text style={styles.navText}>Inställningar</Text>
      </Pressable>
    </View>
  );
};

export default BottomNav;