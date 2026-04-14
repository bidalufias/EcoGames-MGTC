// Carbon Crush — Match-3 educational game
// Match dirty tech tiles to phase them out, replacing with clean alternatives

export interface Tile {
  id: number;
  type: string;
  emoji: string;
  name: string;
  color: string;
  fact: string;
  row: number;
  col: number;
  selected: boolean;
  clearing: boolean;
  dropping: boolean;
  isNew: boolean;
  opacity: number;
  scale: number;
}

export const DIRTY_TECH = [
  { type: 'coal', emoji: '🏭', name: 'Coal Plant', color: '#555', fact: 'Coal is the #1 source of CO₂ emissions worldwide' },
  { type: 'gas-car', emoji: '🚗', name: 'Gas Car', color: '#8B4513', fact: 'Transportation accounts for 24% of CO₂ emissions' },
  { type: 'oil-rig', emoji: '🛢️', name: 'Oil Rig', color: '#2C3E50', fact: 'Oil spills devastate marine ecosystems for decades' },
  { type: 'incinerator', emoji: '🗑️', name: 'Incinerator', color: '#6B3A2A', fact: 'Burning waste releases dioxins and heavy metals' },
  { type: 'deforest', emoji: '🪓', name: 'Deforestation', color: '#5D4037', fact: 'We lose 10 million hectares of forest each year' },
  { type: 'factory', emoji: '🏗️', name: 'Heavy Industry', color: '#455A64', fact: 'Industrial processes produce 21% of global GHGs' },
  { type: 'methane', emoji: '🐄', name: 'Methane Leak', color: '#795548', fact: 'Methane traps 80x more heat than CO₂ over 20 years' },
];

export const CLEAN_TECH = [
  { type: 'solar', emoji: '☀️', name: 'Solar', color: '#FFB800', fact: 'Solar is now the cheapest electricity in history' },
  { type: 'wind', emoji: '💨', name: 'Wind', color: '#87CEEB', fact: 'Offshore wind could power the entire world' },
  { type: 'ev', emoji: '🔋', name: 'EV', color: '#0D9B4A', fact: 'EVs are 3x more efficient than gas cars' },
  { type: 'recycle', emoji: '♻️', name: 'Recycle', color: '#4CAF50', fact: 'Recycling saves 700 million tons of CO₂ per year' },
  { type: 'tree', emoji: '🌳', name: 'Reforest', color: '#2E7D32', fact: 'Trees absorb 22kg of CO₂ per year each' },
];

export const GRID_ROWS = 8;
export const GRID_COLS = 8;
export const TILE_SIZE = 60;
export const ANIMATION_DURATION = 250;
export const CLEAN_TRANSITION_THRESHOLD = 500;
export const COMBO_TIMEOUT = 3000;

export function randomTile(row: number, col: number, id: number): Tile {
  const all = [...DIRTY_TECH];
  const tech = all[Math.floor(Math.random() * all.length)];
  return {
    id, type: tech.type, emoji: tech.emoji, name: tech.name,
    color: tech.color, fact: tech.fact,
    row, col, selected: false, clearing: false, dropping: false, isNew: true,
    opacity: 1, scale: 1,
  };
}

export function randomCleanTile(row: number, col: number, id: number): Tile {
  const tech = CLEAN_TECH[Math.floor(Math.random() * CLEAN_TECH.length)];
  return {
    id, type: tech.type, emoji: tech.emoji, name: tech.name,
    color: tech.color, fact: tech.fact,
    row, col, selected: false, clearing: false, dropping: false, isNew: true,
    opacity: 1, scale: 1,
  };
}

export function createGrid(): Tile[][] {
  let nextId = 0;
  const grid: Tile[][] = [];
  for (let r = 0; r < GRID_ROWS; r++) {
    grid[r] = [];
    for (let c = 0; c < GRID_COLS; c++) {
      let tile = randomTile(r, c, nextId++);
      // Avoid initial matches of 3
      let tries = 0;
      while (tries < 20 && hasMatchAt(grid, tile, r, c)) {
        tile = randomTile(r, c, nextId++);
        tries++;
      }
      grid[r][c] = tile;
    }
  }
  return grid;
}

