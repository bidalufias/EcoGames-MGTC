import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

interface GameTileProps {
  id: string;
  title: string;
  inspiredBy: string;
  topic: string;
  description: string;
  icon: string;
  color: string;
  accent: string;
  available: boolean;
  index?: number;
}

export default function GameTile({
  id,
  title,
  inspiredBy,
  topic,
  description,
  icon,
  color,
  accent,
  available,
  index = 0,
}: GameTileProps) {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 14, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.32, delay: index * 0.05, ease: 'easeOut' }}
      style={{ height: '100%', display: 'flex', minHeight: 0 }}
    >
      <Box
        onClick={available ? () => navigate(`/games/${id}`) : undefined}
        sx={{
          flex: 1,
          minHeight: 0,
          display: 'flex',
          flexDirection: 'column',
          background: color,
          border: `1px solid ${accent}25`,
          borderRadius: '22px',
          overflow: 'hidden',
          cursor: available ? 'pointer' : 'default',
          touchAction: 'manipulation',
          WebkitTapHighlightColor: 'transparent',
          userSelect: 'none',
          boxShadow: `0 4px 18px ${accent}12`,
          transition: 'transform 0.15s ease, box-shadow 0.25s ease, border-color 0.25s ease',
          '@media (hover: hover)': {
            '&:hover': available
              ? {
                  transform: 'translateY(-4px)',
                  boxShadow: `0 14px 32px ${accent}30`,
                  borderColor: `${accent}55`,
                }
              : {},
          },
          '&:active': available
            ? { transform: 'scale(0.97)', boxShadow: `0 2px 8px ${accent}25` }
            : {},
        }}
      >
        {/* Topic badge (top-right) */}
        <Box sx={{ px: 2, pt: 1.75, display: 'flex', justifyContent: 'flex-end' }}>
          <Box
            sx={{
              background: '#FFFFFF',
              color: accent,
              border: `1px solid ${accent}30`,
              borderRadius: '999px',
              px: 1.2,
              py: 0.35,
              fontSize: '0.62rem',
              fontWeight: 700,
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              lineHeight: 1,
            }}
          >
            {topic}
          </Box>
        </Box>

        {/* Body */}
        <Box
          sx={{
            flex: 1,
            minHeight: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            px: { xs: 1.5, md: 2.5 },
            pb: { xs: 1.5, md: 2 },
            pt: 0.5,
          }}
        >
          {/* Icon */}
          <Box
            sx={{
              width: { xs: 60, md: 72 },
              height: { xs: 60, md: 72 },
              borderRadius: '50%',
              background: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: `0 4px 16px ${accent}25`,
              flexShrink: 0,
            }}
          >
            <Typography sx={{ fontSize: { xs: 32, md: 38 }, lineHeight: 1 }}>{icon}</Typography>
          </Box>

          {/* Title */}
          <Typography
            sx={{
              mt: 1.25,
              fontWeight: 800,
              color: '#1A2332',
              lineHeight: 1.15,
              fontSize: { xs: '1rem', md: '1.18rem' },
              letterSpacing: '-0.01em',
            }}
          >
            {title}
          </Typography>

          {/* Inspired by */}
          <Typography
            sx={{
              mt: 0.4,
              color: '#7A8A9E',
              fontSize: { xs: '0.68rem', md: '0.72rem' },
              fontStyle: 'italic',
              fontWeight: 500,
            }}
          >
            inspired by {inspiredBy}
          </Typography>

          {/* Description */}
          <Typography
            sx={{
              mt: 1,
              color: '#5A6A7E',
              lineHeight: 1.45,
              fontSize: { xs: '0.74rem', md: '0.8rem' },
              flex: 1,
              minHeight: 0,
            }}
          >
            {description}
          </Typography>

          {/* Play CTA */}
          <Box
            sx={{
              mt: 1.25,
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              py: { xs: 1, md: 1.2 },
              borderRadius: '12px',
              background: available ? accent : '#E0E0E0',
              color: available ? '#FFFFFF' : '#9E9E9E',
              fontWeight: 700,
              fontSize: { xs: '0.82rem', md: '0.92rem' },
              letterSpacing: '0.02em',
              flexShrink: 0,
            }}
          >
            {available ? '▶  Play Now' : 'Coming Soon'}
          </Box>
        </Box>
      </Box>
    </motion.div>
  );
}
