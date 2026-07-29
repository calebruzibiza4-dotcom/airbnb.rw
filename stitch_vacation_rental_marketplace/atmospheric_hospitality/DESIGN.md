---
name: Atmospheric Hospitality
colors:
  surface: '#f9f9f9'
  surface-dim: '#dadada'
  surface-bright: '#f9f9f9'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f3f3'
  surface-container: '#eeeeee'
  surface-container-high: '#e8e8e8'
  surface-container-highest: '#e2e2e2'
  on-surface: '#1a1c1c'
  on-surface-variant: '#5c3f41'
  inverse-surface: '#2f3131'
  inverse-on-surface: '#f1f1f1'
  outline: '#906f70'
  outline-variant: '#e5bdbe'
  surface-tint: '#be0038'
  primary: '#ba0036'
  on-primary: '#ffffff'
  primary-container: '#e21e4a'
  on-primary-container: '#fffbff'
  inverse-primary: '#ffb2b6'
  secondary: '#5f5e5e'
  on-secondary: '#ffffff'
  secondary-container: '#e2dfde'
  on-secondary-container: '#636262'
  tertiary: '#006a45'
  on-tertiary: '#ffffff'
  tertiary-container: '#008558'
  on-tertiary-container: '#f6fff6'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdada'
  primary-fixed-dim: '#ffb2b6'
  on-primary-fixed: '#40000d'
  on-primary-fixed-variant: '#920029'
  secondary-fixed: '#e5e2e1'
  secondary-fixed-dim: '#c8c6c5'
  on-secondary-fixed: '#1b1c1c'
  on-secondary-fixed-variant: '#474746'
  tertiary-fixed: '#80f9bd'
  tertiary-fixed-dim: '#62dca3'
  on-tertiary-fixed: '#002113'
  on-tertiary-fixed-variant: '#005234'
  background: '#f9f9f9'
  on-background: '#1a1c1c'
  surface-variant: '#e2e2e2'
typography:
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 26px
    fontWeight: '600'
    lineHeight: 32px
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 26px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 18px
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1280px
  gutter: 24px
  margin-mobile: 20px
  margin-desktop: 80px
  stack-sm: 12px
  stack-md: 24px
  stack-lg: 48px
---

## Brand & Style

The design system is centered on the concept of "The Invisible Frame." The UI is intentionally understated to allow high-resolution photography and immersive content to remain the focal point. By utilizing a **Minimalist** aesthetic with a **Corporate/Modern** backbone, the interface recedes into the background, providing a sense of clarity, transparency, and trust.

The target audience consists of global travelers and hosts who value ease of use and visual inspiration. The emotional response should be one of "effortless discovery"—a frictionless journey from inspiration to booking. Key attributes include high-quality whitespace, a refined color palette, and rhythmic spacing that prevents information density from feeling overwhelming.

## Colors

The palette is anchored by a high-energy primary rose that signals action and brand presence without dominating the visual field.

- **Primary (#FF385C):** Reserved for critical actions like booking buttons, price highlights, and active states.
- **Secondary/Text (#222222):** Used for primary headings and body copy to ensure maximum legibility and a grounded, premium feel.
- **Background (#F7F7F7):** Applied to sectional backgrounds and page fills to provide subtle contrast against white cards.
- **Surface (#FFFFFF):** The standard color for cards, inputs, and the navigation bar to maintain a "light and airy" feel.
- **Borders (#DDDDDD):** Used for thin, hairline dividers and input strokes to define structure without adding visual weight.

## Typography

This design system uses a dual-font approach to balance personality with utility. **Plus Jakarta Sans** provides a soft, welcoming geometric feel for headlines, while **Inter** ensures highly systematic and legible body text.

### Scaling Rules
- Use `display-lg` exclusively for landing page hero sections.
- Use `headline-lg` for property titles and major section headers. On mobile devices, this automatically scales down to `headline-lg-mobile`.
- **Inter** is used for all functional text. `label-md` should be used for metadata and small caps identifiers to create visual hierarchy among dense property details.

## Layout & Spacing

The layout utilizes a **fluid grid** with strict max-width constraints for readability. 

- **Grid:** A 12-column grid system is used for desktop (breakpoint > 1024px), shifting to a 1-column stack for mobile.
- **Rhythm:** An 8px linear scale governs all padding and margins. 
- **Content Density:** Maintain a minimum of `stack-lg` (48px) between major vertical sections to preserve the "airy" aesthetic. 
- **Imagery:** Property cards should follow a consistent aspect ratio (typically 4:3 or 1:1) to ensure the grid remains rhythmic and predictable regardless of content.

## Elevation & Depth

Visual hierarchy is achieved through **Tonal Layers** and **Ambient Shadows** rather than heavy borders.

1.  **Level 0 (Base):** Light gray (#F7F7F7) background for the page body.
2.  **Level 1 (Surface):** White (#FFFFFF) cards and containers with a subtle 1px border (#DDDDDD). 
3.  **Level 2 (Hover/Active):** On interaction, elements transition to a soft, diffused shadow (0px 6px 16px rgba(0,0,0,0.12)). This mimics the physical lifting of a card.
4.  **Level 3 (Overlay):** Modals and dropdowns use a prominent, high-diffusion shadow and a backdrop blur of 8px to maintain context of the underlying content while focusing the user.

## Shapes

The shape language is defined by "Soft Precision." Every interactive element uses a standardized radius to feel approachable yet organized.

- **Standard (8px):** Buttons, input fields, and small decorative elements.
- **Large (12px):** Property images, cards, and modal containers.
- **Pill:** Search bars and category filters, signaling a fluid, gestural interaction.

## Components

### Buttons
- **Primary:** Solid Rose (#FF385C) with white text. High-contrast, 8px radius.
- **Secondary:** White background with a #222222 border. Used for "Show more" or non-critical actions.
- **Ghost:** No background or border; used for utility links like "Login" or "Help."

### Cards
- Property cards consist of a 12px rounded image, followed by a 12px vertical stack containing the title (headline-md), a brief description (body-sm in #717171), and the price (label-md). 
- Do not use shadows in the default state; apply them only on hover.

### Inputs & Search
- **The Search Bar:** A floating pill-shaped container with a subtle shadow. It should feel like the most prominent tool on the screen.
- **Text Inputs:** 8px rounded corners with a #DDDDDD border that darkens to #222222 on focus.

### Chips & Filters
- Use pill-shaped chips for categories (e.g., "Cabins," "Beachfront"). 
- Active states are indicated by a 2px bottom border in #222222 rather than a color fill, maintaining the minimalist feel.

### Lists
- Use horizontal scrolling lists for categories on mobile to maximize vertical space for property results.