# FilmFlix Design System Specification

## 📋 Table of Contents
1. [Design System Overview](#design-system-overview)
2. [Design Tokens](#design-tokens)
3. [Component Catalog](#component-catalog)
4. [Component States](#component-states)
5. [Component Variants](#component-variants)
6. [Accessibility Rules](#accessibility-rules)
7. [Responsive Breakpoints](#responsive-breakpoints)

---

## 🎨 Design System Overview

### Philosophy
- **Dark-first**: Optimizado para visualización nocturna de contenido
- **Content-focused**: El contenido multimedia es el protagonista
- **Glassmorphism**: Efectos de blur y transparencias sutiles
- **Smooth animations**: Transiciones fluidas para mejorar UX

### Visual Language
- **Estética**: Netflix-inspired con toques modernos
- **Jerarquía**: Clara separación entre contenido primario/secundario
- **Interactividad**: Feedback inmediato en todas las interacciones
- **Performance**: Animaciones optimizadas con GPU acceleration

---

## 🎯 Design Tokens

### Color Palette

#### Background Colors
```
bg-primary:         #0b0b0f    // Fondo principal (casi negro)
bg-secondary:       #11131a    // Superficies elevadas
bg-tertiary:        #151827    // Cards y containers
bg-overlay:         #1a1d2e    // Modals y dropdowns
bg-glass:           rgba(17, 19, 26, 0.8)  // Glassmorphism
```

#### Text Colors
```
text-primary:       #f2f2f7    // Texto principal (blanco roto)
text-secondary:     #a1a1aa    // Texto secundario (zinc-400)
text-tertiary:      #71717a    // Texto terciario (zinc-500)
text-disabled:      #52525b    // Texto deshabilitado (zinc-600)
text-inverse:       #18181b    // Texto sobre fondos claros
```

#### Accent Colors
```
accent-primary:     #a855f7    // Púrpura (purple-500)
accent-secondary:   #ec4899    // Rosa (pink-500)
accent-success:     #22c55e    // Verde (green-500)
accent-warning:     #f59e0b    // Amarillo (amber-500)
accent-error:       #ef4444    // Rojo (red-500)
accent-info:        #3b82f6    // Azul (blue-500)
```

#### Border Colors
```
border-primary:     #27272a    // Bordes principales (zinc-800)
border-secondary:   #3f3f46    // Bordes secundarios (zinc-700)
border-focus:       #a855f7    // Bordes en focus (purple-500)
border-hover:       #52525b    // Bordes en hover (zinc-600)
```

#### Gradient Colors
```
gradient-primary:   linear-gradient(135deg, #a855f7 0%, #ec4899 100%)
gradient-hero:      linear-gradient(90deg, rgba(11,11,15,0.95) 0%, rgba(11,11,15,0) 100%)
gradient-overlay:   linear-gradient(180deg, transparent 0%, rgba(11,11,15,0.9) 100%)
gradient-shimmer:   linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)
```

### Typography

#### Font Families
```
font-sans:          'Geist', -apple-system, system-ui, sans-serif
font-mono:          'Geist Mono', 'Monaco', monospace
```

#### Font Sizes
```
text-xs:            0.75rem     // 12px
text-sm:            0.875rem    // 14px
text-base:          1rem        // 16px
text-lg:            1.125rem    // 18px
text-xl:            1.25rem     // 20px
text-2xl:           1.5rem      // 24px
text-3xl:           1.875rem    // 30px
text-4xl:           2.25rem     // 36px
text-5xl:           3rem        // 48px
text-6xl:           3.75rem     // 60px
```

#### Font Weights
```
font-light:         300
font-normal:        400
font-medium:        500
font-semibold:      600
font-bold:          700
```

#### Line Heights
```
leading-tight:      1.25
leading-snug:       1.375
leading-normal:     1.5
leading-relaxed:    1.625
leading-loose:      2
```

### Spacing Scale
```
spacing-0:          0px
spacing-1:          0.25rem    // 4px
spacing-2:          0.5rem     // 8px
spacing-3:          0.75rem    // 12px
spacing-4:          1rem       // 16px
spacing-5:          1.25rem    // 20px
spacing-6:          1.5rem     // 24px
spacing-8:          2rem       // 32px
spacing-10:         2.5rem     // 40px
spacing-12:         3rem       // 48px
spacing-16:         4rem       // 64px
spacing-20:         5rem       // 80px
spacing-24:         6rem       // 96px
```

### Border Radius
```
rounded-none:       0px
rounded-sm:         0.125rem   // 2px
rounded:            0.25rem    // 4px
rounded-md:         0.375rem   // 6px
rounded-lg:         0.5rem     // 8px
rounded-xl:         0.75rem    // 12px
rounded-2xl:        1rem       // 16px
rounded-full:       9999px
```

### Shadows
```
shadow-sm:          0 1px 2px 0 rgba(0, 0, 0, 0.05)
shadow:             0 1px 3px 0 rgba(0, 0, 0, 0.1)
shadow-md:          0 4px 6px -1px rgba(0, 0, 0, 0.1)
shadow-lg:          0 10px 15px -3px rgba(0, 0, 0, 0.1)
shadow-xl:          0 20px 25px -5px rgba(0, 0, 0, 0.1)
shadow-2xl:         0 25px 50px -12px rgba(0, 0, 0, 0.25)
shadow-glow:        0 0 20px rgba(168, 85, 247, 0.4)
```

### Animation Timings
```
duration-fast:      150ms
duration-normal:    300ms
duration-slow:      500ms
duration-slower:    700ms

ease-default:       cubic-bezier(0.4, 0, 0.2, 1)
ease-in:            cubic-bezier(0.4, 0, 1, 1)
ease-out:           cubic-bezier(0, 0, 0.2, 1)
ease-in-out:        cubic-bezier(0.4, 0, 0.2, 1)
ease-bounce:        cubic-bezier(0.68, -0.55, 0.265, 1.55)
```

### Z-Index Layers
```
z-base:             1
z-dropdown:         1000
z-sticky:           1020
z-fixed:            1030
z-modal-backdrop:   1040
z-modal:            1050
z-popover:          1060
z-tooltip:          1070
```

---

## 📦 Component Catalog

### 1. Navbar Component

#### Purpose
Navegación principal sticky, siempre visible con efecto glassmorphism.

#### Anatomy
- **Container**: Full-width, sticky top, backdrop blur
- **Logo**: Gradient text "FilmFlix"
- **Navigation Links**: Home, Movies, TV Shows, My List
- **Search Bar**: Icon + expandable input
- **User Menu**: Avatar + dropdown

#### Visual Specs
- **Height**: 64px (desktop), 56px (mobile)
- **Background**: bg-glass con backdrop-blur-md
- **Border**: border-b border-zinc-800
- **Padding**: px-6 py-4 (desktop), px-4 py-3 (mobile)

#### Typography
- **Logo**: text-3xl font-bold gradient-primary
- **Nav Links**: text-sm font-medium text-zinc-400
- **Active Link**: text-white font-semibold

#### Behavior
- **Scroll**: Aumenta opacidad del background al hacer scroll
- **Mobile**: Collapsa a hamburger menu < 768px
- **Search**: Se expande de 40px a 300px al hacer click

---

### 2. MovieCard Component

#### Purpose
Representación visual de una película/serie en grids, con información básica y preview.

#### Anatomy (Variant: Compact)
- **Poster Container**: Aspect ratio 2:3, rounded corners
- **Poster Image**: Full cover, lazy loaded
- **Rating Badge**: Positioned absolute top-right
- **Gradient Overlay**: Bottom gradient para legibilidad
- **Title**: Truncated 1 line
- **Metadata**: Year, duration (secondary text)

#### Anatomy (Variant: Wide)
- **Container**: Aspect ratio 16:9
- **Backdrop Image**: Full cover, lazy loaded
- **Info Panel**: Positioned absolute bottom-left
- **Title**: text-xl, max 2 lines
- **Description**: text-sm, max 3 lines, opacity en hover
- **Action Buttons**: Play, Add to List, More Info

#### Visual Specs (Compact)
- **Dimensions**: Auto width, aspect-ratio 2/3
- **Border Radius**: rounded-lg (8px)
- **Background**: bg-tertiary
- **Padding**: p-0 (imagen full bleed)

#### Visual Specs (Wide)
- **Dimensions**: Auto width, aspect-ratio 16/9
- **Border Radius**: rounded-xl (12px)
- **Background**: bg-tertiary
- **Overlay Gradient**: gradient-overlay

#### Typography (Compact)
- **Title**: text-base font-semibold text-white
- **Year**: text-sm text-zinc-400
- **Rating**: text-xs font-bold

#### Typography (Wide)
- **Title**: text-xl font-bold text-white
- **Description**: text-sm text-zinc-300
- **Metadata**: text-xs text-zinc-400

---

### 3. MovieGrid Component

#### Purpose
Container para organizar múltiples MovieCards en layout responsive.

#### Anatomy
- **Section Header**: Título + "Ver más" link
- **Grid Container**: CSS Grid responsive
- **Cards**: MovieCard components
- **Scroll Container**: Horizontal scroll opcional

#### Layout Specs
- **Grid Columns**:
  - Mobile (< 640px): 2 columns
  - Tablet (640-1024px): 3-4 columns
  - Desktop (> 1024px): 5-6 columns
- **Gap**: gap-4 (16px) entre cards
- **Padding**: px-6 py-8

#### Scroll Variant
- **Layout**: Horizontal scroll, no wrap
- **Scrollbar**: Hidden, controlado con botones
- **Navigation**: Flechas izq/der en hover
- **Scroll Behavior**: Smooth scroll

---

### 4. MovieDetail Component

#### Purpose
Vista detallada de película/serie con toda la información y acciones.

#### Anatomy
- **Hero Section**: Backdrop full-width con gradient
- **Poster**: Sticky en desktop, float left
- **Info Panel**: Título, rating, metadata, sinopsis
- **Action Bar**: Play, Add to List, Like, Share
- **Tabs Section**: Overview, Cast, Reviews, Similar
- **Cast Grid**: Grid de actores con fotos
- **Media Gallery**: Trailers, imágenes, clips

#### Visual Specs
- **Hero Height**: 60vh (desktop), 40vh (mobile)
- **Poster Size**: 300x450px (desktop), 200x300px (mobile)
- **Max Width**: max-w-7xl mx-auto
- **Padding**: px-6 py-8

#### Layout Sections
- **Hero**: Full bleed, gradient overlay
- **Content**: Grid 2 cols (desktop), 1 col (mobile)
- **Cast**: Grid 4-6 cols responsive
- **Similar**: MovieGrid horizontal scroll

---

### 5. Badge Component

#### Purpose
Pequeños indicadores de información (rating, género, estado).

#### Variant: Rating Badge
- **Shape**: Rounded-full pill
- **Icon**: Star icon (amarillo)
- **Text**: Rating numérico (e.g., "8.5")
- **Size**: Compact (24px height)

#### Variant: Genre Badge
- **Shape**: Rounded-md
- **Text**: Nombre del género
- **Colors**: Diferentes por género
- **Size**: Medium (32px height)

#### Variant: Status Badge
- **Shape**: Rounded-full dot + text
- **States**: "New", "Trending", "Soon"
- **Animation**: Pulse effect para "New"
- **Size**: Small (20px height)

#### Visual Specs (Rating)
- **Background**: bg-black/80 backdrop-blur
- **Padding**: px-2 py-1
- **Typography**: text-xs font-semibold

#### Visual Specs (Genre)
- **Background**: bg-zinc-800/50
- **Border**: border border-zinc-700
- **Padding**: px-3 py-1.5
- **Typography**: text-sm font-medium

#### Visual Specs (Status)
- **Background**: Varía por estado
  - New: bg-green-500/20 text-green-400
  - Trending: bg-purple-500/20 text-purple-400
  - Soon: bg-blue-500/20 text-blue-400
- **Padding**: px-2.5 py-1
- **Typography**: text-xs font-semibold uppercase

---

### 6. Hero/Banner Component

#### Purpose
Sección destacada con película/serie featured, llamado a acción principal.

#### Anatomy
- **Background**: Backdrop image con gradient overlay
- **Content**: Logo/Título, descripción, botones CTA
- **Metadata**: Rating, year, duration, géneros
- **Action Buttons**: Play principal, Más info secundario
- **Navigation Dots**: Si hay carousel

#### Visual Specs
- **Height**: 70vh (desktop), 50vh (mobile)
- **Gradient**: gradient-hero (oscurece a derecha)
- **Content Width**: max-w-2xl
- **Position**: Absolute bottom-left con padding

#### Typography
- **Title**: text-5xl font-bold (desktop), text-3xl (mobile)
- **Description**: text-lg leading-relaxed, max 3 lines
- **Metadata**: text-sm text-zinc-300

---

### 7. SearchBar Component

#### Purpose
Búsqueda de contenido con autocomplete y filtros.

#### States
- **Collapsed**: Solo icono (40px circle)
- **Expanded**: Input completo (300px width)
- **Active**: Con resultados dropdown
- **Loading**: Spinner animado

#### Anatomy (Expanded)
- **Container**: Rounded input con icono
- **Input Field**: Placeholder text
- **Search Icon**: Leading icon
- **Clear Button**: Trailing icon (cuando hay texto)
- **Dropdown**: Resultados debajo del input

#### Visual Specs
- **Height**: 40px
- **Border Radius**: rounded-full
- **Background**: bg-zinc-800/50
- **Border**: border border-zinc-700 (focus: border-purple-500)

#### Dropdown Specs
- **Max Height**: 400px con scroll
- **Items**: MovieCard compact horizontal
- **Sections**: "Movies", "TV Shows", "People"
- **Footer**: "Ver todos los resultados" link

---

### 8. Loading States

#### Skeleton Loader (MovieCard)
- **Shape**: Mismas dimensiones que MovieCard
- **Background**: bg-zinc-800 animado
- **Animation**: Shimmer effect de izq a der
- **Duration**: 1.5s infinite

#### Spinner
- **Size**: 24px (small), 40px (medium), 60px (large)
- **Color**: Gradient animado (gradient-primary)
- **Animation**: Rotate 360deg, 1s infinite

#### Progress Bar
- **Height**: 2px
- **Color**: gradient-primary
- **Animation**: Indeterminate slide
- **Position**: Fixed top-0 durante page transitions

---

## 🎭 Component States

### Universal States (Todos los componentes interactivos)

#### Idle State
- **Appearance**: Estado por defecto
- **Cursor**: default o pointer según sea clickable
- **Opacity**: 1
- **Scale**: 1

#### Hover State
- **Trigger**: Mouse over
- **Duration**: 150ms ease-out
- **Changes**:
  - Brightness: Ligero aumento
  - Scale: 1.02-1.05 (cards)
  - Shadow: Más pronunciada
  - Border: Cambio de color si aplica

#### Focus State
- **Trigger**: Keyboard navigation (Tab)
- **Appearance**:
  - Outline: 2px solid purple-500
  - Outline Offset: 2px
  - Ring: ring-2 ring-purple-500/50
- **Persistencia**: Hasta blur
- **Accessibility**: Siempre visible

#### Active/Pressed State
- **Trigger**: Mouse down o touch
- **Duration**: Instantáneo
- **Changes**:
  - Scale: 0.98
  - Brightness: Reducción leve
- **Recovery**: 100ms ease-out al soltar

#### Disabled State
- **Appearance**:
  - Opacity: 0.5
  - Cursor: not-allowed
  - Filter: grayscale(50%)
- **Interactions**: Bloqueadas
- **ARIA**: aria-disabled="true"

#### Loading State
- **Appearance**:
  - Opacity: 0.7
  - Cursor: wait o progress
  - Spinner: Overlay o inline
- **Interactions**: Bloqueadas durante carga
- **Feedback**: Visual indicator activo

#### Error State
- **Appearance**:
  - Border: border-red-500
  - Background: bg-red-500/10
  - Text: text-red-400
- **Icon**: Error icon (rojo)
- **Message**: Error text descriptivo
- **Actions**: Retry button si aplica

#### Success State
- **Appearance**:
  - Border: border-green-500
  - Icon: Check icon (verde)
  - Animation: Fade in + check mark
- **Duration**: Temporal (2-3s) o permanente
- **Feedback**: Success message

---

### Specific Component States

#### MovieCard States

**Idle**
- Poster visible, metadata básica
- Rating badge estático
- No overlay visible

**Hover**
- Scale: 1.05, duration 300ms
- Shadow: shadow-xl con glow
- Overlay: Fade in con descripción
- Action buttons: Fade in bottom
- Z-index: Elevado para sobresalir

**Focus**
- Ring: ring-2 ring-purple-500
- Outline: 2px offset
- Keyboard navegable
- Action buttons accesibles por Tab

**Loading**
- Skeleton: Animated shimmer
- Poster: Blur placeholder
- Progressive: Low-res → High-res

**Error**
- Placeholder: Error icon + mensaje
- Retry button: Disponible
- Background: bg-zinc-800

---

#### Navbar States

**Scrolled (Top)**
- Background: rgba(11,11,15,0.7)
- Backdrop blur: 0px
- Border: invisible

**Scrolled (Down)**
- Background: rgba(11,11,15,0.95)
- Backdrop blur: 12px
- Border: visible border-zinc-800
- Shadow: shadow-lg

**Search Expanded**
- Width: Expande a 300px
- Input: Visible y focused
- Overlay: Dim background (opcional)
- Dropdown: Visible si hay resultados

**Mobile Menu Open**
- Hamburger: Transform to X
- Menu: Slide in from right
- Backdrop: Dim con blur
- Body scroll: Bloqueado

---

#### Hero/Banner States

**Autoplay Video**
- Video: Muted, looping
- Controls: Hidden inicialmente
- Hover: Muestra controles
- Sound: Toggle disponible

**Carousel Active**
- Current slide: Visible, z-index alto
- Previous/Next: Parcialmente visibles (peek)
- Dots: Current highlighted
- Auto-advance: 5s delay

**CTA Hover**
- Play button: Scale 1.1, shadow-glow
- Info button: Border glow
- Cursor: pointer

---

## 🎨 Component Variants

### MovieCard Variants

#### Variant: Compact (Portrait)
**Use Case**: Grids de películas/series
- **Aspect Ratio**: 2:3
- **Image**: Poster vertical
- **Info**: Mínima (título + año)
- **Hover**: Overlay con descripción corta
- **Size**: Flexible width, height auto

#### Variant: Wide (Landscape)
**Use Case**: Featured content, horizontal lists
- **Aspect Ratio**: 16:9
- **Image**: Backdrop horizontal
- **Info**: Extendida (título + descripción + metadata)
- **Hover**: Info overlay + action buttons
- **Size**: Flexible width, height auto

#### Variant: Compact Horizontal
**Use Case**: Search results, "Continue Watching"
- **Layout**: Horizontal (poster + info side-by-side)
- **Aspect Ratio**: Poster 2:3, container auto
- **Image**: Poster left, 80px width
- **Info**: Right side, flex-grow
- **Size**: Full width del container

#### Variant: Featured Large
**Use Case**: Hero section, destacados
- **Aspect Ratio**: 16:9
- **Image**: Backdrop high-res
- **Info**: Logo image + descripción extensa
- **Actions**: Multiple CTAs prominentes
- **Size**: Full width, max 1200px

#### Variant: Mini Thumbnail
**Use Case**: Tooltips, quick previews
- **Aspect Ratio**: 16:9
- **Image**: Backdrop thumbnail
- **Info**: Solo título overlay
- **Size**: Fixed 200x112px

---

### Badge Variants

#### Variant: Rating
**Visual**
- **Icon**: ★ Star (yellow-400)
- **Text**: "8.5" (numeric)
- **Background**: black/80 blur
- **Shape**: Pill rounded-full

**Sizes**
- **Small**: h-5 px-2 text-xs
- **Medium**: h-6 px-2.5 text-sm
- **Large**: h-7 px-3 text-base

#### Variant: Genre
**Visual**
- **Text**: Genre name ("Action", "Drama")
- **Background**: zinc-800/50
- **Border**: zinc-700
- **Shape**: Rounded-md

**Colors by Genre**
- Action: orange-500/20 border-orange-500/30
- Drama: blue-500/20 border-blue-500/30
- Comedy: yellow-500/20 border-yellow-500/30
- Horror: red-500/20 border-red-500/30
- Sci-Fi: purple-500/20 border-purple-500/30

#### Variant: Status
**Types**
- **New**: Green dot + "NEW" text
- **Trending**: Fire icon + "TRENDING"
- **Coming Soon**: Calendar icon + "SOON"
- **Exclusive**: Star icon + "EXCLUSIVE"

**Animation**
- New: Pulse opacity 0.7-1
- Trending: Subtle scale pulse
- Coming Soon: None
- Exclusive: Shimmer effect

#### Variant: Quality
**Types**
- **4K**: Text "4K" + border gold
- **HD**: Text "HD" + border zinc
- **Dolby**: Dolby logo + text

**Visual**
- **Background**: Transparent
- **Border**: 1px solid color
- **Typography**: Uppercase, font-bold

---

### Button Variants

#### Variant: Primary CTA
**Use Case**: Play, Watch Now
- **Background**: gradient-primary
- **Text**: white font-semibold
- **Icon**: Play icon leading
- **Hover**: Brightness increase + scale 1.05
- **Size**: Large (h-12 px-8)

#### Variant: Secondary
**Use Case**: More Info, Add to List
- **Background**: transparent
- **Border**: border-2 border-white/30
- **Text**: white font-medium
- **Hover**: bg-white/10 border-white/50
- **Size**: Large (h-12 px-8)

#### Variant: Icon Only
**Use Case**: Like, Share, Close
- **Background**: bg-zinc-800/50 backdrop-blur
- **Shape**: Circle (rounded-full)
- **Icon**: Centered, no text
- **Hover**: bg-zinc-700/50 scale-110
- **Size**: Medium (h-10 w-10)

#### Variant: Ghost
**Use Case**: Subtle actions, menus
- **Background**: transparent
- **Text**: zinc-400
- **Hover**: bg-zinc-800/50 text-white
- **Size**: Small-Medium (h-8 px-4)

---

### Grid Layout Variants

#### Variant: Standard Grid
**Use Case**: Browse all movies/shows
- **Layout**: CSS Grid auto-fill
- **Columns**: Responsive (2-6 cols)
- **Gap**: gap-4
- **Pagination**: Load more button o infinite scroll

#### Variant: Horizontal Scroll
**Use Case**: Categorías en home
- **Layout**: Flex row, overflow-x scroll
- **Scroll**: Smooth, snap to items
- **Navigation**: Arrow buttons en hover
- **Peek**: Siguiente card parcialmente visible

#### Variant: Masonry
**Use Case**: Galería de imágenes
- **Layout**: Masonry grid
- **Items**: Variable heights
- **Gap**: gap-3
- **Animation**: Stagger fade in

---

## ♿ Accessibility Rules

### WCAG 2.1 Level AA Compliance

#### Color Contrast
- **Text Normal**: Mínimo 4.5:1 ratio
- **Text Large**: Mínimo 3:1 ratio (> 18pt)
- **UI Components**: Mínimo 3:1 ratio
- **Testing**: Contrast checker obligatorio

#### Keyboard Navigation
- **Tab Order**: Lógico y secuencial
- **Focus Indicators**: Siempre visibles (no outline: none)
- **Skip Links**: "Skip to content" al inicio
- **Shortcuts**: Documentados (Esc para cerrar modals)

#### Screen Reader Support
- **Semantic HTML**: Uso correcto de tags (nav, main, article)
- **ARIA Labels**: Descriptivos y contextuales
- **ARIA Live Regions**: Para updates dinámicos
- **Alt Text**: Obligatorio en todas las imágenes

#### Interactive Elements

**Buttons**
- ARIA: `role="button"` si no es `<button>`
- States: `aria-pressed`, `aria-expanded` cuando aplica
- Labels: Descriptivos, no "Click here"
- Size: Mínimo 44x44px touch target

**Links**
- Text: Descriptivo del destino
- External: `rel="noopener noreferrer"`
- Icons: `aria-label` si no hay texto
- Visited: Estado visual diferenciado

**Forms**
- Labels: Asociados con `for/id`
- Required: `aria-required="true"`
- Errors: `aria-invalid` + `aria-describedby`
- Hints: `aria-describedby` para ayuda

**Images**
- Alt: Descriptivo del contenido
- Decorative: `alt=""` o `role="presentation"`
- Complex: `aria-describedby` con descripción larga
- Loading: `loading="lazy"` para performance

#### Motion & Animation
- **Reduced Motion**: Respeta `prefers-reduced-motion`
- **No Auto-Play**: O permite pausar/detener
- **Parallax**: Desactivado en reduced motion
- **Flashing**: Evitar < 3 flashes por segundo

#### Focus Management
- **Modals**: Focus trap dentro del modal
- **Modal Open**: Focus al primer elemento interactivo
- **Modal Close**: Restore focus al trigger
- **Skip Navigation**: Bypass navigation repetitiva

---

### Component-Specific Accessibility

#### MovieCard
```
- Container: <article> tag
- Image: alt="{movie.title} poster"
- Link: aria-label="View {movie.title} details"
- Rating: aria-label="Rating {rating} out of 10"
- Actions: Descriptive aria-labels
```

#### Navbar
```
- Container: <nav> tag with aria-label="Main navigation"
- Logo: <h1> o aria-label="FilmFlix home"
- Links: Current page aria-current="page"
- Search: aria-label="Search movies and shows"
- Menu: aria-expanded, aria-haspopup
```

#### Hero/Banner
```
- Container: <section> with aria-label
- Title: <h1> heading level
- Play button: aria-label="Play {title}"
- Autoplay: aria-live="polite" para cambios
- Carousel: role="region" aria-roledescription="carousel"
```

#### Search Dropdown
```
- Input: role="combobox" aria-autocomplete="list"
- Listbox: role="listbox" aria-label="Search results"
- Options: role="option" aria-selected
- Loading: aria-busy="true" aria-live="polite"
```

#### Modal/Dialog
```
- Overlay: role="dialog" aria-modal="true"
- Title: aria-labelledby pointing to title
- Close: aria-label="Close dialog"
- Focus trap: Contenido dentro del modal
- Escape: Cierra el modal
```

---

## 📱 Responsive Breakpoints

### Breakpoint System (Tailwind defaults)
```
sm:  640px   // Small devices (landscape phones)
md:  768px   // Medium devices (tablets)
lg:  1024px  // Large devices (laptops/desktops)
xl:  1280px  // Extra large (large desktops)
2xl: 1536px  // 2X large (ultra-wide)
```

### Component Responsive Behavior

#### Navbar
- **< 768px**: Hamburger menu, logo centered
- **≥ 768px**: Full nav visible, search expandable
- **≥ 1024px**: Max-width container

#### MovieCard (Grid)
- **< 640px**: 2 columns
- **640-1024px**: 3-4 columns
- **≥ 1024px**: 5-6 columns
- **≥ 1536px**: 6-8 columns

#### Hero/Banner
- **< 768px**:
  - Height: 50vh
  - Title: text-3xl
  - Description: Hidden o 1 line
  - Buttons: Stack vertical
- **≥ 768px**:
  - Height: 60vh
  - Title: text-4xl
  - Description: 2 lines
  - Buttons: Horizontal
- **≥ 1024px**:
  - Height: 70vh
  - Title: text-5xl
  - Description: 3 lines
  - Full metadata visible

#### MovieDetail
- **< 768px**:
  - Stack vertical
  - Poster: Above content
  - Tabs: Dropdown select
- **≥ 768px**:
  - Poster: Float left
  - Content: Grid 2 cols
  - Tabs: Horizontal
- **≥ 1024px**:
  - Poster: Sticky sidebar
  - Content: Max-width constrained

#### Typography Scaling
- **Headings**: Scale down 25-30% en mobile
- **Body**: Min 16px para legibilidad
- **Line height**: Increase en mobile para touch

#### Touch Targets (Mobile)
- **Minimum**: 44x44px (WCAG guideline)
- **Spacing**: 8px between adjacent targets
- **Buttons**: Full-width en mobile cuando aplica

#### Performance Optimizations
- **Images**:
  - Mobile: 480w, 640w
  - Tablet: 768w, 1024w
  - Desktop: 1280w, 1920w
- **Lazy Loading**: Imágenes fuera del viewport
- **Critical CSS**: Inline above-fold styles
- **Font Loading**: font-display: swap

---

## 📐 Layout Patterns

### Container Widths
```
container-sm:   640px
container-md:   768px
container-lg:   1024px
container-xl:   1280px
container-2xl:  1536px
container-full: 100%
```

### Grid Templates
```
grid-cols-auto-fill: repeat(auto-fill, minmax(min-size, 1fr))
grid-cols-auto-fit:  repeat(auto-fit, minmax(min-size, 1fr))
```

### Spacing Patterns
```
section-spacing:    py-12 md:py-16 lg:py-24
container-padding:  px-4 sm:px-6 lg:px-8
card-padding:       p-4 md:p-6
```

---

## 🎬 Animation Guidelines

### Micro-interactions
- **Hover**: 150ms ease-out
- **Click/Press**: 100ms ease-in
- **Focus**: Instantáneo
- **Loading**: Continuous (1.5s loop)

### Page Transitions
- **Route Change**: 300ms fade + slide
- **Modal Open**: 250ms scale + fade
- **Modal Close**: 200ms scale + fade

### Scroll Animations
- **Parallax**: 0.5x scroll speed
- **Fade In**: Trigger at 10% visible
- **Slide Up**: Stagger 50ms per element

### Performance Rules
- **GPU Acceleration**: Use transform/opacity only
- **Avoid**: Animating width, height, margin, padding
- **Will-change**: Usa sparingly, solo durante animación
- **Reduce Motion**: Disable non-essential animations

---

## 🔧 Implementation Notes

### shadcn/ui Components to Use
- **Button**: Base for all button variants
- **Card**: Base for MovieCard, containers
- **Dialog**: Modals, overlays
- **Dropdown**: User menu, filters
- **Input**: Search, forms
- **Skeleton**: Loading states
- **Tabs**: MovieDetail sections
- **Avatar**: User profiles
- **Badge**: Status indicators
- **Separator**: Dividers
- **Scroll Area**: Custom scrollbars

### Tailwind Plugins Required
```
@tailwindcss/typography    // Rich text content
@tailwindcss/forms        // Form styling
@tailwindcss/aspect-ratio // Responsive ratios
@tailwindcss/line-clamp   // Text truncation
```

### Custom Tailwind Extensions
```
// En tailwind.config
extend: {
  colors: { /* tokens de color */ },
  fontFamily: { /* fonts custom */ },
  animation: { /* animaciones custom */ },
  keyframes: { /* definiciones keyframes */ }
}
```

---

## 📚 References & Resources

### Design Inspiration
- Netflix Web/App UI
- Disney+ Design System
- HBO Max Interface
- Material Design 3 (Motion)
- Radix UI Primitives

### Tools
- Figma (prototyping)
- Contrast Checker (accessibility)
- Chrome DevTools (responsive)
- Lighthouse (performance/a11y)

### Documentation
- [Tailwind CSS Docs](https://tailwindcss.com)
- [shadcn/ui Components](https://ui.shadcn.com)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21)
- [MDN Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)

---

**Version**: 1.0
**Last Updated**: 2026-02-15
**Status**: Specification Complete - Ready for Implementation
