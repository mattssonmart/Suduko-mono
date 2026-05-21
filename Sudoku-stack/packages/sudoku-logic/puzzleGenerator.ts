import type { Board, SudokuValue } from './types';
import { shuffle, boardIsValid, createEmptyBoard, generateSolution } from './generator';

export function generatePuzzle(board: Board, emptyCells: number): Board {
    const puzzle = board.map(row => [...row]) as Board;
    let removed = 0;
    let positions: [number, number][] = [];

    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            positions.push([row, col]);
        }
    }
    positions = shuffle(positions);

    let i = 0;
    while (removed < emptyCells && i < positions.length) {
        const pos = positions[i]!;
        const row = pos[0];
        const col = pos[1];

        const symRow = 8 - row;
        const symCol = 8 - col;
        const sameCell = row === symRow && col === symCol;

        const temp1 = puzzle[row]![col];
        const temp2: SudokuValue | null = sameCell ? null : (puzzle[symRow]![symCol] ?? null);

        if (temp1 !== 0) {
            puzzle[row]![col] = 0;
            if (!sameCell && temp2 !== null && temp2 !== 0) puzzle[symRow]![symCol] = 0;

            if (countSolutions(puzzle) === 1) {
                removed += sameCell ? 1 : 2;
            } else {
                puzzle[row]![col] = temp1;
                if (!sameCell && temp2 !== null) puzzle[symRow]![symCol] = temp2;
            }
        }
        i++;
    }
    return puzzle;
}

export function countSolutions(board: Board): number {
    let solutions = 0;

    function solve(b: Board) {
        if (solutions > 1) return;

        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                if (b[row]![col] === 0) {
                    for (let num = 1; num <= 9; num++) {
                        if (boardIsValid(b, row, col, num)) {
                            b[row]![col] = num as SudokuValue;
                            solve(b);
                            b[row]![col] = 0;
                        }
                    }
                    return;
                }
            }
        }
        solutions++;
    }

    const boardCopy = board.map(row => [...row]) as Board;
    solve(boardCopy);
    return solutions;
}

export function generateSudoku(difficulty: 'easy' | 'medium' | 'hard' = 'easy', seed?: number) {
    const fullBoard = createEmptyBoard();
    const { seed } = req.body;
    generateSolution(fullBoard, seed);

    const emptyCellsMap = {
        easy: 30,
        medium: 45,
        hard: 60
    };

    const cellsToRemove = emptyCellsMap[difficulty]
    const puzzleBoard = generatePuzzle(fullBoard, cellsToRemove);

    return {
        board: puzzleBoard,
        solution: fullBoard
    };
}