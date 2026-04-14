import { useState, useCallback, useRef, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import {
  createGrid,  findMatches, removeMatches, applyGravity,
  isAdjacent, swapTiles, hasValidMoves,
  GRID_COLS, DIRTY_TECH, CLEAN_TECH,
  CLEAN_TRANSITION_THRESHOLD,
} from './engine';
import type { Tile } from './engine';
import EcoButton from '../../components/EcoButton';

type Screen = 'intro' | 'playing' | 'gameover';

const FACTS = [
  '💡 In 2023, renewable energy generated 30% of global electricity',
  '🌍 The world needs to cut emissions 45% by 2030 to limit warming to 1.5°C',
  '☀️ Solar capacity has grown 26x in the last decade',
  '💨 Wind power could supply 18x current global electricity demand',
  '🔋 EV sales grew 35% in 2023 alone',
  '♻️ Recycling aluminum uses 95% less energy than making new',
  '🌳 Forests absorb 2.6 billion tons of CO₂ per year',
];

export default function CarbonCrushGame() {
  const [screen, setScreen] = useState<Screen>('intro');
  const [grid, setGrid] = useState<Tile[][]>([]);
  const [selected, setSelected] = useState<{ row: number; col: number } | null>(null);
  const [score, setScore] = useState(0);
  const [moves, setMoves] = useState(30);
  const [combo, setCombo] = useState(0);
  const [fact, setFact] = useState('');
  const [phaseLevel, setPhaseLevel] = useState(0); // 0 = dirty, 1+ = cleaner
  const nextId = useRef({ value: 100 });
  const processing = useRef(false);

  const startGame = useCallback(() => {
    const g = createGrid();
    setGrid(g);
    setScore(0);
    setMoves(30);
    setCombo(0);
    setSelected(null);
    setPhaseLevel(0);
    nextId.current = { value: 100 };
    setScreen('playing');
  }, []);

  const processMatches = useCallback((g: Tile[][]) => {
    const matched = findMatches(g);
    if (matched.size === 0) {
      processing.current = false;
      // Check for valid moves
      if (!hasValidMoves(g)) {
        // Reshuffle
        const fresh = createGrid();
        setGrid(fresh);
      }
      return;
    }

    const count = removeMatches(g, matched);
    const useClean = score + count * 10 * (combo + 1) >= CLEAN_TRANSITION_THRESHOLD;
    applyGravity(g, nextId.current, useClean);

    setCombo(c => c + 1);
    setScore(s => s + count * 10 * (combo + 1));

    // Show fact on combos
    if (combo > 0 && combo % 3 === 0) {
      setFact(FACTS[Math.floor(Math.random() * FACTS.length)]);
      setTimeout(() => setFact(''), 3000);
    }

    if (useClean && phaseLevel === 0) setPhaseLevel(1);

    setGrid([...g]);

    // Chain reaction
    setTimeout(() => processMatches(g), 300);
  }, [combo, score, phaseLevel]);

  const handleTileClick = useCallback((row: number, col: number) => {
    if (processing.current || moves <= 0) return;

    if (!selected) {
      setSelected({ row, col });
      return;
    }

    const sTile = grid[selected.row]?.[selected.col];
    const cTile = grid[row]?.[col];
    if (!sTile || !cTile) { setSelected(null); return; }

    if (selected.row === row && selected.col === col) {
      setSelected(null);
      return;
    }

    if (!isAdjacent(sTile, cTile)) {
      setSelected({ row, col });
      return;
    }

    // Swap
    processing.current = true;
    swapTiles(grid, selected.row, selected.col, row, col);
    const matched = findMatches(grid);
    if (matched.size === 0) {
      // Invalid swap — swap back
      swapTiles(grid, selected.row, selected.col, row, col);
      processing.current = false;
    } else {
      setMoves(m => m - 1);
      setCombo(0);
      setSelected(null);
      setGrid([...grid]);
      setTimeout(() => processMatches(grid), 300);
    }
    setSelected(null);
  }, [selected, grid, moves, processMatches]);

  useEffect(() => {
    if (screen === 'playing' && moves <= 0 && !processing.current) {
      setTimeout(() => setScreen('gameover'), 500);
    }
  }, [moves, screen]);

  // --- Intro ---
  if (screen === 'intro') {
    return (
      <Box sx={{
        minHeight: '100vh', bgcolor: '#0A1628', color: '#E6F1FF',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        px: 3, py: 4,
      }}>
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <Typography variant="h3" sx={{
            background: 'linear-gradient(135deg, #1B8EBF, #0D9B4A)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontWeight: 800, mb: 2,
          }} align="center">
            💎 Carbon Crush
          </Typography>
          <Typography variant="h6" sx={{ color: '#8892B0', mb: 3 }} align="center">
            Match dirty tech to phase it out. Every match brings us closer to clean energy!
          </Typography>
        </motion.div>

        <Box sx={{ maxWidth: 700, mb: 4 }}>
          <Typography variant="h6" sx={{ mb: 2, color: '#FF6B6B' }}>🏭 Match to Phase Out:</Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: 'center', mb: 3 }}>
            {DIRTY_TECH.map(t => (
              <Box key={t.type} sx={{ px: 1.5, py: 0.5, borderRadius: 2, background: 'rgba(255,107,107,0.1)', border: '1px solid rgba(255,107,107,0.2)' }}>
                {t.emoji} {t.name}
              </Box>
            ))}
          </Box>
          <Typography variant="h6" sx={{ mb: 2, color: '#14CC66' }}>⚡ Replaced By:</Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: 'center' }}>
            {CLEAN_TECH.map(t => (
              <Box key={t.type} sx={{ px: 1.5, py: 0.5, borderRadius: 2, background: 'rgba(20,204,102,0.1)', border: '1px solid rgba(20,204,102,0.2)' }}>
                {t.emoji} {t.name}
              </Box>
            ))}
          </Box>
        </Box>

        <Typography sx={{ color: '#8892B0', mb: 3, maxWidth: 500, textAlign: 'center' }}>
          Swap adjacent tiles to match 3 or more! Score enough and dirty tiles transition to clean tech.
          You have 30 moves — make them count!
        </Typography>

        <EcoButton onClick={startGame} size="large">Start Playing 💎</EcoButton>
      </Box>
    );
  }

  // --- Game Over ---
  if (screen === 'gameover') {
    return (
      <Box sx={{
        minHeight: '100vh', bgcolor: '#0A1628', color: '#E6F1FF',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        px: 3,
      }}>
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}>
          <Typography variant="h3" sx={{ fontWeight: 800, mb: 2 }} align="center">Mission Complete!</Typography>
          <Typography variant="h5" sx={{ color: '#0D9B4A', mb: 1 }} align="center">
            Score: {score.toLocaleString()}
          </Typography>
          {phaseLevel > 0 && (
            <Typography sx={{ color: '#14CC66', mb: 3 }} align="center">
              🌿 You phased out dirty energy! Clean tech took over!
            </Typography>
          )}
        </motion.div>
        <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
          <EcoButton onClick={startGame}>Play Again</EcoButton>
          <EcoButton onClick={() => setScreen('intro')} variant="secondary">Info</EcoButton>
        </Box>
      </Box>
    );
  }

  // --- Playing ---
  return (
    <Box sx={{
      minHeight: '100vh', bgcolor: '#0A1628', color: '#E6F1FF',
      display: 'flex', flexDirection: 'column', alignItems: 'center', py: 3, px: 2,
    }}>
      {/* HUD */}
      <Box sx={{ display: 'flex', gap: 4, mb: 2, alignItems: 'center' }}>
        <Box sx={{ textAlign: 'center' }}>
          <Typography sx={{ fontSize: 12, color: '#8892B0' }}>SCORE</Typography>
          <Typography variant="h5" sx={{ fontWeight: 800, color: '#0D9B4A' }}>{score.toLocaleString()}</Typography>
        </Box>
        <Box sx={{ textAlign: 'center' }}>
          <Typography sx={{ fontSize: 12, color: '#8892B0' }}>MOVES</Typography>
          <Typography variant="h5" sx={{ fontWeight: 800, color: moves <= 5 ? '#FF4757' : '#E6F1FF' }}>{moves}</Typography>
        </Box>
        {combo > 1 && (
          <Box sx={{ textAlign: 'center' }}>
            <Typography sx={{ fontSize: 12, color: '#FFD700' }}>COMBO</Typography>
            <Typography variant="h5" sx={{ fontWeight: 800, color: '#FFD700' }}>x{combo}</Typography>
          </Box>
        )}
      </Box>

      {/* Progress to clean transition */}
      <Box sx={{ width: GRID_COLS * 62, maxWidth: '100%', mb: 2 }}>
        <Box sx={{ height: 4, borderRadius: 2, background: 'rgba(255,255,255,0.1)', overflow: 'hidden' }}>
          <Box sx={{
            height: '100%', borderRadius: 2,
            width: `${Math.min((score / CLEAN_TRANSITION_THRESHOLD) * 100, 100)}%`,
            background: 'linear-gradient(90deg, #FF6B6B, #FFD700, #0D9B4A)',
            transition: 'width 0.5s',
          }} />
        </Box>
        <Typography sx={{ fontSize: 11, color: '#8892B0', textAlign: 'center', mt: 0.5 }}>
          {phaseLevel > 0 ? '🌿 Clean tech active!' : `${Math.round((score / CLEAN_TRANSITION_THRESHOLD) * 100)}% to clean transition`}
        </Typography>
      </Box>

      {/* Grid */}
      <Box sx={{
        display: 'grid',
        gridTemplateColumns: `repeat(${GRID_COLS}, 1fr)`,
        gap: 2,
        maxWidth: GRID_COLS * 62,
        width: '100%',
      }}>
        <AnimatePresence>
          {grid.map((row, r) =>
            row.map((tile, c) => {
              if (!tile) return null;
              const isSelected = selected?.row === r && selected?.col === c;
              return (
                <motion.div key={tile.id}
                  layout
                  initial={{ scale: tile.isNew ? 0 : 1, opacity: tile.isNew ? 0 : 1 }}
                  animate={{ scale: 1, opacity: tile.clearing ? 0 : 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Box
                    onClick={() => handleTileClick(r, c)}
                    sx={{
                      width: '100%', aspectRatio: '1', borderRadius: 2,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: { xs: 28, sm: 36 },
                      background: isSelected
                        ? `linear-gradient(135deg, ${tile.color}44, ${tile.color}22)`
                        : 'rgba(17,34,64,0.6)',
                      border: isSelected ? `2px solid ${tile.color}` : '1px solid rgba(255,255,255,0.08)',
                      cursor: 'pointer',
                      transition: 'all 0.15s',
                      '&:hover': { transform: 'scale(1.08)', borderColor: `${tile.color}88` },
                      backdropFilter: 'blur(8px)',
                    }}
                  >
                    {tile.emoji}
                  </Box>
                </motion.div>
              );
            })
          )}
        </AnimatePresence>
      </Box>

      {/* Fact popup */}
      <AnimatePresence>
        {fact && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            style={{ position: 'fixed', bottom: 20, left: '50%', transform: 'translateX(-50%)', zIndex: 50 }}>
            <Box sx={{
              px: 3, py: 1.5, borderRadius: 2,
              background: 'rgba(13,155,74,0.2)', backdropFilter: 'blur(16px)',
              border: '1px solid rgba(13,155,74,0.3)',
              maxWidth: 400, textAlign: 'center',
            }}>
              <Typography sx={{ fontSize: 14, color: '#14CC66' }}>{fact}</Typography>
            </Box>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
}
