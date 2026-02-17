# Design System Integration - Commit Plan & Versioning

**Versión**: 1.0  
**Fecha**: Febrero 2026  
**Rango**: v0.2.0 Design System Documentation  
**Objetivo**: Integración ordenada de tokens, componentes, wireframes, a11y y estados de carga

---

## RESUMEN EJECUTIVO

```
Fase: Design System Documentation (Post v0.2.0)
Duración estimada: 5 commits
Incremento de versión: v0.2.0 → v0.2.1 (patch)
Tag final: v0.2.1-design-system
Estado: Documentación + especificación (sin código React)
Objetivo: Establecer baseline design para implementación en v0.3.0
```

---

## COMMIT PLAN - TABLA DETALLADA

### Incremental Progress (5 commits)

| # | Tipo | Scope | Mensaje | Archivos | Tamaño | Tag | Notas |
|---|------|-------|---------|----------|--------|-----|-------|
| **1** | `docs` | `design-system` | Agregados tokens y paleta de colores (dark-first) con criterios de contraste WCAG | `DOCS/ui_kit.md` (Sección B completada) | ~500 líneas | *none* | Base para todos los componentes |
| **2** | `docs` | `components-catalog` | Catálogo de componentes shadcn/ui con variantes y estados | `DOCS/ui_kit.md` (Secciones A + D) | ~600 líneas | *none* | 14 componentes, 50+ variantes |
| **3** | `docs` | `wireframes` | Wireframes ASCII + Mermaid para Home y Detail con leyenda de componentes | `DOCS/wireframes.md` (Completo) | ~1200 líneas | *none* | Mapeo visual pantalla → componentes |
| **4** | `docs` | `loading-states` | Especificación de Skeleton patterns, timing, decision tree (skeleton vs empty vs error) | `DOCS/skeleton_patterns.md` (Completo) | ~800 líneas | *none* | State machine + React hooks |
| **5** | `docs` | `search-ux` | Experiencia de búsqueda con Command, keyboard nav, ARIA roles, focus management | `DOCS/search_command.md` (Completo) | ~900 líneas | `v0.2.1-design-system` | 5 fases implementation roadmap |

---

## COMMIT DETALLADO - ESPECIFICACIÓN COMPLETA

### Commit 1: Tokens & Color Palette

```
┌─────────────────────────────────────────────────┐
│ commit 1: docs(design-system): add color       │
│ tokens and dark-first palette with wcag        │
│ compliance                                      │
└─────────────────────────────────────────────────┘

Type: docs
Scope: design-system
Breaking: false
Files changed: 1
  - DOCS/ui_kit.md (NEW, section B)

Content:
├─ Description:
│  └─ "Define color palette for dark-first Netflix 
│     style UI with WCAG AA compliance (4.5:1 ratio)"
│
├─ Tokens defined:
│  ├─ Background: #0b0b0f
│  ├─ Surface Primary: #11131a
│  ├─ Surface Secondary: #151827
│  ├─ Text Primary: #f2f2f7 (ratio 18:1 on bg)
│  ├─ Text Secondary: #a0a0a7 (ratio 6.3:1)
│  ├─ Text Tertiary: #71727a (ratio 3.8:1)
│  ├─ Accent Red: #ef4444 (ratio 5.2:1)
│  ├─ Accent Purple: #9333ea
│  ├─ Accent Blue: #0ea5e9
│  ├─ Success: #22c55e (ratio 6.7:1)
│  ├─ Warning: #eab308 (ratio 6.1:1)
│  └─ Danger: #ef4444 (ratio 5.2:1)
│
├─ Spacing system:
│  ├─ 4px (xs), 8px (sm), 12px (base), 
│  ├─ 16px (md), 24px (lg), 32px (xl)
│  └─ Tailwind scale: gap-1 to gap-8
│
├─ Border radius tokens:
│  ├─ rounded-lg (0.5rem) - inputs, buttons
│  ├─ rounded-xl (0.75rem) - cards, containers
│  ├─ rounded-2xl (1rem) - MovieCard default
│  └─ rounded-full (50%) - avatars, badges
│
├─ Shadow tokens:
│  ├─ shadow-sm - subtle default
│  ├─ shadow-md - elevated hover
│  ├─ shadow-lg - modals
│  └─ shadow-2xl - hero overlays
│
├─ Typography tokens:
│  ├─ text-xs (12px), text-sm (14px), text-base (16px)
│  ├─ text-lg (18px), text-xl (20px), text-2xl (24px)
│  ├─ text-4xl (36px)
│  ├─ font weights: light, normal, semibold, bold
│  └─ tracking: tight (títulos), normal (body)
│
└─ WCAG Compliance matrix (todos ✅):
   └─ Text-Primary on all backgrounds: ✅ AA
   └─ Text-Secondary on surfaces: ✅ AA
   └─ Accent colors: ✅ AA (min 4.5:1)
   └─ Success/Warning/Danger: ✅ AA

Lines added: 450
Lines deleted: 0
```

