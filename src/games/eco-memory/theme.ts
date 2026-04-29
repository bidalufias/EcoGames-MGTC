// Eco Memory paper-editorial theme. Mirrors the warm hand-crafted register
// from the landing page so the game feels like a continuation of the magazine,
// not a separate app.

export const PAPER = {
  bg: '#FAF7F0',
  surface: '#FFFCF5',
  ink: '#1F1B14',
  subInk: '#3F3A2F',
  meta: '#7A6F5C',
  faded: '#9C8E78',
  hairline: '#ECE3D0',
  hairlineSoft: '#F3EBD8',
};

export const ACCENT = '#6D28D9';
export const ACCENT_SOFT = '#6D28D912';
export const ACCENT_RING = '#6D28D933';

export const EMOJI_FONT =
  '"Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif';

// Inline-SVG fractal-noise grain matching the landing-page paper feel. Used as
// a `backgroundImage` so it tiles cheaply without a network fetch.
export const PAPER_GRAIN =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.13  0 0 0 0 0.10  0 0 0 0 0.06  0 0 0 0.06 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")";
