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

// Fluid sizing tokens — every dimension scales with the card's actual height
// via container query height units. clamp(min, preferred, max) keeps things
// readable on both small (~280px tall) and large (~600px tall) cards.
const FLUID = {
  bodyPad: 'clamp(14px, 3.6cqh, 24px)',
  groupGap: 'clamp(6px, 1.8cqh, 14px)', // gap *inside* the top sub-group
  minSectionGap: 'clamp(8px, 2.2cqh, 18px)', // minimum gap between body sections
  iconPlate: 'clamp(54px, 18cqh, 96px)',
  iconRadius: 'clamp(14px, 3.5cqh, 22px)',
  iconFont: 'clamp(28px, 10cqh, 50px)',
  titleFont: 'clamp(0.95rem, 4cqh, 1.4rem)',
  inspiredFont: 'clamp(0.62rem, 1.9cqh, 0.78rem)',
  descFont: 'clamp(0.85rem, 2.9cqh, 1.05rem)',
  learnPx: 'clamp(10px, 2cqh, 16px)',
  learnPy: 'clamp(6px, 1.5cqh, 12px)',
  learnFont: 'clamp(0.78rem, 2.55cqh, 0.95rem)',
  metaFont: 'clamp(0.66rem, 2.0cqh, 0.82rem)',
  metaGap: 'clamp(8px, 2cqh, 14px)',
  ctaPy: 'clamp(9px, 2.6cqh, 15px)',
  ctaRadius: 'clamp(10px, 2cqh, 14px)',
  ctaFont: 'clamp(0.82rem, 2.5cqh, 1rem)',
  topicPx: 'clamp(8px, 1.6cqh, 12px)',
  topicPy: 'clamp(3px, 0.8cqh, 5px)',
  topicFont: 'clamp(0.55rem, 1.5cqh, 0.68rem)',
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
      initial={{ opacity: 0, y: 16, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.36, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      style={{ height: '100%', display: 'flex', minHeight: 0, minWidth: 0 }}
    >
      <Box
        onClick={available ? () => navigate(`/games/${id}`) : undefined}
        sx={{
          flex: 1,
          minHeight: 0,
          minWidth: 0,
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          containerType: 'size',
          containerName: 'gametile',
          background: `linear-gradient(155deg, ${accent}26 0%, ${accent}10 38%, #FFFFFF 100%)`,
          border: `1px solid ${accent}38`,
          borderRadius: 'clamp(16px, 3.5cqh, 26px)',
          overflow: 'hidden',
          cursor: available ? 'pointer' : 'default',
          touchAction: 'manipulation',
          WebkitTapHighlightColor: 'transparent',
          userSelect: 'none',
          boxShadow: `0 6px 24px ${accent}1F, 0 1px 2px rgba(15,23,42,0.04)`,
          transition: 'transform 0.18s ease, box-shadow 0.28s ease, border-color 0.28s ease',
          '@media (hover: hover)': {
            '&:hover': available
              ? {
                  transform: 'translateY(-5px)',
                  boxShadow: `0 18px 40px ${accent}38, 0 2px 6px rgba(15,23,42,0.06)`,
                  borderColor: `${accent}66`,
                }
              : {},
          },
          '&:active': available
            ? { transform: 'scale(0.975)', boxShadow: `0 3px 10px ${accent}30` }
            : {},
        }}
      >
        {/* Decorative watermark icon (corner) */}
        <Box
          aria-hidden
          sx={{
            position: 'absolute',
            right: 'clamp(-24px, -3cqh, -10px)',
            top: 'clamp(-16px, -1.5cqh, -6px)',
            fontSize: 'clamp(90px, 32cqh, 200px)',
            opacity: 0.07,
            color: accent,
            pointerEvents: 'none',
            transform: 'rotate(-12deg)',
            lineHeight: 1,
            userSelect: 'none',
          }}
        >
          {icon}
        </Box>

        {/* Body — five flex children (top group / description / learn / meta /
            CTA) distributed via space-between, so the four gaps between them
            are always equal regardless of card height. */}
        <Box
          sx={{
            flex: 1,
            minHeight: 0,
            minWidth: 0,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'stretch',
            textAlign: 'center',
            padding: FLUID.bodyPad,
            gap: FLUID.minSectionGap,
            position: 'relative',
            zIndex: 1,
          }}
        >
          {/* Top group: topic chip + icon + title (tight internal rhythm) */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: FLUID.groupGap,
              flexShrink: 0,
            }}
          >
            {/* Topic chip — top right */}
            <Box
              sx={{
                alignSelf: 'flex-end',
                background: '#FFFFFF',
                color: accent,
                border: `1px solid ${accent}40`,
                borderRadius: '999px',
                px: FLUID.topicPx,
                py: FLUID.topicPy,
                fontSize: FLUID.topicFont,
                fontWeight: 800,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                lineHeight: 1,
                boxShadow: `0 1px 3px ${accent}20`,
                flexShrink: 0,
              }}
            >
              {topic}
            </Box>

            {/* Icon plate */}
            <Box
              sx={{
                width: FLUID.iconPlate,
                height: FLUID.iconPlate,
                borderRadius: FLUID.iconRadius,
                background: `linear-gradient(140deg, ${accent} 0%, ${accent}D0 100%)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: `0 8px 22px ${accent}50, inset 0 -3px 8px rgba(0,0,0,0.12), inset 0 2px 4px rgba(255,255,255,0.25)`,
                flexShrink: 0,
              }}
            >
              <Typography
                sx={{
                  fontSize: FLUID.iconFont,
                  lineHeight: 1,
                  filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.15))',
                }}
              >
                {icon}
              </Typography>
            </Box>

            {/* Title group (title + inspired-by) */}
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
              <Typography
                sx={{
                  fontWeight: 800,
                  color: '#0F172A',
                  lineHeight: 1.1,
                  fontSize: FLUID.titleFont,
                  letterSpacing: '-0.02em',
                }}
              >
                {title}
              </Typography>
              <Typography
                sx={{
                  mt: 'clamp(2px, 0.6cqh, 5px)',
                  color: '#7A8A9E',
                  fontSize: FLUID.inspiredFont,
                  fontStyle: 'italic',
                  fontWeight: 500,
                  lineHeight: 1.2,
                }}
              >
                inspired by {inspiredBy}
              </Typography>
            </Box>
          </Box>

          {/* Description */}
          <Typography
            component="div"
            sx={{
              color: '#475569',
              lineHeight: 1.45,
              fontSize: FLUID.descFont,
              fontWeight: 500,
              px: 'clamp(0px, 1.5cqh, 8px)',
              flexShrink: 0,
            }}
          >
            {description}
          </Typography>

          {/* What you'll learn — centered, more prominent */}
          <Box
            sx={{
              background: `${accent}14`,
              border: `1px solid ${accent}2E`,
              borderRadius: 'clamp(8px, 1.8cqh, 12px)',
              px: FLUID.learnPx,
              py: FLUID.learnPy,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 'clamp(5px, 1.2cqh, 9px)',
              textAlign: 'center',
              flexShrink: 0,
            }}
          >
            <Box sx={{ fontSize: 'clamp(0.85rem, 2.6cqh, 1.05rem)', lineHeight: 1, flexShrink: 0 }}>📚</Box>
            <Typography
              component="div"
              sx={{
                color: '#1E293B',
                fontSize: FLUID.learnFont,
                fontWeight: 600,
                lineHeight: 1.35,
                minWidth: 0,
              }}
            >
              <Box component="span" sx={{ color: accent, fontWeight: 800 }}>Learn:</Box>{' '}
              {learn}
            </Typography>
          </Box>

          {/* Meta row */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              gap: FLUID.metaGap,
              fontSize: FLUID.metaFont,
              color: '#64748B',
              fontWeight: 600,
              lineHeight: 1,
              flexShrink: 0,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 'clamp(2px, 0.6cqh, 5px)' }}>
              <Box component="span" sx={{ fontSize: 'clamp(0.74rem, 2.2cqh, 0.9rem)' }}>⚡</Box>
              {difficulty}
            </Box>
            <Box sx={{ width: '1px', background: '#CBD5E1' }} />
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 'clamp(2px, 0.6cqh, 5px)' }}>
              <Box component="span" sx={{ fontSize: 'clamp(0.74rem, 2.2cqh, 0.9rem)' }}>⏱</Box>
              {playTime}
            </Box>
          </Box>

          {/* Play CTA */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 'clamp(4px, 1cqh, 8px)',
              py: FLUID.ctaPy,
              borderRadius: FLUID.ctaRadius,
              background: available
                ? `linear-gradient(135deg, ${accent} 0%, ${accent}E6 100%)`
                : '#E0E0E0',
              color: available ? '#FFFFFF' : '#9E9E9E',
              fontWeight: 800,
              fontSize: FLUID.ctaFont,
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              flexShrink: 0,
              boxShadow: available
                ? `0 5px 14px ${accent}50, inset 0 1px 0 rgba(255,255,255,0.25)`
                : 'none',
            }}
          >
            <Box component="span" sx={{ fontSize: '0.78em' }}>▶</Box>
            {available ? 'Play Now' : 'Coming Soon'}
          </Box>
        </Box>
      </Box>
    </motion.div>
  );
}
