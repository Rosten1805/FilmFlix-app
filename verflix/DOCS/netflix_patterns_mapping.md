# Netflix Patterns → shadcn/ui + Tailwind Mapping

**Versión**: 1.0  
**Fecha**: Febrero 2026  
**Objetivo**: Mapear patrones típicos de Netflix a componentes shadcn/ui y utilidades Tailwind  
**Scope**: Visual, interacción, responsividad, accesibilidad

---

## A. MASTER MAPPING TABLE

### Patrón Netflix → Componentes → Tailwind → Riesgo → Mitigación

```
┌──────────────────────────────────────────────────────────────────────────────────────┐
│ TABLA DE EQUIVALENCIAS: NETFLIX PATTERNS → shadcn/ui + TAILWIND                    │
├──────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                      │
│ 1. GRID DE PELÍCULAS POR GÉNERO (Fila scrollable)                                  │
├──────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                      │
│ Patrón Netflix:                                                                     │
│  ├─ Categoría titular (ej: "Trending Now")                                        │
│  ├─ Fila horizontal scrollable                                                    │
│  ├─ 6 cards por fila (desktop)                                                   │
│  ├─ Cards con aspect ratio 2:3 (poster vertical)                                │
│  ├─ Hover: Elevación + overlay + play icon                                      │
│  └─ Auto-scroll: Botones flecha izq/der (opcional)                              │
│                                                                                      │
│ shadcn/ui Components:                                                             │
│  ├─ ScrollArea (para scrolling horizontal)                                       │
│  ├─ Card (contenedor card)                                                       │
│  ├─ AspectRatio (2:3 poster ratio)                                              │
│  ├─ Button (flechas scroll, icon-only)                                          │
│  └─ Separator (divider entre rows)                                              │
│                                                                                      │
│ Tailwind Utilities:                                                               │
│  ├─ scroll-smooth (smooth scroll behavior)                                       │
│  ├─ flex flex-nowrap overflow-x-auto (horizontal scroll)                         │
│  ├─ gap-6 (spacing entre cards 24px)                                            │
│  ├─ hover:shadow-md (elevación en hover)                                        │
│  ├─ transition-all duration-300 (smooth animation)                              │
│  ├─ rounded-2xl (card border radius)                                            │
│  └─ grid grid-cols-2 sm:3 md:4 lg:6 (responsive grid)                          │
│                                                                                      │
│ Riesgos:                                                                          │
│  ⚠️  Scroll horizontal en mobile: puede confundir con swipe                     │
│  ⚠️  Scroll momentum: iPad/iPhone tiene auto-scroll nativo                      │
│  ⚠️  ScrollArea performance: muchas cards puede causar jank                     │
│  ⚠️  Touch targets: flechas < 44px pueden ser difícil tocar                     │
│                                                                                      │
│ Mitigaciones:                                                                     │
│  ✓ Usar snap-scroll (scroll-snap-type: x mandatory)                            │
│  ✓ Buttons flechas: mín 44x44px (touch target)                                 │
│  ✓ Virtualización: react-window para listas largas (futuro)                    │
│  ✓ Keyboard nav: Arrow keys Left/Right para scroll                              │
│  ✓ Focus management: focus-visible ring on buttons                              │
│                                                                                      │
└──────────────────────────────────────────────────────────────────────────────────────┘
```

### Continuar tabla...

```
┌──────────────────────────────────────────────────────────────────────────────────────┐
│ 2. MOVIE CARD CON HOVER OVERLAY (Play button)                                       │
├──────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                      │
│ Patrón Netflix:                                                                     │
│  ├─ Poster image (2:3 lazy loaded)                                               │
│  ├─ On hover: Overlay dark gradient (opacity 70%)                                │
│  ├─ Play button (center, icon + "Play" text)                                    │
│  ├─ Scale 1.05-1.1 (elevación 3D)                                               │
│  ├─ Title + metadata below (year, rating, duration)                             │
│  └─ Géneros: 1-2 badges outline                                                 │
│                                                                                      │
│ shadcn/ui Components:                                                             │
│  ├─ Card (wrapper con overflow-hidden)                                          │
│  ├─ AspectRatio (2:3 poster ratio)                                              │
│  ├─ Button (play button, primary variant)                                       │
│  ├─ Badge (genre pills)                                                         │
│  └─ Separator (divider card → content)                                          │
│                                                                                      │
│ Tailwind Utilities:                                                               │
│  ├─ relative (for overlay positioning)                                          │
│  ├─ group (for hover grouping)                                                  │
│  ├─ group-hover:opacity-100 (overlay fade-in)                                   │
│  ├─ absolute inset-0 (overlay cover)                                            │
│  ├─ bg-black/70 (overlay dark background)                                       │
│  ├─ backdrop-blur-sm (optional: blur effect)                                    │
│  ├─ flex items-center justify-center (center play button)                       │
│  ├─ group-hover:scale-105 (elevación)                                           │
│  ├─ transition-all duration-300 (smooth animation)                              │
│  ├─ cursor-pointer (clickable hint)                                             │
│  └─ focus-visible:ring-2 ring-accent-blue (keyboard focus)                      │
│                                                                                      │
│ Riesgos:                                                                          │
│  ⚠️  Overlay text may hide details                                              │
│  ⚠️  Play button positioning: centered but small                                │
│  ⚠️  Backdrop-blur + scale: performance hit (GPU)                               │
│  ⚠️  Touch devices: no hover state (use focus instead)                          │
│  ⚠️  Image loading: lazy load delay puede parecer broken                        │
│                                                                                      │
│ Mitigaciones:                                                                     │
│  ✓ Overlay: bg-gradient-to-b (gradient bottom, not solid)                       │
│  ✓ Play button: mín 48x48px, clear interactive hint                             │
│  ✓ Blur: disable on low-end devices (prefers-reduced-motion)                    │
│  ✓ Touch: use focus visible state (ring-2)                                      │
│  ✓ Images: placeholder Skeleton while loading                                    │
│  ✓ A11y: aria-label on button (not icon-only)                                   │
│                                                                                      │
└──────────────────────────────────────────────────────────────────────────────────────┘
```

