---
name: EcoGames
description: A hub of six short, playable browser games that sneak climate-and-green-tech literacy into the rhythm of casual play.
colors:
  paper-bg: "#FAF7F0"
  paper-surface: "#FFFCF5"
  paper-ink: "#1F1B14"
  paper-sub-ink: "#3F3A2F"
  paper-meta: "#7A6F5C"
  paper-faded: "#9C8E78"
  paper-hairline: "#ECE3D0"
  paper-hairline-soft: "#F3EBD8"
  accent-forest: "#15803D"
  accent-cobalt: "#1D4ED8"
  accent-rust: "#C2410C"
  accent-violet: "#6D28D9"
  accent-teal: "#0F766E"
  accent-brick: "#B91C1C"
  state-success: "#15803D"
  state-warning: "#B45309"
  state-error: "#B91C1C"
typography:
  display:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif"
    fontSize: "clamp(1.4rem, 4.4cqh, 2.9rem)"
    fontWeight: 900
    lineHeight: 0.98
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "clamp(1.05rem, 4.2cqmin, 1.55rem)"
    fontWeight: 800
    lineHeight: 1.05
    letterSpacing: "-0.025em"
  title:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.01em"
  body:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "clamp(0.95rem, 2.4cqmin, 1.05rem)"
    fontWeight: 500
    lineHeight: 1.5
    letterSpacing: "0"
  label:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "clamp(0.6rem, 1.4cqh, 0.72rem)"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "0.16em"
  meta-italic:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "clamp(0.6rem, 1.7cqmin, 0.74rem)"
    fontWeight: 500
    lineHeight: 1.1
    letterSpacing: "0"
rounded:
  pill: "999px"
  card: "16px"
  tile: "20px"
  control: "12px"
  chip: "10px"
  inset: "8px"
spacing:
  hair: "4px"
  xs: "8px"
  sm: "12px"
  md: "16px"
  lg: "24px"
  xl: "36px"
  xxl: "56px"
components:
  button-primary:
    backgroundColor: "{colors.accent-forest}"
    textColor: "{colors.paper-surface}"
    rounded: "{rounded.control}"
    padding: "12px 24px"
    height: "48px"
  button-primary-hover:
    backgroundColor: "{colors.paper-ink}"
    textColor: "{colors.paper-surface}"
  button-secondary:
    backgroundColor: "{colors.paper-surface}"
    textColor: "{colors.accent-forest}"
    rounded: "{rounded.control}"
    padding: "12px 24px"
    height: "48px"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.paper-meta}"
    rounded: "{rounded.control}"
    padding: "12px 16px"
    height: "44px"
  card-tile:
    backgroundColor: "{colors.paper-surface}"
    rounded: "{rounded.tile}"
    padding: "clamp(14px, 3.4cqmin, 24px)"
  input-text:
    backgroundColor: "{colors.paper-surface}"
    textColor: "{colors.paper-ink}"
    rounded: "{rounded.chip}"
    padding: "12px 16px"
    height: "44px"
  chip-topic:
    backgroundColor: "transparent"
    textColor: "{colors.accent-forest}"
    rounded: "{rounded.pill}"
    padding: "0"
  hud-panel:
    backgroundColor: "{colors.paper-surface}"
    rounded: "{rounded.card}"
    padding: "clamp(7px, 1.4cqh, 11px)"
  back-chip:
    backgroundColor: "{colors.paper-surface}"
    textColor: "{colors.paper-sub-ink}"
    rounded: "{rounded.control}"
    padding: "10px 16px"
    height: "44px"
---

# Design System: EcoGames

## 1. Overview

**Creative North Star: "The Pocket Climate Almanac"**

EcoGames feels like a hand-crafted museum-shop almanac you flip through on a phone. Cream paper, ink that looks pressed not painted, a single accent that changes per game like a chapter color. The hub is a curated index, each tile a chapter card; play is a moment between pages, not a separate app. Density is editorial, not utilitarian — wide gutters, generous line-height, type that breathes. Motion is calm: pages fade and rise, accents tint, nothing bounces.

