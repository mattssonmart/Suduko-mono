import { Board, Difficulty } from "../types";

export interface ApiResponse {
    success: boolean;
    board: Board;
    error?: string;
    
}

export const fetchNewGame = async (baseUrl: string, difficulty: Difficulty = 'easy'): Promise<ApiResponse> => {
    const respons = await fetch(`${baseUrl}/api/sudoku/new?difficulty=${difficulty}`);
    return await respons.json();
};