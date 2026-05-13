import React from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import { SudokuProvider } from './context/SudokuProvider';
import { ThemeProvider } from './context/ThemeProvider';
import { useTheme } from './hooks/useTheme';
import GamePage from './pages/GamePage';
import HighScorePage from './pages/HighScorePage';
import './App.css';

const Navigation = () => {
  const { isDark, toggleTheme } = useTheme();
  const location = useLocation();

  return (
    <nav className="main-nav">
      <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
        Spela
      </Link>
      <Link to="/highscores" className={location.pathname === '/highscores' ? 'active' : ''}>
        Highscores
      </Link>
      <button className="nav-button theme-toggle" onClick={toggleTheme}>
        {isDark ? '☀️ Ljust' : '🌙 Mörkt'}
      </button>
    </nav>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <SudokuProvider>
        <Router>
          <div className="app-container">
            <Navigation />
            <Routes>
              <Route path="/" element={<GamePage />} />
              <Route path="/highscores" element={<HighScorePage />} />
            </Routes>
          </div>
        </Router>
      </SudokuProvider>
    </ThemeProvider>
  );
};

export default App;