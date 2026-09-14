---
name: Literary Minimal
colors:
  surface: '#fdf8f6'
  surface-dim: '#ddd9d7'
  surface-bright: '#fdf8f6'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f7f3f0'
  surface-container: '#f2edeb'
  surface-container-high: '#ece7e5'
  surface-container-highest: '#e6e2df'
  on-surface: '#1c1b1a'
  on-surface-variant: '#504537'
  inverse-surface: '#31302f'
  inverse-on-surface: '#f4f0ee'
  outline: '#827565'
  outline-variant: '#d4c4b1'
  surface-tint: '#815600'
  primary: '#7d5400'
  on-primary: '#ffffff'
  primary-container: '#9c6b10'
  on-primary-container: '#fffbff'
  inverse-primary: '#f9bc5e'
  secondary: '#755a2a'
  on-secondary: '#ffffff'
  secondary-container: '#fdd79c'
  on-secondary-container: '#785c2c'
  tertiary: '#7b5410'
  on-tertiary: '#ffffff'
  tertiary-container: '#976d28'
  on-tertiary-container: '#fffbff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffddb1'
  primary-fixed-dim: '#f9bc5e'
  on-primary-fixed: '#291800'
  on-primary-fixed-variant: '#614000'
  secondary-fixed: '#ffdeaa'
  secondary-fixed-dim: '#e5c187'
  on-secondary-fixed: '#271900'
  on-secondary-fixed-variant: '#5b4314'
  tertiary-fixed: '#ffddb1'
  tertiary-fixed-dim: '#f2be71'
  on-tertiary-fixed: '#291800'
  on-tertiary-fixed-variant: '#614000'
  background: '#fdf8f6'
  on-background: '#1c1b1a'
  surface-variant: '#e6e2df'
typography:
  display-lg:
    fontFamily: Merriweather
    fontSize: 48px
    fontWeight: '400'
    lineHeight: 60px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Merriweather
    fontSize: 36px
    fontWeight: '400'
    lineHeight: 46px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Merriweather
    fontSize: 32px
    fontWeight: '400'
    lineHeight: 42px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Merriweather
    fontSize: 26px
    fontWeight: '400'
    lineHeight: 34px
    letterSpacing: 0em
  headline-md:
    fontFamily: Merriweather
    fontSize: 24px
    fontWeight: '400'
    lineHeight: 34px
  headline-sm:
    fontFamily: Merriweather
    fontSize: 20px
    fontWeight: '700'
    lineHeight: 28px
  body-reading:
    fontFamily: Merriweather
    fontSize: 18px
    fontWeight: '300'
    lineHeight: 32px
  body-md:
    fontFamily: Inter
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 20px
  label-lg:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.02em
  label-caps:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.08em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 1rem
  margin: 3rem
  margin-mobile: 1.25rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system embodies the intimacy, quietude, and intellectual warmth of a curated private press. Designed specifically for long-form reading, serialized literature, and author portfolios, the visual atmosphere evokes finely milled vellum, natural linen book covers, and artisanal ink typography.

The interface maintains extreme restraint: visual clutter and harsh digital constructs are stripped away in favor of intentional whitespace, tactile cream layering, and delicate architectural lines. The emotional response is one of calm absorption, unhurried focus, and classic literary elegance. Interactivity is understated and tactile, treating words as the primary visual artifact while UI elements recede softly until summoned.

## Colors

The palette is rooted in tactile paper substrates and warm bookmaking inks, prioritizing legibility and zero visual fatigue during prolonged reading sessions.

- **Canvas & Surfaces:** Base canvas rests on warm parchment `#FBFBFA`. Content containers and literary cards utilize elevated vellum white `#FFFFFF` or structured inset cream `#F5F4F0`. Subtle dividing rules and structural borders rely on soft, warm stone `#E5E3DC`.
- **Text & Contrast:** Primary text is anchored by an organic soot-black `#1A1918`, delivering stark contrast without digital glare. Secondary commentary, chapter metadata, and word counts deploy warm ash `#6B6862`. Tertiary captions and subtle hints use muted pebble `#9E9B93`.
- **Accents:** The primary accent is a refined golden amber `#B8832A`, evoking hot foil stamping on cloth book bindings. Secondary states utilize deeper walnut amber `#8A6D3B`, while hover washes and active highlights lean on gentle ochre linen tints (`#F6EEDB`).

## Typography

The typographic hierarchy establishes a rigorous distinction between narrative content and platform utility:

