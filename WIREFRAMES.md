# EcoGames — Low-fidelity wireframes

Companion to `DESIGN.md`. Every screen, every breakpoint, drawn as ASCII so the
layout intent and component placement are unambiguous. Use these as the
canonical structure when designing or reviewing a game; deviate only with a
written reason.

**How to read these wireframes:**

- `█` solid-fill region (game canvas, dominant surface)
- `▒ ░` tinted regions (accent fills, secondary surfaces)
- `─ │ ┌ ┐ └ ┘ ├ ┤` borders, hairlines, and structural dividers
- `[ Label ]` interactive control (button, chip, tile)
- `< Label >` non-interactive label
- `· · ·` content overflow / scroll indicator
- `LB` letterbox bar (filled with `--frame-bg`)
- All breakpoints assume the four tiers from `DESIGN.md`:
  Mobile 320–640px · iPad 641–1024px · Laptop 1025–1439px · Large 1440px+

**Universal placement (every screen, every game):**

| Element | Position | Min size | Notes |
|---|---|---|---|
| MGTC logo | Top-right | 22–36px tall | `clamp(10px,2.5cqh,24px)` from top |
| Back chip / Menu | Top-left | 44×44px | Mirrors logo position |
| Footer (landing only) | Bottom | 1.2cqh padding | Hairline top border |
| Letterbox bars | Sides (landscape) | — | Same color as page surface |

---

## 0. The Stage Shell — every game inherits this

The shell is the chrome around any game screen. Same structure on all four
breakpoints; the geometry changes but the slot for each element does not.

### 0.1 Mobile (portrait, 360–640px) — 16:9 lock dropped

```
┌──────────────────────────────┐  ← 100vw × 100svh, iOS-safe
│ [← Menu]            [MGTC]  │  ← 44px chrome row
│                              │
│                              │
│         ████████████         │
│         █  GAME    █         │  ← stage scrolls vertically
│         █  CANVAS  █         │     when content > viewport
│         ████████████         │
│                              │
│                              │
│  [ HUD / controls dock ]    │  ← bottom-anchored if fixed
│                              │
└──────────────────────────────┘
        env(safe-area-inset-bottom)
```

### 0.2 iPad (641–1024px) — landscape locks 16:9, portrait fills

```
Landscape:
LB┌────────────────────────────────────────┐LB
LB│ [← Menu]                       [MGTC] │LB
LB│                                        │LB
LB│           ██████████████████           │LB
LB│           █                █           │LB
LB│           █  GAME CANVAS   █           │LB
LB│           █                █           │LB
LB│           ██████████████████           │LB
LB│       [ HUD strip · score · time ]    │LB
LB└────────────────────────────────────────┘LB
   (letterbox bars match `--frame-bg`)

Portrait:
┌─────────────────────────────────┐
│ [← Menu]                [MGTC] │
│                                 │
│      ████████████████████      │  ← single column
│      █   GAME CANVAS    █      │     stack, scroll if needed
│      ████████████████████      │
│                                 │
│      [ HUD · controls ]        │
└─────────────────────────────────┘
```

### 0.3 Laptop (1025–1439px) — letterboxed 16:9 stage

```
LB┌──────────────────────────────────────────────────────────┐LB
LB│ [← Menu]                                         [MGTC] │LB
LB│                                                          │LB
LB│   ┌─────────────────────────────────────────────────┐   │LB
LB│   │  [ HUD: score · best · time · streak · level ] │   │LB
LB│   └─────────────────────────────────────────────────┘   │LB
LB│                                                          │LB
LB│           ██████████████████████████████████             │LB
LB│           █                                  █           │LB
LB│           █          GAME CANVAS             █           │LB
LB│           █                                  █           │LB
LB│           ██████████████████████████████████             │LB
LB│                                                          │LB
LB└──────────────────────────────────────────────────────────┘LB
```

### 0.4 Large screen (1440px+) — letterboxed, content capped

```
LBLBLB┌──────────────────────────────────────────────────────────────┐LBLBLB
LBLBLB│ [← Menu]                                           [MGTC]   │LBLBLB
LBLBLB│   ┌── max-width: 1320px content cap (centered) ────────┐   │LBLBLB
LBLBLB│   │ [ HUD: score · best · time · streak · level · ... ] │   │LBLBLB
LBLBLB│   └─────────────────────────────────────────────────────┘   │LBLBLB
LBLBLB│                                                              │LBLBLB
LBLBLB│         ████████████████████████████████████████████         │LBLBLB
LBLBLB│         █                                          █         │LBLBLB
LBLBLB│         █             GAME CANVAS                  █         │LBLBLB
LBLBLB│         █                                          █         │LBLBLB
LBLBLB│         ████████████████████████████████████████████         │LBLBLB
LBLBLB└──────────────────────────────────────────────────────────────┘LBLBLB
        ↑ extra horizontal space becomes letterbox, never content ↑
```

