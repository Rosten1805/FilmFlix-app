# FilmFlix Component Catalog - Quick Reference

## 🎯 Component Index

### Navigation Components
| Component | Variants | States | Priority |
|-----------|----------|--------|----------|
| **Navbar** | Desktop, Mobile | Scrolled, Search Active | ⭐⭐⭐ Critical |
| **Sidebar** | Collapsed, Expanded | - | ⭐⭐ Important |
| **Footer** | Standard | - | ⭐ Nice to have |

### Content Display Components
| Component | Variants | States | Priority |
|-----------|----------|--------|----------|
| **MovieCard** | Compact, Wide, Horizontal, Featured, Mini | Idle, Hover, Focus, Loading, Error | ⭐⭐⭐ Critical |
| **MovieGrid** | Standard, Horizontal Scroll, Masonry | Loading, Empty | ⭐⭐⭐ Critical |
| **MovieDetail** | Full Page | Loading, Error | ⭐⭐⭐ Critical |
| **Hero/Banner** | Static, Video, Carousel | Autoplay, Paused | ⭐⭐⭐ Critical |
| **CastCard** | Standard, Compact | Hover | ⭐⭐ Important |

### UI Elements
| Component | Variants | States | Priority |
|-----------|----------|--------|----------|
| **Badge** | Rating, Genre, Status, Quality | - | ⭐⭐⭐ Critical |
| **Button** | Primary, Secondary, Icon, Ghost | Idle, Hover, Active, Disabled, Loading | ⭐⭐⭐ Critical |
| **SearchBar** | Collapsed, Expanded | Active, Loading | ⭐⭐⭐ Critical |
| **ProgressBar** | Linear, Circular | Determinate, Indeterminate | ⭐⭐ Important |

### Feedback Components
| Component | Variants | States | Priority |
|-----------|----------|--------|----------|
| **Skeleton** | Card, Text, Grid | - | ⭐⭐⭐ Critical |
| **Spinner** | Small, Medium, Large | - | ⭐⭐⭐ Critical |
| **Toast** | Success, Error, Warning, Info | Entering, Visible, Exiting | ⭐⭐ Important |
| **Modal** | Small, Medium, Large, Fullscreen | Open, Closing | ⭐⭐ Important |

---

## 📋 Component Specifications Summary

### 1. NAVBAR
```
┌─────────────────────────────────────────────────────────────┐
│ [LOGO] Home Movies TV Shows My List [SEARCH] [AVATAR]      │
└─────────────────────────────────────────────────────────────┘

Dimensions: Full-width × 64px
Background: Glass effect (rgba(11,11,15,0.8) + backdrop-blur)
Position: Sticky top-0

States:
✓ Top of page: 70% opacity, no shadow
✓ Scrolled: 95% opacity, shadow-lg, border-bottom
✓ Search active: Search expands to 300px
✓ Mobile: Hamburger menu (<768px)

Accessibility:
- <nav> semantic tag
- aria-label="Main navigation"
- Skip to content link
- Keyboard navigable (Tab order)
```

---

### 2. MOVIECARD - Compact Variant
```
┌─────────────────┐
│                 │
│     POSTER      │  Rating: ⭐ 8.5
│    2:3 ratio    │
│                 │
│ ┌─────────────┐ │
│ │  TITLE      │ │
│ │  Year: 2024 │ │
│ └─────────────┘ │
└─────────────────┘

Dimensions: Auto × aspect-ratio-2/3
Border Radius: 8px (rounded-lg)

States:
✓ Idle: Poster + basic info
✓ Hover: Scale 1.05, shadow-xl, overlay visible
✓ Focus: Purple ring, keyboard accessible
✓ Loading: Skeleton shimmer effect

Hover Overlay (300ms):
- Gradient bottom-to-top
- Description (3 lines max)
- Quick action buttons (Play, +, i)

Accessibility:
- <article> tag
- alt="Movie title poster"
- aria-label with full context
```

---

