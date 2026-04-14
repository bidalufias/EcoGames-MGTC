// Green Defence — Tower defence: deploy clean tech to stop pollution waves

export interface Tower {
  id: number;
  type: string;
  emoji: string;
  name: string;
  color: string;
  range: number;
  damage: number;
  speed: number; // attacks per second
  cost: number;
  fact: string;
  row: number;
  col: number;
  lastAttack: number;
}

export interface Enemy {
  id: number;
  type: string;
  emoji: string;
  name: string;
  color: string;
  hp: number;
  maxHp: number;
  speed: number;
  reward: number;
  x: number;
  y: number;
  pathIndex: number;
}

export interface Projectile {
  id: number;
  x: number;
  y: number;
  targetId: number;
  speed: number;
  damage: number;
  color: string;
}

export const TOWER_TYPES = [
  { type: 'solar', emoji: '☀️', name: 'Solar Panel', color: '#FFB800', range: 120, damage: 15, speed: 1.2, cost: 50, fact: 'Solar energy costs have dropped 89% since 2010' },
  { type: 'wind', emoji: '💨', name: 'Wind Turbine', color: '#87CEEB', range: 150, damage: 25, speed: 0.8, cost: 80, fact: 'Wind turbines can operate for 20-25 years' },
  { type: 'ev', emoji: '🔋', name: 'EV Fleet', color: '#0D9B4A', range: 100, damage: 35, speed: 1.5, cost: 100, fact: 'EVs produce zero tailpipe emissions' },
  { type: 'tree', emoji: '🌳', name: 'Reforestation', color: '#2E7D32', range: 130, damage: 10, speed: 0.5, cost: 30, fact: 'Trees absorb CO₂ and release oxygen' },
  { type: 'ccs', emoji: '🔬', name: 'Carbon Capture', color: '#00BCD4', range: 90, damage: 50, speed: 0.4, cost: 150, fact: 'Carbon capture can remove 90% of CO₂ from power plants' },
];

export const ENEMY_TYPES = [
  { type: 'co2', emoji: '⬛', name: 'CO₂ Cloud', color: '#555', hp: 30, speed: 0.8, reward: 10 },
  { type: 'methane', emoji: '🐄', name: 'Methane', color: '#8B4513', hp: 50, speed: 0.6, reward: 15 },
  { type: 'n2o', emoji: '🧪', name: 'N₂O', color: '#9B59B6', hp: 70, speed: 0.5, reward: 20 },
  { type: 'sf6', emoji: '⚡', name: 'SF₆', color: '#F39C12', hp: 100, speed: 0.4, reward: 30 },
  { type: 'factory', emoji: '🏭', name: 'Factory', color: '#455A64', hp: 200, speed: 0.3, reward: 50 },
];

export const GRID_W = 10;
export const GRID_H = 8;
export const CELL = 60;

export const WAVE_CONFIG = [
  { enemies: [{ type: 'co2', count: 5 }], delay: 1200 },
  { enemies: [{ type: 'co2', count: 8 }], delay: 1100 },
  { enemies: [{ type: 'co2', count: 5 }, { type: 'methane', count: 3 }], delay: 1000 },
  { enemies: [{ type: 'methane', count: 6 }, { type: 'n2o', count: 2 }], delay: 900 },
  { enemies: [{ type: 'co2', count: 10 }, { type: 'methane', count: 5 }, { type: 'n2o', count: 3 }], delay: 800 },
  { enemies: [{ type: 'n2o', count: 5 }, { type: 'sf6', count: 2 }], delay: 800 },
  { enemies: [{ type: 'co2', count: 15 }, { type: 'methane', count: 8 }, { type: 'n2o', count: 4 }], delay: 700 },
  { enemies: [{ type: 'factory', count: 2 }, { type: 'sf6', count: 3 }], delay: 700 },
  { enemies: [{ type: 'co2', count: 20 }, { type: 'methane', count: 10 }, { type: 'n2o', count: 5 }, { type: 'sf6', count: 3 }], delay: 600 },
  { enemies: [{ type: 'factory', count: 3 }, { type: 'sf6', count: 5 }, { type: 'n2o', count: 5 }], delay: 500 },
];

// Simple path: enemies follow left-to-right across middle rows
export function getPath(): Array<{ x: number; y: number }> {
  const path: Array<{ x: number; y: number }> = [];
  const midRow = Math.floor(GRID_H / 2);
  // Left edge to right edge through the middle
  for (let c = 0; c <= GRID_W + 1; c++) {
    path.push({ x: c * CELL + CELL / 2, y: midRow * CELL + CELL / 2 });
  }
  return path;
}
