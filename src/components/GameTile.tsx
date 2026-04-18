import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

interface GameTileProps {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  available: boolean;
  tags: string[];
  index?: number;
}

export default function GameTile({ id, title, description, icon, color, available, tags, index = 0 }: GameTileProps) {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.35, delay: index * 0.06, ease: 'easeOut' }}
      style={{ height: '100%' }}
    >
      <Box
        onClick={available ? () => navigate(`/games/${id}`) : undefined}
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          background: `linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)`,
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '16px',
          overflow: 'hidden',
          cursor: available ? 'pointer' : 'default',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': available ? {
            transform: 'translateY(-4px) scale(1.02)',
            boxShadow: `0 12px 40px ${color}30, 0 0 60px ${color}10`,
            border: `1px solid ${color}50`,
            background: `linear-gradient(135deg, ${color}15 0%, rgba(255,255,255,0.06) 100%)`,
          } : {},
        }}
      >
        {/* Glow accent top */}
        <Box sx={{
          height: 2,
          background: `linear-gradient(90deg, transparent 0%, ${color} 50%, transparent 100%)`,
          opacity: 0.7,
        }} />

        <Box sx={{ p: { xs: 1.5, sm: 2, md: 2.5 }, flex: 1, display: 'flex', flexDirection: 'column' }}>
          {/* Icon + Title row */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
            <Box sx={{
              width: { xs: 40, sm: 46, md: 50 }, height: { xs: 40, sm: 46, md: 50 },
              borderRadius: '12px', background: `${color}18`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: `0 0 20px ${color}15`,
              flexShrink: 0,
            }}>
              <Typography sx={{ fontSize: { xs: '22px', md: '26px' }, lineHeight: 1 }}>{icon}</Typography>
            </Box>
            <Box sx={{ minWidth: 0 }}>
              <Typography sx={{
                fontWeight: 700, color: '#FFFFFF', lineHeight: 1.2,
                fontSize: { xs: '0.9rem', md: '1.05rem' }, letterSpacing: '-0.01em',
                whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
              }}>
                {title}
              </Typography>
              <Box sx={{ display: 'flex', gap: 0.5, mt: 0.3 }}>
                {tags.map((tag) => (
                  <Box key={tag} component="span" sx={{
                    fontSize: '0.6rem', fontWeight: 600, color: `${color}`,
                    background: `${color}15`, px: 0.8, py: 0.1, borderRadius: '4px',
                    letterSpacing: '0.03em', textTransform: 'uppercase',
                  }}>
                    {tag}
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>

          {/* Description */}
          <Typography sx={{
            color: 'rgba(255,255,255,0.45)', lineHeight: 1.4, flex: 1,
            fontSize: { xs: '0.72rem', md: '0.8rem' }, mb: 1.5,
          }}>
            {description}
          </Typography>

          {/* Play CTA */}
          <Box sx={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            py: { xs: 0.7, md: 0.9 }, borderRadius: '10px',
            background: available ? `linear-gradient(135deg, ${color} 0%, ${color}CC 100%)` : 'rgba(255,255,255,0.05)',
            color: available ? '#FFFFFF' : 'rgba(255,255,255,0.2)',
            fontWeight: 700, fontSize: { xs: '0.72rem', md: '0.82rem' },
            letterSpacing: '0.02em',
            transition: 'all 0.2s',
            boxShadow: available ? `0 4px 15px ${color}40` : 'none',
          }}>
            {available ? '▶  Play Now' : 'Coming Soon'}
          </Box>
        </Box>
      </Box>
    </motion.div>
  );
}
