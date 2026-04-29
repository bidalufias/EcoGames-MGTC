import { useState } from 'react';
import ModeSelect, { type Mode } from './components/ModeSelect';
import SoloPlay from './components/SoloPlay';
import VersusPlay from './components/VersusPlay';

/**
 * Top-level Eco Memory shell. Mirrors the Climate 2048 split (`ModeSelect` →
 * `SoloPlay` / `ChallengePlay`): a thin router that hands off to the chosen
 * mode and lets each one own its full screen flow.
 */
export default function EcoMemoryGame() {
  const [mode, setMode] = useState<Mode | null>(null);

  if (mode === 'solo') return <SoloPlay onExit={() => setMode(null)} />;
  if (mode === 'versus') return <VersusPlay onExit={() => setMode(null)} />;
  return <ModeSelect onPick={setMode} />;
}