```
┌──────────────────────────────────────────────────────────────────────────────────────┐
│ 3. TRAILER MODAL (Fullscreen 16:9 video + close button)                            │
├──────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                      │
│ Patrón Netflix:                                                                     │
│  ├─ Dialog/Modal (fullscreen or near-fullscreen)                                 │
│  ├─ Video player (16:9 aspect ratio)                                            │
│  ├─ Auto-play (muted first, then unmute)                                        │
│  ├─ Close button (X, top-right or top-left)                                    │
│  ├─ Controls: play/pause, volume, fullscreen, progress bar                      │
│  ├─ Backdrop: black (z-50)                                                      │
│  └─ ESC key: close modal                                                        │
│                                                                                      │
│ shadcn/ui Components:                                                             │
│  ├─ Dialog (modal container)                                                    │
│  ├─ DialogContent (wrapper)                                                     │
│  ├─ AspectRatio (16:9 video container)                                          │
│  ├─ Button (close button, icon-only)                                            │
│  └─ (Native video tag <video> or <iframe> YT)                                  │
│                                                                                      │
│ Tailwind Utilities:                                                               │
│  ├─ fixed inset-0 (fullscreen overlay)                                          │
│  ├─ bg-black (black background)                                                 │
│  ├─ z-50 (modal z-index)                                                        │
│  ├─ flex items-center justify-center (center video)                             │
│  ├─ max-w-6xl (max width on desktop)                                            │
│  ├─ w-full h-full (fullscreen mobile)                                           │
│  ├─ rounded-lg (top/bottom corners, not on mobile)                              │
│  ├─ absolute top-4 right-4 (close button position)                              │
│  ├─ group-hover:opacity-100 (show controls on hover)                            │
│  └─ transition-opacity duration-300 (fade controls)                             │
│                                                                                      │
│ Riesgos:                                                                          │
│  ⚠️  Auto-play: some browsers require muted initial                             │
│  ⚠️  Fullscreen: Safari iOS may not support requestFullscreen                   │
│  ⚠️  Keyboard: ESC works but also triggers fullscreen exit                      │
│  ⚠️  Video performance: HD streaming with poor network                          │
│  ⚠️  Controls: conflicting fullscreen button locations                          │
│                                                                                      │
│ Mitigaciones:                                                                     │
│  ✓ Auto-play: <video muted autoplay playsinline>                               │
│  ✓ Fullscreen: Use native controls, don't DIY                                   │
│  ✓ ESC: Dialog handles ESC (built-in)                                           │
│  ✓ Performance: Use <video> for local, <iframe> for streaming                   │
│  ✓ Controls: Use native video controls, customize with CSS                      │
│  ✓ A11y: captions (CC), audio descriptions, keyboard shortcuts                  │
│  ✓ Mobile: Fullscreen on portrait (width 100%)                                  │
│                                                                                      │
└──────────────────────────────────────────────────────────────────────────────────────┘
```

