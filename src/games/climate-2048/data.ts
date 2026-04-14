// Climate 2048 — Merge puzzle: tech progression from LED bulbs to smart cities

export interface Tile {
  id: number;
  value: number;
  row: number;
  col: number;
  merged: boolean;
}

export const TECH_PROGRESSION: Record<number, { emoji: string; name: string; color: string; fact: string }> = {
  2:   { emoji: '💡', name: 'LED Bulb', color: '#FFD54F', fact: 'LEDs use 75% less energy than incandescent bulbs' },
  4:   { emoji: '🔌', name: 'Smart Plug', color: '#FFA726', fact: 'Smart plugs can reduce standby power by 80%' },
  8:   { emoji: '🏠', name: 'Green Home', color: '#FF7043', fact: 'Green buildings use 25-35% less energy' },
  16:  { emoji: '🚲', name: 'Bike Network', color: '#EF5350', fact: 'Cycling infrastructure reduces urban emissions by 11%' },
  32:  { emoji: '☀️', name: 'Solar Farm', color: '#EC407A', fact: 'The largest solar farm powers 2 million homes' },
  64:  { emoji: '💨', name: 'Wind Farm', color: '#AB47BC', fact: 'Wind power could supply 18x global electricity demand' },
  128: { emoji: '🔋', name: 'Grid Battery', color: '#7E57C2', fact: 'Battery storage costs have fallen 97% since 1991' },
  256: { emoji: '🚄', name: 'High Speed Rail', color: '#5C6BC0', fact: 'HSR produces 14x less CO₂ than flying' },
  512: { emoji: '🌿', name: 'Carbon Farm', color: '#42A5F5', fact: 'Regenerative farming can sequester 1.85 gigatons CO₂/year' },
  1024:{ emoji: '🔬', name: 'Carbon Capture', color: '#26C6DA', fact: 'Direct air capture can remove CO₂ from the atmosphere' },
  2048:{ emoji: '🏙️', name: 'Smart City', color: '#0D9B4A', fact: 'Smart cities could reduce emissions by 15-30%' },
  4096:{ emoji: '🌍', name: 'Net Zero!', color: '#14CC66', fact: 'Net Zero means balancing emissions with removals' },
};

export const GRID_SIZE = 4;

export function getTechForValue(value: number) {
  return TECH_PROGRESSION[value] || { emoji: '🌍', name: `Level ${value}`, color: '#14CC66', fact: 'Keep merging!' };
}
