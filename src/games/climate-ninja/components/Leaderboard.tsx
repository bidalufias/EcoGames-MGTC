import { Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { fetchLeaderboard, submitScore } from '../../../lib/supabase';
import type { LeaderboardEntry } from '../../../lib/supabase';
import EcoButton from '../../../components/EcoButton';

interface Props {
  scores: Array<{ name: string; score: number }>;
  onBack: () => void;
}

export default function Leaderboard({ scores, onBack }: Props) {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      // Submit scores
      for (const s of scores) {
        try { await submitScore({ game_id: 'climate-ninja', player_name: s.name, score: s.score }); } catch { /* ok */ }
      }
      // Fetch leaderboard
      try {
        const rows = await fetchLeaderboard('climate-ninja');
        setEntries(rows);
      } catch { /* ok */ }
      setLoading(false);
    }
    load();
  }, [scores]);

  return (
    <Box sx={{
      minHeight: '100vh', bgcolor: '#0A1628', color: '#E6F1FF',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      px: 3, py: 4,
    }}>
      <Typography variant="h4" sx={{ fontWeight: 800, mb: 4 }}>🏆 Climate Ninja Leaderboard</Typography>

      <Box sx={{
        width: '100%', maxWidth: 500, borderRadius: 3, overflow: 'hidden',
        background: 'rgba(17,34,64,0.7)', backdropFilter: 'blur(16px)',
        border: '1px solid rgba(13,155,74,0.15)',
      }}>
        {loading ? (
          <Box sx={{ p: 4, textAlign: 'center' }}>
            <Typography sx={{ color: '#8892B0' }}>Loading...</Typography>
          </Box>
        ) : entries.length === 0 ? (
          <Box sx={{ p: 4, textAlign: 'center' }}>
            <Typography sx={{ color: '#8892B0' }}>No scores yet. Be the first!</Typography>
          </Box>
        ) : (
          entries.slice(0, 10).map((entry, i) => (
            <Box key={i} sx={{
              display: 'flex', p: 2, alignItems: 'center',
              borderBottom: '1px solid rgba(255,255,255,0.05)',
              background: i === 0 ? 'rgba(255,215,0,0.05)' : 'transparent',
            }}>
              <Typography sx={{ width: 40, fontWeight: 700, color: i === 0 ? '#FFD700' : i === 1 ? '#C0C0C0' : i === 2 ? '#CD7F32' : '#8892B0' }}>
                {i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `${i + 1}.`}
              </Typography>
              <Typography sx={{ flex: 1, fontWeight: 600 }}>{entry.player_name}</Typography>
              <Typography sx={{ fontWeight: 700, color: '#0D9B4A' }}>{entry.score.toLocaleString()}</Typography>
            </Box>
          ))
        )}
      </Box>

      <Box sx={{ mt: 4 }}>
        <EcoButton onClick={onBack} variant="secondary">Back</EcoButton>
      </Box>
    </Box>
  );
}
