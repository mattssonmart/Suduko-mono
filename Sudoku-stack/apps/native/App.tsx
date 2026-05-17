import React, { useState, useEffect, useCallback } from 'react';
import { generateSudoku } from '@sudoku/logic';
import { Text, View, StatusBar, Pressable, Alert } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { styles } from './App.styles';
import BottomNav from './components/BottomNav';
import DifficultyMenu from './components/DifficultyMenu';

type Difficulty = 'easy' | 'medium' | 'hard';

function createGame(difficulty: Difficulty) {
  const g = generateSudoku(difficulty);
  return {
    ...g,
    board: g.board.map(row => row.map(cell => cell ?? 0)),
    solution: g.solution.map(row => row.map(cell => cell ?? 0)),
  };
}

export default function App() {
  const [game, setGame] = useState(() => createGame('easy'));
  const [playerBoard, setPlayerBoard] = useState<number[][]>(() =>
    game.board.map(row => [...row])
  );
  const [selectedCell, setSelectedCell] = useState<[number, number] | null>(null);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(true);
  const [isGameFinished, setIsGameFinished] = useState(false);
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const startNewGame = useCallback((difficulty: Difficulty) => {
    const newGame = createGame(difficulty);
    setGame(newGame);
    setPlayerBoard(newGame.board.map(row => [...row]));
    setSeconds(0);
    setIsActive(true);
    setIsGameFinished(false);
    setSelectedCell(null);
    setIsMenuVisible(false);
  }, []);

  // Timer
  useEffect(() => {
    if (!isActive || isGameFinished) return;
    const interval = setInterval(() => setSeconds(prev => prev + 1), 1000);
    return () => clearInterval(interval);
  }, [isActive, isGameFinished]);

  // Vinstkontroll
  useEffect(() => {
    if (isGameFinished) return;
    const isFull = playerBoard.every(row => row.every(cell => cell !== 0));
    if (!isFull) return;

    const isCorrect = playerBoard.every((row, rIdx) =>
      row.every((cell, cIdx) => cell === game.solution[rIdx][cIdx])
    );

    if (isCorrect) {
      setIsGameFinished(true);
      setIsActive(false);
      Alert.alert('Snyggt jobbat!', `Du klarade det på ${formatTime(seconds)}!`, [
        { text: 'Nytt spel', onPress: () => setIsMenuVisible(true) },
        { text: 'Stäng' },
      ]);
    } else {
      Alert.alert('Nära men inte riktigt', 'Något stämmer inte, kolla igen.');
    }
  }, [playerBoard, game.solution, isGameFinished, seconds]);

  const handleNumPress = (num: number) => {
    if (!selectedCell || isGameFinished) return;
    const [row, col] = selectedCell;
    if (game.board[row][col] !== 0) return;

    setPlayerBoard(prev => {
      const next = prev.map(r => [...r]);
      next[row][col] = next[row][col] === num ? 0 : num;
      return next;
    });
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" />

        <View style={styles.header}>
          <Text style={styles.title}>Sudoku Native</Text>
          <View style={styles.timerContainer}>
            <Text style={styles.timerText}>{formatTime(seconds)}</Text>
          </View>
        </View>

        <View style={[styles.grid, isGameFinished && { opacity: 0.7 }]}>
          {playerBoard.map((row, rowIndex) => (
            <View key={`row-${rowIndex}`} style={styles.row}>
              {row.map((cell, colIndex) => {
                const isEvenBlock = (Math.floor(rowIndex / 3) + Math.floor(colIndex / 3)) % 2 === 0;
                const isRightEdge = (colIndex + 1) % 3 === 0 && colIndex < 8;
                const isBottomEdge = (rowIndex + 1) % 3 === 0 && rowIndex < 8;
                const isSelected = selectedCell?.[0] === rowIndex && selectedCell?.[1] === colIndex;
                const isOriginal = game.board[rowIndex][colIndex] !== 0;

                return (
                  <Pressable
                    key={`cell-${rowIndex}-${colIndex}`}
                    onPress={() => !isGameFinished && setSelectedCell([rowIndex, colIndex])}
                    style={[
                      styles.cell,
                      isEvenBlock ? styles.blockEven : styles.blockOdd,
                      isOriginal && styles.cellOriginal,
                      isSelected && styles.selectedCell,
                      isRightEdge && styles.thickRight,
                      isBottomEdge && styles.thickBottom,
                    ]}
                  >
                    <Text style={[
                      styles.cellText,
                      isOriginal ? styles.cellTextOriginal : styles.cellTextPlayer,
                      isSelected && styles.selectedText,
                    ]}>
                      {cell !== 0 ? cell : ''}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          ))}
        </View>

        <View style={[styles.numpad, isGameFinished && { opacity: 0.3 }]}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <Pressable
              key={num}
              style={({ pressed }) => [
                styles.numButton,
                pressed && styles.numButtonPressed,
              ]}
              onPress={() => handleNumPress(num)}
            >
              <Text style={styles.numButtonText}>{num}</Text>
            </Pressable>
          ))}
        </View>

        <BottomNav onNewGamePress={() => setIsMenuVisible(true)} />

        <DifficultyMenu
          isVisible={isMenuVisible}
          onClose={() => setIsMenuVisible(false)}
          onSelectDifficulty={startNewGame}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