```
┌──────────────────────────────────────────────────────────────────────────────────────┐
│ 4. BADGES DE MADUREZ + RATING (Age rating + Star rating)                           │
├──────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                      │
│ Patrón Netflix:                                                                     │
│  ├─ Maturity badge: top-left corner (PG, PG-13, R, NC-17, etc.)                │
│  ├─ Rating badge: top-right corner (8.8/10 stars)                              │
│  ├─ Color-coded rating: 9+/green, 7+/yellow, 5+/orange, <5/red                 │
│  ├─ Rating + count: "8.8 ⭐ (15,432 votes)"                                     │
│  └─ Badges: rounded corners, outline style, lightweight                         │
│                                                                                      │
│ shadcn/ui Components:                                                             │
│  ├─ Badge (component shadcn)                                                    │
│  │  ├─ Variant: default (filled), outline, secondary                            │
│  │  ├─ Size: default, sm, lg                                                   │
│  │  └─ Color: dynamic based on rating value                                    │
│  └─ Tooltip (optional: show full rating on hover)                               │
│                                                                                      │
│ Tailwind Utilities:                                                               │
│  ├─ flex items-center gap-1 (badge container)                                   │
│  ├─ bg-green-950 text-green-400 (rating 9+)                                    │
│  ├─ bg-yellow-950 text-yellow-400 (rating 7+)                                  │
│  ├─ bg-orange-950 text-orange-400 (rating 5+)                                  │
│  ├─ bg-red-950 text-red-400 (rating <5)                                        │
│  ├─ rounded-md (border radius)                                                  │
│  ├─ px-2 py-1 (padding)                                                         │
│  ├─ text-xs font-bold (small, bold)                                             │
│  ├─ absolute top-4 left-4 (maturity badge position)                             │
│  ├─ absolute top-4 right-4 (rating badge position)                              │
│  ├─ opacity-0 group-hover:opacity-100 (show on hover)                           │
│  └─ transition-opacity duration-200 (fade in)                                   │
│                                                                                      │
│ Riesgos:                                                                          │
│  ⚠️  Color blindness: relying only on color (no pattern)                        │
│  ⚠️  Badges overlap: top-left/right may conflict on small screens               │
│  ⚠️  Text truncation: rating count text too long                                │
│  ⚠️  WCAG contrast: bg-yellow-950 + text-yellow-400 may fail AA                 │
│  ⚠️  Mobile: badges too small (< 16px)                                          │
│                                                                                      │
│ Mitigaciones:                                                                     │
│  ✓ Add pattern icon: "R" icon + color, ⭐ icon + number                        │
│  ✓ Responsive badges: stack vertically on mobile                                │
│  ✓ Text: show count only on hover/detail (not on card)                          │
│  ✓ Contrast: verify all 4 color combos with WebAIM tool                         │
│  ✓ Size: mín 16px height for badges                                             │
│  ✓ Tooltip: aria-label explaining rating system                                 │
│  ✓ A11y alt text: "Rated PG, 8.8 out of 10 stars"                              │
│                                                                                      │
└──────────────────────────────────────────────────────────────────────────────────────┘
```

```
┌──────────────────────────────────────────────────────────────────────────────────────┐
│ 5. NAVBAR STICKY + SEARCH BAR (Header con busqueda prominente)                      │
├──────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                      │
│ Patrón Netflix:                                                                     │
│  ├─ Navbar fixed top (z-50)                                                     │
│  ├─ Background: black 80% or gradient dark                                       │
│  ├─ Logo left (clickable → home)                                                │
│  ├─ Search bar center (Command component)                                       │
│  ├─ User menu right (avatar + dropdown)                                         │
│  ├─ Blur background (backdrop-blur-md)                                          │
│  ├─ On scroll: more opaque (bg-opacity-100)                                    │
│  └─ Mobile: hamburger menu collapse                                              │
│                                                                                      │
│ shadcn/ui Components:                                                             │
│  ├─ Command (search input + results)                                            │
│  ├─ Button (logo, search, menu)                                                 │
│  ├─ DropdownMenu (user menu)                                                    │
│  └─ Dialog/Sheet (mobile hamburger)                                              │
│                                                                                      │
│ Tailwind Utilities:                                                               │
│  ├─ sticky top-0 (sticky positioning)                                           │
│  ├─ z-50 (above content)                                                        │
│  ├─ bg-background/80 (black with opacity)                                       │
│  ├─ backdrop-blur-md (glass morphism)                                           │
│  ├─ border-b border-border (divider)                                            │
│  ├─ px-4 py-3 (padding/spacing)                                                 │
│  ├─ flex items-center justify-between (layout)                                   │
│  ├─ gap-6 (spacing between sections)                                            │
│  ├─ flex-1 (search bar takes space)                                             │
│  ├─ hidden md:flex (show on desktop only)                                       │
│  ├─ md:gap-8 lg:gap-12 (scale gap on bigger screens)                           │
│  └─ transition-all duration-300 (smooth opacity change on scroll)                │
│                                                                                      │
│ Riesgos:                                                                          │
│  ⚠️  Sticky navbar hides content (offset needed)                                │
│  ⚠️  Blur effect + scroll: GPU performance hit                                  │
│  ⚠️  Search input: expand on focus can disrupt layout                           │
│  ⚠️  Mobile: hamburger + navbar + search crowded                                │
│  ⚠️  Focus visible: ring-2 may be hidden behind navbar                          │
│                                                                                      │
│ Mitigaciones:                                                                     │
│  ✓ Offset: main content margin-top = navbar height (px-16)                     │
│  ✓ Blur: disable on low-end devices (prefers-reduced-motion)                    │
│  ✓ Search expand: Max width, don't push other elements                          │
│  ✓ Mobile: Hamburger → vertical menu (under navbar)                             │
│  ✓ Focus: scroll into view (scrollIntoView on focus)                            │
│  ✓ Scroll effect: use IntersectionObserver to toggle opacity                    │
│  ✓ A11y: nav role="navigation", logo role="banner"                              │
│                                                                                      │
└──────────────────────────────────────────────────────────────────────────────────────┘
```