The system rejects the obvious moves of its category. No SaaS dark dashboard. No neon-on-black "eco" cliché. No identical card grid where six games look like the same component repeated. Each game has a face: its own accent color, its own emoji at almanac scale, its own name in a chapter slug. Touch is the assumed input — every interactive element is a thumb-sized target, hover is a privilege, never a requirement.

**Key Characteristics:**
- Cream paper surface (`#FAF7F0`) with subtle SVG fractal-noise grain — never `#FFFFFF`.
- Ink (`#1F1B14`) is warm-tinted, never pure `#000`.
- One accent per surface; never two accents fighting on the same screen.
- Type sets fluid, layout sets to a 16:9 stage that letterboxes on landscape and fills the viewport in portrait.
- All interactive surfaces ≥ 44×44px. State changes ≤ 250 ms, ease-out, no bounce.

### The Stage

The whole app is rendered inside a single `.app-stage` element. On landscape it is the largest 16:9 box that fits the viewport, letterboxed in the surrounding frame using `var(--frame-bg)`. On portrait phones (`orientation: portrait` and `max-width: 1024px`) the 16:9 lock is dropped: the stage fills `100svh × 100vw` and games reflow vertically. Every component sizes itself against the stage via container queries (`cqw`, `cqh`, `cqmin`), not the viewport — typography and spacing scale with the stage, not the device.

### Breakpoints

The system targets four canonical screen sizes. **Container-query units (`cqw`, `cqh`, `cqmin`) are normative inside the stage**; viewport units appear only for stage sizing and for portrait-mode media queries.

| Tier | Range | Stage shape | Layout posture |
|---|---|---|---|
| **Mobile** | 320–640px (portrait) | Full-bleed, `100svh × 100vw`, no 16:9 lock | Single column, vertical scroll, content-first |
| **iPad** | 641–1024px (any orientation) | 16:9 lock if landscape; full-bleed if portrait | Two-column where it earns it; otherwise single |
| **Laptop** | 1025–1439px | 16:9 lock, ~1280–1600px wide stage | Editorial 3×2 grid, sidebars, dense HUDs |
| **Large screen** | 1440px+ | 16:9 lock, capped to `1320px` content max-width inside stage | Same as laptop; extra space becomes margin, never content |

**The Stage Rule.** Every game ships with two layouts: a portrait stack and a landscape composition. Never three. The same content reflows; it doesn't fork into a separate "mobile site."

**The Letterbox Rule.** When the stage is letterboxed, the surrounding bars take the route's `--frame-bg` color so the bars blend with the page, never a hard dark band. Never use a full-bleed background image that ends at the stage edge.

## 2. Colors

The palette is paper-warm with chapter-colored accents. Six saturated jewel tones — one per game — are the only saturation you'll see on a given screen. Everything else is neutral, in the cream-to-ink ramp.

### Primary
- **Paper Surface** (`#FFFCF5`): Card faces, HUD panels, dialog backgrounds, leaderboard rows. Slightly warmer than the page surface so cards visibly lift without a shadow.
- **Paper Background** (`#FAF7F0`): The page surface. Carries a low-opacity SVG fractal-noise grain so it reads as paper, not flat fill. Also the default `--frame-bg` letterbox color.

### Secondary — The Six Chapter Accents
Each game owns exactly one accent. The accent appears on its tile, its in-game header, its CTA, and its score numbers. **Never use a chapter accent in another chapter's surface.**

- **Forest** (`#15803D`) — Climate Ninja. Also the system's default focus ring and primary CTA color.
- **Cobalt** (`#1D4ED8`) — Carbon Crush.
- **Rust** (`#C2410C`) — Recycle Rush.
- **Violet** (`#6D28D9`) — Eco Memory.
- **Teal** (`#0F766E`) — Green Defence.
- **Brick** (`#B91C1C`) — Climate 2048.

