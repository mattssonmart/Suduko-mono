import React from 'react';
import { useSudoku } from '../hooks/useSudoku';
import type { SudokuValue } from '@sudoku/logic';

interface CellProps {
    row: number;
    col: number;
    value: SudokuValue;
    isInitial: boolean;
    blockIndex: number;
}

const SudokuCell: React.FC<CellProps> = ({ row, col, value, isInitial, blockIndex }) => {
    const { updateCell } = useSudoku();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        if (val === "") {
            updateCell(row, col, 0);
            return;
        }
        const lastChar = val.slice(-1);
        const num = parseInt(lastChar);
        if (num >= 1 && num <= 9) {
            updateCell(row, col, num as SudokuValue);
        }
    };

    const blockClass = blockIndex % 2 === 0 ? 'block-even' : 'block-odd';

    return (
        <input
            type="text"
            className={`sudoku-cell ${isInitial ? 'initial' : 'user-input'} ${blockClass}`}
            value={value === 0 ? '' : value}
            onChange={handleChange}
            disabled={isInitial}
            maxLength={1}
            inputMode="numeric"
        />
    );
};

export default SudokuCell;