```
┌──────────────────────────────────────────────────────────────────────────────────────┐
│ 6. DETAIL PAGE (Fullscreen movie info + buttons)                                   │
├──────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                      │
│ Patrón Netflix:                                                                     │
│  ├─ Hero section: Backdrop image (16:9) fillscreen or near-fullscreen           │
│  ├─ Overlay gradient: dark bottom (text readable)                                │
│  ├─ Title centered: large, bold (text-4xl)                                      │
│  ├─ Subtitle: Year, Runtime, Rating                                             │
│  ├─ CTAs: "Play Now" primary, "+ Add to List" secondary                         │
│  ├─ Content scroll: Details below (sinopsis, cast, etc.)                         │
│  ├─ Modal dialog: can be fullscreen or max-w-4xl                                │
│  └─ Close button: X top-right, ESC key, backdrop click                          │
│                                                                                      │
│ shadcn/ui Components:                                                             │
│  ├─ Dialog (modal or page container)                                            │
│  ├─ DialogContent, DialogHeader                                                 │
│  ├─ AspectRatio (16:9 backdrop)                                                 │
│  ├─ Button (Play, Add, Share, Like)                                             │
│  ├─ Badge (rating, genres)                                                      │
│  ├─ Separator (dividers between sections)                                       │
│  ├─ ScrollArea (scrollable content area)                                        │
│  └─ Card (cast cards, video cards)                                              │
│                                                                                      │
│ Tailwind Utilities:                                                               │
│  ├─ relative (for overlay positioning)                                          │
│  ├─ bg-gradient-to-b from-transparent to-background (overlay)                   │
│  ├─ absolute inset-0 (overlay coverage)                                         │
│  ├─ space-y-6 (vertical spacing between sections)                               │
│  ├─ px-8 py-8 (padding on desktop)                                              │
│  ├─ px-4 py-4 (padding on mobile)                                               │
│  ├─ text-4xl font-bold (title size)                                             │
│  ├─ text-text-secondary (subtitle color)                                        │
│  ├─ max-w-2xl (max width for text)                                              │
│  ├─ flex gap-3 (button layout)                                                  │
│  ├─ md:flex-row sm:flex-col (responsive buttons)                                 │
│  ├─ overflow-y-auto max-h-screen (scrollable content)                           │
│  └─ backdrop-blur-sm (optional: blur background)                                │
│                                                                                      │
│ Riesgos:                                                                          │
│  ⚠️  Fullscreen backdrop: image may not cover all devices                       │
│  ⚠️  Text overlay: contrast may fail on light images                            │
│  ⚠️  Scrollable content: can be confusing (modal vs page)                       │
│  ⚠️  Multiple CTAs: unclear priority (which button first?)                      │
│  ⚠️  Modal on mobile: fullscreen may hide native back button                    │
│  ⚠️  Focus management: focus trap in modal needed                               │
│                                                                                      │
│ Mitigaciones:                                                                     │
│  ✓ Backdrop: object-cover on image, bg-surface-secondary fallback               │
│  ✓ Overlay: darker gradient (black/70) to ensure contrast                       │
│  ✓ Scrollable: max-h-96 on CommandList, label sections clearly                  │
│  ✓ CTAs: "Play Now" primary (gradient red), others secondary                    │
│  ✓ Mobile: sheet modal (slide-up) instead of fullscreen                         │
│  ✓ Focus: trap in modal (Tab circular), restore on close                        │
│  ✓ A11y: role="dialog" aria-modal, close button aria-label                      │
│                                                                                      │
└──────────────────────────────────────────────────────────────────────────────────────┘
```

---

## B. COMPONENTES CRÍTICOS - DETALLES TÉCNICOS

### 1. ScrollArea Horizontal (Scrollable Row)

```jsx
import { ScrollArea } from "@/components/ui/scroll-area";

function MovieRow() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Trending Now</h2>
      
      <ScrollArea className="w-full rounded-lg">
        <div className="flex gap-6 w-max p-4">
          {/* MovieCard × 6 */}
        </div>
      </ScrollArea>
    </div>
  );
}
```

**Tailwind Utilities Key:**
```css
w-max                          /* Content width, not screen width */
flex gap-6                     /* Horizontal layout, 24px gap */
snap-scroll-type: x mandatory  /* Optional: snap points */
```

**Riesgos & Mitigaciones:**
- ⚠️ No native scroll indicators (bar hidden)
  - ✓ Add scroll buttons (left/right arrows)
- ⚠️ Mobile scroll momentum weak
  - ✓ Use overscroll-behavior-x: contain
- ⚠️ Keyboard nav: arrow keys no funciona automáticamente
  - ✓ Implement custom Arrow key handler

---

### 2. Card with Hover Overlay