### 3. MOVIECARD - Wide Variant
```
┌───────────────────────────────────────┐
│                                       │
│         BACKDROP IMAGE 16:9           │
│                                       │
│  ┌─────────────────────────────────┐ │
│  │ TITLE (large)                   │ │
│  │ Description (3 lines)           │ │
│  │ [PLAY] [+ MY LIST] [MORE INFO] │ │
│  └─────────────────────────────────┘ │
└───────────────────────────────────────┘

Dimensions: Auto × aspect-ratio-16/9
Border Radius: 12px (rounded-xl)

States:
✓ Idle: Backdrop visible, info overlay bottom
✓ Hover: Brightness increase, buttons animate in
✓ Focus: Ring + all elements keyboard accessible

Info Panel:
- Position: Absolute bottom-left
- Gradient overlay for legibility
- Padding: p-6

Accessibility:
- Buttons: Clear aria-labels
- Title: <h3> heading level
```

---

### 4. HERO/BANNER
```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│         BACKDROP IMAGE (full-width, 70vh)                   │
│                                                             │
│  ┌────────────────────────────────────┐                    │
│  │ [LOGO/TITLE]                       │                    │
│  │                                    │                    │
│  │ ⭐ 8.5  2024  2h 15m  [Genres]     │                    │
│  │                                    │                    │
│  │ Description (3 lines max)          │                    │
│  │                                    │                    │
│  │ [▶ PLAY] [MORE INFO]               │                    │
│  └────────────────────────────────────┘                    │
│                                          [○ ○ ● ○] <dots>  │
└─────────────────────────────────────────────────────────────┘

Dimensions: Full-width × 70vh (desktop), 50vh (mobile)
Gradient: Left-to-right dark overlay

Content Position: Bottom-left, max-w-2xl
Padding: px-6 py-8

Features:
✓ Auto-play video background (muted)
✓ Carousel with navigation dots
✓ Sound toggle
✓ Auto-advance (5s delay)

States:
✓ Video playing: Controls hidden, shows on hover
✓ Carousel active: Current slide z-index elevated
✓ CTA hover: Scale + glow effect

Accessibility:
- <section> with aria-label
- Video: controls, captions available
- Carousel: keyboard navigation (arrow keys)
- Pause auto-advance on focus/hover
```

---

### 5. MOVIEGRID - Standard
```
┌───────────────────────────────────────────────────────┐
│ 🔥 Popular Movies                        [View All >] │
│                                                       │
│ [CARD] [CARD] [CARD] [CARD] [CARD] [CARD]           │
│ [CARD] [CARD] [CARD] [CARD] [CARD] [CARD]           │
│                                                       │
└───────────────────────────────────────────────────────┘

Layout: CSS Grid auto-fill
Gap: 16px (gap-4)
Responsive columns:
- Mobile (<640px): 2 cols
- Tablet (640-1024px): 3-4 cols
- Desktop (>1024px): 5-6 cols
- Ultra-wide (>1536px): 6-8 cols

Section Header:
- Title: text-2xl font-bold
- "View All" link: text-sm text-purple-400

States:
✓ Loading: Skeleton cards (8-12 items)
✓ Empty: "No movies found" message
✓ Error: Error message + retry button
```

---

### 6. MOVIEGRID - Horizontal Scroll
```
┌───────────────────────────────────────────────────────┐
│ ⭐ Top Rated                             [View All >] │
│                                                       │
│ ← [CARD] [CARD] [CARD] [CARD] [CARD] [CAR →         │
│                                                       │
└───────────────────────────────────────────────────────┘

Layout: Flex row, overflow-x scroll
Scroll: Smooth, snap to cards
Navigation: Arrow buttons on hover (desktop)
Peek: Next card partially visible (20%)

Scrollbar: Hidden (scrollbar-hide)
Controls:
- Desktop: Arrow buttons left/right
- Mobile: Touch swipe
- Keyboard: Arrow keys when focused

States:
✓ Start: Left arrow disabled
✓ End: Right arrow disabled
✓ Scrolling: Smooth animation
```

---