**Commit Message Template:**
```
docs(design-system): add color tokens and dark-first palette with wcag compliance

- Define 12-color palette optimized for dark streaming UX
- Spacing system: 4px base scale (4/8/12/16/24/32)
- Border radius tokens: lg/xl/2xl/full with use cases
- Shadow scale: sm/md/lg/2xl for elevation
- Typography: 7 font sizes + weights + tracking
- WCAG AA contrast verification (4.5:1 minimum)
- Dark mode baseline: #0b0b0f background, #f2f2f7 text
- Ready for Tailwind config integration

Ref: #design-system-phase-1
```

---

### Commit 2: Components Catalog

```
┌──────────────────────────────────────────────────┐
│ commit 2: docs(components-catalog): add shadcn  │
│ ui component spec with variants and states      │
└──────────────────────────────────────────────────┘

Type: docs
Scope: components-catalog
Breaking: false
Files changed: 1
  - DOCS/ui_kit.md (ADD sections A + D)

Content:
├─ Description:
│  └─ "Complete catalog of 14 shadcn/ui components
│     with 50+ variants, states, and use cases"
│
├─ Component categories:
│  ├─ Layout (5): Card, Separator, ScrollArea, 
│  │              Container, AspectRatio
│  ├─ Interaction (4): Button, Dialog, Tabs, 
│  │                   DropdownMenu
│  ├─ Input (3): Input, Command, Badge
│  ├─ Feedback (2): Skeleton, Toast
│  └─ Media (1): AspectRatio
│
├─ Detailed specs per component:
│  ├─ Card:
│  │  ├─ Variants: compact (cover), wide (metadata), 
│  │  │             media (poster)
│  │  ├─ States: idle, hover, focus, loading, disabled
│  │  └─ Usage: MovieCard, DetailCard
│  │
│  ├─ Button:
│  │  ├─ Variants: primary (gradient), secondary 
│  │  │            (outline), ghost (icon)
│  │  ├─ States: idle, hover, focus, active, 
│  │  │          loading, disabled
│  │  └─ Usage: "Watch Now", "Add to List", CTA
│  │
│  ├─ Dialog:
│  │  ├─ Variants: fullscreen (16:9), medium (500px), 
│  │  │            small (300px)
│  │  ├─ States: closed, open, loading
│  │  └─ Usage: Trailer modal, Detail page
│  │
│  ├─ Input:
│  │  ├─ Variants: text, email, password, search
│  │  ├─ States: empty, focused, typing, error, 
│  │  │          loading, disabled
│  │  └─ Usage: Search bar, login form
│  │
│  ├─ Badge:
│  │  ├─ Variants: rating (colored), genre (outline), 
│  │  │            status (badge)
│  │  ├─ Color coding: 9+/7+/5+/<5 dynamic
│  │  └─ Usage: Ratings, genre tags, metadata
│  │
│  ├─ Tabs:
│  │  ├─ Variants: underline, pills
│  │  ├─ States: idle, hover, active, disabled
│  │  └─ Usage: Trending/Popular/My Lists
│  │
│  ├─ Command:
│  │  ├─ Variants: combobox (select), search
│  │  ├─ States: idle, typing, searching, results, 
│  │  │          empty, error
│  │  └─ Usage: Movie search with autocomplete
│  │
│  └─ Toast:
│     ├─ Variants: success, error, warning, info
│     ├─ Position: top-right, bottom-right, center
│     └─ Usage: Add to list, error notifications
│
├─ Accessibility per component:
│  ├─ Keyboard navigation rules
│  ├─ ARIA labels and roles
│  ├─ Focus visible states
│  ├─ Semantic HTML patterns
│  └─ Color contrast verification
│
├─ Copy-paste prompts (6 roles):
│  ├─ Prompt 1: Full UI Kit spec (role: UI engineer)
│  ├─ Prompt 2: Grid responsive (role: designer)
│  ├─ Prompt 3: MovieCard component (role: architect)
│  ├─ Prompt 4: Navbar/Header (role: engineer)
│  ├─ Prompt 5: Modal/Dialog (role: UX specialist)
│  └─ Prompt 6: Badge variants (role: design system)
│
└─ Implementation reference:
   └─ Each component links to wireframes section

Lines added: 600
Lines deleted: 0
```