function hasMatchAt(grid: Tile[][], tile: Tile, row: number, col: number): boolean {
  // Check horizontal
  if (col >= 2 && grid[row][col - 1]?.type === tile.type && grid[row][col - 2]?.type === tile.type) return true;
  // Check vertical
  if (row >= 2 && grid[row - 1]?.[col]?.type === tile.type && grid[row - 2]?.[col]?.type === tile.type) return true;
  return false;
}

export function findMatches(grid: Tile[][]): Set<string> {
  const matched = new Set<string>();

  // Horizontal
  for (let r = 0; r < GRID_ROWS; r++) {
    for (let c = 0; c < GRID_COLS - 2; c++) {
      if (grid[r][c] && grid[r][c + 1] && grid[r][c + 2] &&
          grid[r][c].type === grid[r][c + 1].type && grid[r][c].type === grid[r][c + 2].type) {
        matched.add(`${r},${c}`);
        matched.add(`${r},${c + 1}`);
        matched.add(`${r},${c + 2}`);
      }
    }
  }

  // Vertical
  for (let r = 0; r < GRID_ROWS - 2; r++) {
    for (let c = 0; c < GRID_COLS; c++) {
      if (grid[r][c] && grid[r + 1][c] && grid[r + 2][c] &&
          grid[r][c].type === grid[r + 1][c].type && grid[r][c].type === grid[r + 2][c].type) {
        matched.add(`${r},${c}`);
        matched.add(`${r + 1},${c}`);
        matched.add(`${r + 2},${c}`);
      }
    }
  }

  return matched;
}

export function removeMatches(grid: Tile[][], matched: Set<string>): number {
  let count = 0;
  for (const key of matched) {
    const [r, c] = key.split(',').map(Number);
    if (grid[r][c]) {
      grid[r][c] = null as any;
      count++;
    }
  }
  return count;
}

export function applyGravity(grid: Tile[][], nextId: { value: number }, useClean: boolean): Tile[][] {
  for (let c = 0; c < GRID_COLS; c++) {
    // Compact column: move non-null down
    let writeRow = GRID_ROWS - 1;
    for (let r = GRID_ROWS - 1; r >= 0; r--) {
      if (grid[r][c]) {
        if (r !== writeRow) {
          grid[writeRow][c] = grid[r][c];
          grid[writeRow][c].row = writeRow;
          grid[writeRow][c].dropping = true;
          grid[r][c] = null as any;
        }
        writeRow--;
      }
    }
    // Fill empty spots at top with new tiles
    for (let r = writeRow; r >= 0; r--) {
      const makeClean = useClean && Math.random() < 0.3;
      grid[r][c] = makeClean ? randomCleanTile(r, c, nextId.value++) : randomTile(r, c, nextId.value++);
      grid[r][c].isNew = true;
    }
  }
  return grid;
}

export function isAdjacent(t1: Tile, t2: Tile): boolean {
  const dr = Math.abs(t1.row - t2.row);
  const dc = Math.abs(t1.col - t2.col);
  return (dr === 1 && dc === 0) || (dr === 0 && dc === 1);
}

export function swapTiles(grid: Tile[][], r1: number, c1: number, r2: number, c2: number): void {
  const temp = grid[r1][c1];
  grid[r1][c1] = grid[r2][c2];
  grid[r2][c2] = temp;
  if (grid[r1][c1]) { grid[r1][c1].row = r1; grid[r1][c1].col = c1; }
  if (grid[r2][c2]) { grid[r2][c2].row = r2; grid[r2][c2].col = c2; }
}

export function hasValidMoves(grid: Tile[][]): boolean {
  for (let r = 0; r < GRID_ROWS; r++) {
    for (let c = 0; c < GRID_COLS; c++) {
      // Try swap right
      if (c < GRID_COLS - 1) {
        swapTiles(grid, r, c, r, c + 1);
        if (findMatches(grid).size > 0) { swapTiles(grid, r, c, r, c + 1); return true; }
        swapTiles(grid, r, c, r, c + 1);
      }
      // Try swap down
      if (r < GRID_ROWS - 1) {
        swapTiles(grid, r, c, r + 1, c);
        if (findMatches(grid).size > 0) { swapTiles(grid, r, c, r + 1, c); return true; }
        swapTiles(grid, r, c, r + 1, c);
      }
    }
  }
  return false;
}
