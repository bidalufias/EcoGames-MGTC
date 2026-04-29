// Eco Memory — climate-vocabulary pair definitions. Each pair links a key
// climate concept to its real-world example so a successful match teaches a
// term a player needs to read or talk about climate change.
//
// Greenhouse gases are intentionally NOT covered here — that's Climate Ninja's
// territory. Eco Memory broadens to vocabulary, mechanisms, and named events
// (Paris Agreement, IPCC) so the two games stay distinct.

export interface PairDef {
  /** Concept-side glyph and label (the term being defined). */
  emoji: string;
  label: string;
  /** Example-side glyph and label (the real-world manifestation). */
  sourceEmoji: string;
  source: string;
  color: string;
  /**
   * 2–3 sentence first-time-reader explanation. Shown in the in-game fact
   * ribbon, the end-of-game journal, and the ModeSelect glossary preview, so
   * everywhere it appears it has to stand on its own.
   */
  fact: string;
}

// Order is important — easy/medium/hard slice from the front, so the most
// foundational concepts come first.
export const CLIMATE_PAIRS: PairDef[] = [
  // —— Easy (foundational actions + state) ——
  {
    emoji: '🪣',
    label: 'Carbon sink',
    sourceEmoji: '🌲',
    source: 'Forest',
    color: '#15803D',
    fact: 'A natural store that absorbs more CO₂ than it releases. Forests, oceans, and healthy soils hold trillions of tonnes of carbon. When forests burn or are cleared, that stored carbon returns to the atmosphere.',
  },
  {
    emoji: '⚖️',
    label: 'Net zero',
    sourceEmoji: '🟰',
    source: 'Balance',
    color: '#0D9B4A',
    fact: 'Adding no more greenhouse gases than we remove. Some emissions still happen, but trees, soils, and carbon-capture machines pull out an equal amount. The atmosphere’s balance stays steady.',
  },
  {
    emoji: '✂️',
    label: 'Mitigation',
    sourceEmoji: '💨',
    source: 'Renewables',
    color: '#84CC16',
    fact: 'Cutting the cause of climate change — burning less coal, gas, and oil and replacing them with clean power like wind and solar. The opposite of waiting for the damage to arrive.',
  },
  {
    emoji: '🛡️',
    label: 'Adaptation',
    sourceEmoji: '🧱',
    source: 'Sea wall',
    color: '#2563EB',
    fact: 'Preparing for the climate change that is already locked in — building sea walls, redesigning farms, cooling cities. Mitigation reduces the cause; adaptation reduces the harm.',
  },

  // —— Medium adds (personal + science vocab) ——
  {
    emoji: '👣',
    label: 'Carbon footprint',
    sourceEmoji: '🚗',
    source: 'Daily life',
    color: '#71717A',
    fact: 'The total greenhouse gases your daily life adds to the atmosphere through travel, food, energy, and shopping. The bigger the footprint, the heavier the load you place on the climate.',
  },
  {
    emoji: '👤',
    label: 'Anthropogenic',
    sourceEmoji: '🏭',
    source: 'Human-caused',
    color: '#B91C1C',
    fact: 'Caused by humans. Almost all of the warming since 1900 is anthropogenic — the result of burning fossil fuels and clearing land — not the slow natural cycles that shaped earlier eras.',
  },
  {
    emoji: '🪞',
    label: 'Albedo',
    sourceEmoji: '❄️',
    source: 'Ice & snow',
    color: '#0EA5E9',
    fact: 'How much sunlight a surface bounces back into space. Bright snow and ice reflect most of it; dark ocean and rock absorb nearly all. As ice melts, the planet swaps its mirror for a sponge.',
  },
  {
    emoji: '🎢',
    label: 'Tipping point',
    sourceEmoji: '🧊',
    source: 'Arctic melt',
    color: '#EA580C',
    fact: 'A threshold beyond which a change becomes self-sustaining and almost impossible to undo. Once enough Arctic summer ice is gone, the dark water absorbs more heat — melting more ice — and the system can’t go back.',
  },

  // —— Hard adds (chains + named institutions + named impacts) ——
  {
    emoji: '🔁',
    label: 'Feedback loop',
    sourceEmoji: '🌋',
    source: 'Permafrost',
    color: '#D97706',
    fact: 'When a change makes more of itself happen. Warming thaws Arctic permafrost, which releases trapped methane, which warms things further — the loop closes back on its own cause.',
  },
  {
    emoji: '🤝',
    label: 'Paris Agreement',
    sourceEmoji: '🌡️',
    source: '1.5 °C cap',
    color: '#7C3AED',
    fact: 'The 2015 treaty in which almost every country agreed to keep global warming well below 2 °C — and aim for under 1.5 °C — above pre-industrial levels. Each nation sets its own pledge to get there.',
  },
  {
    emoji: '📚',
    label: 'IPCC',
    sourceEmoji: '🔬',
    source: 'Climate reports',
    color: '#1E293B',
    fact: 'The UN’s Intergovernmental Panel on Climate Change. Thousands of scientists review the world’s climate research and publish reports that say what we know — and how confident we are about it.',
  },
  {
    emoji: '🧪',
    label: 'Acidification',
    sourceEmoji: '🪸',
    source: 'Coral bleaching',
    color: '#0F766E',
    fact: 'When the ocean absorbs CO₂ from the air, it turns slightly more acidic. That dissolves coral skeletons and seashells, bleaching reefs white and brittle even before the water itself gets too warm.',
  },
];

export type Difficulty = 'easy' | 'medium' | 'hard';

export interface DifficultyDef {
  id: Difficulty;
  label: string;
  emoji: string;
  pairCount: number;
  cols: number;
  rows: number;
  description: string;
}

// Layouts pick column counts that read well in both portrait and landscape on
// an iPad. The board itself self-caps to a square that fits the viewport, so
// these numbers only set how the cards are arranged within it.
export const DIFFICULTIES: Record<Difficulty, DifficultyDef> = {
  easy: {
    id: 'easy',
    label: 'Easy',
    emoji: '🌱',
    pairCount: 4,
    cols: 4,
    rows: 2,
    description: '4 pairs · 4×2 grid',
  },
  medium: {
    id: 'medium',
    label: 'Medium',
    emoji: '🌿',
    pairCount: 8,
    cols: 4,
    rows: 4,
    description: '8 pairs · 4×4 grid',
  },
  hard: {
    id: 'hard',
    label: 'Hard',
    emoji: '🌳',
    pairCount: 12,
    cols: 6,
    rows: 4,
    description: '12 pairs · 6×4 grid',
  },
};

export function getPairsForDifficulty(difficulty: Difficulty): PairDef[] {
  return CLIMATE_PAIRS.slice(0, DIFFICULTIES[difficulty].pairCount);
}

export function getLayoutForDifficulty(difficulty: Difficulty): { cols: number; rows: number } {
  const def = DIFFICULTIES[difficulty];
  return { cols: def.cols, rows: def.rows };
}