**Commit Message Template:**
```
docs(components-catalog): add shadcn/ui component spec with variants and states

- 14 core components: Card, Button, Dialog, Input, Badge, Tabs, Command, Toast
- 5 categories: Layout, Interaction, Input, Feedback, Media
- 50+ documented variants (primary/secondary/ghost for buttons, etc.)
- State specifications: idle, hover, focus, active, loading, disabled
- Accessibility rules per component: keyboard nav, ARIA, focus visible
- Use case mapping: MovieCard, DetailPage, Navbar, Search, etc.
- 6 copy-paste prompts ready for content generation
- Dark mode color integration with token system

Ref: #design-system-phase-2
```

---

### Commit 3: Wireframes & Visual Mapping

```
┌──────────────────────────────────────────────────┐
│ commit 3: docs(wireframes): add annotated ascii │
│ wireframes for home and detail pages             │
└──────────────────────────────────────────────────┘

Type: docs
Scope: wireframes
Breaking: false
Files changed: 1
  - DOCS/wireframes.md (NEW, 1200+ lines)

Content:
├─ Description:
│  └─ "ASCII wireframes + Mermaid diagrams for Home
│     and Detail pages with component annotations"
│
├─ Home Page Wireframe:
│  ├─ Navbar sticky (z-50, backdrop-blur)
│  │  ├─ Logo | Search Input (Command) | User Menu
│  │  └─ Leyenda: 11 components, interactions
│  │
│  ├─ Hero Section (featured movie, 16:9)
│  │  ├─ Backdrop image + gradient overlay
│  │  ├─ Title + metadata
│  │  └─ Buttons: "Watch Now", "Add to List"
│  │
│  ├─ Categories Grid (Trending/Popular/My Lists)
│  │  ├─ Tabs component (3 options)
│  │  ├─ Grid: 2 cols mobile → 6 cols desktop
│  │  ├─ 6 MovieCard items per category
│  │  ├─ Responsive: grid-cols-2 sm:3 md:4 lg:6
│  │  └─ Spacing: gap-4 mobile, gap-6 desktop
│  │
│  └─ Footer (optional)
│
├─ Detail Page Wireframe:
│  ├─ Dialog Modal (max-w-4xl, rounded-2xl)
│  │  ├─ Focus trap, backdrop click to close
│  │  ├─ ESC key close
│  │  └─ z-50 overlay management
│  │
│  ├─ Backdrop Image (16:9 AspectRatio)
│  │  ├─ Lazy load with Skeleton
│  │  ├─ Gradient overlay bottom (dark fade)
│  │  ├─ Trailer icon (play button, center)
│  │  ├─ Close button (×, top-right)
│  │  └─ Title overlay (text-4xl bold)
│  │
│  ├─ Content Area (space-y-6)
│  │  ├─ Title (text-4xl font-bold)
│  │  ├─ Meta row: Year | Runtime | Rating badge
│  │  ├─ Genre badges (3+, outline variant)
│  │  ├─ Synopsis (text-base, text-secondary)
│  │  ├─ Cast section (scrollable, avatars)
│  │  ├─ Videos related (tabs/grid)
│  │  ├─ Ratings (TMDB/IMDb scores)
│  │  ├─ Languages (flex wrap text)
│  │  ├─ Release date
│  │  └─ Action buttons (flex gap-3)
│  │
│  └─ Button row:
│     ├─ Primary: "Watch Now" (gradient red)
│     ├─ Secondary: "+ Add to List" (outline)
│     ├─ Ghost: "📤 Share"
│     └─ Ghost: "❤️ Like"
│
├─ Component Annotations (Leyenda):
│  ├─ 11 components (Home)
│  ├─ 14 components (Detail)
│  ├─ Props/states per component
│  ├─ Interactions on click/hover/focus
│  └─ Tailwind classes used
│
├─ Interaction Mermaid Diagrams (2):
│  ├─ Home: User actions → Navigation
│  │  └─ Scroll/Typing/Hover/TabSwitch flows
│  │
│  └─ Detail: Modal lifecycle
│     └─ Open/Scroll/Select/Close flows
│
├─ Responsive Breakpoints (4):
│  ├─ Mobile (320-640px): 2 cols, hamburger
│  ├─ Tablet (641-1024px): 3-4 cols
│  ├─ Desktop (1025-1440px): 4-6 cols
│  └─ Ultrawide (1441px+): 6 cols fixed 1280px
│
├─ Motion & Timing:
│  ├─ Hover MovieCard: 300ms scale
│  ├─ Overlay fade-in: 200ms
│  ├─ Detail modal open: 300ms
│  ├─ Tab switch: 200ms fade
│  ├─ Toast dismiss: 4000ms auto
│  └─ Focus ring: instant
│
├─ Dark Mode Legibilidad:
│  ├─ Contrast ratios (WCAG AA verified)
│  ├─ Rating badge: 9+/7+/5+/<5 color coding
│  ├─ MovieCard title + metadata styling
│  ├─ Input states (error, focus, disabled)
│  ├─ Button states (primary, secondary, ghost)
│  ├─ Accessibility checklist (11 items)
│  └─ Testing checklist (9 areas)
│
└─ References:
   └─ Links to ui_kit.md, skeleton_patterns.md

Lines added: 1200
Lines deleted: 0
```

