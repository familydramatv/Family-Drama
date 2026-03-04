# Family Drama - Portfolio Website

## Overview
A creative production company portfolio website inspired by toolofna.com. Built with React, Wouter routing, Tailwind CSS, and a dark-themed design system. The About page uses CSS-only horizontal scroll with custom JavaScript hooks for wheel conversion, parallax, and reveals.

## Recent Changes
- 2026-02-27: Work page mobile — thumbnails (static Mux images) instead of autoplay videos; tap opens fullscreen video player overlay with controls + close button; desktop unchanged (hover preview + click navigates)
- 2026-02-27: Mobile menu enlarged (text-5xl/48px, py-3 spacing); Full mobile responsive About page — slides 3-15 converted from absolute desktop layouts to vertical flex stacking via CSS overrides; images full-width, text readable, reveal animations disabled on mobile; typography scale adjusted down; all changes scoped to @media (max-width: 1024px)
- 2026-02-26: Mobile About page viewport locking — Slide 1 & 2 wrapped in tall scroll containers (400vh/500vh) with position: sticky inner content; .page-about is scroll container on mobile (height: 100vh, overflow-y: auto); scroll listeners updated to listen on .page-about element; Slide 2 banner centered on mobile with mix-blend-mode: normal, rolodex centered and scaled down; desktop unchanged via display: contents on lock zones
- 2026-02-26: Mobile optimization for all pages — responsive typography, spacing, widths; work page shows title/director on mobile without hover; project page BTS section widened; scrollbar-hide utility added
- 2026-02-26: About page Slide 2 raindrop animation — all letters in "We're All Family" animate from random positions with random timing/speed; rolodex scroll math fixed for 3 slides + exit
- 2026-02-24: Reverted About page from GSAP ScrollTrigger build back to original CSS-only horizontal scroll system
- 2026-02-23: Complete About page build — horizontal scroll system (desktop ≥1025px), 15 slides with CSS-only animations, typography-driven layouts, parallax effects, nested vertical scroll showcase, no animation libraries
- 2026-02-18: Rich project detail pages with content sections (text, image-pair, image-full), awards, credits; Dr. Teal's x Aaron Donald fully populated
- 2026-02-18: Mux-powered portfolio grid with hover GIF previews, Media Chrome video player with gold accent styling
- 2026-02-17: Initial build - all pages (Home, Work, About, Contact), navigation, footer, dark theme

## Project Architecture
- **Frontend**: React + Vite, Wouter for routing, Tailwind CSS
- **Backend**: Express (minimal - serves static frontend)
- **Data**: Static data embedded in `client/src/lib/data.ts` (no database needed)
- **Images**: Mux-generated thumbnails/GIFs from playback IDs + fallback images in `client/public/images/`
- **Video Player**: Media Chrome + mux-video web components (NOT mux-player)
- **Animations**: CSS transitions + custom JS hooks for About page horizontal scroll, parallax, reveals; no animation libraries

## Key Files
- `client/src/App.tsx` - Main app with routes
- `client/src/pages/home.tsx` - Home page with hero, featured work, news, services
- `client/src/pages/work.tsx` - Work portfolio grid with Mux thumbnail/GIF hover previews
- `client/src/pages/project.tsx` - Project detail page with Media Chrome video player
- `client/src/pages/about.tsx` - About page with horizontal scroll, 15 slides, CSS animations
- `client/src/pages/contact.tsx` - Contact page with offices, team, sales reps
- `client/src/components/navigation.tsx` - Fixed header with hamburger menu
- `client/src/components/footer.tsx` - Site footer
- `client/src/lib/data.ts` - All portfolio data with Mux playback IDs, helper functions
- `client/src/media-chrome.d.ts` - TypeScript declarations for media-chrome and mux-video custom elements
- `client/src/index.css` - Animation system, horizontal scroll layout, player CSS

## About Page Architecture
- **Horizontal Scroll**: CSS-only — .page-about is position: fixed, .page-about__wrapper is flex row with width: max-content, wheel events translate wrapper via JS
- **Custom Hooks**: useHorizontalScroll (wheel→translateX, virtual scroll with hero/slide2 lock zones, showcase vertical scroll handling), useReveal (in-view CSS class toggling), useParallax (scroll-distance-based parallax via CSS custom property — works on both desktop horizontal and mobile vertical scroll)
- **Slide 1 (Hero)**: Image slides in from right on mount, word cycling via track translateY driven by heroProgress (desktop) or vertical scroll position (mobile)
- **Slide 2 (Difference)**: Letter rain (translateY + clipPath) driven by slide2Progress, image parallax entry, banner exit animation, rolodex — all driven by horizontal scroll (desktop) or vertical scroll progress (mobile)
- **Slides 3-14**: CSS reveal system (.reveal → .is-visible), cascade stagger delays, clip-reveal, slide-in-right/left, transparent-reveal (.tr-context transparent→white), climax-word, parallax-element
- **Slide 11**: Fixed background with .slide-11-bg/.is-active toggle
- **Slide 15 (Showcase)**: Nested vertical scroll container, IntersectionObserver for video play/pause
- **Mobile (≤1024px)**: .page-about becomes relative/auto-height, wrapper goes column, slides become full-width auto-height
- **CSS Classes**: .page-about, .slide, .reveal, .clip-reveal, .slide-in-right, .slide-in-left, .transparent-reveal, .climax-word, .cascade, .parallax-element, .hero-cycling, .media-container

## Video/Media System
- Thumbnails: `getMuxThumbnail(playbackId, time, width)` → `https://image.mux.com/{id}/thumbnail.jpg`
- GIF previews: `getMuxGif(playbackId, start, end, width)` → `https://image.mux.com/{id}/animated.gif`
- Player: Media Chrome `<media-controller>` + `<mux-video>` with CSS custom properties set via ref
- Controls: play/pause, time-range, mute, fullscreen — gold #e8a020 accent, hidden until hover
- Adding new projects: upload to Mux, copy playback ID, add object to projects array
- **Always pull Mux metadata** (title, creator) via API when adding new playback IDs — never use placeholder names

## Design System
- Always-dark theme (black background, white/gray text)
- Font: Inter (sans), Playfair Display (serif accents)
- Accent color: #e8a020 (gold/orange) for player controls and project info
- About page CSS variables scoped under .page-about (--ease, --color-white/black/grey)
- Typography scale: .-t-200 through .-t-16 using min(vw, vh) for responsive display sizes
- Uses opacity-based hover interactions (not color-changing hovers)

## Running
- `npm run dev` starts the Express + Vite dev server on port 5000