### 7. SEARCHBAR
```
Collapsed:
┌────┐
│ 🔍 │  (40px circle)
└────┘

Expanded:
┌────────────────────────────────┐
│ 🔍  Search movies and shows... │ ×
└────────────────────────────────┘

Dropdown (Active):
┌────────────────────────────────┐
│ 🔍  avengers                   │ ×
├────────────────────────────────┤
│ Movies                         │
│ • Avengers: Endgame            │
│ • The Avengers                 │
│                                │
│ TV Shows                       │
│ • Marvel's Avengers            │
│                                │
│ [View all results >]           │
└────────────────────────────────┘

Collapsed: 40px circle, icon only
Expanded: 300px width input
Height: 40px (rounded-full)

Background: bg-zinc-800/50
Border: border-zinc-700 (focus: border-purple-500)

Dropdown:
- Max height: 400px with scroll
- Sections: Movies, TV, People
- Items: Horizontal card variant
- Footer: "View all" link

States:
✓ Collapsed: Icon only
✓ Focused: Expands to 300px
✓ Typing: Shows dropdown
✓ Loading: Spinner in dropdown
✓ No results: "No results found" message

Accessibility:
- role="combobox"
- aria-autocomplete="list"
- aria-expanded state
- Keyboard navigation in results
```

---

### 8. BADGE Components

#### Rating Badge
```
┌─────────┐
│ ⭐ 8.5  │  Small
└─────────┘

Background: black/80 + backdrop-blur
Shape: Pill (rounded-full)
Padding: px-2 py-1
Typography: text-xs font-semibold

Sizes:
- Small: h-5
- Medium: h-6
- Large: h-7
```

#### Genre Badge
```
┌─────────┐
│ Action  │  Standard
└─────────┘

Background: zinc-800/50
Border: border-zinc-700
Shape: Rounded-md
Padding: px-3 py-1.5

Color Variants:
- Action: orange accent
- Drama: blue accent
- Comedy: yellow accent
- Horror: red accent
- Sci-Fi: purple accent
```

#### Status Badge
```
┌─────────┐
│ ● NEW   │  With pulse
└─────────┘

States:
- NEW: Green (with pulse animation)
- TRENDING: Purple (with scale pulse)
- SOON: Blue (no animation)

Shape: Rounded-full
Padding: px-2.5 py-1
Typography: text-xs font-semibold uppercase
```

---

### 9. BUTTON Variants

#### Primary CTA
```
┌──────────────────┐
│ ▶ PLAY NOW      │  Large, gradient
└──────────────────┘

Background: gradient-primary
Height: 48px (h-12)
Padding: px-8
Icon: Leading (play icon)

States:
✓ Hover: Brightness + scale 1.05
✓ Active: Scale 0.98
✓ Disabled: Opacity 0.5, grayscale
```

#### Secondary
```
┌──────────────────┐
│ ℹ MORE INFO     │  Outlined
└──────────────────┘

Background: transparent
Border: 2px solid white/30
Height: 48px (h-12)

States:
✓ Hover: bg-white/10, border-white/50
```

#### Icon Only
```
┌────┐
│ ♡  │  Circle
└────┘

Shape: Circle (rounded-full)
Size: 40x40px (h-10 w-10)
Background: zinc-800/50 blur

States:
✓ Hover: bg-zinc-700/50, scale 1.1
✓ Active: Filled heart (red)
```

---

### 10. LOADING STATES

#### Skeleton Loader
```
┌─────────────────┐
│ ░░░░░░░░░░░░░  │
│ ░░░░░░░░░░░░░  │  Shimmer animation
│ ░░░░░░░░░░░░░  │  →→→
│ ░░░░░░░░        │
└─────────────────┘

Background: bg-zinc-800
Animation: Shimmer left-to-right
Duration: 1.5s infinite

Matches MovieCard dimensions
Rounded corners preserved
```

#### Spinner
```
   ╱──╲
  │ ●  │  Rotating gradient
   ╲──╱

Sizes:
- Small: 24px
- Medium: 40px
- Large: 60px

Color: gradient-primary
Animation: Rotate 360deg, 1s infinite
```

#### Progress Bar
```
▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂
  ███████░░░░░░░░░░░░░░░░░░░░  (Loading...)

Height: 2px
Position: Fixed top-0
Color: gradient-primary
Animation: Indeterminate slide

States:
✓ Determinate: Width based on %
✓ Indeterminate: Sliding animation
```

---

## 🎨 State Transition Matrix

### MovieCard State Transitions
```
       IDLE
         │
    ┌────┼────┐
    │    │    │
  HOVER FOCUS LOADING
    │    │    │
    └────┼────┘
         │
      ACTIVE
         │
       ERROR
```

