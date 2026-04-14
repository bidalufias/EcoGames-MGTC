import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import type { PlayerState } from '../types';
import { PLAYER_COLORS } from '../Renderer';
import EcoButton from '../../../components/EcoButton';

interface Props {
  champion: { name: string; state: PlayerState };
  challenger: { name: string; state: PlayerState };
  winner: 'champion' | 'challenger';
  streak: number;
  onNextRound: () => void;
}

export default function ChampionRoundEnd({ champion, challenger, winner, streak, onNextRound }: Props) {
  const champWon = winner === 'champion';

  return (
    <Box sx={{
      minHeight: '100vh', bgcolor: '#0A1628', color: '#E6F1FF',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      px: 3, gap: 3,
    }}>
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <Typography variant="h3" align="center" sx={{ fontWeight: 800 }}>
          {champWon ? '👑 Champion Defends!' : '⚔️ New Champion!'}
        </Typography>
        {champWon && (
          <Typography align="center" sx={{ color: '#FFD700', mt: 1 }}>
            Streak: {streak} 🔥
          </Typography>
        )}
      </motion.div>

      <Box sx={{ display: 'flex', gap: 4, flexWrap: 'wrap', justifyContent: 'center' }}>
        {/* Champion card */}
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
          <Box sx={{
            p: 3, borderRadius: 3, minWidth: 220, textAlign: 'center',
            background: champWon ? 'rgba(255,215,0,0.08)' : 'rgba(17,34,64,0.7)',
            backdropFilter: 'blur(16px)',
            border: `2px solid ${champWon ? '#FFD700' : 'rgba(255,255,255,0.1)'}`,
          }}>
            <Typography sx={{ color: PLAYER_COLORS[0], fontWeight: 700 }}>
              👑 {champion.name}
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 800, my: 1 }}>
              {champion.state.score.toLocaleString()}
            </Typography>
            <Typography sx={{ color: '#8892B0' }}>
              Sliced: {champion.state.itemsSliced} | Max Combo: {champion.state.maxCombo}x
            </Typography>
          </Box>
        </motion.div>

        {/* Challenger card */}
        <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
          <Box sx={{
            p: 3, borderRadius: 3, minWidth: 220, textAlign: 'center',
            background: !champWon ? 'rgba(13,155,74,0.08)' : 'rgba(17,34,64,0.7)',
            backdropFilter: 'blur(16px)',
            border: `2px solid ${!champWon ? '#0D9B4A' : 'rgba(255,255,255,0.1)'}`,
          }}>
            <Typography sx={{ color: PLAYER_COLORS[1], fontWeight: 700 }}>
              ⚔️ {challenger.name}
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 800, my: 1 }}>
              {challenger.state.score.toLocaleString()}
            </Typography>
            <Typography sx={{ color: '#8892B0' }}>
              Sliced: {challenger.state.itemsSliced} | Max Combo: {challenger.state.maxCombo}x
            </Typography>
          </Box>
        </motion.div>
      </Box>

      <EcoButton onClick={onNextRound} size="large">
        Next Challenger ⚔️
      </EcoButton>
    </Box>
  );
}
