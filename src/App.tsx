import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { Box } from '@mui/material';
import { ecoTheme } from './theme/ecoTheme';
import EcoHeader from './components/EcoHeader';
import LandingPage from './pages/LandingPage';
import GamePage from './pages/GamePage';

function App() {
  return (
    <ThemeProvider theme={ecoTheme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: '100vh',
          background: 'linear-gradient(180deg, #0A1628 0%, #0D1B30 50%, #0A1628 100%)',
          backgroundAttachment: 'fixed',
        }}
      >
        <BrowserRouter>
          <EcoHeader />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/games/:gameId" element={<GamePage />} />
          </Routes>
        </BrowserRouter>
      </Box>
    </ThemeProvider>
  );
}

export default App;
