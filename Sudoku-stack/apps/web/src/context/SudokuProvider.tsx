import React, { useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { Board, Difficulty, GameState, SudokuValue, HighScore } from '@sudoku/logic';
import { createEmptyBoard, generateSolution } from '@sudoku/logic';
import { generatePuzzle } from '@sudoku/logic';
import { storage } from '../utils/storage';
import { SudokuContext } from './SudokuContext';

export const SudokuProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [game, setGame] = useState<GameState | null>(() => {
        const saved = storage.getSavedGame();
        return (saved && !saved.isComplete) ? saved : null;
    });

    const [timer, setTimer] = useState(() => {
        const saved = storage.getSavedGame();
        return (saved && !saved.isComplete) ? saved.elapsedTime : 0;
    });

    const [isActive, setIsActive] = useState(() => {
        const saved = storage.getSavedGame();
        return !!(saved && !saved.isComplete);
    });

    const startNewGame = (difficulty: Difficulty) => {
        const board = createEmptyBoard();
        generateSolution(board);
        const solution = board.map(row => [...row]) as Board;

        const emptyCells = difficulty === 'easy' ? 35 : difficulty === 'medium' ? 45 : 55;
        const puzzle = generatePuzzle(board, emptyCells);

        const newState: GameState = {
            initialBoard: puzzle.map(row => [...row]) as Board,
            currentBoard: puzzle.map(row => [...row]) as Board,
            solution,
            difficulty,
            isComplete: false,
            elapsedTime: 0
        };

        setGame(newState);
        setTimer(0);
        setIsActive(true);
        storage.saveGame(newState);
    };

    const updateCell = (row: number, col: number, value: SudokuValue) => {
        if (!game || game.isComplete || game.initialBoard[row][col] !== 0) return;

        const newBoard = game.currentBoard.map(r => [...r]) as Board;
        newBoard[row][col] = value;

        const isComplete = JSON.stringify(newBoard) === JSON.stringify(game.solution);
        const updatedGame = { ...game, currentBoard: newBoard, isComplete };

        setGame(updatedGame);

        if (isComplete) {
            setIsActive(false);
            const name = prompt("Grattis! Ange ditt namn för highscore:") || "Anonym";
            const newScore: HighScore = {
                name,
                time: timer,
                difficulty: game.difficulty,
                date: new Date().toLocaleDateString()
            };
            storage.saveHighScore(newScore);
        }

        storage.saveGame(updatedGame);
    };

    useEffect(() => {
        let interval: number;
        if (isActive) {
            interval = window.setInterval(() => setTimer(t => t + 1), 1000);
        }
        return () => clearInterval(interval);
    }, [isActive]);

    return (
        <SudokuContext.Provider value={{ game, timer, startNewGame, updateCell }}>
            {children}
        </SudokuContext.Provider>
    );
};