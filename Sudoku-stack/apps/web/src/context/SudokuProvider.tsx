import React, { useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { Board, Difficulty, GameState, SudokuValue, HighScore } from '@sudoku/logic';
import { generateSolution, fetchNewGame } from '@sudoku/logic';
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

    const startNewGame = async (difficulty: Difficulty) => {
        const response = await fetchNewGame('http://localhost:5000', difficulty)
        const puzzle = response.board;
        const boardCopy = puzzle.map(row => [...row]);
        generateSolution(boardCopy);
        const solution = boardCopy as Board;

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
        if (!game || game.isComplete || game.initialBoard[row]![col] !== 0) return;

        const newBoard = game.currentBoard.map(r => [...r]) as Board;
        newBoard[row]![col] = value;

        const isComplete = JSON.stringify(newBoard) === JSON.stringify(game.solution);
        const updatedGame: GameState = { ...game, currentBoard: newBoard, isComplete };

        setGame(updatedGame);

        if (isComplete) {
            setIsActive(false);
            const name = prompt('Grattis! Ange ditt namn för highscore:') || 'Anonym';
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
            interval = window.setInterval(() => setTimer((t: number) => t + 1), 1000);
        }
        return () => clearInterval(interval);
    }, [isActive]);

    return (
        <SudokuContext.Provider value={{ game, timer, startNewGame, updateCell }}>
            {children}
        </SudokuContext.Provider>
    );
};