### Neutral
- **Paper Ink** (`#1F1B14`): Body and headline text. Warm-tinted near-black; never pure `#000`.
- **Paper Sub-Ink** (`#3F3A2F`): Long-form body where Ink is too heavy.
- **Paper Meta** (`#7A6F5C`): Labels, secondary text, dividers' captions, "after [game]" italic.
- **Paper Faded** (`#9C8E78`): Footer micro-copy, timestamps.
- **Paper Hairline** (`#ECE3D0`): The structural divider — table-header underlines, footer top border, card border at rest.
- **Paper Hairline Soft** (`#F3EBD8`): Body-row dividers, intra-component splits where the hard hairline would be too loud.

### State
- **Success** (`#15803D`): Reuses Forest accent. Score-up deltas, "correct" feedback.
- **Warning** (`#B45309`): Streak emphasis, time-running-low.
- **Error** (`#B91C1C`): Score-down deltas, wrong-answer feedback. Reuses Brick accent.

### Named Rules

**The One-Accent-Per-Surface Rule.** A surface (page, screen, modal) carries the page's neutrals plus exactly one chapter accent. Not two. The hub is the only exception — there, the accent rotates by tile.

**The Tinted-Neutral Rule.** Every neutral is warm-tinted toward the paper hue. Never `#000`, never `#FFFFFF`. Every grey carries a faint amber (`#1F1B14`, `#7A6F5C`) — pure greys look cold and clinical against the paper field.

**The Color-Is-Not-State Rule.** Color is never the only carrier of meaning. Pair every state color with an icon, label, or weight change. Required for WCAG 2.1 AA and for our color-blind users.

## 3. Typography

**Display Font:** Inter (with `-apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif` fallbacks). One family, every weight — display through label.

**Emoji Font:** `"Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji"` appended to every text stack. Without this iOS Safari renders empty squares in Climate 2048's tiles.

**Character:** A single technical sans, set with editorial restraint. Weights run from 500 (body) up to 900 (display) — heavy contrast at the hero, calm contrast in body. Never light weights below 500; cream paper makes thin type vanish.

### Hierarchy

Sizes are written as `clamp(min, fluid, max)`. The fluid term uses container-query units (`cqh`, `cqmin`) so type scales against the stage, not the viewport.

| Role | Weight | Size | Line-height | Used for |
|---|---|---|---|---|
| **Display** | 900 | `clamp(1.4rem, 4.4cqh, 2.9rem)` | 0.98 | Landing hero. Italicized green span carries the second clause. |
| **Headline** | 800 | `clamp(1.05rem, 4.2cqmin, 1.55rem)` | 1.05 | Game tile titles, mode-select cards, screen titles. |
| **Title** | 700 | `1rem` (fixed) | 1.2 | In-game pause headers, dialog titles. |
| **Body** | 500 | `clamp(0.95rem, 2.4cqmin, 1.05rem)` | 1.5 | Description copy, learn lines, intro screens. |
| **Body-Compact** | 600 | `clamp(0.74rem, 2.2cqmin, 0.9rem)` | 1.4 | Tile descriptions, in-game body where space is tight. |
| **Label** | 800 | `clamp(0.6rem, 1.4cqh, 0.72rem)` | 1 | Topic chips, HUD labels, table headers. **Always uppercase, `letter-spacing: 0.16em`**. |
| **Meta-Italic** | 500 | `clamp(0.6rem, 1.7cqmin, 0.74rem)` | 1.1 | "after [game]" inspiration line, footer micro-copy, "X pairs · climate vocabulary" sub-titles. |
| **Numeric** | 800 | inherit | inherit | Scores, leaderboard ranks. Always `font-variant-numeric: tabular-nums`. |

### Per-breakpoint behavior