---

## 1. Landing Page (the hub)

The landing page is the curated index — six tiles, each with its own chapter
accent. Layout reflows from a 1-column scroll on mobile to a 3×2 grid on
laptop+.

### 1.1 Mobile

```
┌──────────────────────────────┐
│ [MGTC] EcoGames    < tagline> │  ← header, tagline hidden xs
├──────────────────────────────┤
│                              │
│  Six little games.           │  ← Display, clamp 1.4rem floor
│  One warming planet.         │
│  Pick a game, play a round…  │  ← Body, max 65ch
│                              │
│  ┌──────────────────────┐    │
│  │ ░░░ │ TOPIC          │    │  ← tile 1 (Forest accent)
│  │ 🥷  │ Climate Ninja  │    │     min-height 168px
│  │ ░░░ │ <description>  │    │
│  │     │ ◆ Easy · ⏱3min │    │
│  └──────────────────────┘    │
│  ┌──────────────────────┐    │
│  │ ░░░ │ TOPIC          │    │  ← tile 2 (Cobalt)
│  │ 💎  │ Carbon Crush   │    │
│  │ ░░░ │ <description>  │    │
│  └──────────────────────┘    │
│   · · · 4 more tiles · · ·   │  ← scrollable
│                              │
├──────────────────────────────┤
│ MGTC · Empowering …          │  ← footer (right caption hidden xs)
└──────────────────────────────┘
```

### 1.2 iPad (landscape preferred)

```
LB┌────────────────────────────────────────────────────────┐LB
LB│ [MGTC] EcoGames        Six classic games · one mission│LB
LB├────────────────────────────────────────────────────────┤LB
LB│   Six little games. One warming planet.               │LB
LB│   Pick a game, play a round, learn something new.     │LB
LB│                                                        │LB
LB│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐      │LB
LB│  │ ░ │ NINJA   │ │ ░ │ CRUSH   │ │ ░ │ RECYCLE │      │LB
LB│  │🥷 │ Climate │ │💎 │ Carbon  │ │♻️ │ Recycle │      │LB
LB│  │ ░ │ ◆ Easy  │ │ ░ │ ◆ Med   │ │ ░ │ ◆ Easy  │      │LB
LB│  └─────────────┘ └─────────────┘ └─────────────┘      │LB
LB│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐      │LB
LB│  │ ░ │ MEMORY  │ │ ░ │ DEFENCE │ │ ░ │ 2048    │      │LB
LB│  │🧠 │ Eco     │ │🛡️ │ Green   │ │🧩 │ Climate │      │LB
LB│  └─────────────┘ └─────────────┘ └─────────────┘      │LB
LB├────────────────────────────────────────────────────────┤LB
LB│ MGTC · Empowering …          6 games · WCAG · Touch+ │LB
LB└────────────────────────────────────────────────────────┘LB
```

### 1.3 Laptop

```
LB┌──────────────────────────────────────────────────────────────────┐LB
LB│ [MGTC] EcoGames                Six classic games · one mission   │LB
LB├──────────────────────────────────────────────────────────────────┤LB
LB│        Six little games. One warming planet.                     │LB
LB│        Pick a game, play a round, learn something …              │LB
LB│                                                                  │LB
LB│ ┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐    │LB
LB│ │░░░│ NINJA       │ │░░░│ CRUSH       │ │░░░│ RECYCLE     │    │LB
LB│ │🥷 │ Climate Ninja│ │💎 │ Carbon Crush│ │♻️ │ Recycle Rush│    │LB
LB│ │░░░│ <desc 2 ln> │ │░░░│ <desc 2 ln> │ │░░░│ <desc 2 ln> │    │LB
LB│ │   │ — Learn …   │ │   │ — Learn …   │ │   │ — Learn …   │    │LB
LB│ │   │ ◆Easy ⏱3 Play│ │   │ ◆Med ⏱5 Play│ │   │ ◆Easy ⏱4 Play│   │LB
LB│ └─────────────────┘ └─────────────────┘ └─────────────────┘    │LB
LB│ ┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐    │LB
LB│ │░░░│ MEMORY      │ │░░░│ DEFENCE     │ │░░░│ 2048        │    │LB
LB│ │🧠 │ Eco Memory  │ │🛡️│ Green Defence│ │🧩 │ Climate 2048│    │LB
LB│ └─────────────────┘ └─────────────────┘ └─────────────────┘    │LB
LB├──────────────────────────────────────────────────────────────────┤LB
LB│ MGTC · Empowering climate education      6 · WCAG AA · T+M+K   │LB
LB└──────────────────────────────────────────────────────────────────┘LB
```

