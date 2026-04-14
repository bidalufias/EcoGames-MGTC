// Recycle Rush — Tetris-style waste sorting game
// Sort falling waste into the correct bin before it hits the ground

export const BINS = [
  { id: 'recycle', emoji: '♻️', name: 'Recycle', color: '#4CAF50', accepts: ['plastic', 'paper', 'glass', 'metal'] },
  { id: 'compost', emoji: '🌿', name: 'Compost', color: '#8BC34A', accepts: ['food', 'garden'] },
  { id: 'landfill', emoji: '🗑️', name: 'Landfill', color: '#78909C', accepts: ['mixed', 'styrofoam', 'diaper'] },
  { id: 'hazardous', emoji: '⚠️', name: 'Hazardous', color: '#FF5722', accepts: ['battery', 'chemical', 'paint'] },
  { id: 'ewaste', emoji: '💻', name: 'E-Waste', color: '#9C27B0', accepts: ['phone', 'cable', 'circuit'] },
];

export const WASTE_ITEMS = [
  // Recycle
  { type: 'plastic', emoji: '🥤', name: 'Plastic Bottle', bin: 'recycle', fact: 'Only 9% of all plastic ever made has been recycled' },
  { type: 'paper', emoji: '📰', name: 'Newspaper', bin: 'recycle', fact: 'Recycling 1 ton of paper saves 17 trees' },
  { type: 'glass', emoji: '🍶', name: 'Glass Jar', bin: 'recycle', fact: 'Glass is 100% recyclable and can be recycled endlessly' },
  { type: 'metal', emoji: '🥫', name: 'Tin Can', bin: 'recycle', fact: 'Recycling aluminum saves 95% of the energy vs making new' },
  // Compost
  { type: 'food', emoji: '🍌', name: 'Banana Peel', bin: 'compost', fact: 'Food waste in landfills produces methane — compost instead!' },
  { type: 'garden', emoji: '🍂', name: 'Leaves', bin: 'compost', fact: 'Composting reduces landfill waste by up to 30%' },
  // Landfill
  { type: 'mixed', emoji: '🧸', name: 'Stuffed Toy', bin: 'landfill', fact: 'Most toys end up in landfill — donate or upcycle!' },
  { type: 'styrofoam', emoji: '📦', name: 'Styrofoam', bin: 'landfill', fact: 'Styrofoam takes 500+ years to decompose' },
  // Hazardous
  { type: 'battery', emoji: '🔋', name: 'Battery', bin: 'hazardous', fact: 'One battery can pollute 600,000 liters of water' },
  { type: 'chemical', emoji: '🧴', name: 'Cleaner', bin: 'hazardous', fact: 'Household chemicals contaminate soil and groundwater' },
  // E-waste
  { type: 'phone', emoji: '📱', name: 'Old Phone', bin: 'ewaste', fact: 'E-waste is the fastest growing waste stream globally' },
  { type: 'cable', emoji: '🔌', name: 'Cable', bin: 'ewaste', fact: 'E-waste contains valuable metals like gold, silver, and copper' },
];

export const DIFFICULTY_LEVELS = [
  { speed: 2, spawnRate: 120, types: 4 },   // Level 1
  { speed: 2.5, spawnRate: 100, types: 6 },  // Level 2
  { speed: 3, spawnRate: 85, types: 8 },     // Level 3
  { speed: 3.5, spawnRate: 70, types: 10 },  // Level 4
  { speed: 4, spawnRate: 55, types: 12 },    // Level 5
];

export const PLAYFIELD_W = 5;
export const PLAYFIELD_H = 12;
export const CELL_SIZE = 50;

export function randomWaste(level: number) {
  const types = Math.min(DIFFICULTY_LEVELS[Math.min(level, 4)].types, WASTE_ITEMS.length);
  return WASTE_ITEMS[Math.floor(Math.random() * types)];
}