- **Mobile (320–640px):** Display floors at `1.4rem`. Body floors at `0.95rem` — never below. Line-length is whatever the column is; no `max-width: 65ch` on a 360px screen.
- **iPad (641–1024px):** Headlines hit their mid-range; tile titles read at ~1.3rem. Long prose caps at `max-width: 640px` so lines stay 65–75ch.
- **Laptop (1025–1439px):** Display reaches `~2.4rem`. Body ceilings around `1.05rem`. Editorial spacing — generous gaps between stat cells, tile columns at full-width.
- **Large screen (1440px+):** Display caps at `2.9rem`. Body never goes above `1.05rem` — readers don't need 22px body just because the screen is wide. Extra space becomes margin around `maxWidth: 1320` content blocks.

### Named Rules

**The 16-Pixel Floor Rule.** Body text never renders below `0.95rem` on the user's actual screen, on any breakpoint. `clamp()` minimums must protect this floor. The only exception: HUD/score labels with `letter-spacing: 0.16em` may go to `0.6rem` because the spacing makes them legible at the smaller size.

**The Single-Family Rule.** Inter carries everything — display, body, label, numeric. No serif body, no display-font H1 against sans body. The contrast between weights (500 ↔ 900) is the hierarchy.

**The Tabular Numeric Rule.** Every score, time, count, and rank uses `font-variant-numeric: tabular-nums`. Numbers must not jiggle when they update.

## 4. Elevation

The system is **flat with paper warmth**. Surfaces lift via background color (Paper Surface `#FFFCF5` against Paper BG `#FAF7F0`) and a hairline border (`#ECE3D0`), not shadow. Shadows exist, but they are minimal and used as ambient warmth — like the soft shadow a postcard casts on a desk — never as elevation drama.

### Shadow Vocabulary

- **Card-rest** (`box-shadow: 0 1px 2px rgba(31,27,20,0.04), 0 4px 14px rgba(31,27,20,0.04)`): Tile and HUD panel default state.
- **Card-hover** (`box-shadow: 0 2px 4px rgba(31,27,20,0.05), 0 12px 26px <accent>26`): Tile on pointer hover. The second layer tints toward the tile's accent at low opacity. Pointer-only — no hover lift on touch.
- **Chip-rest** (`box-shadow: 0 1px 3px rgba(15,23,42,0.08)`): Back-chip and floating control buttons.
- **Chip-hover** (`box-shadow: 0 4px 12px rgba(15,23,42,0.1)`): Same chip on pointer hover.

### Named Rules

**The Hairline-First Rule.** Use a 1px border in `#ECE3D0` (or accent at `0x33` opacity) to delimit a surface before reaching for a shadow. Hairlines do 80% of the structural work in this system.

**The Hover-Is-A-Privilege Rule.** Every elevation transition is wrapped in `@media (hover: hover)`. Touch users get press-down (`transform: scale(0.99)` on `:active`); pointer users get the lift on hover. Never both.

## 5. Components

### Buttons (`EcoButton`)

- **Character:** Calm, confident, never gradient-loud. Primary uses a brand gradient (Forest → Cobalt), but the gradient is restrained and a focus state replaces it with solid Forest.
- **Shape:** `12px` radius (control).
- **Sizes:** `small` (44px min-height), `medium` (48px), `large` (52px). **Touch-target floor is 44px on every breakpoint**, including desktop.
- **Primary:** Forest→Cobalt gradient, white text, `0 4px 16px rgba(139, 197, 63, 0.25)` ambient shadow. Hover lifts `-1px` and brightens.
- **Secondary:** Paper Surface fill, Forest text, 1px Forest border at 50% opacity. Hover fills with `Forest @ 10%`.
- **Ghost:** Transparent, Paper Sub-Ink text. Hover fills `#F0F3F7` and shifts text to Forest.
- **Disabled:** `#E8EDF2` fill, `#A0AABB` text, no shadow, `cursor: not-allowed`.
- **Focus:** 2px Forest outline, `outline-offset: 3px`. Visible on `:focus-visible` only — keyboard nav.

#### Per-breakpoint
- **Mobile:** Buttons in a row use `flex-wrap: wrap` and stack on overflow. Never freeze a button to half-width when wrapping is correct.
- **iPad+:** Same sizes; pairs sit side-by-side with `gap: 16px`.

