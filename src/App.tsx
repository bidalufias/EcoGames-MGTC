import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { Box } from '@mui/material';
import { Suspense, lazy } from 'react';
import { ecoTheme } from './theme/ecoTheme';
import EcoHeader from './components/EcoHeader';
import LandingPage from './pages/LandingPage';
import GamePage from './pages/GamePage';

const ClimateNinjaGame = lazy(() => import('./games/climate-ninja/ClimateNinjaGame'));

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
            <Route path="/games/climate-ninja" element={
              <Suspense fallback={<Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#8892B0' }}>Loading Climate Ninja...</Box>}>
                <ClimateNinjaGame />
              </Suspense>
            } />
            <Route path="/games/:gameId" element={<GamePage />} />
          </Routes>
        </BrowserRouter>
      </Box>
    </ThemeProvider>
  );
}

export default App;