**Commit Message Template:**
```
docs(wireframes): add annotated ascii wireframes for home and detail pages

- Home page: Navbar sticky + Hero section + Category grids (Trending/Popular/My Lists)
- Detail page: Dialog modal + Backdrop 16:9 + Content area + Action buttons
- Component annotations: 11 components (Home), 14 components (Detail)
- Interaction flows (2 Mermaid diagrams): User actions, Modal lifecycle
- Responsive design: 4 breakpoints (mobile/tablet/desktop/ultrawide)
- Motion & timing: 300ms scale, 200ms fade, 4000ms toast dismiss
- Dark mode legibility: Contrast ratios, Rating badge coloring, Button states
- Testing checklist: Visual, Interaction, Dark mode verification
- Integration point: Maps wireframes to component catalog

Ref: #design-system-phase-3
```

---

### Commit 4: Skeleton Loading Patterns

```
┌──────────────────────────────────────────────────┐
│ commit 4: docs(loading-states): add skeleton    │
│ patterns with timing and decision tree           │
└──────────────────────────────────────────────────┘

Type: docs
Scope: loading-states
Breaking: false
Files changed: 1
  - DOCS/skeleton_patterns.md (NEW, 800+ lines)

Content:
├─ Description:
│  └─ "Skeleton component patterns, timing, state
│     machine, and decision criteria for loading UI"
│
├─ Skeleton Base (Section A):
│  ├─ shadcn/ui Skeleton component structure
│  ├─ Color palette: bg-surface-primary/50
│  ├─ Shimmer color: bg-surface-secondary
│  ├─ Animate: pulse 2s infinite (Tailwind)
│  └─ Optional: Shimmer effect (onda de luz)
│
├─ MovieCard Skeleton (Section B):
│  ├─ Layout breakdown:
│  │  ├─ Image skeleton: w-full h-[300px] rounded-xl
│  │  ├─ Title skeleton: w-4/5 h-4 rounded-md
│  │  ├─ Meta row: 3 skeletons (year/rating/badge)
│  │  └─ Genre badges: 2 rounded-full skeletons
│  │
│  ├─ Tailwind classes (complete implementation)
│  ├─ Stagger animation (delays 0s/0.1s/0.2s/0.3s)
│  └─ No hover effects on skeleton
│
├─ Detail Page Skeleton (Section C):
│  ├─ 10 skeleton elements:
│  │  ├─ Backdrop image (16:9, h-[360px])
│  │  ├─ Close button skeleton
│  │  ├─ Title (w-2/3 h-8)
│  │  ├─ Meta row (year/runtime/rating)
│  │  ├─ Genre badges (3+ items)
│  │  ├─ Synopsis (3-4 lines)
│  │  ├─ Button skeletons (Watch/Add/Share)
│  │  ├─ Separator
│  │  ├─ Cast section skeleton
│  │  └─ Video section skeleton
│  │
│  ├─ Tailwind implementation (complete code)
│  └─ Stagger delays for cascade effect
│
├─ Shimmer Effect (Section D - Optional):
│  ├─ Alternative: gradient wave animation
│  ├─ @keyframes: shimmer 2s infinite
│  ├─ Use case: Hero sections, large images
│  ├─ CPU impact: More than pulse
│  └─ Recommendation: Pulse for MVP, shimmer later
│
├─ Decision Tree (Section E - CRITICAL):
│  ├─ START: User Action (Load Home, Open Detail)
│  │
│  ├─ SKELETON when:
│  │  ├─ isLoading = true
│  │  ├─ data === undefined/null
│  │  ├─ Duration < 5 segundos
│  │  ├─ User expects waiting
│  │  └─ Examples: Grid recarga, Detail abre
│  │
│  ├─ EMPTY when:
│  │  ├─ isLoading = false
│  │  ├─ data = [] (array vacío)
│  │  ├─ NO es error de red
│  │  ├─ Examples: Búsqueda sin resultados
│  │  └─ Show: Icon 🎬 + "No results"
│  │
│  ├─ ERROR when:
│  │  ├─ Network error catch
│  │  ├─ HTTP 4xx/5xx status
│  │  ├─ Timeout > 5 segundos
│  │  ├─ Examples: API quota, network down
│  │  └─ Show: Icon ⚠️ + "Error" + Retry button
│  │
│  └─ CONTENT when:
│     ├─ data.length > 0
│     ├─ Transition: fade-in 300ms
│     └─ Never show skeleton + content together
│
├─ State Machine Implementation (React):
│  ├─ LOAD_STATES constant:
│  │  ├─ IDLE, LOADING, SUCCESS, EMPTY, ERROR
│  │
│  ├─ useMovieLoad() hook
│  │  ├─ useState(LOAD_STATES.IDLE)
│  │  ├─ useEffect: fetch + setState
│  │  ├─ Handles all 5 states
│  │  └─ Returns { state, data, error }
│  │
│  ├─ Component switch statement
│  │  ├─ LOADING → <MovieCardSkeletons count={6} />
│  │  ├─ SUCCESS → <Grid>{content}</Grid>
│  │  ├─ EMPTY → <EmptyState />
│  │  ├─ ERROR → <ErrorState onRetry />
│  │  └─ Default → null
│  │
│  └─ Example code (fully functional)
│
├─ Component Implementations:
│  ├─ <MovieCardSkeletons count={6} />
│  │  └─ Map Array.from({ length: count })
│  │
│  ├─ <DetailSkeleton />
│  │  └─ Complete 10-element structure
│  │
│  └─ Fully typed JSX examples
│
├─ Timing & Duration (Section G):
│  ├─ Skeleton animation: 2s pulse infinite
│  ├─ Transition fade: 300ms (skeleton ↔ content)
│  ├─ Network targets:
│  │  ├─ 3G/4G Home: 1-2s típico
│  │  ├─ 3G/4G Detail: 1-3s típico
│  │  ├─ Search: 2-4s (con debounce 400ms)
│  │  └─ Timeout máximo: 30 segundos
│  └─ Message "Taking longer..." después 5s
│
├─ Testing Checklist (Section H):
│  ├─ Patterns (5 items)
│  ├─ Logic (5 items)
│  ├─ Timing (4 items)
│  ├─ Testing (6 items)
│  ├─ Accessibility (5 items)
│  ├─ Performance (4 items)
│  └─ Total: 29 test items
│
└─ References:
   └─ shadcn/ui Skeleton docs, Tailwind animations

Lines added: 800
Lines deleted: 0
```