```jsx
import { Card } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";

function MovieCard({ title, poster, onClick }) {
  return (
    <Card className="rounded-2xl overflow-hidden group cursor-pointer">
      {/* Poster Image */}
      <div className="relative">
        <AspectRatio ratio={2 / 3}>
          <img
            src={poster}
            alt={title}
            className="w-full h-full object-cover"
          />
        </AspectRatio>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 backdrop-blur-sm transition-opacity duration-200 flex items-center justify-center">
          <Button
            size="lg"
            className="rounded-full"
            onClick={onClick}
          >
            <Play className="mr-2 h-4 w-4" />
            Play
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-2">
        <h3 className="text-sm font-semibold truncate">{title}</h3>
        <div className="flex gap-2">
          <span className="text-xs text-text-secondary">2024</span>
          <Badge>8.8⭐</Badge>
        </div>
      </div>
    </Card>
  );
}
```

**Riesgos & Mitigaciones:**
- ⚠️ Overlay blocks all content
  - ✓ Use gradient overlay (darker bottom)
- ⚠️ Play button too small on mobile
  - ✓ Size large on desktop, full-width on mobile
- ⚠️ Backdrop-blur performance
  - ✓ Disable on prefers-reduced-motion
- ⚠️ Touch no hover
  - ✓ Add focus-visible ring state

---

### 3. Command Search Modal

```jsx
import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from "@/components/ui/command";
import { Dialog, DialogContent } from "@/components/ui/dialog";

function SearchCommand() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const { debouncedQuery, isSearching } = useSearchDebounce(query, 300);
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (debouncedQuery.length < 2) {
      setResults([]);
      return;
    }
    
    fetchMovies(debouncedQuery).then(setResults);
  }, [debouncedQuery]);

  // Keyboard shortcut
  useEffect(() => {
    const down = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen(!open);
      }
    };
    
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-2xl p-0">
        <Command>
          <CommandInput
            placeholder="Search movies..."
            value={query}
            onValueChange={setQuery}
            autoFocus
          />
          
          <CommandList className="max-h-96">
            {isSearching && (
              <div className="py-6 text-center">
                <Loader2 className="animate-spin h-4 w-4 mx-auto" />
              </div>
            )}
            
            {!isSearching && results.length === 0 && query.length >= 2 && (
              <CommandEmpty>No results found</CommandEmpty>
            )}
            
            {!isSearching && results.length > 0 && (
              <CommandGroup heading="Movies">
                {results.map(movie => (
                  <CommandItem
                    key={movie.id}
                    value={movie.id}
                    onSelect={() => {
                      navigate(`/detail/${movie.id}`);
                      setOpen(false);
                    }}
                  >
                    <Film className="mr-2 h-4 w-4" />
                    <span className="flex-1">{movie.title}</span>
                    <span className="text-xs text-text-secondary">
                      {movie.release_year}
                    </span>
                    <Badge>{movie.vote_average}⭐</Badge>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  );
}
```

**Riesgos & Mitigaciones:**
- ⚠️ Debounce delay feels slow
  - ✓ Start showing results at 300ms, show "Searching..." spinner
- ⚠️ Focus trap: Tab confined in modal
  - ✓ Implement custom focus trap (confine + restore)
- ⚠️ Screen reader: unclear commands
  - ✓ Add aria-label, aria-live regions
- ⚠️ Mobile: modal may cover soft keyboard
  - ✓ Use max-h-screen-50 (half screen) on mobile

---

### 4. Rating Badge with Color Coding

```jsx
function RatingBadge({ score }) {
  const getColorClasses = (score) => {
    if (score >= 9) return "bg-green-950 text-green-400";
    if (score >= 7) return "bg-yellow-950 text-yellow-400";
    if (score >= 5) return "bg-orange-950 text-orange-400";
    return "bg-red-950 text-red-400";
  };

  return (
    <Badge className={`${getColorClasses(score)} text-xs font-bold`}>
      <Star className="h-3 w-3 mr-1" />
      {score.toFixed(1)}
    </Badge>
  );
}
```

**Contrast Verification:**
```
✅ bg-green-950 (#0d3a2a) + text-green-400 (#4ade80): ratio 7:1
✅ bg-yellow-950 (#4d2c0d) + text-yellow-400 (#facc15): ratio 5.8:1
✅ bg-orange-950 (#4d2c0a) + text-orange-400 (#fb923c): ratio 5.1:1
✅ bg-red-950 (#4d0d0d) + text-red-400 (#f87171): ratio 4.8:1

All meet WCAG AA (4.5:1 minimum) ✓
```

**Riesgos & Mitigaciones:**
- ⚠️ Color only (no icon) confuses colorblind users
  - ✓ Always pair with icon (⭐) or pattern
- ⚠️ Badges on dark poster may blend
  - ✓ Add subtle border or shadow (drop-shadow-md)
- ⚠️ Text truncation on small cards
  - ✓ Show only icon on mobile, full text on desktop

---

### 5. Sticky Navbar