### Cards & Tiles (`GameTile`, `EcoCard`)

- **Character:** Each tile is a chapter card — accent gradient on the icon panel, ink and meta on the content panel, hairline divider between.
- **Corner Style:** `clamp(12px, 2.6cqmin, 20px)` — fluid radius that grows with the tile.
- **Background:** Paper Surface with paper grain only on the icon panel.
- **Border:** 1px in `<accent>33` at rest, `<accent>66` on hover.
- **Internal Padding:** `clamp(14px, 3.4cqmin, 24px)`.
- **Min Touch Target:** `min-height: 168px` on portrait mobile so the tile is comfortably tappable.
- **Hover (pointer only):** lift `translateY(-2px)`, accent-tinted shadow.
- **Active (any input):** `transform: scale(0.99)`.

#### Per-breakpoint
- **Mobile:** Single column. Tiles are `1fr` width, scrollable parent. Icon panel takes 22–34% via `gridTemplateColumns: 'minmax(22%, 34%) 1fr'` so the emoji never crops the title.
- **iPad portrait:** Single column with same `min-height: 168px`. iPad landscape: two columns, tiles natural-height.
- **Laptop:** 3×2 grid. `gridTemplateColumns: 'repeat(3, 1fr)'`, `gap: clamp(10px, 1.6cqh, 22px)`.
- **Large screen:** 3×2 grid capped at `maxWidth: 1320`. Extra space becomes margin.

### Inputs / Fields

- **Character:** Plain paper-bordered text inputs. No floating labels, no MUI ornament.
- **Shape:** `10px` radius (chip).
- **Border:** 1px in `rgba(13,155,74,0.3)` (Forest at low opacity). Focus shifts to solid Forest.
- **Padding:** `12px 16px`. **Height: 44px minimum.**
- **Font:** `1rem` body. Never below 16px on mobile — iOS Safari zooms inputs under 16px.
- **Width:** `flex: '1 1 200px'` inside a flex-wrap row, `min-width: 0`, `box-sizing: border-box`. **Never a hardcoded `width: 160` next to a button.**

#### Per-breakpoint
- **Mobile:** Input + button row uses `flex-wrap: wrap` so the button drops to a new line on overflow. Input fills the remaining row width.
- **iPad+:** Input and button sit side-by-side; input flexes to `~280px max-width` so the row doesn't sprawl.

### Headers & Navigation

- **Global Header (`EcoHeader`):** 56px tall, `rgba(255,255,255,0.82)` with `backdrop-filter: blur(18px)`, hairline bottom border. Tagline hidden on `xs`, shown from `sm` up.
- **Back Chip (`BackToHome`, `InGameMenuButton`):** 44px min, Paper Surface fill, hairline border, Paper Sub-Ink label. Always top-left, `clamp(10px, 2.5cqh, 24px)` from top, `clamp(12px, 3cqw, 32px)` from left.
- **MGTC Logo:** Always top-right, mirrored positioning. 22–36px tall via clamp.

#### Per-breakpoint
- **Mobile:** Tagline drops. Back chip and logo sit at the same 44px height, never overlap (left/right corners).
- **iPad+:** Tagline reappears at `sm`. On `md+`, it sits in the header center-right.
- **Laptop / Large:** Same composition; back chip never crosses into the title area.

### Leaderboard (`LeaderboardPanel`)

- **Character:** A paper-styled rank table. Cream surface, hairline rows, accent on highlighted row.
- **Shape:** `14px` radius (between card and chip).
- **Header:** Uppercase `0.7rem` Paper Meta labels, hairline bottom border.
- **Rows:** 1.25 vertical padding, soft hairline divider, Forest accent score numbers, `tabular-nums`.
- **Highlight:** Current player row: `rgba(21, 128, 61, 0.08)` fill, name in Forest 800-weight.

