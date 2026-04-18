import { Box, Typography, Chip } from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

interface GameTileProps {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  accent: string;
  available: boolean;
  tags: string[];
  index?: number;
}

export default function GameTile({ id, title, description, icon, color, accent, available, tags, index = 0 }: GameTileProps) {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.96 }}
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
          alignItems: 'center',
          background: color,
          border: `1px solid ${accent}20`,
          borderRadius: '20px',
          overflow: 'hidden',
          cursor: available ? 'pointer' : 'default',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': available ? {
            transform: 'translateY(-4px)',
            boxShadow: `0 12px 32px ${accent}25`,
            border: `1px solid ${accent}40`,
          } : {},
        }}
      >
        <Box sx={{
          p: { xs: 2, sm: 2.5, md: 3 },
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          width: '100%',
        }}>
          {/* Icon */}
          <Box sx={{
            width: { xs: 52, sm: 60, md: 68 },
            height: { xs: 52, sm: 60, md: 68 },
            borderRadius: '50%',
            background: '#FFFFFF',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: `0 2px 12px ${accent}15`,
            mb: 1.5,
          }}>
            <Typography sx={{
              fontSize: { xs: '28px', sm: '32px', md: '36px' },
              lineHeight: 1,
            }}>
              {icon}
            </Typography>
          </Box>

          {/* Title */}
          <Typography sx={{
            fontWeight: 700, color: '#1A2332', lineHeight: 1.2,
            fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
            letterSpacing: '-0.01em',
            mb: 0.5,
          }}>
            {title}
          </Typography>

          {/* Tags */}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 1, justifyContent: 'center' }}>
            {tags.map((tag) => (
              <Chip
                key={tag}
                label={tag}
                size="small"
                sx={{
                  background: '#FFFFFF',
                  color: accent,
                  border: `1px solid ${accent}30`,
                  fontWeight: 600,
                  fontSize: { xs: '0.6rem', md: '0.65rem' },
                  height: 20,
                  '& .MuiChip-label': { px: 0.8 },
                }}
              />
            ))}
          </Box>

          {/* Description */}
          <Typography sx={{
            color: '#5A6A7E', lineHeight: 1.5, flex: 1,
            fontSize: { xs: '0.72rem', sm: '0.78rem', md: '0.82rem' },
            mb: 1.5,
          }}>
            {description}
          </Typography>

          {/* Play CTA */}
          <Box sx={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            py: { xs: 0.6, md: 0.8 }, px: 3, borderRadius: '10px',
            background: available ? accent : '#E0E0E0',
            color: available ? '#FFFFFF' : '#9E9E9E',
            fontWeight: 700, fontSize: { xs: '0.72rem', md: '0.82rem' },
            letterSpacing: '0.02em',
            transition: 'all 0.2s',
            width: '100%',
          }}>
            {available ? '▶  Play Now' : 'Coming Soon'}
          </Box>
        </Box>
      </Box>
    </motion.div>
  );
}
