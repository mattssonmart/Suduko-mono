export type SudokuValue = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export type Board = SudokuValue[][];

export type Difficulty = 'easy' | 'medium' | 'hard';

export interface HighScore {
    name: string;
    time: number;
    difficulty: Difficulty;
    date: string;
}

export interface GameState {
    initialBoard: Board;
    currentBoard: Board;
    solution: Board;
    difficulty: Difficulty;
    isComplete: boolean;
    elapsedTime: number;
}