### 1.4 Large screen

Same as Laptop with content capped at `max-width: 1320px`; surrounding space
becomes additional letterbox margin, not bigger tiles. The 3×2 grid never
becomes 4×2 or 6×1, no matter the viewport.

---

## 2. Climate Ninja (slice the gases)

Action game — emoji-as-fruit fly across the canvas, swipe to slice.

### 2.1 Mobile

```
┌──────────────────────────────┐
│ [← Menu]            [MGTC]  │
├──────────────────────────────┤
│ ░ NINJA  Score 1,240   00:42│ ← HUD strip (paper surface)
├──────────────────────────────┤
│                              │
│             🌫               │
│        ☁                     │  ← canvas: full-width, full
│                ☁             │     remaining height
│      ☁                       │
│                              │
│   ✦ slice trail              │
│              🔥              │
│                              │
├──────────────────────────────┤
│  Lives  ❤❤❤    Combo  x3    │  ← bottom HUD (44px)
└──────────────────────────────┘
        env(safe-area-inset-bottom)
```

### 2.2 iPad (landscape)

```
LB┌──────────────────────────────────────────────────────┐LB
LB│ [← Menu]                                    [MGTC]  │LB
LB│ ┌──────────────────────────────────────────────────┐│LB
LB│ │ NINJA · Solo · Easy   Score 1,240   00:42 ❤❤❤   ││LB
LB│ └──────────────────────────────────────────────────┘│LB
LB│                                                      │LB
LB│       ☁           ☁              🌫                  │LB
LB│                                                      │LB
LB│             ✦swipe trail                             │LB
LB│                          🔥                           │LB
LB│                                                      │LB
LB│ ┌──────────────────────────────────────────────────┐│LB
LB│ │ Combo x3       [ Pause ]       Powerup: ⚡        ││LB
LB│ └──────────────────────────────────────────────────┘│LB
LB└──────────────────────────────────────────────────────┘LB
```

### 2.3 Laptop

```
LB┌────────────────────────────────────────────────────────────────┐LB
LB│ [← Menu]                                              [MGTC]   │LB
LB│ ┌────────────────────────────────────────────────────────────┐ │LB
LB│ │ NINJA · Solo · Easy  Score 1,240  Best 9,800  00:42  ❤❤❤  │ │LB
LB│ └────────────────────────────────────────────────────────────┘ │LB
LB│                                                                │LB
LB│           ☁         ☁           🌫           ☁                  │LB
LB│                                                                │LB
LB│                  ✦ ─── swipe trail ───                         │LB
LB│                                                                │LB
LB│                          🔥          ☁                          │LB
LB│                                                                │LB
LB│ ┌────────────────────────────────────────────────────────────┐ │LB
LB│ │ Combo x3      [ Pause ]      Powerups:  ⚡  🌀  ❄          │ │LB
LB│ └────────────────────────────────────────────────────────────┘ │LB
LB└────────────────────────────────────────────────────────────────┘LB
```

### 2.4 Large screen

Identical composition to Laptop. HUD strip caps at `max-width: 1320px`;
canvas is centered within the stage, never stretches edge-to-edge.

---

## 3. Carbon Crush (match-3)

Match three polluting techs to phase out for clean alternatives. Board is the
hero; controls are minimal.

### 3.1 Mobile

```
┌──────────────────────────────┐
│ [← Menu]            [MGTC]  │
├──────────────────────────────┤
│ ░ CRUSH  Score 8,420  Moves 12│
├──────────────────────────────┤
│   ┌──────────────────────┐   │
│   │ 🛢 ⚡ 🛢 🚗 ⚡ 🌬 │   │
│   │ 🚗 🛢 ⚡ 🌬 🚗 🛢 │   │  ← 6×6 board
│   │ 🌬 🚗 🛢 ⚡ 🌬 🚗 │   │     fluid: 100% width
│   │ ⚡ 🌬 🚗 🛢 ⚡ 🌬 │   │     square cells via cqmin
│   │ 🛢 ⚡ 🌬 🚗 🛢 ⚡ │   │
│   │ 🚗 🛢 ⚡ 🌬 🚗 🛢 │   │
│   └──────────────────────┘   │
│                              │
│   Phase: ▓▓▓▒░░ 60%         │
│                              │
└──────────────────────────────┘
```

### 3.2 iPad (landscape)