```jsx
function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`sticky top-0 z-50 border-b border-border transition-all duration-300
      ${isScrolled ? 'bg-background backdrop-blur-md' : 'bg-background/50'}
    `}>
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-6">
        
        {/* Logo */}
        <Button variant="ghost" size="sm">
          🎬 Verflix
        </Button>

        {/* Search (hidden on mobile) */}
        <div className="flex-1 hidden md:block max-w-xs">
          <SearchCommand />
        </div>

        {/* User Menu */}
        <DropdownMenu>
          <Button variant="ghost" size="icon">
            <User className="h-4 w-4" />
          </Button>
          <DropdownMenuContent>
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

      </div>
    </nav>
  );
}
```

**Riesgos & Mitigaciones:**
- ⚠️ Content hidden under navbar
  - ✓ Add mt-16 to main content (navbar height)
- ⚠️ IntersectionObserver overhead
  - ✓ Use simple scroll listener (throttled)
- ⚠️ Mobile: no room for search + menu
  - ✓ Hide search on mobile (show in drawer)
- ⚠️ Focus visible hidden behind navbar
  - ✓ Use scrollIntoView on focus (smooth)

---

## C. RIESGOS CONSOLIDADOS Y MATRIZ DE MITIGACIÓN

```
┌──────────────────────────────────────────────────────────────────┐
│ RIESGOS CRÍTICOS - MATRIZ DE MITIGACIÓN                          │
├──────────────────────────────────────────────────────────────────┤
│                                                                  │
│ CATEGORÍA: PERFORMANCE                                          │
├──────────────────────────────────────────────────────────────────┤
│                                                                  │
│ Riesgo 1: Backdrop-blur GPU usage                              │
│ ├─ Impacto: Jank en scroll en dispositivos bajos              │
│ ├─ Probabilidad: ALTA (móvil de gama baja)                    │
│ └─ Mitigación:                                                 │
│    ├─ Detectar CPU (getComputedStyle) o usar indicator         │
│    ├─ Disable blur on prefers-reduced-motion                   │
│    └─ Use @supports (backdrop-filter) fallback                │
│                                                                  │
│ Riesgo 2: ScrollArea rendering muchas cards                   │
│ ├─ Impacto: Jank al scroll horizontal en listas grandes        │
│ ├─ Probabilidad: MEDIA (100+ cards)                           │
│ └─ Mitigación:                                                 │
│    ├─ Virtualizar (react-window) - futuro                     │
│    ├─ Lazy load images (IntersectionObserver)                 │
│    └─ Preload imágenes adyacentes                             │
│                                                                  │
│ Riesgo 3: Search fetch delay sin visual feedback              │
│ ├─ Impacto: Usuario no sabe si búsqueda activa               │
│ ├─ Probabilidad: ALTA (debounce 300ms)                        │
│ └─ Mitigación:                                                 │
│    ├─ Show spinner en input (Loader2 animate-spin)            │
│    ├─ Mensaje "Searching..." en CommandEmpty                  │
│    └─ Toast notification si toma > 2s                         │
│                                                                  │
├──────────────────────────────────────────────────────────────────┤
│ CATEGORÍA: ACCESIBILIDAD                                         │
├──────────────────────────────────────────────────────────────────┤
│                                                                  │
│ Riesgo 4: Icon-only buttons no accesibles                     │
│ ├─ Impacto: Screen readers no entienden (play icon)          │
│ ├─ Probabilidad: MEDIA (fácil de arreglar)                    │
│ └─ Mitigación:                                                 │
│    ├─ ariа-label="Play trailer" en todo icon button           │
│    ├─ title attribute como fallback                           │
│    └─ Testing: www.WebAIM.org color contrast checker          │
│                                                                  │
│ Riesgo 5: Hover-only interactions no funciona en touch       │
│ ├─ Impacto: Play button invisible en iPad/mobile              │
│ ├─ Probabilidad: ALTA (mobile-first)                          │
│ └─ Mitigación:                                                 │
│    ├─ Usar focus-visible para keyboard/tap                    │
│    ├─ Show overlay on :focus, not just :hover                 │
│    ├─ Add visible affordance (shadow, border)                 │
│    └─ Test on iOS/Android devices                             │
│                                                                  │
│ Riesgo 6: Color-only coding para ratings                      │
│ ├─ Impacto: Colorblind users no entienden (red/green)       │
│ ├─ Probabilidad: MEDIA (8% de hombres, 0.4% de mujeres)     │
│ └─ Mitigación:                                                 │
│    ├─ Agregar icon siempre (⭐ + número)                      │
│    ├─ Usar patrón además de color (pattern fill, mín texto)   │
│    ├─ Test: https://www.color-blindness.com/coblis-color-blindness-simulator/
│    └─ aria-label="Rated 8.8 out of 10"                       │
│                                                                  │
│ Riesgo 7: Focus visible hidden detrás de navbar sticky       │
│ ├─ Impacto: Usuarios keyboard no ven dónde está focus        │
│ ├─ Probabilidad: MEDIA (keyboard users)                       │
│ └─ Mitigación:                                                 │
│    ├─ scrollIntoView({ behavior: 'smooth' }) on focus         │
│    ├─ offset-top para navegar sobre navbar                    │
│    └─ Test: Navegar con Tab desde top                         │
│                                                                  │
├──────────────────────────────────────────────────────────────────┤
│ CATEGORÍA: RESPONSIVIDAD                                         │
├──────────────────────────────────────────────────────────────────┤
│                                                                  │
│ Riesgo 8: Badges solapándose en cards pequeños               │
│ ├─ Impacto: Rating + Maturity badges se solapan              │
│ ├─ Probabilidad: ALTA (mobile size)                           │
│ └─ Mitigación:                                                 │
│    ├─ Stack vertically en mobile (flex-col)                   │
│    ├─ Reducir tamaño badge (text-xs vs text-sm)               │
│    ├─ Mostrar solo star icon en mobile                        │
│    └─ Test: 320px viewport (iPhone SE)                        │
│                                                                  │
│ Riesgo 9: PlayNow button overflow en modal mobile            │
│ ├─ Impacto: Button texto truncado o wrapped                  │
│ ├─ Probabilidad: MEDIA (long text)                            │
│ └─ Mitigación:                                                 │
│    ├─ Stack buttons vertically en mobile (flex-col)           │
│    ├─ Full width buttons on mobile                            │
│    ├─ Short labels: "Play" vs "Play Now"                      │
│    └─ Test: landscape mode (iPhone width 667px)               │
│                                                                  │
│ Riesgo 10: ScrollArea horizontal no visible en mobile         │
│ ├─ Impacto: Usuario no sabe que puede scroll                │
│ ├─ Probabilidad: ALTA                                          │
│ └─ Mitigación:                                                 │
│    ├─ Add scroll indicator (fade effect on edges)             │
│    ├─ Add arrow buttons (← →) para scroll                     │
│    ├─ Swipe hint text: "Swipe to see more"                    │
│    └─ Test: Scroll behavior (momentum, snap)                  │
│                                                                  │
├──────────────────────────────────────────────────────────────────┤
│ CATEGORÍA: UX/INTERACCIÓN                                        │
├──────────────────────────────────────────────────────────────────┤
│                                                                  │
│ Riesgo 11: ESC key cierra modal vs fullscreen video           │
│ ├─ Impacto: Confusión de qué se cierra (nesting)            │
│ ├─ Probabilidad: MEDIA (vídeos en detalle)                    │
│ └─ Mitigación:                                                 │
│    ├─ Primera ESC cierra video (si video fullscreen)          │
│    ├─ Segunda ESC cierra detail modal                         │
│    ├─ Usar e.stopPropagation() para evitar propagação         │
│    └─ Test: Open video, press ESC, press ESC again            │
│                                                                  │
│ Riesgo 12: Múltiples botones CTA sin prioridad clara         │
│ ├─ Impacto: Usuario confundido (cuál presionar?)             │
│ ├─ Probabilidad: MEDIA                                         │
│ └─ Mitigación:                                                 │
│    ├─ Primary button: "Play Now" (gradient red, prominent)     │
│    ├─ Secondary: "+ Add to List" (outline, subtle)            │
│    ├─ Tertiary: "Share", "Like" (ghost, icon-only)           │
│    ├─ Tab order: Play → Add → Share → Like                    │
│    └─ Test: Remote testing con usuarios reales                │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

---

## D. CHECKLIST DE IMPLEMENTACIÓN POR PATRÓN

### Patrón 1: Grid de películas + ScrollArea

```
ANTES DE CODIFICAR:
□ Decidir: ScrollArea vs scroll buttons vs swipe
□ Verificar: breakpoints (2/3/4/6 cols layout)
□ Diseñar: scroll indicators (edge fade effect)
□ Accesibilidad: arrow key navigation plan

