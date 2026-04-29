import { Box, Typography } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { ACCENT, PAPER } from '../theme';

interface StatProps {
  label: string;
  value: string | number;
  sub?: string;
  delta?: number;
  emphasis?: 'accent' | 'streak' | 'default';
}

/**
 * One editorial stat in the HUD strip: small uppercase label, large
 * tabular-numeric value, optional sub line. Stat boxes stack horizontally with
 * hairline separators so they read as a magazine masthead, not a row of chips.
 */
function Stat({ label, value, sub, delta, emphasis = 'default' }: StatProps) {
  const valueColor =
    emphasis === 'accent' ? ACCENT : emphasis === 'streak' ? '#B45309' : PAPER.ink;
  return (
    <Box
      sx={{
        position: 'relative',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: 'clamp(2px, 0.5cqh, 4px)',
        minWidth: 0,
        px: 'clamp(8px, 2cqmin, 16px)',
      }}
    >
      <Typography
        component="span"
        sx={{
          color: PAPER.meta,
          fontSize: 'clamp(0.55rem, 1.3cqh, 0.66rem)',
          fontWeight: 800,
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
          lineHeight: 1,
        }}
      >
        {label}
      </Typography>
      <Box sx={{ display: 'inline-flex', alignItems: 'baseline', gap: 'clamp(4px, 0.9cqmin, 7px)' }}>
        <Typography
          component="span"
          sx={{
            color: valueColor,
            fontSize: 'clamp(0.95rem, 2.6cqh, 1.3rem)',
            fontWeight: 800,
            lineHeight: 1.05,
            fontVariantNumeric: 'tabular-nums',
            letterSpacing: '-0.01em',
          }}
        >
          {value}
        </Typography>
        {sub && (
          <Typography
            component="span"
            sx={{
              color: PAPER.meta,
              fontSize: 'clamp(0.65rem, 1.5cqh, 0.78rem)',
              fontWeight: 600,
              fontVariantNumeric: 'tabular-nums',
            }}
          >
            {sub}
          </Typography>
        )}
      </Box>
      <AnimatePresence>
        {delta !== undefined && delta !== 0 ? (
          <motion.div
            key={`${value}-${delta}`}
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 0, y: -22 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            style={{
              position: 'absolute',
              top: 0,
              right: 4,
              color: delta > 0 ? '#15803D' : '#B91C1C',
              fontWeight: 800,
              fontSize: '0.78rem',
              pointerEvents: 'none',
              fontVariantNumeric: 'tabular-nums',
            }}
          >
            {delta > 0 ? `+${delta}` : delta}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </Box>
  );
}

interface HUDProps {
  difficultyLabel: string;
  modeLabel: string;
  score: number;
  best: number;
  moves: number;
  matches: number;
  totalPairs: number;
  streak: number;
  scoreDelta?: number;
}

/**
 * Editorial stats strip — the masthead of the play screen. Renders as a single
 * row of `Stat` cells separated by hairlines, with a meta line above showing
 * the game · mode · difficulty.
 */
export default function HUD({
  difficultyLabel,
  modeLabel,
  score,
  best,
  moves,
  matches,
  totalPairs,
  streak,
  scoreDelta,
}: HUDProps) {
  return (
    <Box
      sx={{
        width: '100%',
        background: PAPER.surface,
        border: `1px solid ${PAPER.hairline}`,
        borderRadius: 'clamp(10px, 2cqmin, 16px)',
        boxShadow: '0 1px 2px rgba(31,27,20,0.04), 0 4px 14px rgba(31,27,20,0.04)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 'clamp(6px, 1.4cqmin, 12px)',
          px: 'clamp(10px, 2cqmin, 16px)',
          py: 'clamp(5px, 1cqh, 8px)',
          borderBottom: `1px solid ${PAPER.hairlineSoft}`,
          minWidth: 0,
        }}
      >
        <Typography
          component="span"
          sx={{
            color: ACCENT,
            fontSize: 'clamp(0.6rem, 1.4cqh, 0.72rem)',
            fontWeight: 800,
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            lineHeight: 1,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            minWidth: 0,
          }}
        >
          Eco Memory
          <Box component="span" sx={{ color: PAPER.meta, mx: 1 }}>·</Box>
          {modeLabel}
          <Box component="span" sx={{ color: PAPER.meta, mx: 1 }}>·</Box>
          {difficultyLabel}
        </Typography>
        <Typography
          component="span"
          sx={{
            color: PAPER.meta,
            fontSize: 'clamp(0.6rem, 1.4cqh, 0.72rem)',
            fontWeight: 600,
            fontStyle: 'italic',
            lineHeight: 1,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {totalPairs} pairs · climate vocabulary
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'stretch',
          py: 'clamp(7px, 1.4cqh, 11px)',
          // Hairline divider between stats — applied as a left border on each
          // child except the first so they read like the dividers between
          // figures in a sports scoreboard.
          '& > *:not(:first-of-type)': {
            borderLeft: `1px solid ${PAPER.hairlineSoft}`,
          },
        }}
      >
        <Stat label="Score" value={score.toLocaleString()} delta={scoreDelta} emphasis="accent" />
        <Stat label="Best" value={best.toLocaleString()} />
        <Stat label="Moves" value={moves} />
        <Stat label="Pairs" value={`${matches}/${totalPairs}`} />
        <Stat
          label="Streak"
          value={streak >= 1 ? `×${streak}` : '—'}
          emphasis={streak >= 2 ? 'streak' : 'default'}
        />
      </Box>
    </Box>
  );
}
