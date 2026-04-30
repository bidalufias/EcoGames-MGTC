import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { Box } from '@mui/material';
import { Suspense, lazy, useEffect } from 'react';
import { ecoTheme } from './theme/ecoTheme';
import BackToHome from './components/BackToHome';
import MgtcLogo from './components/MgtcLogo';
import LandingPage from './pages/LandingPage';
import GamePage from './pages/GamePage';

const ClimateNinjaGame = lazy(() => import('./games/climate-ninja/ClimateNinjaGame'));
const CarbonCrushGame = lazy(() => import('./games/carbon-crush/CarbonCrushGame'));
const RecycleRushGame = lazy(() => import('./games/recycle-rush/RecycleRushGame'));
const EcoMemoryGame = lazy(() => import('./games/eco-memory/EcoMemoryGame'));
const GreenDefenceGame = lazy(() => import('./games/green-defence/GreenDefenceGame'));
const Climate2048Game = lazy(() => import('./games/climate-2048/Climate2048Game'));

const loadingStyle = { width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94A3B8' } as const;

// Per-route letterbox color so the bars on either side of the 16:9 stage
// blend with the active page rather than showing as a hard dark band.
// Values match the dominant outer surface of each game/page.
const FRAME_BG: Record<string, string> = {
  '/': '#FAF7F0',
  '/games/climate-ninja': '#FAFBFC',
  '/games/carbon-crush': '#F0F3F7',
  '/games/recycle-rush': '#F0F3F7',
  '/games/eco-memory': '#FFFCF5',
  '/games/green-defence': '#F0F3F7',
  '/games/climate-2048': '#FAF8EF',
};
const DEFAULT_FRAME_BG = '#FAF7F0';

function AppLayout() {
  const location = useLocation();
  const isGamePage = location.pathname.startsWith('/games/');

  useEffect(() => {
    const bg = FRAME_BG[location.pathname] ?? DEFAULT_FRAME_BG;
    document.documentElement.style.setProperty('--frame-bg', bg);
  }, [location.pathname]);

  // These games render their own header on the menu screens and hide it
  // during play, so suppress the global header for those routes.
  const ownsHeader =
    location.pathname === '/games/eco-memory' ||
    location.pathname === '/games/climate-2048' ||
    location.pathname === '/games/recycle-rush';
  const showGlobalHeader = isGamePage && !ownsHeader;

  return (
    <>
      {showGlobalHeader && <MgtcLogo />}
      {showGlobalHeader && <BackToHome />}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/games/climate-ninja" element={
          <Suspense fallback={<Box sx={loadingStyle}>Loading...</Box>}>
            <ClimateNinjaGame />
          </Suspense>
        } />
        <Route path="/games/carbon-crush" element={
          <Suspense fallback={<Box sx={loadingStyle}>Loading...</Box>}>
            <CarbonCrushGame />
          </Suspense>
        } />
        <Route path="/games/recycle-rush" element={
          <Suspense fallback={<Box sx={loadingStyle}>Loading...</Box>}>
            <RecycleRushGame />
          </Suspense>
        } />
        <Route path="/games/eco-memory" element={
          <Suspense fallback={<Box sx={loadingStyle}>Loading...</Box>}>
            <EcoMemoryGame />
          </Suspense>
        } />
        <Route path="/games/green-defence" element={
          <Suspense fallback={<Box sx={loadingStyle}>Loading...</Box>}>
            <GreenDefenceGame />
          </Suspense>
        } />
        <Route path="/games/climate-2048" element={
          <Suspense fallback={<Box sx={loadingStyle}>Loading...</Box>}>
            <Climate2048Game />
          </Suspense>
        } />
        <Route path="/games/:gameId" element={<GamePage />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <ThemeProvider theme={ecoTheme}>
      <CssBaseline />
      <Box className="app-frame">
        <Box className="app-stage">
          <BrowserRouter>
            <AppLayout />
          </BrowserRouter>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
