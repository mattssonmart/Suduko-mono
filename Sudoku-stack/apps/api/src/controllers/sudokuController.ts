import { Difficulty, generateSudoku } from "@sudoku/logic";
import { Request, Response } from "express";

const activeGames: {seed: number; board: any}[] = [];

const checkSeedInFIFO = async (seed: number): Promise<boolean> => {
    return activeGames.some(game => game.seed === seed);
};


// get new board
export const GetNewGame = async (req: Request, res: Response): Promise<void> => {
    try {

        let seed: number = 0;
        let isTaken = true;

        while (isTaken) {
            seed = Math.floor(Math.random() * 1000000) +1;
            isTaken = await checkSeedInFIFO(seed);
        } 

        const  difficulty   = req.query.difficulty as Difficulty;
        const { board } = generateSudoku(difficulty, seed);

        if (activeGames.length >= 500) {
            activeGames.shift();
        }
        activeGames.push({ seed: seed, board: board});
        
        res.json({ 
            success: true,
            board: board,
            seed: seed
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