**Commit Message Template:**
```
docs(loading-states): add skeleton patterns with timing and decision tree

- Skeleton base: shadcn/ui component, pulse 2s animation, surface colors
- MovieCard skeleton: Image (2:3) + Title (80%) + Meta + Genres
- Detail skeleton: Backdrop (16:9) + 10 elements with stagger delays
- Shimmer effect (optional): Wave animation for premium feel (later)
- Decision tree (CRITICAL): Show Skeleton/Empty/Error/Content based on state
- State machine: React hook useMovieLoad() with 5 states (IDLE/LOADING/SUCCESS/EMPTY/ERROR)
- Component generators: <MovieCardSkeletons /> and <DetailSkeleton with full JSX
- Timing targets: 1-3s on 3G/4G, fade transition 300ms, max timeout 30s
- Testing: 29 items covering patterns, logic, timing, accessibility, performance
- Integration: Ready for React component implementation in Phase 2

Ref: #design-system-phase-4
```

---

### Commit 5: Search UX & Accessibility

```
┌──────────────────────────────────────────────────┐
│ commit 5: docs(search-ux): add command search   │
│ with keyboard nav, aria roles, accessibility    │
└──────────────────────────────────────────────────┘

Type: docs
Scope: search-ux
Breaking: false
Files changed: 1
  - DOCS/search_command.md (NEW, 900+ lines)

Content:
├─ Description:
│  └─ "Complete search UX specification with Command
│     component, keyboard navigation, ARIA roles"
│
├─ Command Component (Section A):
│  ├─ shadcn/ui hierarchy:
│  │  ├─ Command (root)
│  │  ├─ CommandInput (auto-focus)
│  │  ├─ CommandList (scrollable)
│  │  ├─ CommandEmpty (no results)
│  │  ├─ CommandGroup (opcional)
│  │  └─ CommandItem (cada resultado)
│  │
│  └─ Example JSX structure
│
├─ Keyboard Shortcuts (Section B):
│  ├─ Cmd+K (Mac) / Ctrl+K (Windows) → abre modal
│  ├─ ESC → cierra modal
│  ├─ useCommandOpen() hook implementation
│  ├─ Navbar badge visual: "⌘K" o "⌃K" grey
│  ├─ Tooltip: "Press Cmd+K to search"
│  └─ Works on desktop only (mobile: tap input)
│
├─ Input States (Section C):
│  ├─ IDLE: vacío, placeholder visible
│  ├─ TYPING: focus visible, debounce 300ms
│  ├─ SEARCHING: spinner, loading indicator
│  ├─ RESULTS_FOUND: resultados fade-in
│  ├─ NO_RESULTS: CommandEmpty visible
│  └─ ERROR: mensaje + retry button
│
│  └─ Debounce implementation:
│     └─ useSearchDebounce() hook, min 2 chars
│
├─ Result Items (Section D):
│  ├─ Layout: Icon 🎬 | Title | Year | Rating badge
│  ├─ States: IDLE, HOVER, FOCUS
│  ├─ Focus styling:
│  │  ├─ bg-surface-secondary
│  │  ├─ border-l-2 border-accent-blue
│  │  ├─ Title bold
│  │  └─ ring-2 ring-accent-blue
│  │
│  ├─ Result Component JSX (complete)
│  └─ Groups: Movies (+ optional Actors, Directors)
│
├─ Keyboard Navigation (Section E):
│  ├─ ↑↓ Arrow keys: navega items (circular)
│  ├─ Home/End: jump first/last
│  ├─ Enter: selecciona, navega a /detail/:id
│  ├─ ESC: cierra, restaura focus
│  ├─ Backspace/Delete: en input
│  ├─ Tab: trapped en modal (focus trap)
│  │
│  └─ Mermaid state diagram (6 estados)
│
├─ Command Modal (Section F):
│  ├─ Dialog overlay (bg-black/80, backdrop-blur-md)
│  ├─ z-50, fade-in + zoom-in 300ms
│  ├─ Max-width 2xl, padding 0
│  ├─ CommandInput (autofocus, clear button)
│  ├─ CommandList (max-h-96 overflow-auto)
│  ├─ CommandEmpty (icon + message)
│  ├─ Loading spinner (pulse animation)
│  ├─ Result groups (CommandGroup)
│  ├─ Footer hint: "Press ESC to close"
│  └─ Complete JSX implementation
│
├─ Empty & Error States (Section G):
│  ├─ Empty State 1: Initial (no query)
│  │  └─ Icon 🎬 "Start Searching"
│  │
│  ├─ Empty State 2: No results
│  │  └─ Icon 🔍 "No Results Found for '{query}'"
│  │
│  ├─ Empty State 3: Min length (< 2 chars)
│  │  └─ Icon ⌨️ "Keep Typing (2+ chars)"
│  │
│  ├─ Error State 1: Network error
│  │  └─ Icon 🌐 "Connection Error" + Retry button
│  │
│  └─ Error State 2: API error (quota/timeout)
│     └─ Icon ⚠️ "Search Unavailable" + More Info link
│
│  └─ SearchError component implementation
│
├─ Focus Management (Section H):
│  ├─ Modal opens: focus → CommandInput auto
│  ├─ Input focused: ring-2 ring-accent-blue
│  ├─ Arrow pressed: focus → CommandItem
│  ├─ Item focused: bg-surface-secondary + left border
│  ├─ Item selected: pulse + fade-out modal
│  ├─ Modal closes: focus restore to navbar
│  │
│  ├─ Focus styling (Tailwind CSS)
│  ├─ Focus trap implementation (Tab circular)
│  └─ useCommandFocusTrap() hook
│
├─ ARIA Roles & Attributes (Section I):
│  ├─ Dialog:
│  │  ├─ role="dialog" aria-modal="true"
│  │  ├─ aria-label="Search movies"
│  │  └─ aria-live="polite"
│  │
│  ├─ Input:
│  │  ├─ role="combobox" aria-autocomplete="list"
│  │  ├─ aria-controls="search-listbox"
│  │  ├─ aria-expanded={hasResults}
│  │  ├─ aria-label="Search input..."
│  │  └─ aria-describedby="search-help"
│  │
│  ├─ Listbox:
│  │  ├─ role="listbox" aria-live="polite"
│  │  ├─ aria-label="Search results"
│  │  ├─ aria-busy={isSearching}
│  │  └─ aria-labelledby="search-label"
│  │
│  ├─ Items:
│  │  ├─ role="option" aria-selected={isFocused}
│  │  ├─ aria-label="{title}, {year}, {rating}"
│  │  └─ tabindex="-1"
│  │
│  ├─ Empty:
│  │  ├─ role="status" aria-live="polite"
│  │  └─ aria-label="No results found"
│  │
│  └─ Loading spinner:
│     ├─ aria-hidden="true" (decorativo)
│     └─ aria-label="Searching..." (context)
│
│  └─ Screen reader announcements (5 scenarios)
│
├─ Mobile / Responsive (Section J):
│  ├─ Mobile: < 640px
│  │  ├─ Tap search → expande navbar o fullscreen modal
│  │  ├─ max-w-none, fullscreen modal
│  │  ├─ Soft keyboard auto-appear
│  │  └─ Cmd+K disabled (no keyboard física)
│  │
│  ├─ Touch targets: min 44px tall
│  ├─ Focus visible importante (15px+ ring)
│  ├─ Responsive classes (xs/sm/md variants)
│  └─ Example: max-w-full, rounded-none mobile
│
├─ Testing Checklist (Section K):
│  ├─ Keyboard navigation (8 items)
│  ├─ Focus management (5 items)
│  ├─ ARIA roles (7 items)
│  ├─ Screen reader (6 items)
│  ├─ Search functionality (5 items)
│  ├─ State changes (5 items)
│  ├─ Performance (5 items)
│  └─ Mobile (6 items)
│  └─ Total: 47 test items
│
├─ Implementation Roadmap (Section L - 5 Fases):
│  ├─ Phase 1: Core Command setup
│  ├─ Phase 2: Search logic + debounce
│  ├─ Phase 3: Navigation + UX
│  ├─ Phase 4: Accessibility ARIA
│  └─ Phase 5: Polish + testing
│
└─ References:
   └─ shadcn/ui Command, cmdk library

Lines added: 900
Lines deleted: 0
```