- **Literary Narrative (Merriweather):** Reserved for manuscript reading, story titles, epigraphs, and chapter intros. `body-reading` employs an expansive line-height (1.77x) paired with a lighter weight (300) to ensure continuous reading comfort across digital viewports.
- **System Interface (Inter):** Deployed across all navigation bars, filters, progress markers, control labels, and interactive tools. Provides crisp, low-noise functional clarity that contrasts rhythmically against the narrative serif.
- **Editorial Eyebrows (`label-caps`):** Rendered in uppercase with generous tracking (`0.08em`) to annotate serial volume numbers, chapter indices, and metadata badges without demanding dominant focal weight.

## Layout & Spacing

The layout model adheres to an editorial grid balanced by generous negative space:

- **Desktop (12 Columns, max 1280px):** 1.5rem gutters, 3rem margins. For narrative reading layouts, an asymmetrical or centered single column with a strict measure of 680px (60–75 characters per line) is enforced to preserve optical cadence.
- **Tablet (8 Columns, 768px – 1024px):** 1.5rem gutters, 2rem margins. Sidebars and author glossaries collapse into drawer panels.
- **Mobile (4 Columns, < 768px):** 1rem gutters, 1.25rem margins. Margins compress to maximize paragraph flow while preserving an airy header footprint.
- **Spacing Cadence:** Vertical progression relies on multiples of 0.5rem (`space-sm`). Section breaks within stories are punctuated by `space-xl` (2.5rem) or understated typographic ornaments (`* * *`).

## Elevation & Depth

Visual hierarchy is maintained without heavy dropshadows or artificial skeuomorphic bevels:

- **Tonal Layers:** Elevation is primarily achieved through subtle tonal contrasts between `#FBFBFA` (background canvas), `#FFFFFF` (interactive cards and reading viewports), and `#F5F4F0` (recessed sidebars and chapter lists).
- **Hairline Framing:** Cards and elevated surfaces utilize crisp, low-opacity borders (`1px solid #E5E3DC`) rather than dark drop shadows.
- **Subtle Ambient Hover:** Floating menus, dropdowns, and active cards use an ethereal, warm-tinted shadow: `box-shadow: 0 4px 20px -2px rgba(26, 25, 24, 0.05)`. This creates natural physical presence reminiscent of paper layered over desktop leather.

## Shapes

The geometric framework balances contemporary clean geometry with the tactile softness of printed book stock:

- **Base Radius (8px / 0.5rem):** Applied to content cards, inputs, buttons, and popovers. This softens mechanical corners without devolving into overly playful pill contours.
- **Outer Shells & Modals (12px–16px):** Story covers, modal sheets, and reading settings drawers use `rounded-lg` (1rem).
- **Inline Badges & Pills:** Micro-tags, genre chips, and status flags retain the base 8px or subtle 6px corner radius to preserve architectural stability.

## Components

### Buttons
- **Primary:** Background in refined amber `#B8832A`, white text, 8px border radius. Hover shifts to `#8A6D3B` with micro-lift transition. Focus ring: `2px solid #D4A359` offset by 2px.
- **Secondary (Default):** Background `#FFFFFF`, hairline border `1px solid #E5E3DC`, text `#1A1918`. Hover transitions to `#F5F4F0` background and `#B8832A` text.
- **Ghost/Tertiary:** Background transparent, text `#6B6862`. Hover uses tint `#F5F4F0` with text `#1A1918`.

### Input Fields & Controls
- **Text Inputs:** Background `#FFFFFF`, border `1px solid #E5E3DC`, 8px border radius, padding `0.75rem 1rem`. Typography: Inter 14px. Focus state shifts border to `#B8832A` without aggressive glow rings.
- **Checkboxes & Radios:** Custom 18px square (or circle) with 1px border `#E5E3DC`. Checked state floods with `#B8832A` and displays a crisp white internal glyph.

### Literary Cards & Serial Index Cards
- **Structure:** Crisp white background `#FFFFFF`, bordered by `#E5E3DC`. Padding `space-lg` (1.5rem).
- **Typography:** Chapter titles in Merriweather `headline-sm`, subtitle and metadata (word count, reading time) in Inter `label-md` `#6B6862`.
- **Hover State:** Micro-shift of 1px upwards, subtle warm ambient tint shadow, and border transitions to `#D4A359`.

### Chips & Genre Badges
- **Style:** Light parchment background `#F5F4F0`, border `1px solid transparent`, text `#6B6862` (Inter `label-caps`). On selection: border `#B8832A`, background `#FDFBF7`, text `#B8832A`.

### Reader Navigation & Progress Bar
- **Progress Track:** Fixed hairline bar (2px) along the viewport top in `#E5E3DC`, with reading fill rendered in warm amber `#B8832A`.
- **Chapter Switcher:** Floating bottom pill container in `#FFFFFF` with hairline outline `#E5E3DC` and gentle diffuse shadow, allowing frictionless chapter pagination without interrupting immersion.