```
LB┌──────────────────────────────────────────────────────┐LB
LB│ [← Menu]                                    [MGTC]  │LB
LB│ ┌──────────────────────────────────────────────────┐│LB
LB│ │ CRUSH · Easy        Score 8,420   Moves 12       ││LB
LB│ └──────────────────────────────────────────────────┘│LB
LB│                                                      │LB
LB│             ┌──────────────────────────┐             │LB
LB│             │ 🛢 ⚡ 🛢 🚗 ⚡ 🌬 │             │LB
LB│             │ 🚗 🛢 ⚡ 🌬 🚗 🛢 │             │LB
LB│             │ 🌬 🚗 🛢 ⚡ 🌬 🚗 │             │LB
LB│             │ ⚡ 🌬 🚗 🛢 ⚡ 🌬 │             │LB
LB│             │ 🛢 ⚡ 🌬 🚗 🛢 ⚡ │             │LB
LB│             │ 🚗 🛢 ⚡ 🌬 🚗 🛢 │             │LB
LB│             └──────────────────────────┘             │LB
LB│             Phase: ▓▓▓▓▒░ 60%                        │LB
LB└──────────────────────────────────────────────────────┘LB
```

### 3.3 Laptop

```
LB┌────────────────────────────────────────────────────────────────┐LB
LB│ [← Menu]                                              [MGTC]   │LB
LB│ ┌────────────────────────────────────────────────────────────┐ │LB
LB│ │ CRUSH · Easy   Score 8,420  Best 24,100  Moves 12  Combo×2│ │LB
LB│ └────────────────────────────────────────────────────────────┘ │LB
LB│                                                                │LB
LB│  ┌───── side note ─────┐    ┌────────────────────────────┐   │LB
LB│  │ Goal:               │    │  🛢 ⚡ 🛢 🚗 ⚡ 🌬          │   │LB
LB│  │ Phase out 50 fossil │    │  🚗 🛢 ⚡ 🌬 🚗 🛢          │   │LB
LB│  │ tiles in 25 moves.  │    │  🌬 🚗 🛢 ⚡ 🌬 🚗          │   │LB
LB│  │                     │    │  ⚡ 🌬 🚗 🛢 ⚡ 🌬          │   │LB
LB│  │ Phase: ▓▓▓▒░ 60%   │    │  🛢 ⚡ 🌬 🚗 🛢 ⚡          │   │LB
LB│  │                     │    │  🚗 🛢 ⚡ 🌬 🚗 🛢          │   │LB
LB│  └─────────────────────┘    └────────────────────────────┘   │LB
LB└────────────────────────────────────────────────────────────────┘LB
```

### 3.4 Large screen

Same as Laptop; side note panel keeps a fixed 280–320px width and the board
caps at 600px square. Surplus space becomes margin around the centered pair.

---

## 4. Recycle Rush (sort the bins)

Time-pressure sorting. Items spawn at top, four bins at bottom — drag/tap to
classify. Bin tray must clear iOS Safari chrome — see DESIGN.md `100svh` rule.

### 4.1 Mobile

```
┌──────────────────────────────┐
│ [← Menu]            [MGTC]  │
├──────────────────────────────┤
│ ░ RUSH  Score 320   00:28   │
├──────────────────────────────┤
│                              │
│         📰                   │  ← items spawn here
│              🍎              │
│   🥫                         │
│                              │
│        🔋          🥤        │
│                              │
│  Patience ▓▓▓░░             │  ← customer mood meter
├──────────────────────────────┤
│ ┌─────┐┌─────┐┌─────┐┌─────┐│  ← 4 bins, tap targets
│ │ ♻️  ││ 🌱  ││ ☢️  ││ 💻  ││     ≥ 56px each
│ │Recyc││Compo││Hazrd││Ewast││
│ └─────┘└─────┘└─────┘└─────┘│
└──────────────────────────────┘
        env(safe-area-inset-bottom)
   ↑ stage = calc(100svh - 232px) ↑
```

### 4.2 iPad (landscape)

```
LB┌──────────────────────────────────────────────────────┐LB
LB│ [← Menu]                                    [MGTC]  │LB
LB│ ┌──────────────────────────────────────────────────┐│LB
LB│ │ RUSH · Day 2     Score 320   Saved 14   00:28    ││LB
LB│ └──────────────────────────────────────────────────┘│LB
LB│                                                      │LB
LB│              📰      🍎       🥫                     │LB
LB│                                                      │LB
LB│       🔋                            🥤               │LB
LB│                                                      │LB
LB│        🍎     📦                                     │LB
LB│  Patience ▓▓▓░░                                      │LB
LB│ ┌──────┐┌──────┐┌──────┐┌──────┐                    │LB
LB│ │  ♻️   ││  🌱   ││  ☢️   ││  💻   │                    │LB
LB│ │Recyc ││Compo ││Hazrd ││Ewast │                    │LB
LB│ └──────┘└──────┘└──────┘└──────┘                    │LB
LB└──────────────────────────────────────────────────────┘LB
```

