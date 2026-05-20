import { Difficulty, generateSudoku } from "@sudoku/logic";
import { Request, Response } from "express";


// get new board
export const GetNewGame = async (req: Request, res: Response): Promise<void> => {
    try {

        const  difficulty   = req.query.difficulty as Difficulty;
        const { board } = generateSudoku(difficulty);
        

        res.json({ 
            success: true,
            board: board
        });
    } catch (error) {
        console.error("Fel vid generering av spel:", error);
        res.status(500).json({ error: "Kunde inte hämta spelet"});
    }
};


// save game
export const saveGame = async (req: Request, res: Response) => {
    try {
        const { board, time } = req.body;

        res.json({ message: "Speldata mottage", date: { board, time }});
    } catch (error) {
        res.status(500).json({ error: "Kunde inte spara spelet"});
    }
};