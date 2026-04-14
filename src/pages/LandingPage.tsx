import { Box, Typography, Container, Grid } from '@mui/material';
import { motion } from 'framer-motion';
import ParticleBackground from '../components/ParticleBackground';
import EcoCard from '../components/EcoCard';
import EcoButton from '../components/EcoButton';
import GameTile from '../components/GameTile';

const games = [
  {
    id: 'climate-ninja',
    title: 'Climate Ninja',
    description: 'Slice through greenhouse gases! Learn the 7 GHGs threatening our planet.',
    icon: '🥷',
    color: '#0D9B4A',
    available: true,
    tags: ['Touch', 'Multiplayer', 'Action'],
  },
  {
    id: 'carbon-crush',
    title: 'Carbon Crush',
    description: 'Match and phase out emission sources. Every match brings us closer to clean energy.',
    icon: '💎',
    color: '#1B8EBF',
    available: true,
    tags: ['Puzzle', 'Touch', 'Strategy'],
  },
  {
    id: 'recycle-rush',
    title: 'Recycle Rush',
    description: 'Sort waste at lightning speed. Learn what goes where before the landfill overflows!',
    icon: '📦',
    color: '#FFB800',
    available: true,
    tags: ['Action', 'Touch', 'Arcade'],
  },
  {
    id: 'eco-memory',
    title: 'Eco Memory',
    description: 'Test your climate knowledge. Match greenhouse gases to their sources and effects.',
    icon: '🧠',
    color: '#9B59B6',
    available: true,
    tags: ['Puzzle', 'Educational', 'Brain Training'],
  },
  {
    id: 'green-defence',
    title: 'Green Defence',
    description: "Deploy clean tech to stop pollution waves. Can you reach Net Zero by 2050?",
    icon: '🛡️',
    color: '#14CCAA',
    available: true,
    tags: ['Strategy', 'Touch', 'Tower Defence'],
  },
  {
    id: 'climate-2048',
    title: 'Climate 2048',
    description: 'Merge your way to Net Zero. Upgrade technologies from LED bulbs to smart cities.',
    icon: '🔢',
    color: '#FF6B35',
    available: true,
    tags: ['Puzzle', 'Touch', 'Brain Training'],
  },
];

const features = [
  {
    icon: '📱',
    title: 'Touch-First Design',
    description: 'Works beautifully on any device — phones, tablets, and desktops. No downloads needed.',
  },
  {
    icon: '🔬',
    title: 'Real Science',
    description: 'Based on IPCC climate data and peer-reviewed research. Learn accurate environmental science.',
  },
  {
    icon: '📊',
    title: 'Track Progress',
    description: 'Compete on leaderboards, track your scores, and see your climate knowledge grow.',
  },
];

