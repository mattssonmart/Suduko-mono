import  express  from "express";
import cors from 'cors';
import sudokuRoutes  from './src/routes/sudokuRoutes'

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/sudoku', sudokuRoutes);

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running: http://localhost:${PORT}`);
});