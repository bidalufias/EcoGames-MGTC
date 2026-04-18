import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import GameTile from '../components/GameTile';

const games = [
  {
    id: 'climate-ninja',
    title: 'Climate Ninja',
    description: 'Slice through greenhouse gases! Learn the 7 GHGs threatening our planet.',
    icon: '🥷',
    color: '#E8F5E9',
    accent: '#4CAF50',
    available: true,
    tags: ['Touch', 'Action'],
  },
  {
    id: 'carbon-crush',
    title: 'Carbon Crush',
    description: 'Match and phase out emission sources. Every match brings us closer to clean energy.',
    icon: '💎',
    color: '#E3F2FD',
    accent: '#2196F3',
    available: true,
    tags: ['Puzzle', 'Strategy'],
  },
  {
    id: 'recycle-rush',
    title: 'Recycle Rush',
    description: 'Sort waste at lightning speed. Learn what goes where before the landfill overflows!',
    icon: '📦',
    color: '#FFF3E0',
    accent: '#FF9800',
    available: true,
    tags: ['Action', 'Arcade'],
  },
  {
    id: 'eco-memory',
    title: 'Eco Memory',
    description: 'Test your climate knowledge. Match greenhouse gases to their sources and effects.',
    icon: '🧠',
    color: '#EDE7F6',
    accent: '#7C4DFF',
    available: true,
    tags: ['Puzzle', 'Brain Training'],
  },
  {
    id: 'green-defence',
    title: 'Green Defence',
    description: 'Deploy clean tech to stop pollution waves. Reach Net Zero by 2050!',
    icon: '🛡️',
    color: '#E0F2F1',
    accent: '#00BFA5',
    available: true,
    tags: ['Strategy', 'Tower Defence'],
  },
  {
    id: 'climate-2048',
    title: 'Climate 2048',
    description: 'Merge your way to Net Zero. Upgrade technologies from LED bulbs to smart cities.',
    icon: '🔢',
    color: '#FBE9E7',
    accent: '#FF5722',
    available: true,
    tags: ['Puzzle', 'Brain Training'],
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
};

export default function LandingPage() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100vw',
        background: '#F8FAFB',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Header */}
      <Box sx={{ textAlign: 'center', pt: { xs: 3, sm: 4, md: 5 }, pb: { xs: 1, sm: 2 }, px: 2, flexShrink: 0 }}>
        <motion.div {...fadeUp} transition={{ duration: 0.5, ease: 'easeOut' }}>
          <Typography sx={{
            fontSize: { xs: '2rem', sm: '2.8rem', md: '3.5rem' },
            fontWeight: 900,
            letterSpacing: '-0.04em',
            lineHeight: 1,
            color: '#1A2332',
          }}>
            EcoGames
          </Typography>
        </motion.div>
        <motion.div {...fadeUp} transition={{ duration: 0.4, delay: 0.1 }}>
          <Typography sx={{
            mt: 0.5, color: '#7A8A9E', fontWeight: 400,
            fontSize: { xs: '0.75rem', sm: '0.9rem' }, letterSpacing: '0.03em',
          }}>
            Play. Learn. Save the Planet.
          </Typography>
        </motion.div>
      </Box>

      {/* Games Grid */}
      <Box sx={{
        flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'flex-start',
        px: { xs: 2, sm: 3, md: 5 }, py: { xs: 1, sm: 2 },
      }}>
        <Box sx={{
          width: '100%', maxWidth: 1200,
          display: 'grid',
          gridTemplateColumns: {
            xs: 'repeat(2, 1fr)',
            sm: 'repeat(3, 1fr)',
          },
          gap: { xs: 1.5, sm: 2, md: 2.5 },
        }}>
          {games.map((game, i) => (
            <GameTile key={game.id} {...game} index={i} />
          ))}
        </Box>
      </Box>

      {/* Footer */}
      <Box sx={{ textAlign: 'center', py: { xs: 1.5, sm: 2 }, flexShrink: 0 }}>
        <Typography sx={{ color: '#B0BEC5', fontSize: '0.7rem', fontWeight: 500, letterSpacing: '0.04em' }}>
          MGTC — Empowering Climate Education Through Play
        </Typography>
      </Box>
    </Box>
  );
}
