import React from 'react';
import { useSudoku } from '../hooks/useSudoku';
import SudokuCell from './SudokuCell';

const SudokuBoard: React.FC = () => {
    const { game } = useSudoku();

    if (!game) return null;

    return (
        <div className="sudoku-board">
            {game.currentBoard.map((row, rowIndex) => (
                <div key={`row-${rowIndex}`} className="sudoku-row">
                    {row.map((value, colIndex) => {
                        const blockRow = Math.floor(rowIndex / 3);
                        const blockCol = Math.floor(colIndex / 3);
                        const blockIndex = blockRow * 3 + blockCol;
                        const isInitial = game.initialBoard[rowIndex]![colIndex] !== 0;

                        return (
                            <SudokuCell
                                key={`${rowIndex}-${colIndex}`}
                                row={rowIndex}
                                col={colIndex}
                                value={value}
                                isInitial={isInitial}
                                blockIndex={blockIndex}
                            />
                        );
                    })}
                </div>
            ))}
        </div>
    );
};

export default SudokuBoard;
