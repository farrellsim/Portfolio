# Design

## Visual Theme

**Editorial-tech minimalism.** A magazine-column reading experience with developer-tooling vocabulary: monospace numerals, scaffolding markers (`//`, `<>`, `$`), section numbers in mono. The page reads top-to-bottom in a single column on mobile and breaks into a two-column hero on desktop. No decorative containers, no full-bleed marketing flourishes.

Light mode is the default and primary stage. Dark mode is the alternate aesthetic, equally considered: deeper than gray, warm enough to feel inhabited rather than industrial.

## Color

Tinted neutrals throughout. No `#000` or `#fff`. Each neutral carries a faint warmth so the page never feels surgical.

### Light mode
- `--bg: #faf9f6` — warm cream background, softer than paper white
- `--surface: #ffffff` — cards, raised elements (single context where pure white earns its place, against the cream bg)
- `--border: #e8e5df` — primary divider
- `--border-soft: #efece6` — subtle section dividers
- `--text: #1a1a1a` — primary text (avoids pure black)
- `--text-muted: #6b6b6b` — secondary, body copy
- `--text-faint: #9a9a96` — tertiary labels, periods
- `--accent: #1a8a6e` — refined teal, used sparingly (≤10% of any frame)
- `--accent-soft: rgba(26,138,110,0.08)` — backgrounds for badges, hover tints

### Dark mode
- `--bg: #0e0e10` — deep, slightly warm black
- `--surface: #161618`
- `--border: #26262a`
- `--border-soft: #1d1d20`
- `--text: #e8e8e8`
- `--text-muted: #8a8a8a`
- `--text-faint: #5a5a5a`
- `--accent: #00d4aa` — brighter teal that holds up against dark
- `--accent-soft: rgba(0,212,170,0.10)`

### Strategy

**Restrained.** One accent, used at <10% of any visible frame. The accent appears on: section numbers, "current" badge dot, mono-prefix tokens (`//`, `$`, `<>`), the GPA value, hover states, the primary CTA button on hover.

## Typography

### Stack
- Sans (body, headings): `'Inter', system-ui, sans-serif` — weights 400, 500, 600, 700
- Mono (scaffolding, numerals, labels): `'JetBrains Mono', 'SF Mono', 'Menlo', monospace` — weights 400, 500

### Scale
The page uses a 1.25-ish ratio between steps. Headings tighten letter-spacing as they grow.

| Role | Size | Weight | Letter-spacing |
|---|---|---|---|
| Hero name | clamp(2.5rem, 5.5vw, 4rem) | 600 | -0.04em |
| Section title | clamp(1.75rem, 3vw, 2.25rem) | 600 | -0.02em |
| Card / role title | 1.05–1.15rem | 600 | -0.01em |
| Body | 0.92–0.98rem | 400 | 0 |
| Mono label | 0.7–0.78rem | 400–500 | 0.05–0.1em (UPPER) |
| Mono date / num | 0.7–0.78rem | 400 | 0.02em |

### Line length
Body paragraphs cap at ~480px (about 65ch). About-section copy capped at 540px.

## Layout

### Container
Max-width 960px, centered, 2rem horizontal padding. The constraint forces text to feel like a column rather than a banner. Sections do not span full-bleed except for the navbar.

### Section rhythm
- Section padding: 6rem vertical on desktop, 4.5rem on mobile.
- Sections separated by a single 1px `--border-soft` line — no shadows, no full backgrounds, no alt-row stripes.
- Section heading: section number (mono, accent) + section label (mono, muted) + title (large sans, right-aligned to flush with the column edge). The asymmetric distribution of weight is deliberate.

### Grids
- Hero: `1.4fr 1fr` (text + avatar) at desktop; single column at ≤900px with avatar moving above text.
- About: `1.5fr 1fr` (bio + edu card) at desktop; stacks at ≤900px.
- Experience: `140px 1fr` (period + body); period collapses above body at ≤900px.
- Projects: `1fr 1fr` at desktop; carousel (one card visible) at ≤768px.
- Skills: `1fr 1fr` (bars + tools); stacks at ≤900px.

### Spacing
The vertical rhythm uses 1.5rem and 2rem for paragraph gaps, 0.75–1rem for tight metadata, 4rem for column gaps. Cards use 1.75rem inner padding.

## Components

### Navbar
Fixed at top, transparent over hero, glass-blurs into `var(--bg)` after 30px scroll. Logo `<XKF/>` in mono, accent-colored brackets. Right side: nav links (mono, lowercase), CTA button (mono, ghost border), theme toggle (icon button).

### Buttons
- `btn--primary`: solid `var(--text)` background, `var(--bg)` text. Hover swaps to accent.
- `btn--ghost`: transparent, 1px border, `var(--text)` foreground. Hover darkens border.
- Both: 5px radius, 0.7rem × 1.25rem padding, mono font.
- All buttons end with a 14px arrow icon that translates 2px right on hover.

### Cards
- Education card and project cards: `var(--surface)` background, 1px `var(--border)`, 8px radius, soft shadow (1px 3px rgba(0,0,0,0.04)).
- Hover: lift 3px, border darkens, shadow grows to 12px 32px.
- No nested cards. No tinted card backgrounds beyond the single `var(--surface)`.

### Avatar
- 280px diameter, circular crop, 1px border, soft grayscale (8%) at rest. Hover removes grayscale and scales 1.02.
- "Available" badge: white pill on the bottom-right, 6px accent dot with a 4px halo.
- No spinning rings. No floating elements. The badge is the only adornment.

### Tags / chips
- Mono text, 1px border, 3px radius, 0.7rem font. No fill.

### Skill bars
- 2px-tall track, accent fill animates in over 1.2s on intersection. Width transitions, not opacity.

## Motion

### Principles
- Reveal on scroll: opacity 0 + translateY(16px) → opacity 1 + translateY(0), 0.7s ease.
- Hover transitions: 0.2s ease on color/border/transform.
- Theme transition: 0.3s ease on body background and text.
- Skill bar fill: 1.2s `cubic-bezier(0.4, 0, 0.2, 1)`.
- Button arrow: 0.2s translateX on hover.

### Bans
- No spinning loaders, rotating rings, or kinetic backgrounds.
- No bounce, no elastic curves.
- No animation on layout properties (width/height/grid).
- All motion respects `prefers-reduced-motion: reduce`.

## Iconography

Inline SVG, 14–22px, 1.5–2px stroke, currentColor fill or stroke. Custom-drawn (Github, LinkedIn, Instagram, Phone, Folder, Sun, Moon). No icon library.

## Imagery

Single avatar image. No stock photography, no decorative SVG flourishes, no hero illustrations.

## Copy patterns

- Section heads use mono prefixes: `01 ABOUT`, `02 EXPERIENCE`.
- Inline accents: `<>` brackets in logo, `//` before mono section labels, `$` before hero tagline.
- Numerals always in mono.
- No em dashes anywhere. Use commas, colons, semicolons, periods, parentheses.