#### Per-breakpoint
- **Mobile (xs):** Date column hidden via `display: { xs: 'none', sm: 'table-cell' }`. Player name truncates with ellipsis.
- **iPad+ (sm and up):** Date column appears. Name field has more breathing room.

### HUD Panel (`Eco Memory HUD`, in-game stat strips)

- **Character:** A magazine-masthead row of stats — small uppercase label, large tabular-numeric value, hairline dividers between cells.
- **Shape:** `clamp(10px, 2cqmin, 16px)` radius.
- **Background:** Paper Surface, hairline border.
- **Layout:** Flex row, equal `flex: 1` cells, `border-left: 1px solid <hairline-soft>` separating each cell after the first.

#### Per-breakpoint
- **Mobile portrait:** Top meta line wraps if needed; stats remain in a single row but compress padding to `clamp(8px, 2cqmin, 16px)`. Five stats × ~72px each is the floor — collapse to four if the surface gets narrower.
- **iPad+:** Full meta line (game · mode · difficulty + sub-meta italic), 5–6 stat cells.

### Chips (Topic chip on tile, status pills)

- **Style:** No background, no border. The chip is **typographic only** — uppercase Paper-Meta-style label in the chapter accent color.
- **Letter-spacing:** `0.16em`. Weight: 800.
- **Truncation:** `text-overflow: ellipsis` with `whiteSpace: nowrap`.

## 6. Do's and Don'ts

### Do:

- **Do** size every interactive element to a 44×44px minimum on every breakpoint.
- **Do** use `clamp(min, fluid-cq-unit, max)` for type and spacing; container queries are normative inside the stage.
- **Do** use `100svh` on portrait mobile so iOS Safari's URL/tab bars don't clip the bottom of games.
- **Do** scope hover effects with `@media (hover: hover)` and provide `:active` feedback for touch.
- **Do** wrap long button rows with `flex-wrap: wrap` so they restack on phones.
- **Do** carry `font-variant-numeric: tabular-nums` on every score and time display.
- **Do** keep the `--frame-bg` letterbox color synced to the active route's surface color.
- **Do** reuse the paper palette and the chapter accent inside every game's screens.
- **Do** honor `prefers-reduced-motion`: the global rule already caps animation/transition duration to `0.01ms`. New animations must respect that or fall back gracefully.

### Don't:

- **Don't** ship a generic SaaS dark dashboard — neon teal on near-black, hero-metric tiles, glassmorphism by default. EcoGames is not a control panel.
- **Don't** reach for "eco" clichés — leaf bullets, hand-holding-globe stock illustrations, gradient-text "Save the Planet" headlines.
- **Don't** use crypto/AI-app maximalism — animated mesh gradients, glow-on-everything, neon green on pure black.
- **Don't** use childish kids-game UI — Comic Sans energy, bouncy elastic motion, primary-rainbow palettes, cartoon mascots that talk down.
- **Don't** repeat identical card grids — six near-identical glass tiles in a 3×2 grid is the lazy answer; each game deserves a tile that hints at its own character.
- **Don't** use `#000` or `#FFFFFF`. Every neutral must carry a faint amber tint toward the paper hue.
- **Don't** combine two chapter accents on a single surface. One accent per screen.
- **Don't** hardcode pixel widths on mobile-facing inputs (`width: 160` is forbidden). Use `flex: 1 1 200px; min-width: 0`.
- **Don't** drop body type below `0.95rem` on any breakpoint; never drop input font-size below 16px (causes iOS auto-zoom).
- **Don't** rely on color alone to convey state. Pair every state color with an icon, label, or weight change.
- **Don't** use `border-left` greater than 1px as a colored stripe accent on a card or list item.
- **Don't** use `background-clip: text` gradient text — single solid accent only.
- **Don't** add a third orientation. Every game ships with portrait stack and landscape composition; no separate tablet-only fork.
- **Don't** use bouncy or elastic easing. State transitions are 150–250 ms, ease-out (quart/quint/expo).
- **Don't** use modals as the first thought. Inline progressive disclosure first; modal only when the task genuinely demands focus.