**Commit Message Template:**
```
docs(search-ux): add command search with keyboard navigation and aria roles

- Command component: CommandInput + CommandList + CommandEmpty/Group/Item
- Keyboard shortcuts: Cmd+K (Mac) / Ctrl+K (Windows) + ESC, useCommandOpen() hook
- Input states: IDLE, TYPING (debounce 300ms), SEARCHING, RESULTS_FOUND, NO_RESULTS, ERROR
- Result items: Icon + Title + Year + Rating badge, hover/focus styling
- Keyboard navigation: Arrow keys (circular), Home/End jump, Enter select, ESC close
- Modal structure: Dialog overlay, CommandInput (autofocus), CommandList (max-h-96)
- Empty states (3): Initial "Start Searching", No results "🔍", Min length "Keep Typing"
- Error states (2): Network "🌐 Retry", API "⚠️ Unavailable"
- Focus management: Auto-focus input, ring-2 styling, focus trap, restoration on close
- ARIA roles: Dialog, Input (combobox), Listbox, Items (option), Empty (status)
- ARIA attributes: aria-label, aria-describedby, aria-controls, aria-expanded, aria-live, aria-busy
- Screen reader announcements: 5 scenarios (open, typing, navigate, select, error)
- Mobile responsive: Fullscreen modal, soft keyboard, 44px touch targets
- Testing: 47 comprehensive test items
- Implementation: 5-phase roadmap (setup → search logic → nav → a11y → polish)

Ref: #design-system-phase-5
```