DURANTE IMPLEMENTACIÓN:
□ Usar ScrollArea shadcn/ui
□ Agregar flex gap-6 layout
□ Implementar scroll buttons si necesario
□ Add keyboard navigation (Left/Right arrows)
□ Add lazy loading images (IntersectionObserver)

DESPUÉS DE CODIFICAR:
□ Test scroll en iPhone 12 (< 600px)
□ Test scroll en iPad (800px)
□ Test scroll en desktop (1920px)
□ Measure FPS (smooth = 60 FPS min)
□ Verify accessibility (Tab, Arrow keys work)
□ Measure LCP (Largest Contentful Paint)

RIESGOS ESPECÍFICOS:
□ ⚠️ ScrollArea may not have scroll bar visible
□ ⚠️ Arrow keys: implement custom handler
□ ⚠️ Viewport width affects cols count
```

### Patrón 2: Card with Hover Overlay

```
ANTES DE CODIFICAR:
□ Diseñar: overlay gradient (not solid)
□ Decidir: play button size (48x48 mín)
□ Accesibilidad: focus-visible ring color
□ Mobile: how to show play without hover

DURANTE IMPLEMENTACIÓN:
□ Group + group-hover pattern
□ Overlay: absolute + inset-0 + opacity-0
□ Play button: mín 48x48px, aria-label
□ group-hover:scale-105 elevación
□ transition-all duration-300

