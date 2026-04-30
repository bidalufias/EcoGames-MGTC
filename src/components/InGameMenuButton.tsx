import { Box, Typography } from '@mui/material';

interface Props {
  onClick: () => void;
  /** Label after the back arrow. Defaults to "Menu". */
  label?: string;
  /** Override the aria-label if `label` doesn't describe the action well. */
  ariaLabel?: string;
}

/**
 * In-game top-left button that returns to a game's own menu/intro screen.
 * Mirrors the visual language of `BackToHome` (used by the global header)
 * so every game presents the back affordance in the same spot, with the
 * same shape and weight, regardless of who owns the header.
 */
export default function InGameMenuButton({ onClick, label = 'Menu', ariaLabel }: Props) {
  return (
    <Box
      component="button"
      type="button"
      onClick={onClick}
      aria-label={ariaLabel ?? `Back to ${label}`}
      sx={{
        position: 'absolute',
        top: 'clamp(10px, 2.5cqh, 24px)',
        left: 'clamp(12px, 3cqw, 32px)',
        zIndex: 10001,
        minHeight: 44,
        minWidth: 44,
        px: 2,
        py: 1.25,
        borderRadius: '12px',
        background: 'rgba(255,255,255,0.92)',
        border: '1px solid rgba(15,23,42,0.08)',
        cursor: 'pointer',
        display: 'inline-flex',
        alignItems: 'center',
        gap: 0.75,
        boxShadow: '0 1px 3px rgba(15,23,42,0.08)',
        font: 'inherit',
        color: 'inherit',
        textAlign: 'left',
        '&:hover': {
          background: '#FFFFFF',
          boxShadow: '0 4px 12px rgba(15,23,42,0.1)',
        },
        '&:focus-visible': {
          outline: '2px solid #15803D',
          outlineOffset: 3,
        },
        transition: 'background 0.18s, box-shadow 0.18s',
      }}
    >
      <Typography sx={{ fontSize: 14, color: '#475569', fontWeight: 600, letterSpacing: '-0.01em' }}>
        ← {label}
      </Typography>
    </Box>
  );
}
