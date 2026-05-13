import React, { useState } from 'react';
import { useSudoku } from '../hooks/useSudoku';
import SudokuBoard from '../components/SudokuBoard';
import type { Difficulty } from '@sudoku/logic';

const GamePage: React.FC = () => {
    const { game, startNewGame } = useSudoku();
    const [difficulty, setDifficulty] = useState<Difficulty>('easy');

    const handleNewGame = () => {
        startNewGame(difficulty);
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="game-page">
            <h1>Sudoku</h1>
            
            <div className="controls">
                <select 
                    value={difficulty} 
                    onChange={(e) => setDifficulty(e.target.value as Difficulty)}
                >
                    <option value="easy">Lätt</option>
                    <option value="medium">Medel</option>
                    <option value="hard">Svår</option>
                </select>
                <button onClick={handleNewGame}>Nytt Spel</button>
            </div>

            {game && (
                <>
                    <div className="status-bar">
                        <span>Tid: {formatTime(game.elapsedTime)}</span>
                        {game.isComplete && <span className="winner"> - Grattis! Du klarade det!</span>}
                    </div>
                    <SudokuBoard />
                </>
            )}
        </div>
    );
};

export default GamePage;