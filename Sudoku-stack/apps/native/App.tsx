import React, { useMemo, useState, useEffect, useRef } from 'react';
import { generateSudoku } from '@sudoku/logic';
import { Text, View, StatusBar, Pressable, Alert } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { styles } from './App.styles';

function normalizeBoard(board: (number | null | undefined)[][]): number[][] {
  return board.map(row => row.map(cell => cell ?? 0));
}

export default function App() {
  // Generera och normalisera spelet en gång
  const gameRef = useRef(() => {
    const g = generateSudoku('easy');
    return {
      ...g,
      board: normalizeBoard(g.board),
      solution: normalizeBoard(g.solution),
    };
  });

  const game = useMemo(() => gameRef.current(), []);

  // Alla hooks deklareras alltid i samma ordning
  const [selectedCell, setSelectedCell] = useState<[number, number] | null>(null);
  const [playerBoard, setPlayerBoard] = useState<number[][]>(() =>
    game.board.map(row => [...row])
  );

  useEffect(() => {
    const isFull = playerBoard.every(row => row.every(cell => cell !== 0));
    if (!isFull) return;

    const isCorrect = playerBoard.every((row, rIdx) =>
      row.every((cell, cIdx) => cell === game.solution[rIdx][cIdx])
    );

    if (isCorrect) {
      Alert.alert(
        'Snyggt jobbat!',
        'Du klarade pusslet utan att darra på manschetten!',
        [{ text: 'Tack!' }]
      );
    } else {
      Alert.alert(
        'Nära men skjuter ingen hare',
        'Något blev fel på vägen. Kolla siffrorna igen!'
      );
    }
  }, [playerBoard, game.solution]);

  const handleNumPress = (num: number) => {
    if (!selectedCell) return;
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
        <Text style={styles.title}>Sudoku Native</Text>

        <View style={styles.grid}>
          {playerBoard.map((row, rowIndex) => (
            <View key={`row-${rowIndex}`} style={styles.row}>
              {row.map((cell, colIndex) => {
                const blockRow = Math.floor(rowIndex / 3);
                const blockCol = Math.floor(colIndex / 3);
                const isEvenBlock = (blockRow + blockCol) % 2 === 0;
                const isRightEdge = (colIndex + 1) % 3 === 0 && colIndex < 8;
                const isBottomEdge = (rowIndex + 1) % 3 === 0 && rowIndex < 8;
                const isSelected =
                  selectedCell?.[0] === rowIndex && selectedCell?.[1] === colIndex;
                const isOriginal = game.board[rowIndex][colIndex] !== 0;

                return (
                  <Pressable
                    key={`cell-${rowIndex}-${colIndex}`}
                    onPress={() => setSelectedCell([rowIndex, colIndex])}
                    style={[
                      styles.cell,
                      isEvenBlock ? styles.blockEven : styles.blockOdd,
                      isOriginal && styles.cellOriginal,
                      isRightEdge && styles.thickRight,
                      isBottomEdge && styles.thickBottom,
                      isSelected && styles.selectedCell,
                    ]}
                  >
                    <Text
                      style={[
                        styles.cellText,
                        isOriginal ? styles.cellTextOriginal : styles.cellTextPlayer,
                        isSelected && styles.selectedText,
                      ]}
                    >
                      {cell !== 0 ? cell : ''}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          ))}
        </View>

        <View style={styles.numpad}>
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
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
