import { useState, useEffect, useCallback, useRef } from 'react';
import { Box, Typography } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { TOWER_TYPES, ENEMY_TYPES, WAVE_CONFIG, GRID_W, GRID_H, CELL, getPath } from './data';
import type { Tower, Enemy, Projectile } from './data';
import EcoButton from '../../components/EcoButton';

type Screen = 'intro' | 'playing' | 'gameover';

const path = getPath();
const pathCells = new Set(path.map(p => `${Math.floor(p.x / CELL)},${Math.floor(p.y / CELL)}`));

function makeEnemy(type: string, wave: number): Enemy {
  const def = ENEMY_TYPES.find(e => e.type === type)!;
  const hpScale = 1 + wave * 0.15;
  return {
    id: Date.now() + Math.random(),
    type: def.type, emoji: def.emoji, name: def.name, color: def.color,
    hp: def.hp * hpScale, maxHp: def.hp * hpScale,
    speed: def.speed, reward: def.reward,
    x: path[0].x - 60, y: path[0].y, pathIndex: 0,
  };
}

export default function GreenDefenceGame() {
  const [screen, setScreen] = useState<Screen>('intro');
  const [towers, setTowers] = useState<Tower[]>([]);
  const [enemies, setEnemies] = useState<Enemy[]>([]);
  const [projectiles, setProjectiles] = useState<Projectile[]>([]);
  const [selectedTower, setSelectedTower] = useState<string | null>(null);
  const [budget, setBudget] = useState(200);
  const [lives, setLives] = useState(20);
  const [wave, setWave] = useState(0);
  const [score, setScore] = useState(0);
  const [waveActive, setWaveActive] = useState(false);
  const [fact, setFact] = useState('');
  const nextId = useRef(0);

  const stateRef = useRef({ towers, enemies, projectiles, budget, lives, wave, score, waveActive });
  stateRef.current = { towers, enemies, projectiles, budget, lives, wave, score, waveActive };

  const startGame = useCallback(() => {
    setTowers([]); setEnemies([]); setProjectiles([]);
    setBudget(200); setLives(20); setWave(0); setScore(0);
    setSelectedTower(null); setWaveActive(false); setFact('');
    setScreen('playing');
  }, []);

  const placeTower = useCallback((row: number, col: number) => {
    if (!selectedTower) return;
    const def = TOWER_TYPES.find(t => t.type === selectedTower);
    if (!def || budget < def.cost) return;
    if (pathCells.has(`${col},${row}`)) return;
    if (towers.some(t => t.row === row && t.col === col)) return;

    const tower: Tower = {
      id: nextId.current++, type: def.type, emoji: def.emoji, name: def.name,
      color: def.color, range: def.range, damage: def.damage, speed: def.speed,
      cost: def.cost, fact: def.fact, row, col, lastAttack: 0,
    };
    setTowers(prev => [...prev, tower]);
    setBudget(b => b - def.cost);
    setFact(`💡 ${def.fact}`);
    setTimeout(() => setFact(''), 3000);
  }, [selectedTower, budget, towers]);

  const startWave = useCallback(() => {
    if (waveActive || wave >= WAVE_CONFIG.length) return;
    setWaveActive(true);

    const config = WAVE_CONFIG[wave];
    let delay = 0;

    for (const group of config.enemies) {
      for (let i = 0; i < group.count; i++) {
        setTimeout(() => {
          setEnemies(prev => [...prev, makeEnemy(group.type, wave)]);
        }, delay);
        delay += config.delay;
      }
    }

    // Wave complete check
    setTimeout(() => {
      setWaveActive(false);
      setWave(w => w + 1);
      setBudget(b => b + 50); // wave bonus
    }, delay + 3000);
  }, [wave, waveActive]);

  // Game loop
  useEffect(() => {
    if (screen !== 'playing') return;

    const interval = setInterval(() => {
      // Move enemies along path
      setEnemies(prev => prev.map(e => {
        if (e.pathIndex >= path.length - 1) return e; // at end
        const target = path[e.pathIndex + 1];
        const dx = target.x - e.x;
        const dy = target.y - e.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < e.speed * 2) {
          return { ...e, pathIndex: e.pathIndex + 1, x: target.x, y: target.y };
        }
        return { ...e, x: e.x + (dx / dist) * e.speed * 2, y: e.y + (dy / dist) * e.speed * 2 };
      }).filter(e => {
        if (e.pathIndex >= path.length - 1) {
          setLives(l => Math.max(0, l - 1));
          return false;
        }
        return e.hp > 0;
      }));

      // Tower attacks
      setTowers(prev => prev.map(tower => {
        const tx = tower.col * CELL + CELL / 2;
        const ty = tower.row * CELL + CELL / 2;
        // Find closest enemy in range
        const s = stateRef.current;
        let closest: Enemy | null = null;
        let closestDist = tower.range;
        for (const e of s.enemies) {
          const d = Math.sqrt((e.x - tx) ** 2 + (e.y - ty) ** 2);
          if (d < closestDist) { closest = e; closestDist = d; }
        }
        if (!closest) return tower;
        const now = Date.now();
        if (now - tower.lastAttack < 1000 / tower.speed) return tower;

        // Fire projectile
        setProjectiles(prev => [...prev, {
          id: Date.now() + Math.random(), x: tx, y: ty,
          targetId: closest!.id, speed: 5, damage: tower.damage, color: tower.color,
        }]);
        return { ...tower, lastAttack: now };
      }));

      // Move projectiles & deal damage
      setProjectiles(prev => {
        const s = stateRef.current;
        const remaining: Projectile[] = [];
        for (const p of prev) {
          const target = s.enemies.find(e => e.id === p.targetId);
          if (!target) continue;
          const dx = target.x - p.x;
          const dy = target.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < p.speed * 2) {
            // Hit!
            setEnemies(prev => prev.map(e => e.id === target.id ? { ...e, hp: e.hp - p.damage } : e));
            setScore(s => s + 5);
          } else {
            remaining.push({ ...p, x: p.x + (dx / dist) * p.speed * 2, y: p.y + (dy / dist) * p.speed * 2 });
          }
        }
        return remaining;
      });
    }, 16);

    return () => clearInterval(interval);
  }, [screen]);

  // Check game over
  useEffect(() => {
    if (screen === 'playing' && lives <= 0) setScreen('gameover');
  }, [lives, screen]);

  // Check win
  useEffect(() => {
    if (screen === 'playing' && wave >= WAVE_CONFIG.length && enemies.length === 0 && !waveActive) {
      setTimeout(() => setScreen('gameover'), 500);
    }
  }, [wave, enemies.length, waveActive, screen]);

  // --- Intro ---
  if (screen === 'intro') {
    return (
      <Box sx={{
        minHeight: '100vh', bgcolor: '#0A1628', color: '#E6F1FF',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        px: 3, py: 4, overflowY: 'auto',
      }}>
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <Typography variant="h3" sx={{
            background: 'linear-gradient(135deg, #0D9B4A, #1B8EBF)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontWeight: 800, mb: 2,
          }} align="center">
            🛡️ Green Defence
          </Typography>
          <Typography variant="h6" sx={{ color: '#8892B0', mb: 4 }} align="center">
            Deploy clean tech to stop pollution waves. Reach Net Zero by 2050!
          </Typography>
        </motion.div>

        <Box sx={{ maxWidth: 600, mb: 3 }}>
          <Typography variant="h6" sx={{ mb: 2, color: '#0D9B4A' }}>⚡ Your Towers:</Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, justifyContent: 'center', mb: 3 }}>
            {TOWER_TYPES.map(t => (
              <Box key={t.type} sx={{
                px: 1.5, py: 1, borderRadius: 2, textAlign: 'center', minWidth: 90,
                background: `${t.color}10`, border: `1px solid ${t.color}33`,
              }}>
                <Typography sx={{ fontSize: 28 }}>{t.emoji}</Typography>
                <Typography sx={{ fontSize: 11, fontWeight: 700, color: t.color }}>{t.name}</Typography>
                <Typography sx={{ fontSize: 10, color: '#8892B0' }}>💰 {t.cost}</Typography>
              </Box>
            ))}
          </Box>
        </Box>

        <Typography sx={{ color: '#8892B0', mb: 3, maxWidth: 450, textAlign: 'center' }}>
          Select a tower type, then click the grid to place it. Enemies follow the path — place towers alongside!
          Survive 10 waves to win. Earn budget by defeating enemies.
        </Typography>

        <EcoButton onClick={startGame} size="large">Deploy Defences 🛡️</EcoButton>
      </Box>
    );
  }

  // --- Game Over ---
  if (screen === 'gameover') {
    const won = wave >= WAVE_CONFIG.length && lives > 0;
    return (
      <Box sx={{
        minHeight: '100vh', bgcolor: '#0A1628', color: '#E6F1FF',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', px: 3,
      }}>
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}>
          <Typography variant="h3" sx={{ fontWeight: 800, mb: 2 }} align="center">
            {won ? '🌍 Net Zero Achieved!' : 'Emissions Overran!'}
          </Typography>
          <Typography variant="h5" sx={{ color: '#0D9B4A', mb: 1 }} align="center">
            Score: {score.toLocaleString()}
          </Typography>
          <Typography sx={{ color: '#8892B0', mb: 3 }} align="center">
            Waves: {wave}/{WAVE_CONFIG.length} | Lives: {Math.max(0, lives)}
          </Typography>
        </motion.div>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <EcoButton onClick={startGame}>Play Again</EcoButton>
          <EcoButton onClick={() => setScreen('intro')} variant="secondary">Info</EcoButton>
        </Box>
      </Box>
    );
  }

  // --- Playing ---
  const selectedDef = TOWER_TYPES.find(t => t.type === selectedTower);

  return (
    <Box sx={{
      minHeight: '100vh', bgcolor: '#0A1628', color: '#E6F1FF',
      display: 'flex', flexDirection: 'column', alignItems: 'center', py: 2, px: 2,
    }}>
      {/* HUD */}
      <Box sx={{ display: 'flex', gap: 3, mb: 1, alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
        <Box sx={{ textAlign: 'center' }}>
          <Typography sx={{ fontSize: 11, color: '#8892B0' }}>SCORE</Typography>
          <Typography sx={{ fontWeight: 800, color: '#0D9B4A' }}>{score}</Typography>
        </Box>
        <Box sx={{ textAlign: 'center' }}>
          <Typography sx={{ fontSize: 11, color: '#8892B0' }}>BUDGET</Typography>
          <Typography sx={{ fontWeight: 800, color: '#FFB800' }}>💰 {budget}</Typography>
        </Box>
        <Box sx={{ textAlign: 'center' }}>
          <Typography sx={{ fontSize: 11, color: '#8892B0' }}>LIVES</Typography>
          <Typography sx={{ fontWeight: 800, color: lives <= 5 ? '#FF4757' : '#E6F1FF' }}>🌍 {lives}</Typography>
        </Box>
        <Box sx={{ textAlign: 'center' }}>
          <Typography sx={{ fontSize: 11, color: '#8892B0' }}>WAVE</Typography>
          <Typography sx={{ fontWeight: 800, color: '#1B8EBF' }}>{wave}/{WAVE_CONFIG.length}</Typography>
        </Box>
        {!waveActive && wave < WAVE_CONFIG.length && (
          <EcoButton onClick={startWave} size="small">
            {wave === 0 ? 'Start Wave 1' : `Start Wave ${wave + 1}`}
          </EcoButton>
        )}
      </Box>

      {/* Tower selector */}
      <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
        {TOWER_TYPES.map(t => (
          <Box
            key={t.type}
            onClick={() => setSelectedTower(t.type === selectedTower ? null : t.type)}
            sx={{
              px: 1.5, py: 0.5, borderRadius: 2, cursor: 'pointer',
              background: selectedTower === t.type ? `${t.color}30` : `${t.color}10`,
              border: `2px solid ${selectedTower === t.type ? t.color : `${t.color}33`}`,
              transition: 'all 0.15s', textAlign: 'center',
              opacity: budget >= t.cost ? 1 : 0.4,
            }}
          >
            <Typography sx={{ fontSize: 20 }}>{t.emoji}</Typography>
            <Typography sx={{ fontSize: 10, color: t.color, fontWeight: 700 }}>💰{t.cost}</Typography>
          </Box>
        ))}
      </Box>

      {/* Grid */}
      <Box sx={{
        position: 'relative', width: GRID_W * CELL, height: GRID_H * CELL,
        background: 'rgba(17,34,64,0.3)', borderRadius: 2,
        border: '1px solid rgba(255,255,255,0.05)', overflow: 'hidden',
      }}>
        {/* Grid cells */}
        {Array.from({ length: GRID_H }).map((_, r) =>
          Array.from({ length: GRID_W }).map((_, c) => {
            const isPath = pathCells.has(`${c},${r}`);
            const hasTower = towers.some(t => t.row === r && t.col === c);
            return (
              <Box
                key={`${r},${c}`}
                onClick={() => !isPath && !hasTower && placeTower(r, c)}
                sx={{
                  position: 'absolute', left: c * CELL, top: r * CELL,
                  width: CELL, height: CELL,
                  border: '1px solid rgba(255,255,255,0.03)',
                  background: isPath
                    ? 'rgba(139,69,19,0.15)'
                    : selectedTower && !hasTower
                      ? 'rgba(13,155,74,0.05)'
                      : 'transparent',
                  cursor: isPath || hasTower ? 'default' : 'pointer',
                  '&:hover': !isPath && !hasTower ? { background: 'rgba(13,155,74,0.12)' } : {},
                }}
              />
            );
          })
        )}

        {/* Towers */}
        {towers.map(t => (
          <Box key={t.id} sx={{
            position: 'absolute', left: t.col * CELL + 5, top: t.row * CELL + 5,
            width: CELL - 10, height: CELL - 10, borderRadius: 2,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: `${t.color}20`, border: `1px solid ${t.color}44`,
            fontSize: 28,
          }}>
            {t.emoji}
          </Box>
        ))}

        {/* Enemies */}
        <AnimatePresence>
          {enemies.map(e => (
            <motion.div key={e.id} initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
              <Box sx={{
                position: 'absolute', left: e.x - 18, top: e.y - 18,
                width: 36, height: 36, borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 20, background: `${e.color}30`, border: `1px solid ${e.color}66`,
              }}>
                {e.emoji}
                {/* HP bar */}
                <Box sx={{
                  position: 'absolute', bottom: -4, left: 2, right: 2, height: 3,
                  borderRadius: 1, background: 'rgba(0,0,0,0.5)', overflow: 'hidden',
                }}>
                  <Box sx={{
                    width: `${(e.hp / e.maxHp) * 100}%`, height: '100%',
                    background: e.hp > e.maxHp * 0.5 ? '#0D9B4A' : '#FF4757',
                    borderRadius: 1, transition: 'width 0.1s',
                  }} />
                </Box>
              </Box>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Projectiles */}
        {projectiles.map(p => (
          <Box key={p.id} sx={{
            position: 'absolute', left: p.x - 3, top: p.y - 3,
            width: 6, height: 6, borderRadius: '50%',
            background: p.color, boxShadow: `0 0 6px ${p.color}`,
          }} />
        ))}
      </Box>

      {/* Selected tower info */}
      {selectedDef && (
        <Box sx={{ mt: 1, textAlign: 'center' }}>
          <Typography sx={{ fontSize: 12, color: selectedDef.color }}>
            {selectedDef.emoji} {selectedDef.name} — DMG: {selectedDef.damage} | Range: {selectedDef.range} | Click grid to place
          </Typography>
        </Box>
      )}

      {/* Fact */}
      <AnimatePresence>
        {fact && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            style={{ position: 'fixed', bottom: 20, left: '50%', transform: 'translateX(-50%)', zIndex: 50 }}>
            <Box sx={{ px: 3, py: 1.5, borderRadius: 2, background: 'rgba(13,155,74,0.15)', backdropFilter: 'blur(16px)', border: '1px solid rgba(13,155,74,0.3)', maxWidth: 400, textAlign: 'center' }}>
              <Typography sx={{ fontSize: 13, color: '#14CC66' }}>{fact}</Typography>
            </Box>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
}
