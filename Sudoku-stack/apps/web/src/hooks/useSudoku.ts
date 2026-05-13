import { useContext } from 'react';
import { SudokuContext } from '../context/SudokuContext';

export const useSudoku = () => {
    const context = useContext(SudokuContext);
    if (!context) throw new Error("useSudoku must be used within SudokuProvider");
    return context;
};