### 4.3 Laptop

```
LB┌────────────────────────────────────────────────────────────────┐LB
LB│ [← Menu]                                              [MGTC]   │LB
LB│ ┌────────────────────────────────────────────────────────────┐ │LB
LB│ │ RUSH · Day 2  Score 320  Best 1,200  Saved 14/30  00:28   │ │LB
LB│ └────────────────────────────────────────────────────────────┘ │LB
LB│                                                                │LB
LB│            📰         🍎          🥫            🔋              │LB
LB│                                                                │LB
LB│       🥤                                            📦          │LB
LB│                                                                │LB
LB│                       🍎              📰                       │LB
LB│  Patience ▓▓▓░░░░░                                             │LB
LB│  ┌────────┐  ┌────────┐  ┌────────┐  ┌────────┐               │LB
LB│  │  ♻️    │  │  🌱    │  │  ☢️    │  │  💻    │               │LB
LB│  │Recycle │  │Compost │  │Hazard  │  │E-waste │               │LB
LB│  │  (R)   │  │  (C)   │  │  (H)   │  │  (E)   │               │LB
LB│  └────────┘  └────────┘  └────────┘  └────────┘               │LB
LB└────────────────────────────────────────────────────────────────┘LB
   keyboard hints (R/C/H/E) appear on laptop+ only
```

### 4.4 Large screen

Same as Laptop. Bin tray caps at `max-width: 960px` so the four bins don't
sprawl past comfortable viewing distance. Item spawn area uses the rest.

---

## 5. Eco Memory (climate vocabulary pairs)

Memory match game. HUD on top, board fills the rest. On portrait, board
collapses to fewer columns to keep cards tappable.

### 5.1 Mobile

```
┌──────────────────────────────┐
│ [← Menu]            [MGTC]  │
├──────────────────────────────┤
│ ░ MEMORY · Solo · Easy      │  ← meta line
│ Score 240 │ Moves 12 │ ×2   │  ← stat strip (3 cells on mobile)
├──────────────────────────────┤
│                              │
│  ┌────┐ ┌────┐ ┌────┐ ┌────┐│  ← 4 cols (Easy)
│  │ ?? │ │ ?? │ │ 🌊 │ │ ?? ││     6 cols (Hard)
│  └────┘ └────┘ └────┘ └────┘│     square via cqmin
│  ┌────┐ ┌────┐ ┌────┐ ┌────┐│
│  │ 🌊 │ │ ?? │ │ ?? │ │ ?? ││
│  └────┘ └────┘ └────┘ └────┘│
│  ┌────┐ ┌────┐ ┌────┐ ┌────┐│
│  │ ?? │ │ 🔥 │ │ ?? │ │ ?? ││
│  └────┘ └────┘ └────┘ └────┘│
│                              │
└──────────────────────────────┘
```

### 5.2 iPad

```
LB┌──────────────────────────────────────────────────────┐LB
LB│ [← Menu]                                    [MGTC]  │LB
LB│ ┌──────────────────────────────────────────────────┐│LB
LB│ │ EcoMemory · Solo · Hard   8 pairs · climate vocab││LB
LB│ │ Score │ Best │ Moves │ Pairs │ Streak            ││LB
LB│ │  240  │  900 │  12   │ 3/8   │  ×2               ││LB
LB│ └──────────────────────────────────────────────────┘│LB
LB│                                                      │LB
LB│   ┌─┐ ┌─┐ ┌─┐ ┌─┐ ┌─┐ ┌─┐ ┌─┐ ┌─┐                    │LB
LB│   └─┘ └─┘ └─┘ └─┘ └─┘ └─┘ └─┘ └─┘                    │LB
LB│   ┌─┐ ┌─┐ ┌─┐ ┌─┐ ┌─┐ ┌─┐ ┌─┐ ┌─┐                    │LB
LB│   └─┘ └─┘ └─┘ └─┘ └─┘ └─┘ └─┘ └─┘                    │LB
LB└──────────────────────────────────────────────────────┘LB
```

### 5.3 Laptop