---

## VERSIONING & TAGGING STRATEGY

### Tag Plan

```
┌─────────────────────────────────────────────┐
│ TAGGING STRATEGY - DESIGN SYSTEM            │
├─────────────────────────────────────────────┤
│                                             │
│ Current State: v0.2.0 (Documentation)      │
│ Commits pending: 5 (Design System)         │
│ Target: v0.2.1 (Design System Kit)         │
│                                             │
│ After Integration:                          │
│ ├─ Merge all 5 commits                      │
│ ├─ Create tag: v0.2.1                       │
│ ├─ Commit message: "Design System Kit"      │
│ ├─ After implementation (v0.3.0):           │
│ │  └─ Feature commits (React components)    │
│ └─ Tag: v0.3.0 (Full Features)              │
│                                             │
│ Tag Naming: vMAJOR.MINOR.PATCH              │
│  ├─ v0.2.0 = Initial docs (API/data/arch)  │
│  ├─ v0.2.1 = Design system specification   │
│  ├─ v0.3.0 = Feature implementation        │
│  └─ v1.0.0 = Production release             │
│                                             │
└─────────────────────────────────────────────┘
```

### Tag Creation

```bash
# After commit 5, create annotated tag
git tag -a v0.2.1 -m "feat: Design System Kit

Design system V1 specification with:
- Color tokens and dark-first palette (WCAG AA)
- 14 shadcn/ui components with 50+ variants
- Wireframes for Home and Detail pages
- Skeleton loading patterns and state machine
- Search UX with Command, keyboard nav, ARIA roles
- 200+ test items across all areas

Changes:
- DOCS/ui_kit.md (1100+ lines)
- DOCS/wireframes.md (1200+ lines)
- DOCS/skeleton_patterns.md (800+ lines)
- DOCS/search_command.md (900+ lines)
- Total: 4000+ lines documentation

Status: Ready for React component implementation (Phase 2, v0.3.0)
"

# Push tag
git push origin v0.2.1
```

