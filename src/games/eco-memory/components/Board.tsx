import { Box } from '@mui/material';
import Card from './Card';
import type { CardDef, CardState } from '../engine';

interface BoardProps {
  deck: CardDef[];
  cards: Record<number, CardState>;
  onFlip: (id: number) => void;
  disabled?: boolean;
  /** Number of columns; defaults to a square-ish layout. */
  cols?: number;
}

/**
 * Aspect-ratio-constrained grid that always fits inside its parent without
 * scrolling.
 *
 * The outer wrapper is a CSS size container so the inner grid can use
 * `cqw`/`cqh` to compare its parent's width and height — the only way in CSS
 * to pick "the largest box of a given aspect ratio that fits inside an
 * arbitrary rectangle" purely with declarative styles. (Plain `100%` would
 * resolve each dimension against a different reference, which can't express
 * the cross-axis dependency.)
 */
export default function Board({ deck, cards, onFlip, disabled, cols }: BoardProps) {
  const total = deck.length;
  const columns = cols ?? Math.ceil(Math.sqrt(total));
  const rows = Math.ceil(total / columns);
  const ratio = columns / rows;

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: '100%',
        display: 'grid',
        placeItems: 'center',
        minWidth: 0,
        minHeight: 0,
        containerType: 'size',
      }}
    >
      <Box
        sx={{
          width: `min(100cqw, calc(100cqh * ${ratio}))`,
          height: `min(100cqh, calc(100cqw / ${ratio}))`,
          aspectRatio: `${columns} / ${rows}`,
          display: 'grid',
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          gridAutoRows: '1fr',
          gap: 'clamp(4px, 1.4cqi, 12px)',
          containerType: 'inline-size',
          padding: 'clamp(2px, 0.8cqi, 8px)',
        }}
      >
        {deck.map(card => (
          <Card
            key={card.id}
            def={card}
            state={cards[card.id]}
            disabled={disabled}
            onClick={() => onFlip(card.id)}
          />
        ))}
      </Box>
    </Box>
  );
}