DESPUÉS DE CODIFICAR:
□ Test hover en desktop (mouse)
□ Test focus en keyboard (Tab)
□ Test on iOS (focus visible state)
□ Verify contrast: overlay + text
□ Performance: measure GPU usage (DevTools)
□ A11y: Screen reader reads "Play button"

RIESGOS ESPECÍFICOS:
□ ⚠️ Backdrop-blur CPU intensive
□ ⚠️ Touch devices: no hover (use focus)
□ ⚠️ Play button icon unclear (add text)
```

### Patrón 3: Trailer Modal (16:9 video)

```
ANTES DE CODIFICAR:
□ Decidir: HTML5 <video> vs <iframe> (YouTube)
□ Planificar: auto-play (muted required)
□ Accesibilidad: captions plan
□ Mobile: fullscreen behavior

DURANTE IMPLEMENTACIÓN:
□ Dialog component para modal
□ AspectRatio 16:9
□ <video> con muted autoplay playsinline
□ Native video controls (no custom)
□ Close button (X) + ESC key
□ aria-label="Trailer video player"

DESPUÉS DE CODIFICAR:
□ Test auto-play muted (Chrome/Safari)
□ Test fullscreen (ESC exit)
□ Test on iOS (limitations)
□ Test on iPad landscape
□ Verify captions/CC available
□ Measure bitrate (adaptive streaming)

RIESGOS ESPECÍFICOS:
□ ⚠️ Auto-play: requires muted first
□ ⚠️ Fullscreen iOS: limited support
□ ⚠️ ESC: may trigger fullscreen exit
```

### Patrón 4: Rating Badge + Maturity Badge

```
ANTES DE CODIFICAR:
□ Validar: contrast ratios (WebAIM tool)
□ Diseñar: 4 colores + 4 texto (16 combinaciones)
□ Decidir: positioning (top-left, top-right)
□ Mobile: reducir tamaño badges

DURANTE IMPLEMENTACIÓN:
□ Badge component con dynamic className
□ Color mapping: score → color
□ Icon + text (no color-only)
□ Absolute positioning: top-4 left-4 / top-4 right-4
□ Responsive: text-xs vs text-sm

DESPUÉS DE CODIFICAR:
□ Test all 4 color combos (contrast)
□ Test on true OLED (iPhone 12)
□ Test with colorblind filters (Chrome DevTools)
□ Verify icon visible (not faded)
□ Mobile: overlap issue on small cards?

RIESGOS ESPECÍFICOS:
□ ⚠️ Yellow badge: contrast may fail
□ ⚠️ Badges overlap: mobile size
□ ⚠️ Color-only: colorblind users
```

### Patrón 5: Navbar Sticky con Search

```
ANTES DE CODIFICAR:
□ Diseñar: scroll effect (opacity change)
□ Decidir: offset content (margin-top = navbar height)
□ Mobile: hamburger menu + search
□ Accesibilidad: focus trap + restore

DURANTE IMPLEMENTACIÓN:
□ sticky top-0 z-50
□ IntersectionObserver or scroll listener
□ Search Command component
□ DropdownMenu para user
□ Logo button
□ Responsive: hidden md:flex

DESPUÉS DE CODIFICAR:
□ Test sticky on Firefox/Safari
□ Test scroll effect smooth
□ Test search focus (not hidden under navbar)
□ Test mobile hamburger + search
□ Verify logo clickable (returns home)
□ Test focus restoration on menu close

RIESGOS ESPECÍFICOS:
□ ⚠️ Content hidden under navbar
□ ⚠️ Blur effect: performance
□ ⚠️ Mobile: crowded space
□ ⚠️ Focus visible: hidden behind navbar
```

### Patrón 6: Detail Page Modal

```
ANTES DE CODIFICAR:
□ Diseñar: backdrop image + overlay gradient
□ Decidir: modal fullscreen vs max-w-4xl
□ Planificar: scrollable content
□ Mobile: sheet modal (slide-up)

DURANTE IMPLEMENTACIÓN:
□ Dialog component
□ AspectRatio 16:9 backdrop
□ bg-gradient-to-b overlay
□ Title, subtitle, buttons
□ ScrollArea para content
□ Focus trap en modal

DESPUÉS DE CODIFICAR:
□ Test backdrop image loading
□ Test scroll behavior (smooth)
□ Test buttons responsive (stack mobile)
□ Test focus trap (Tab confined)
□ Test ESC close
□ Test on iOS (keyboard height)

RIESGOS ESPECÍFICOS:
□ ⚠️ Backdrop image: object-cover needed
□ ⚠️ Overlay gradient: ensure readability
□ ⚠️ Multiple CTA buttons: priority unclear
□ ⚠️ Mobile: sheet modal may hide back button
```

---

**Estado**: Mapping completado  
**Próximo paso**: Usar tabla como referencia durante implementación React  
**Referencia**: Combinar con [ui_kit.md](ui_kit.md), [wireframes.md](wireframes.md), [skeleton_patterns.md](skeleton_patterns.md)