export default function LandingPage() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Box sx={{ position: 'relative', minHeight: '100vh', overflowX: 'hidden' }}>
      <ParticleBackground />

      {/* ===== HERO SECTION ===== */}
      <Box
        id="hero"
        sx={{
          position: 'relative',
          zIndex: 1,
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pt: 8,
        }}
      >
        <Container maxWidth="md" sx={{ textAlign: 'center', py: 4 }}>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            {/* Title */}
            <Typography
              sx={{
                fontSize: { xs: '3rem', sm: '4.5rem', md: '5.5rem' },
                fontWeight: 800,
                letterSpacing: '-0.03em',
                lineHeight: 1.1,
                mb: 2,
                background: 'linear-gradient(135deg, #0D9B4A 0%, #1B8EBF 50%, #14CC66 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                filter: 'drop-shadow(0 0 40px rgba(13, 155, 74, 0.3))',
              }}
            >
              🌱 EcoGames
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          >
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                mb: 2,
                color: '#E6F1FF',
                fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },
              }}
            >
              Learn. Play.{' '}
              <Box
                component="span"
                sx={{
                  background: 'linear-gradient(135deg, #14CC66, #23B5E8)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Save the Planet.
              </Box>
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
          >
            <Typography
              variant="h6"
              sx={{
                color: 'text.secondary',
                mb: 5,
                maxWidth: 600,
                mx: 'auto',
                lineHeight: 1.7,
                fontWeight: 400,
                fontSize: { xs: '1rem', sm: '1.15rem' },
              }}
            >
              A collection of fun, educational games about climate change and green technology. Built by MGTC.
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
          >
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
              <EcoButton variant="primary" size="large" onClick={() => scrollTo('games')}>
                🎮 Start Playing
              </EcoButton>
              <EcoButton variant="secondary" size="large" onClick={() => scrollTo('about')}>
                Learn More ↓
              </EcoButton>
            </Box>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
          >
            <Box
              sx={{
                mt: 8,
                animation: 'float 2s ease-in-out infinite',
                '@keyframes float': {
                  '0%, 100%': { transform: 'translateY(0)' },
                  '50%': { transform: 'translateY(8px)' },
                },
              }}
            >
              <Typography sx={{ color: 'text.secondary', opacity: 0.5, fontSize: '1.5rem' }}>↓</Typography>
            </Box>
          </motion.div>
        </Container>
      </Box>

      {/* ===== GAMES GRID SECTION ===== */}
      <Box
        id="games"
        sx={{
          position: 'relative',
          zIndex: 1,
          py: { xs: 8, md: 12 },
        }}
      >
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Typography
              variant="h3"
              sx={{
                textAlign: 'center',
                mb: 2,
                fontWeight: 800,
                background: 'linear-gradient(135deg, #E6F1FF, #14CC66)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
              }}
            >
              Choose Your Mission
            </Typography>
            <Typography
              variant="h6"
              sx={{
                textAlign: 'center',
                color: 'text.secondary',
                mb: 6,
                fontWeight: 400,
                fontSize: { xs: '0.95rem', sm: '1.1rem' },
              }}
            >
              Six games. One planet. Infinite impact.
            </Typography>
          </motion.div>

          <Grid container spacing={3}>
            {games.map((game, i) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={game.id}>
                <GameTile {...game} index={i} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* ===== ABOUT SECTION ===== */}
      <Box
        id="about"
        sx={{
          position: 'relative',
          zIndex: 1,
          py: { xs: 8, md: 12 },
        }}
      >
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Typography
              variant="h3"
              sx={{
                textAlign: 'center',
                mb: 2,
                fontWeight: 800,
                background: 'linear-gradient(135deg, #E6F1FF, #1B8EBF)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
              }}
            >
              Why EcoGames?
            </Typography>
            <Typography
              variant="h6"
              sx={{
                textAlign: 'center',
                color: 'text.secondary',
                mb: 6,
                maxWidth: 700,
                mx: 'auto',
                lineHeight: 1.7,
                fontWeight: 400,
                fontSize: { xs: '0.95rem', sm: '1.1rem' },
              }}
            >
              EcoGames uses the power of play to teach climate literacy. Each game is designed around a core
              environmental concept, making learning natural and fun.
            </Typography>
          </motion.div>

          <Grid container spacing={3}>
            {features.map((feature, i) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={feature.title}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                  style={{ height: '100%' }}
                >
                  <EcoCard hoverable>
                    <Box sx={{ p: 3.5, textAlign: 'center' }}>
                      <Typography sx={{ fontSize: '3rem', mb: 2 }}>{feature.icon}</Typography>
                      <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: '#E6F1FF' }}>
                        {feature.title}
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.7 }}>
                        {feature.description}
                      </Typography>
                    </Box>
                  </EcoCard>
                </motion.div>
              </Grid>
            ))}
          </Grid>

          {/* MGTC Branding */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <Box sx={{ textAlign: 'center', mt: 6 }}>
              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: '1.2rem',
                  background: 'linear-gradient(135deg, #0D9B4A, #1B8EBF)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Built with 💚 by MGTC
              </Typography>
            </Box>
          </motion.div>
        </Container>
      </Box>

      {/* ===== FOOTER ===== */}
      <Box
        sx={{
          position: 'relative',
          zIndex: 1,
          py: 5,
          mt: 4,
          background: 'rgba(5, 10, 20, 0.6)',
          borderTop: '1px solid rgba(13, 155, 74, 0.08)',
        }}
      >
        <Container maxWidth="sm">
          <Box sx={{ textAlign: 'center' }}>
            <Typography
              variant="body2"
              sx={{
                color: 'text.secondary',
                mb: 1,
                fontWeight: 500,
                fontSize: '0.9rem',
              }}
            >
              🌱 EcoGames by MGTC — Empowering Climate Education Through Play
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: 'text.secondary',
                opacity: 0.6,
                fontSize: '0.8rem',
              }}
            >
              Made with 💚 for the planet
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
