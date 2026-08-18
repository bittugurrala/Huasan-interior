---
name: Atelier Minimalist
colors:
  surface: '#faf9f6'
  surface-dim: '#dbdad7'
  surface-bright: '#faf9f6'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f4f3f1'
  surface-container: '#efeeeb'
  surface-container-high: '#e9e8e5'
  surface-container-highest: '#e3e2e0'
  on-surface: '#1a1c1a'
  on-surface-variant: '#4e4542'
  inverse-surface: '#2f312f'
  inverse-on-surface: '#f2f1ee'
  outline: '#807571'
  outline-variant: '#d1c4bf'
  surface-tint: '#675c58'
  primary: '#160f0d'
  on-primary: '#ffffff'
  primary-container: '#2c2421'
  on-primary-container: '#978a86'
  inverse-primary: '#d2c4bf'
  secondary: '#6b5c4c'
  on-secondary: '#ffffff'
  secondary-container: '#f4dfcb'
  on-secondary-container: '#716252'
  tertiary: '#11110f'
  on-tertiary: '#ffffff'
  tertiary-container: '#262623'
  on-tertiary-container: '#8e8d89'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#eedfda'
  primary-fixed-dim: '#d2c4bf'
  on-primary-fixed: '#211a17'
  on-primary-fixed-variant: '#4e4541'
  secondary-fixed: '#f4dfcb'
  secondary-fixed-dim: '#d7c3b0'
  on-secondary-fixed: '#241a0e'
  on-secondary-fixed-variant: '#524436'
  tertiary-fixed: '#e5e2dd'
  tertiary-fixed-dim: '#c9c6c2'
  on-tertiary-fixed: '#1c1c19'
  on-tertiary-fixed-variant: '#474743'
  background: '#faf9f6'
  on-background: '#1a1c1a'
  surface-variant: '#e3e2e0'
  espresso: '#2C2421'
  sand: '#D9C5B2'
  ivory: '#F5F2ED'
  paper: '#FAF9F6'
  shadow-taupe: '#9E948B'
typography:
  display-lg:
    fontFamily: Instrument Serif
    fontSize: 80px
    fontWeight: '400'
    lineHeight: 90px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Instrument Serif
    fontSize: 48px
    fontWeight: '400'
    lineHeight: 54px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Instrument Serif
    fontSize: 42px
    fontWeight: '400'
    lineHeight: 52px
  headline-lg-mobile:
    fontFamily: Instrument Serif
    fontSize: 32px
    fontWeight: '400'
    lineHeight: 40px
  headline-md:
    fontFamily: Instrument Serif
    fontSize: 24px
    fontWeight: '500'
    lineHeight: 32px
  body-lg:
    fontFamily: Hanken Grotesk
    fontSize: 18px
    fontWeight: '300'
    lineHeight: 32px
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 28px
  label-caps:
    fontFamily: Hanken Grotesk
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.1em
spacing:
  unit: 8px
  gutter: 24px
  margin-desktop: 80px
  margin-mobile: 20px
  section-gap: 160px
---

## Brand & Style
The brand identity is rooted in **Architectural Minimalism**, evoking the quiet luxury of a high-end interior design studio. The aesthetic is curated, timeless, and tactile, aiming to feel like a digital edition of a premium design monograph.

The target audience consists of affluent clients and architectural enthusiasts who value intentionality over excess. The UI response should be one of "calm authority"—using silence (whitespace) as a design element to let photography and materiality take center stage. 

**Visual Style:**
- **Editorial Minimalism:** High-contrast typography paired with vast, intentional white space.
- **Asymmetrical Balance:** Layouts that feel organic yet structured, avoiding rigid symmetry for a more bespoke, gallery-like experience.
- **Material-Led:** The interface mimics physical materials—uncoated paper, linen textures, and stone.

## Colors
The palette is a sophisticated, monochromatic-adjacent range of warm neutrals that prioritize depth and warmth over stark digital whites.

- **Primary (Espresso):** Used exclusively for typography and essential iconography. It provides the necessary "ink on paper" contrast.
- **Secondary (Sand):** Used for subtle accents, active states, or as a background for secondary content blocks to create tonal depth.
- **Tertiary (Ivory):** The main surface color for containers or cards to differentiate from the background.
- **Neutral (Paper):** The global background color, providing a soft, warm canvas that is easier on the eyes than pure white.

## Typography
The typography strategy relies on the tension between the quiet, editorial **Instrument Serif** and the clean, functional **Hanken Grotesk**.

- **Headlines:** Use Instrument Serif for all editorial headings. Large display sizes should use tight line heights and slight negative letter spacing to emphasize the verticality of the letterforms.
- **Body:** Hanken Grotesk is set with generous line-height (leading) to ensure readability and a feeling of "airiness" within paragraphs.
- **Captions & Labels:** Use the `label-caps` style for navigation, small metadata, and image captions to provide a structured, architectural contrast to the fluid serif headlines.

## Layout & Spacing
The layout follows an **Asymmetrical Grid** model. Rather than centering everything, use the 12-column grid to create unexpected compositions where images and text blocks "float" with varying offsets.

- **Generous Whitespace:** Section gaps are intentionally large (160px+) to allow the design to breathe and to signal a premium experience.
- **Overlapping Elements:** Images should occasionally overlap background color blocks or typography to create a sense of three-dimensional depth, mimicking a physical scrapbook or portfolio.
- **Desktop:** Use a 12-column grid with wide outer margins (80px) to frame the content like a piece of art.
- **Mobile:** Transition to a 4-column grid with 20px margins, maintaining the vertical rhythm while stacking elements logically.

## Elevation & Depth
In alignment with the architectural theme, this design system avoids traditional drop shadows. Depth is achieved through **Tonal Layering** and **Materiality**.

- **Stacked Tones:** Use the Ivory (#F5F2ED) surface on top of the Paper (#FAF9F6) background to indicate hierarchy.
- **Soft Diffusion:** When a modal or overlay is required, use a high-density background blur (30px) with a subtle Sand-colored tint rather than a black overlay.
- **Ghost Borders:** Use extremely low-contrast outlines (1px solid Espresso at 5-10% opacity) for input fields or card boundaries only when necessary for accessibility.

## Shapes
The shape language is **Sharp (0px)**. To reflect the precision of architectural plans and luxury editorial design, all buttons, image containers, and input fields must have hard 90-degree corners. 

The only exception to this "sharp" rule is the use of perfectly circular elements for specific UI interactions (like a floating "Scroll to Top" button or a custom cursor), creating a geometric contrast against the rectangular grid.

## Components
- **Buttons:** Primary buttons are text-based with a heavy Espresso underline that animates to a full background fill on hover. Secondary buttons use the `label-caps` style with no border.
- **Cards:** Image-heavy. Cards should have no visible borders or shadows. Typography should be placed either directly below the image or slightly overlapping the corner in a floating Ivory box.
- **Inputs:** Simple bottom-border only. Labels use the `label-caps` style and sit above the line.
- **Navigation:** A minimal, fixed header. Use a "hamburger" menu even on desktop if the goal is to maximize visual focus on the photography, or a very spaced-out horizontal list of uppercase labels.
- **Imagery:** All images should feature a "material-first" aesthetic (high detail on textures like marble, wood grain, or linen). Use a consistent subtle grain filter over images to unify them with the paper-like UI.