```
LB┌────────────────────────────────────────────────────────────────┐LB
LB│ [← Menu]                                              [MGTC]   │LB
LB│ ┌────────────────────────────────────────────────────────────┐ │LB
LB│ │ Eco Memory · Solo · Hard          8 pairs · climate vocab  │ │LB
LB│ │  Score │ Best  │ Moves │ Pairs │ Streak                    │ │LB
LB│ │   240  │  900  │  12   │  3/8  │  ×2                       │ │LB
LB│ └────────────────────────────────────────────────────────────┘ │LB
LB│                                                                │LB
LB│       ┌──┐┌──┐┌──┐┌──┐┌──┐┌──┐┌──┐┌──┐                         │LB
LB│       └──┘└──┘└──┘└──┘└──┘└──┘└──┘└──┘                         │LB
LB│       ┌──┐┌──┐┌──┐┌──┐┌──┐┌──┐┌──┐┌──┐                         │LB
LB│       └──┘└──┘└──┘└──┘└──┘└──┘└──┘└──┘                         │LB
LB└────────────────────────────────────────────────────────────────┘LB
```

### 5.4 Large screen

Board capped at `max-width: 960px`, centered. Stat strip remains 5 cells. Two
players VERSUS mode (landscape only) shows two stat panels left/right of a
shared board with a 180°-rotated label for player 2 — see DESIGN.md.

---

## 6. Green Defence (towers vs. waves)

Tower-defence layout. Lane grid is the canvas; tower picker is a side rail
on laptop+ and a bottom dock on mobile.

### 6.1 Mobile

```
┌──────────────────────────────┐
│ [← Menu]            [MGTC]  │
├──────────────────────────────┤
│ ░ DEFENCE  Wave 2/8  ❤❤❤   │
│ Score 1,240   $ 80           │
├──────────────────────────────┤
│ ░░░░░░░░░░░░░░░░░░░░░░░░░ │  ← lane grid
│ ░ ▢ ░ ▢ ░ ░ ░ ░ ░ ░ ░ ░ ░ │     fixed 5 rows
│ ▶ ░ ▢ ░ ░ ▢ ░ ▢ ░ ░ ░ ░ ░ │     waves move →
│ ░ ▢ ░ ░ ░ ░ ░ ░ ▢ ░ ░ ░ ░ │
│ ░ ░ ░ ░ ▢ ░ ▢ ░ ░ ░ ░ ░ ░ │
│ ░░░░░░░░░░░░░░░░░░░░░░░░░ │
├──────────────────────────────┤
│  Towers (tap to pick):       │
│ ┌────┐┌────┐┌────┐┌────┐    │  ← 44px+ tap targets
│ │ ☀  ││ 🌬 ││ 🌳 ││ ⚡ │    │
│ │$20 ││$40 ││$60 ││$80 │    │
│ └────┘└────┘└────┘└────┘    │
└──────────────────────────────┘
```

### 6.2 iPad (landscape)

```
LB┌──────────────────────────────────────────────────────┐LB
LB│ [← Menu]                                    [MGTC]  │LB
LB│ ┌──────────────────────────────────────────────────┐│LB
LB│ │ DEFENCE · Wave 2/8  Score 1,240  ❤❤❤  $ 80      ││LB
LB│ └──────────────────────────────────────────────────┘│LB
LB│ ┌─Towers────┐ ┌────────── Lane Grid ────────────┐  │LB
LB│ │ [ ☀ $20 ] │ │░ ▢ ░ ▢ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░│  │LB
LB│ │ [ 🌬 $40 ] │ │▶ ░ ▢ ░ ░ ▢ ░ ▢ ░ ░ ░ ░ ░ ░ ░ ░│  │LB
LB│ │ [ 🌳 $60 ] │ │░ ▢ ░ ░ ░ ░ ░ ░ ▢ ░ ░ ░ ░ ░ ░ ░│  │LB
LB│ │ [ ⚡ $80 ] │ │░ ░ ░ ░ ▢ ░ ▢ ░ ░ ░ ░ ░ ░ ░ ░ ░│  │LB
LB│ │ [ 🔋 $120]│ │░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░│  │LB
LB│ └───────────┘ └─────────────────────────────────┘  │LB
LB└──────────────────────────────────────────────────────┘LB
```

### 6.3 Laptop

```
LB┌────────────────────────────────────────────────────────────────┐LB
LB│ [← Menu]                                              [MGTC]   │LB
LB│ ┌────────────────────────────────────────────────────────────┐ │LB
LB│ │ DEFENCE · Wave 2/8  Score 1,240  Best 9,200  ❤❤❤  $ 80    │ │LB
LB│ └────────────────────────────────────────────────────────────┘ │LB
LB│ ┌── Towers ──┐ ┌─────────── Lane Grid ────────────────────┐   │LB
LB│ │            │ │░ ▢ ░ ▢ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ │   │LB
LB│ │ [ ☀  $20] │ │▶ ░ ▢ ░ ░ ▢ ░ ▢ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ │   │LB
LB│ │ [ 🌬 $40 ] │ │░ ▢ ░ ░ ░ ░ ░ ░ ▢ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ │   │LB
LB│ │ [ 🌳 $60 ] │ │░ ░ ░ ░ ▢ ░ ▢ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ │   │LB
LB│ │ [ ⚡ $80 ] │ │░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ │   │LB
LB│ │ [ 🔋 $120]│ │                                           │   │LB
LB│ │            │ │  Wave preview ▸ ▸ ▸                       │   │LB
LB│ └────────────┘ └───────────────────────────────────────────┘   │LB
LB└────────────────────────────────────────────────────────────────┘LB
```

