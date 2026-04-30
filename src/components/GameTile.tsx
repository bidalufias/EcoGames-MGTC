import type { KeyboardEvent } from 'react';
import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

interface GameTileProps {
  id: string;
  title: string;
  inspiredBy: string;
  topic: string;
  description: string;
  learn: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  playTime: string;
  icon: string;
  accent: string;
  available: boolean;
  index?: number;
}

const FLUID = {
  pad: 'clamp(14px, 3.4cqmin, 24px)',
  rowGap: 'clamp(6px, 1.5cqmin, 11px)',
  topicFont: 'clamp(0.55rem, 1.6cqmin, 0.7rem)',
  titleFont: 'clamp(1.05rem, 4.2cqmin, 1.55rem)',
  inspiredFont: 'clamp(0.6rem, 1.7cqmin, 0.74rem)',
  descFont: 'clamp(0.74rem, 2.2cqmin, 0.9rem)',
  learnFont: 'clamp(0.7rem, 2.05cqmin, 0.84rem)',
  metaFont: 'clamp(0.65rem, 1.95cqmin, 0.8rem)',
  ctaFont: 'clamp(0.74rem, 2.2cqmin, 0.92rem)',
  iconFont: 'clamp(56px, 26cqmin, 130px)',
};

export default function GameTile({
  id,
  title,
  inspiredBy,
  topic,
  description,
  learn,
  difficulty,
  playTime,
  icon,
  accent,
  available,
  index = 0,
}: GameTileProps) {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.36, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      style={{ height: '100%', display: 'flex', minHeight: 0, minWidth: 0 }}
      className="game-tile-motion"
    >
      <Box
        role="button"
        tabIndex={available ? 0 : -1}
        aria-disabled={!available}
        aria-label={`Play ${title}: ${description}`}
        onClick={available ? () => navigate(`/games/${id}`) : undefined}
        onKeyDown={
          available
            ? (e: KeyboardEvent) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  navigate(`/games/${id}`);
                }
              }
            : undefined
        }
        sx={{
          flex: 1,
          minHeight: 0,
          minWidth: 0,
          position: 'relative',
          display: 'grid',
          gridTemplateColumns: 'minmax(22%, 34%) 1fr',
          containerType: 'size',
          containerName: 'gametile',
          background: '#FFFCF5',
          border: `1px solid ${accent}33`,
          borderRadius: 'clamp(12px, 2.6cqmin, 20px)',
          overflow: 'hidden',
          cursor: available ? 'pointer' : 'not-allowed',
          touchAction: 'manipulation',
          WebkitTapHighlightColor: 'transparent',
          userSelect: 'none',
          boxShadow: '0 1px 2px rgba(31,27,20,0.04), 0 4px 14px rgba(31,27,20,0.05)',
          transition: 'transform 0.18s ease, box-shadow 0.28s ease, border-color 0.28s ease',
          '@media (hover: hover)': {
            '&:hover': available
              ? {
                  transform: 'translateY(-2px)',
                  boxShadow: `0 2px 4px rgba(31,27,20,0.05), 0 12px 26px ${accent}26`,
                  borderColor: `${accent}66`,
                }
              : {},
          },
          '&:focus-visible': {
            outline: `3px solid ${accent}`,
            outlineOffset: 3,
          },
          '&:active': available ? { transform: 'scale(0.99)' } : {},
          opacity: available ? 1 : 0.55,
        }}
      >
        {/* Icon panel — accent wash + paper-grain texture, large emoji
            centered with a soft drop shadow. The whole panel reads as the
            game's "object," not a chip. */}
        <Box
          aria-hidden
          sx={{
            position: 'relative',
            background: `linear-gradient(160deg, ${accent}1F 0%, ${accent}10 60%, ${accent}05 100%)`,
            borderRight: `1px solid ${accent}22`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          {/* Subtle paper grain inside the icon panel only */}
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              backgroundImage:
                "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.13  0 0 0 0 0.10  0 0 0 0 0.06  0 0 0 0.04 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
              backgroundRepeat: 'repeat',
              backgroundSize: '160px 160px',
              mixBlendMode: 'multiply',
              pointerEvents: 'none',
              opacity: 0.7,
            }}
          />
          <Box
            sx={{
              fontSize: FLUID.iconFont,
              lineHeight: 1,
              filter: `drop-shadow(0 6px 12px ${accent}40)`,
              transform: 'rotate(-4deg)',
              userSelect: 'none',
            }}
          >
            {icon}
          </Box>
        </Box>

        {/* Content panel */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            padding: FLUID.pad,
            gap: FLUID.rowGap,
            minWidth: 0,
            minHeight: 0,
          }}
        >
          {/* Top meta row: topic chip + "after [game]" italic */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'baseline',
              justifyContent: 'space-between',
              gap: 'clamp(6px, 1.6cqmin, 12px)',
              flexShrink: 0,
              minWidth: 0,
            }}
          >
            <Typography
              component="span"
              sx={{
                color: accent,
                fontSize: FLUID.topicFont,
                fontWeight: 800,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                lineHeight: 1,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                flex: '0 1 auto',
              }}
            >
              {topic}
            </Typography>
            <Typography
              component="span"
              sx={{
                color: '#7A6F5C',
                fontSize: FLUID.inspiredFont,
                fontStyle: 'italic',
                fontWeight: 500,
                lineHeight: 1.1,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                flex: '0 1 auto',
              }}
            >
              after {inspiredBy}
            </Typography>
          </Box>

          {/* Title */}
          <Typography
            component="h3"
            sx={{
              m: 0,
              fontWeight: 800,
              color: '#1F1B14',
              lineHeight: 1.05,
              fontSize: FLUID.titleFont,
              letterSpacing: '-0.025em',
              flexShrink: 0,
            }}
          >
            {title}
          </Typography>

          {/* Description */}
          <Typography
            component="div"
            sx={{
              color: '#3F3A2F',
              fontSize: FLUID.descFont,
              fontWeight: 500,
              lineHeight: 1.4,
              flex: 1,
              minHeight: 0,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {description}
          </Typography>

          {/* Learn line: a short editorial pull-quote in accent ink */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 'clamp(6px, 1.5cqmin, 10px)',
              flexShrink: 0,
            }}
          >
            <Box
              aria-hidden
              sx={{
                flexShrink: 0,
                width: 'clamp(4px, 0.8cqmin, 6px)',
                height: 'clamp(4px, 0.8cqmin, 6px)',
                borderRadius: '50%',
                background: accent,
                mt: 'clamp(5px, 1.4cqmin, 8px)',
              }}
            />
            <Typography
              component="div"
              sx={{
                color: '#1F1B14',
                fontSize: FLUID.learnFont,
                fontWeight: 600,
                lineHeight: 1.35,
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                minWidth: 0,
              }}
            >
              <Box component="span" sx={{ color: accent, fontWeight: 800, letterSpacing: '0.04em' }}>
                Learn —{' '}
              </Box>
              {learn}
            </Typography>
          </Box>

          {/* Footer row: meta + Play CTA */}
          <Box
            sx={{
              borderTop: '1px solid #ECE3D0',
              pt: 'clamp(6px, 1.5cqmin, 10px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 'clamp(6px, 1.6cqmin, 12px)',
              flexShrink: 0,
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 'clamp(8px, 2cqmin, 14px)',
                fontSize: FLUID.metaFont,
                color: '#7A6F5C',
                fontWeight: 600,
                lineHeight: 1,
                minWidth: 0,
              }}
            >
              <Box component="span" sx={{ display: 'inline-flex', alignItems: 'center', gap: 'clamp(3px, 0.7cqmin, 5px)' }}>
                <Box component="span" aria-hidden sx={{ color: accent }}>◆</Box>
                {difficulty}
              </Box>
              <Box component="span" sx={{ display: 'inline-flex', alignItems: 'center', gap: 'clamp(3px, 0.7cqmin, 5px)' }}>
                <Box component="span" aria-hidden>⏱</Box>
                {playTime}
              </Box>
            </Box>

            <Typography
              component="span"
              sx={{
                color: accent,
                fontSize: FLUID.ctaFont,
                fontWeight: 800,
                letterSpacing: '0.02em',
                whiteSpace: 'nowrap',
                flexShrink: 0,
              }}
            >
              Play <Box component="span" aria-hidden>→</Box>
            </Typography>
          </Box>
        </Box>
      </Box>
    </motion.div>
  );
}
