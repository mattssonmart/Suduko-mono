import type { Board, SudokuValue } from './types';


// Linear Congruential Generator
function seededRandom(seed:number) {
    const m = 0x80000000;
    const a = 1103515245;
    const c = 12345;

    let s = seed;
    return function() {
        s = (a* s+ c) % m;
        return s/m;
    };
}

// Tomt 0-bräde
export function createEmptyBoard(): Board {
    return Array.from({ length: 9 }, () => Array(9).fill(0)) as Board;
}

// Fisher-Yates shuffle
export function shuffle<T>(array: T[], seed?: number): T[] {
    const newArray = [...array];
    const rand = seed !== undefined ? seededRandom(seed) : Math.random
    for (let i = newArray.length - 1; i > 0; i--) {
        const k = Math.floor(rand() * (i + 1));
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

export function generateSolution(board: Board, seed?: number): boolean {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (board[row]![col] === 0) {
                const numbers = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9], seed);
                for (const num of numbers) {
                    if (boardIsValid(board, row, col, num)) {
                        board[row]![col] = num as SudokuValue;
                        if (generateSolution(board, seed)) {
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