### 6.4 Large screen

Same as Laptop. Tower rail keeps a fixed `~200px` width; lane grid extends to
the rest. Capped at `max-width: 1320px` so towers don't drift far from grid.

---

## 7. Climate 2048 (merge clean tech)

Numeric merge game. Board is square; merges chain a tech-tree from wafer →
grid-connected farm. Mode select offers Solo and Challenge (head-to-head).

### 7.1 Mobile

```
┌──────────────────────────────┐
│ [← Menu]            [MGTC]  │
├──────────────────────────────┤
│ 2048 · Solo                  │
│ Score 4,820 │ Best 12,400    │  ← stacked stat row
│ Tile: 🔧 → 🔋                │
├──────────────────────────────┤
│   ┌────────────────────┐     │
│   │  ░  │  ░  │  2  │ ░ │     │
│   │     │     │     │   │     │  ← 4×4 board
│   │  ░  │  4  │  ░  │ ░ │     │     square cells
│   │     │     │     │   │     │     full-width cap
│   │  ░  │  ░  │  8  │ 2 │     │
│   │     │     │     │   │     │
│   │  ░  │ 16  │  ░  │ 4 │     │
│   └────────────────────┘     │
│                              │
│  ↑ ↓ ← →   swipe to merge   │  ← keyboard hint hidden xs
└──────────────────────────────┘
```

### 7.2 iPad

```
LB┌──────────────────────────────────────────────────────┐LB
LB│ [← Menu]                                    [MGTC]  │LB
LB│ ┌──────────────────────────────────────────────────┐│LB
LB│ │ 2048 · Solo   Score 4,820  Best 12,400  Tier: 🔋 ││LB
LB│ └──────────────────────────────────────────────────┘│LB
LB│                                                      │LB
LB│             ┌──────────────────┐                     │LB
LB│             │ ░ │ ░ │ 2 │ ░  │                     │LB
LB│             │ ░ │ 4 │ ░ │ ░  │                     │LB
LB│             │ ░ │ ░ │ 8 │ 2  │                     │LB
LB│             │ ░ │16 │ ░ │ 4  │                     │LB
LB│             └──────────────────┘                     │LB
LB│                                                      │LB
LB│  Tech tree progress: 🔧→🔋→☀→🌬                      │LB
LB└──────────────────────────────────────────────────────┘LB
```

### 7.3 Laptop

```
LB┌────────────────────────────────────────────────────────────────┐LB
LB│ [← Menu]                                              [MGTC]   │LB
LB│ ┌────────────────────────────────────────────────────────────┐ │LB
LB│ │ 2048 · Solo   Score 4,820  Best 12,400  Highest: 🔋        │ │LB
LB│ └────────────────────────────────────────────────────────────┘ │LB
LB│                                                                │LB
LB│  ┌── Tech tree ──┐    ┌──────────────────────┐                │LB
LB│  │  🔧  Wafer    │    │ ░ │ ░ │ 2 │ ░  │                │LB
LB│  │  🔋  Cell     │    │ ░ │ 4 │ ░ │ ░  │                │LB
LB│  │  ☀  Panel    │    │ ░ │ ░ │ 8 │ 2  │                │LB
LB│  │  🏭  String   │    │ ░ │16 │ ░ │ 4  │                │LB
LB│  │  🌐  Farm     │    └──────────────────────┘                │LB
LB│  └───────────────┘                                            │LB
LB│                       ↑ ↓ ← →  swipe / arrows                  │LB
LB└────────────────────────────────────────────────────────────────┘LB
```

### 7.4 Large screen

Same as Laptop. Tech-tree side panel `max-width: 240px`; board capped at
`520px` square. Surplus space → margin around the centered pair.

---

## 8. Shared screens (intro & game-over)

Every game uses the same shape for its intro/menu and game-over screens. Only
the headline copy and the chapter accent change.

### 8.1 Intro / Mode-Select pattern

#### Mobile

