import { createContext } from 'react';
import type { Difficulty, GameState, SudokuValue } from '@sudoku/logic';

export interface SudokuContextType {
    game: GameState | null;
    timer: number;
    startNewGame: (difficulty: Difficulty) => void;
    updateCell: (row: number, col: number, value: SudokuValue) => void;
}

export const SudokuContext = createContext<SudokuContextType | undefined>(undefined);