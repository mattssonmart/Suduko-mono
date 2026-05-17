import type { Board, SudokuValue } from './types';

// Tomt 0-bräde
export function createEmptyBoard(): Board {
    return Array.from({ length: 9 }, () => Array(9).fill(0)) as Board;
}

// Fisher-Yates shuffle
export function shuffle<T>(array: T[]): T[] {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const k = Math.floor(Math.random() * (i + 1));
        const temp = newArray[i] as T;
        newArray[i] = newArray[k] as T;
        newArray[k] = temp;
    }
    return newArray;
}

// Kan talet placeras på denna position?
export function boardIsValid(board: Board, row: number, col: number, num: number): boolean {
    // Kolla raden
    for (let i = 0; i < 9; i++) {
        if (board[row]![i] === num) return false;
    }

    // Kolla kolumnen
    for (let i = 0; i < 9; i++) {
        if (board[i]![col] === num) return false;
    }

    // Kolla 3x3-rutan
    const boxRow = Math.floor(row / 3) * 3;
    const boxCol = Math.floor(col / 3) * 3;

    for (let i = 0; i < 3; i++) {
        for (let k = 0; k < 3; k++) {
            if (board[boxRow + i]![boxCol + k] === num) return false;
        }
    }

    return true;
}

export function generateSolution(board: Board): boolean {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (board[row]![col] === 0) {
                const numbers = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]);
                for (const num of numbers) {
                    if (boardIsValid(board, row, col, num)) {
                        board[row]![col] = num as SudokuValue;
                        if (generateSolution(board)) {
                            return true;
                        }
                        // Backtrack
                        board[row]![col] = 0;
                    }
                }
                return false;
            }
        }
    }
    return true;
}