### Timing Specifications
```
Idle → Hover:      150ms ease-out
Hover → Idle:      150ms ease-in
Idle → Focus:      0ms (instant)
Any → Loading:     0ms (instant)
Loading → Loaded:  300ms fade-in
Any → Error:       200ms fade-in
```

---

## ♿ Accessibility Checklist

### Per Component Requirements

#### ✅ All Interactive Components
- [ ] Min 44x44px touch target
- [ ] Visible focus indicator (2px purple ring)
- [ ] Keyboard accessible (Tab, Enter, Space)
- [ ] Descriptive ARIA labels
- [ ] Color contrast ≥ 4.5:1

#### ✅ MovieCard
- [ ] `<article>` semantic tag
- [ ] Alt text on poster image
- [ ] aria-label with full context
- [ ] Focus ring on card and buttons
- [ ] Keyboard navigation for actions

#### ✅ Navbar
- [ ] `<nav>` with aria-label
- [ ] Skip to content link
- [ ] Current page indicated (aria-current)
- [ ] Mobile menu: aria-expanded
- [ ] Search: role="combobox"

#### ✅ Hero/Banner
- [ ] `<section>` with aria-label
- [ ] Carousel: keyboard arrow navigation
- [ ] Video: captions available
- [ ] Auto-play: pausable
- [ ] Dots: aria-label indicating position

#### ✅ Modal/Dialog
- [ ] role="dialog" aria-modal="true"
- [ ] Focus trap inside modal
- [ ] Escape key closes
- [ ] Focus returns to trigger
- [ ] Backdrop dimming

---

## 📱 Responsive Behavior Matrix

| Component | Mobile (<768px) | Tablet (768-1024px) | Desktop (>1024px) |
|-----------|----------------|---------------------|-------------------|
| **Navbar** | Hamburger menu | Full nav, search compact | Full with search |
| **Hero** | 50vh, title text-3xl | 60vh, title text-4xl | 70vh, title text-5xl |
| **MovieCard Grid** | 2 columns | 3-4 columns | 5-6 columns |
| **MovieDetail** | Stack vertical | 2-col grid | Sidebar layout |
| **Search** | Full-width overlay | Expand in nav | Inline expand |
| **Buttons** | Full-width stacked | Horizontal | Horizontal |

---

## 🎬 Animation Timing Reference

| Interaction | Duration | Easing | Property |
|-------------|----------|--------|----------|
| Hover enter | 150ms | ease-out | transform, opacity |
| Hover exit | 150ms | ease-in | transform, opacity |
| Click/Press | 100ms | ease-in | transform |
| Focus | 0ms | - | outline |
| Modal open | 250ms | ease-out | scale, opacity |
| Modal close | 200ms | ease-in | scale, opacity |
| Route change | 300ms | ease-in-out | opacity, translateY |
| Skeleton shimmer | 1500ms | linear | background-position |
| Spinner rotate | 1000ms | linear | rotate |

---

## 🔧 Implementation Priority

### Phase 1: Critical (Week 1-2)
1. **Navbar** - Navigation principal
2. **MovieCard Compact** - Display básico
3. **MovieGrid Standard** - Layout principal
4. **Badge (Rating, Genre)** - Metadata
5. **Button Primary/Secondary** - CTAs
6. **Skeleton Loader** - Loading states

### Phase 2: Important (Week 3-4)
7. **Hero/Banner** - Featured content
8. **MovieCard Wide** - Enhanced display
9. **SearchBar** - Content discovery
10. **MovieDetail** - Detail page
11. **Modal** - Overlays
12. **Toast** - Notifications

### Phase 3: Enhancement (Week 5+)
13. **MovieCard Horizontal** - Lists
14. **MovieGrid Horizontal Scroll** - Categories
15. **CastCard** - Cast display
16. **Badge Status/Quality** - Extra metadata
17. **Advanced animations** - Polish
18. **Easter eggs** - Delight

---

**Quick Reference Card**
**Version**: 1.0
**Components**: 15 core + variants
**States**: 7 per interactive component
**Accessibility**: WCAG 2.1 Level AA
**Responsive**: 5 breakpoints
