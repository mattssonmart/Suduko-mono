import type { HighScore, GameState } from "../types";

const HIGHSCORE_key = 'sudoku_highscores';
const SAVE_GAME_KEY = 'sudoku_current_game';

export const storage = {

    saveHighScore: (score: HighScore) => {
        const scores = storage.getHighScores();
        scores.push(score);
        scores.sort((a, b) => a.time - b.time);
        localStorage.setItem(HIGHSCORE_key, JSON.stringify(scores.slice(0, 10)));
    },

    getHighScores: (): HighScore[] => {
        const data = localStorage.getItem(HIGHSCORE_key);
        return data ? JSON.parse(data) : [];
    },

    saveGame: (state: GameState) => {
        localStorage.setItem(SAVE_GAME_KEY, JSON.stringify(state));
    },

    getSavedGame: (): GameState | null => {
        const data = localStorage.getItem(SAVE_GAME_KEY);
        return data ? JSON.parse(data) : null;
    }
};