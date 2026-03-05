# Family Drama - Portfolio Website

## Overview
A creative production company portfolio website inspired by toolofna.com and prettybird.co/about. Built with React, Wouter routing, Tailwind CSS, GSAP, and a dark-themed design system. The About page uses a horizontal filmstrip scroll system with custom JavaScript hooks for wheel conversion, parallax, reveals, and GSAP-powered slide animations.

## Recent Changes
- 2026-03-05: Complete filmstrip rebuild of About page slides 3-11 — replaced old 15-slide CSS-only system with 9 GSAP-powered cinematic slides (The Work Speaks, Capabilities Manifesto, Capabilities Ticker, The Mission, The Reach, The Roster, The Impact, Select Partners, The Closing); variable-width slides (120vw-500vw), placeholder images with grain texture, parallax layers at different speeds, keyword emphasis animations, kinetic letter scatter, cycling text, full-bleed image transitions, awards cascade, marquee ticker; mobile responsive with vertical scroll fallback
- 2026-03-05: Added Ritmica font family (Regular 400, Medium 500, Semibold 600, Bold 700) — headings use Semibold, body text uses Medium, "FAMILY DRAMA" in hero uses Bold, cycling words use Regular
- 2026-02-27: Work page mobile — thumbnails (static Mux images) instead of autoplay videos; tap opens fullscreen video player overlay with controls + close button; desktop unchanged (hover preview + click navigates)
- 2026-02-27: Mobile menu enlarged (text-5xl/48px, py-3 spacing); Full mobile responsive About page
- 2026-02-26: Mobile About page viewport locking — Slide 1 & 2 wrapped in tall scroll containers with position: sticky inner content
- 2026-02-26: About page Slide 2 raindrop animation — all letters in "We're All Family" animate from random positions
- 2026-02-17: Initial build - all pages (Home, Work, About, Contact), navigation, footer, dark theme

## Project Architecture
- **Frontend**: React + Vite, Wouter for routing, Tailwind CSS
- **Backend**: Express (minimal - serves static frontend)
- **Data**: Static data embedded in `client/src/lib/data.ts` (no database needed)
- **Images**: Mux-generated thumbnails/GIFs from playback IDs + fallback images in `client/public/images/`; About page uses placeholder colored divs with grain texture
- **Video Player**: Media Chrome + mux-video web components (NOT mux-player)
- **Animations**: GSAP + custom JS hooks for About page filmstrip; CSS transitions for other pages
- **Fonts**: Ritmica font family in `client/public/fonts/` (Regular, Medium, Semibold, Bold)

## Key Files
- `client/src/App.tsx` - Main app with routes
- `client/src/pages/home.tsx` - Home page with hero, featured work, news, services
- `client/src/pages/work.tsx` - Work portfolio grid with Mux thumbnail/GIF hover previews
- `client/src/pages/project.tsx` - Project detail page with Media Chrome video player
- `client/src/pages/about.tsx` - About page with horizontal filmstrip scroll, slides 1-2 (hero/difference) + filmstrip slides 3-11
- `client/src/pages/contact.tsx` - Contact page with offices, team, sales reps
- `client/src/components/navigation.tsx` - Fixed header with hamburger menu
- `client/src/components/footer.tsx` - Site footer
- `client/src/lib/data.ts` - All portfolio data with Mux playback IDs, helper functions
- `client/src/media-chrome.d.ts` - TypeScript declarations for media-chrome and mux-video custom elements
- `client/src/index.css` - Animation system, horizontal scroll layout, placeholder images, filmstrip CSS, player CSS

## About Page Architecture
- **Horizontal Scroll**: Custom JS — .page-about is position: fixed, .page-about__wrapper is flex row with width: max-content, wheel events translate wrapper via JS (useHorizontalScroll hook)
- **Custom Hooks**: useHorizontalScroll (wheel→translateX, virtual scroll with hero/slide2 lock zones), useReveal (in-view CSS class toggling), useParallax (scroll-distance-based parallax)
- **Slide 1 (Hero)**: Image slides in from right on mount, word cycling via track translateY driven by heroProgress
- **Slide 2 (Difference)**: Letter rain (translateY + clipPath), image parallax entry, banner exit animation, rolodex
- **Filmstrip Slides 3-11**: FilmstripSlides container component with individual slide components, each listening to `horizontalscroll` custom events for scroll-driven animations
  - Slide 3: "The Work Speaks" (250vw) — image grow/settle/shrink, headline overlay
  - Slide 4: "Capabilities Manifesto" (400vw) — stacking line reveals, image behavior A
  - Slide 5: "Capabilities Ticker" (120vw) — CSS marquee, dark gray on black
  - Slide 6: "The Mission" (250vw) — keyword emphasis (context dims, keywords stay bright)
  - Slide 7: "The Reach" (250vw) — multi-phase staggered city emphasis
  - Slide 8: "The Roster" (450vw) — kinetic letter scatter, cycling text, pinned image
  - Slide 9: "The Impact" (500vw) — full-bleed image, awards cascade, image shrink+swap
  - Slide 10: "Select Partners" (200vw) — staggered client grid reveal
  - Slide 11: "The Closing" (200vw) — materialization (no directional entrance)
- **Parallax System**: 3 layers — headlines (1.15x), body text (1.0x), images (0.78x)
- **Placeholder Images**: Colored divs with SVG grain texture + descriptive labels
- **Mobile (≤1024px)**: Filmstrip slides become full-width vertical sections, all animations disabled, content visible by default

## Video/Media System
- Thumbnails: `getMuxThumbnail(playbackId, time, width)` → `https://image.mux.com/{id}/thumbnail.jpg`
- GIF previews: `getMuxGif(playbackId, start, end, width)` → `https://image.mux.com/{id}/animated.gif`
- Player: Media Chrome `<media-controller>` + `<mux-video>` with CSS custom properties set via ref
- Controls: play/pause, time-range, mute, fullscreen — gold #e8a020 accent, hidden until hover

## Design System
- Always-dark theme (black background, white/gray text)
- Font: Ritmica (primary — Regular/Medium/Semibold/Bold), Inter (fallback sans), DM Serif Display (serif accents)
- Accent color: #e8a020 (gold/orange) for player controls and project info
- About page CSS variables scoped under .page-about (--ease, --color-white/black/grey)
- Typography scale: .-t-200 through .-t-16 using min(vw, vh) for responsive display sizes
- Placeholder image colors: deep teal (#0D3B3B), warm amber (#3B2A0D), muted burgundy (#3B0D1A), dark navy (#0D1A3B), dark olive (#1A2B0D)

## Running
- `npm run dev` starts the Express + Vite dev server on port 5000
