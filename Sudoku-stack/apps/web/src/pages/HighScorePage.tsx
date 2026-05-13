import React, { useState } from 'react';
import { storage } from '../utils/storage';
import type { HighScore } from '@sudoku/logic';

const HighScorePage: React.FC = () => {
    const [scores, setScores] = useState<HighScore[]>(() => storage.getHighScores());

    return (
        <div className="highscore-page">
            <h1>Highscores</h1>
            {scores.length === 0 ? (
                <p>Inga resultat än. Utmaningen väntar!</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Namn</th>
                            <th>Svårighet</th>
                            <th>Tid</th>
                            <th>Datum</th>
                        </tr>
                    </thead>
                    <tbody>
                        {scores.map((s, i) => (
                            <tr key={i}>
                                <td>{s.name}</td>
                                <td>{s.difficulty}</td>
                                <td>{Math.floor(s.time / 60)}:{(s.time % 60).toString().padStart(2, '0')}</td>
                                <td>{s.date}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            <button onClick={() => { localStorage.clear(); setScores([]); }}>Rensa Highscores</button>
        </div>
    );
};

export default HighScorePage;