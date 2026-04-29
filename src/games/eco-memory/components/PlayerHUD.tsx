import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { EMOJI_FONT, PAPER } from '../theme';

interface PlayerHUDProps {
  label: string;
  emoji: string;
  accent: string;
  matches: number;
  score: number;
  isActive: boolean;
  /** When true the entire panel is rotated 180° so a player on the far side
   *  of a tabletop iPad reads it right-side up. */
  flipped?: boolean;
}

/**
 * One-row player panel: identity chip on the left, pairs + score on the right,
 * a soft pulse + accent border when active. Two of these stack around the
 * shared board in Versus mode (top one rotated for the second player).
 *
 * Editorial paper register: cream surface, hairline border, accent-coloured
 * "your turn" label sits inline so it never adds vertical height.
 */
export default function PlayerHUD({
  label,
  emoji,
  accent,
  matches,
  score,
  isActive,
  flipped,
}: PlayerHUDProps) {
  return (
    <Box
      sx={{
        width: '100%',
        transform: flipped ? 'rotate(180deg)' : 'none',
        transformOrigin: 'center',
      }}
    >
      <motion.div
        animate={{
          boxShadow: isActive
            ? [`0 0 0 0px ${accent}55`, `0 0 0 5px ${accent}11`, `0 0 0 0px ${accent}55`]
            : '0 1px 2px rgba(31,27,20,0.04)',
        }}
        transition={
          isActive
            ? { duration: 1.6, repeat: Infinity, ease: 'easeInOut' }
            : { duration: 0.2 }
        }
        style={{ borderRadius: 14 }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 'clamp(8px, 1.8cqmin, 14px)',
            px: 'clamp(10px, 2cqmin, 16px)',
            py: 'clamp(6px, 1.2cqh, 10px)',
            borderRadius: 'clamp(10px, 2cqmin, 14px)',
            background: PAPER.surface,
            border: `1.5px solid ${isActive ? accent : PAPER.hairline}`,
            transition: 'border-color 0.2s, opacity 0.2s',
            opacity: isActive ? 1 : 0.78,
            minWidth: 0,
          }}
        >
          <Box
            sx={{
              width: 'clamp(30px, 5.5cqh, 42px)',
              height: 'clamp(30px, 5.5cqh, 42px)',
              borderRadius: '50%',
              background: `${accent}1A`,
              color: accent,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 'clamp(0.95rem, 2.4cqh, 1.25rem)',
              flexShrink: 0,
              fontFamily: EMOJI_FONT,
            }}
          >
            {emoji}
          </Box>
          <Box sx={{ minWidth: 0, flex: 1, display: 'flex', flexDirection: 'column', gap: 'clamp(1px, 0.4cqh, 3px)' }}>
            <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1, minWidth: 0 }}>
              <Typography
                component="span"
                sx={{
                  color: accent,
                  fontSize: 'clamp(0.62rem, 1.4cqh, 0.72rem)',
                  fontWeight: 800,
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  lineHeight: 1,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {label}
              </Typography>
              {isActive && (
                <Typography
                  component="span"
                  sx={{
                    color: PAPER.meta,
                    fontSize: 'clamp(0.6rem, 1.3cqh, 0.7rem)',
                    fontWeight: 600,
                    fontStyle: 'italic',
                    lineHeight: 1,
                    whiteSpace: 'nowrap',
                  }}
                >
                  · your turn
                </Typography>
              )}
            </Box>
            <Typography
              component="span"
              sx={{
                color: PAPER.ink,
                fontSize: 'clamp(0.85rem, 2cqh, 1.05rem)',
                fontWeight: 800,
                lineHeight: 1.15,
                fontVariantNumeric: 'tabular-nums',
                letterSpacing: '-0.01em',
              }}
            >
              {matches} pairs
              <Box component="span" sx={{ color: PAPER.faded, fontWeight: 500, mx: 0.7 }}>·</Box>
              <Box component="span" sx={{ color: PAPER.subInk, fontWeight: 700 }}>
                {score.toLocaleString()} pts
              </Box>
            </Typography>
          </Box>
        </Box>
      </motion.div>
    </Box>
  );
}