```
┌──────────────────────────────┐
│ [← Home]            [MGTC]  │
├──────────────────────────────┤
│                              │
│            🥷                │  ← chapter emoji (display-size)
│                              │
│      Climate Ninja           │  ← Headline 800
│  Slice the gases, save the   │  ← Body 500
│  warming planet              │
│                              │
│  ┌────────────────────────┐ │
│  │ ░ │ SOLO              │ │  ← mode card 1 (full-width)
│  │   │ Quick round, 60s  │ │
│  │   │ [ Play ]          │ │
│  └────────────────────────┘ │
│  ┌────────────────────────┐ │
│  │ ░ │ 2 PLAYERS  (land.) │ │  ← shown only landscape;
│  │   │ Tabletop versus    │ │     hidden on portrait via
│  │   │ [ Rotate phone ]   │ │     .landscape-only
│  └────────────────────────┘ │
│                              │
│         [ Leaderboard ]      │  ← 48px button
└──────────────────────────────┘
```

#### iPad / Laptop / Large

```
LB┌────────────────────────────────────────────────────────┐LB
LB│ [← Home]                                       [MGTC] │LB
LB│                                                        │LB
LB│                       🥷                               │LB
LB│                Climate Ninja                           │LB
LB│        Slice the gases, save the planet                │LB
LB│                                                        │LB
LB│  ┌──────────┐ ┌──────────┐ ┌──────────┐               │LB
LB│  │   SOLO   │ │  2 PLAYR │ │  4 PLAYR │               │LB
LB│  │ 60s round│ │ Tabletop │ │ Couch    │               │LB
LB│  │ [ Play ] │ │ [ Play ] │ │ [ Play ] │               │LB
LB│  └──────────┘ └──────────┘ └──────────┘               │LB
LB│                                                        │LB
LB│                  [ Leaderboard ]                       │LB
LB└────────────────────────────────────────────────────────┘LB
```

### 8.2 Game-Over pattern

#### Mobile

```
┌──────────────────────────────┐
│ [← Menu]            [MGTC]  │
├──────────────────────────────┤
│                              │
│       Mission Complete       │  ← Headline 800
│         Score 4,820          │  ← Numeric 800, accent
│                              │
│  ┌──────────────────────┐    │
│  │ Player    Score Sliced│    │  ← summary table:
│  │ ─────────────────────│    │     name (flex, ellipsis)
│  │ 🏆 You    4,820   42 │    │     + 3 narrow cols
│  │ Friend A  3,210   28 │    │     56–72px each
│  └──────────────────────┘    │
│                              │
│  ┌──────────────────────┐    │
│  │ [ Your name      ]   │    │  ← input flex 1 1 200px
│  │     [ 🏆 Leaderboard ]│    │     button wraps below
│  └──────────────────────┘    │     on overflow
│                              │
│  [ ↻ Play Again ]  [ Info ] │  ← wrap-flex pair
└──────────────────────────────┘
```

#### iPad / Laptop / Large

```
LB┌────────────────────────────────────────────────────────┐LB
LB│ [← Menu]                                       [MGTC] │LB
LB│                                                        │LB
LB│                  🏆 Mission Complete                   │LB
LB│                    You wins! 4,820                     │LB
LB│                                                        │LB
LB│   ┌──────────────────────────────────────────────┐    │LB
LB│   │ PLAYER          SCORE   SLICED   COMBO        │    │LB
LB│   │ ────────────────────────────────────────────  │    │LB
LB│   │ 🏆 You          4,820     42     × 8          │    │LB
LB│   │ Friend A        3,210     28     × 5          │    │LB
LB│   └──────────────────────────────────────────────┘    │LB
LB│                                                        │LB
LB│   [ Your name           ]   [ 🏆 Leaderboard ]        │LB
LB│   [ ↻ Play Again ]   [ Info ]                         │LB
LB└────────────────────────────────────────────────────────┘LB
```

---

## 9. Consistency checklist (use when designing a new screen)

When you wireframe a new game or screen, every "yes" below means it's likely
on-system; any "no" means revise before coding.

- [ ] Back chip is in the top-left, MGTC logo top-right, both 44×44px+.
- [ ] HUD is a full-width strip (not a sidebar) on mobile and iPad portrait.
- [ ] On mobile, the play canvas is the dominant region — no hidden gestures
      required to reveal controls.
- [ ] Bottom dock (where present) clears the iOS Safari home indicator via
      `env(safe-area-inset-bottom)`.
- [ ] Tap targets ≥ 44×44px on every breakpoint.
- [ ] One chapter accent on the surface — never two.
- [ ] On laptop+, content caps at `max-width: 1320px` inside the stage.
- [ ] Buttons + inputs in a row use `flex-wrap: wrap`, never overflow.
- [ ] Multiplayer modes that require landscape are gated by `.landscape-only`.
- [ ] Game-over screen uses the shared pattern (8.2) — don't reinvent.
- [ ] Intro/mode-select uses the shared pattern (8.1) — don't reinvent.
