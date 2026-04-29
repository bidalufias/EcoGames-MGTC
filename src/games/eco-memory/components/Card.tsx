import { Box } from '@mui/material';
import { motion } from 'framer-motion';
import type { CardDef, CardState } from '../engine';
import { ACCENT, EMOJI_FONT, PAPER } from '../theme';

interface CardProps {
  def: CardDef;
  state: CardState;
  onClick: () => void;
  disabled?: boolean;
}

/**
 * A flip-style memory card. The back and face are stacked in a 3D scene; the
 * inner wrapper rotates 180° on flip. We use container queries so the type
 * scales with the card's own width, not the viewport.
 *
 * Visual register: warm cream paper (matches the landing page), pair-coloured
 * accent on the front. The back uses the game's violet accent so the deck
 * still reads as one set even when half the cards are face-up.
 */
export default function Card({ def, state, onClick, disabled }: CardProps) {
  const { flipped, matched } = state;
  const isOpen = flipped || matched;

  return (
    <Box
      onClick={() => {
        if (!disabled && !flipped && !matched) onClick();
      }}
      role="button"
      aria-label={isOpen ? `${def.label} — ${def.side}` : 'Hidden card'}
      aria-pressed={isOpen}
      tabIndex={disabled || matched ? -1 : 0}
      onKeyDown={e => {
        if ((e.key === 'Enter' || e.key === ' ') && !disabled && !flipped && !matched) {
          e.preventDefault();
          onClick();
        }
      }}
      sx={{
        position: 'relative',
        aspectRatio: '1 / 1',
        cursor: matched ? 'default' : disabled ? 'wait' : 'pointer',
        perspective: '1000px',
        containerType: 'inline-size',
        outline: 'none',
        WebkitTapHighlightColor: 'transparent',
        '&:focus-visible > div': {
          boxShadow: `0 0 0 3px ${ACCENT}66`,
          borderRadius: 8,
        },
      }}
    >
      <motion.div
        animate={{
          rotateY: isOpen ? 180 : 0,
          // Pulse on match-lock so the player feels the success: punch up to
          // 1.12, then settle to a slightly shrunk 0.94 (matches the "done"
          // resting state). Same shape as the Climate 2048 merge pulse.
          scale: matched ? [1, 1.12, 0.94] : 1,
        }}
        transition={{
          rotateY: { type: 'spring', stiffness: 260, damping: 24 },
          scale: matched
            ? { duration: 0.42, times: [0, 0.45, 1], ease: 'easeOut' }
            : { duration: 0.25 },
        }}
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Back face — visible when rotateY = 0 */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            borderRadius: 'clamp(6px, 6cqi, 14px)',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            background: PAPER.surface,
            border: `1px solid ${PAPER.hairline}`,
            boxShadow: '0 1px 2px rgba(31,27,20,0.06), 0 4px 10px rgba(31,27,20,0.04)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          {/* Soft accent wash on a portion of the back, like a watermark */}
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              background: `radial-gradient(circle at 30% 30%, ${ACCENT}14, transparent 65%)`,
            }}
          />
          {/* Faint hairline frame */}
          <Box
            sx={{
              position: 'absolute',
              inset: 'clamp(4px, 6cqi, 9px)',
              borderRadius: 'clamp(4px, 4cqi, 10px)',
              border: `1px dashed ${ACCENT}33`,
            }}
          />
          <Box
            sx={{
              fontSize: 'clamp(1.3rem, 22cqi, 3rem)',
              fontWeight: 900,
              color: ACCENT,
              opacity: 0.55,
              fontFamily: EMOJI_FONT,
              transform: 'rotate(-6deg)',
              letterSpacing: '-0.04em',
            }}
          >
            ?
          </Box>
        </Box>

        {/* Front face — rotated 180° so it shows when the card is flipped */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            borderRadius: 'clamp(6px, 6cqi, 14px)',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            background: matched ? `${def.color}10` : PAPER.surface,
            border: `1.5px solid ${def.color}`,
            boxShadow: matched
              ? `0 0 0 1px ${def.color}30 inset, 0 1px 2px rgba(31,27,20,0.04)`
              : `0 2px 10px ${def.color}28, 0 1px 2px rgba(31,27,20,0.04)`,
            opacity: matched ? 0.78 : 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            p: '6%',
            transition: 'opacity 0.25s, background 0.25s',
          }}
        >
          <Box
            sx={{
              fontSize: 'clamp(1.4rem, 30cqi, 3.2rem)',
              lineHeight: 1,
              fontFamily: EMOJI_FONT,
              filter: `drop-shadow(0 2px 4px ${def.color}40)`,
            }}
          >
            {def.emoji}
          </Box>
          <Box
            sx={{
              mt: '6%',
              fontSize: 'clamp(0.55rem, 9cqi, 0.9rem)',
              fontWeight: 800,
              color: def.color,
              textAlign: 'center',
              lineHeight: 1.15,
              maxWidth: '100%',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              letterSpacing: '0.02em',
            }}
          >
            {def.label}
          </Box>
        </Box>
      </motion.div>
    </Box>
  );
}
