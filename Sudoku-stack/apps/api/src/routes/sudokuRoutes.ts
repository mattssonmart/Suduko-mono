import { Router } from "express";
import { GetNewGame, saveGame } from "../controllers/sudokuController";

const router = Router();

router.get('/new', GetNewGame);
router.get('/save', saveGame);

export default router;