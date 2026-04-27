import { Box, Typography } from '@mui/material';
import GameTile from '../components/GameTile';
import EcoHeader from '../components/EcoHeader';
import ParticleBackground from '../components/ParticleBackground';

const games = [
  {
    id: 'climate-ninja',
    title: 'Climate Ninja',
    inspiredBy: 'Fruit Ninja',
    topic: 'Greenhouse Gases',
    description: 'Slice through the 7 greenhouse gases warming our planet.',
    icon: '🥷',
    color: '#E8F5E9',
    accent: '#4CAF50',
    available: true,
  },
  {
    id: 'carbon-crush',
    title: 'Carbon Crush',
    inspiredBy: 'Candy Crush',
    topic: 'Clean Energy',
    description: 'Match polluting tech to phase it out for clean alternatives.',
    icon: '💎',
    color: '#E3F2FD',
    accent: '#2196F3',
    available: true,
  },
  {
    id: 'recycle-rush',
    title: 'Recycle Rush',
    inspiredBy: 'Diner Dash',
    topic: 'Waste & Recycling',
    description: 'Sort waste to the right bin before customers walk away.',
    icon: '♻️',
    color: '#FFF3E0',
    accent: '#FF9800',
    available: true,
  },
  {
    id: 'eco-memory',
    title: 'Eco Memory',
    inspiredBy: 'Memory Match',
    topic: 'Climate Knowledge',
    description: 'Pair greenhouse gases with their real-world sources.',
    icon: '🧠',
    color: '#EDE7F6',
    accent: '#7C4DFF',
    available: true,
  },
  {
    id: 'green-defence',
    title: 'Green Defence',
    inspiredBy: 'Plants vs. Zombies',
    topic: 'Net Zero',
    description: 'Deploy clean tech to halt waves of pollution.',
    icon: '🛡️',
    color: '#E0F2F1',
    accent: '#00BFA5',
    available: true,
  },
  {
    id: 'climate-2048',
    title: 'Climate 2048',
    inspiredBy: '2048',
    topic: 'Climate Tech',
    description: 'Merge climate solutions from LED bulbs to Net Zero cities.',
    icon: '🔢',
    color: '#FBE9E7',
    accent: '#FF5722',
    available: true,
  },
];

export default function LandingPage() {
  return (
    <Box
      sx={{
        height: '100dvh',
        width: '100vw',
        overflow: 'hidden',
        background: 'linear-gradient(180deg, #F8FAFB 0%, #EEF4F8 100%)',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
      }}
    >
      <ParticleBackground />

      {/* Portrait orientation guard */}
      <Box
        sx={{
          display: 'none',
          '@media (orientation: portrait) and (max-width: 1024px)': {
            display: 'flex',
            position: 'fixed',
            inset: 0,
            background: '#0F172A',
            color: '#FFFFFF',
            zIndex: 99999,
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            gap: 2,
            textAlign: 'center',
            px: 4,
          },
        }}
      >
        <Box sx={{ fontSize: '4rem' }}>🔄</Box>
        <Typography sx={{ fontSize: '1.4rem', fontWeight: 700 }}>Please rotate your device</Typography>
        <Typography sx={{ color: '#94A3B8', fontSize: '0.95rem', maxWidth: 320 }}>
          EcoGames is designed for landscape mode for the best touchscreen experience.
        </Typography>
      </Box>

      <Box sx={{ position: 'relative', zIndex: 2, flexShrink: 0 }}>
        <EcoHeader />
      </Box>

      {/* Games Grid */}
      <Box
        sx={{
          position: 'relative',
          zIndex: 1,
          flex: 1,
          minHeight: 0,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'stretch',
          px: { xs: 2, md: 4 },
          py: { xs: 2, md: 3 },
        }}
      >
        <Box
          sx={{
            width: '100%',
            maxWidth: 1280,
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gridTemplateRows: 'repeat(2, 1fr)',
            gap: { xs: 1.5, md: 2.25 },
            minHeight: 0,
          }}
        >
          {games.map((game, i) => (
            <GameTile key={game.id} {...game} index={i} />
          ))}
        </Box>
      </Box>

      {/* Footer */}
      <Box
        sx={{
          position: 'relative',
          zIndex: 1,
          textAlign: 'center',
          py: 0.85,
          flexShrink: 0,
        }}
      >
        <Typography
          sx={{
            color: '#94A3B8',
            fontSize: '0.7rem',
            fontWeight: 500,
            letterSpacing: '0.04em',
          }}
        >
          MGTC — Empowering Climate Education Through Play
        </Typography>
      </Box>
    </Box>
  );
}