---

## CHECKLIST DE INTEGRACIÓN

```
PRE-INTEGRATION:
□ Verify all 5 commits compila sin errores
□ Check links entre archivos (wireframes → ui_kit)
□ Verify Mermaid diagrams renderean
□ Proof-read: títulos, ejemplos, código blocks
□ Validate WCAG contrast ratios en colores
□ Cross-reference: skeleton_patterns ↔ wireframes

INTEGRATION:
□ git add DOCS/ui_kit.md wireframes.md skeleton_patterns.md search_command.md
□ git commit -m "commit 1" (con template arriba)
□ Repeat para commits 2-5
□ git tag -a v0.2.1 (con message arriba)
□ git push origin main v0.2.1

POST-INTEGRATION:
□ Verify tag exists: git tag -l | grep v0.2.1
□ Verify commits: git log --oneline -5
□ Verify files: git ls-files DOCS/
□ Verify tag message: git show v0.2.1
□ Update README.md (if needed) with v0.2.1 reference
□ Create GitHub Release con descripción completa

DOCUMENTATION:
□ Update CHANGELOG.md con v0.2.1
□ Add commit hashes a history log
□ Link to DOCS/ folder en README
□ Summary: Design System Kit completado
```

---

## ROADMAP POST-v0.2.1

```
┌────────────────────────────────────────────┐
│ PHASE 2: FEATURE IMPLEMENTATION (v0.3.0)  │
├────────────────────────────────────────────┤
│                                            │
│ Phase 2a: React Components Setup           │
│ ├─ Install shadcn/ui dependencies         │
│ ├─ Tailwind config with tokens            │
│ └─ Theme provider (dark mode)             │
│                                            │
│ Phase 2b: Base Components                 │
│ ├─ Button, Card, Badge, Dialog            │
│ ├─ Input, Command (search)                │
│ ├─ Skeleton (loading patterns)            │
│ └─ Toast (notifications)                  │
│                                            │
│ Phase 2c: Composite Components            │
│ ├─ MovieCard (todas las variantes)        │
│ ├─ Navbar (sticky, search, user menu)     │
│ ├─ Grid (responsiva, gap-6, gap-4)        │
│ └─ SearchCommand (full implementation)    │
│                                            │
│ Phase 2d: Pages                           │
│ ├─ Home (grids + categories)              │
│ ├─ DetailPage (modal + content)           │
│ ├─ SearchPage (results grid)              │
│ └─ Layout (wrapper + navbar)              │
│                                            │
│ Phase 2e: UX Polish & A11y                │
│ ├─ Keyboard navigation complete            │
│ ├─ Focus visible in all states            │
│ ├─ ARIA labels audit (automated)          │
│ ├─ Dark mode testing (real OLED)          │
│ └─ Performance optimization               │
│                                            │
│ Tag at completion: v0.3.0 (full features) │
│                                            │
└────────────────────────────────────────────┘
```

---

**Estado**: Plan completado  
**Siguiente paso**: Ejecutar commits 1-5 en orden  
**Timeline**: ~30 minutos para 5 commits + tag  
**Dependencias**: Todos los archivos DOCS/ ya existen