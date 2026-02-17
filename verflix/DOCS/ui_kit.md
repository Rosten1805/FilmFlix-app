# UI Kit & Design System - Verflix

**Versión**: 1.0  
**Fecha**: Febrero 2026  
**Estado**: Especificación (No Código)  
**Stack**: shadcn/ui + Tailwind CSS v3

---

## A. KIT MÍNIMO DE COMPONENTES (shadcn/ui)

### Categoría: Layout & Contenedores

| Componente | Uso | Estados | Variantes |
|-----------|-----|---------|-----------|
| **Card** | Contenedor de películas, secciones | idle, hover, focus | compact (cover), wide (w/ metadata), media (poster) |
| **Separator** | Divisor entre secciones | visible, hidden | horizontal, vertical |
| **ScrollArea** | Listas scrolleables | scrolling, paused | horizontal (carousels), vertical (lists) |
| **Container** | Grid wrapper | - | max-w-7xl, centered |

**Ejemplo de uso**:
- `Card` en MovieCard, DetailCard
- `Separator` entre secciones de Navbar + contenido
- `ScrollArea` en carousels de categorías
- `Container` wrapper top-level

---

### Categoría: Interacción

| Componente | Uso | Estados | Variantes |
|-----------|-----|---------|-----------|
| **Button** | CTAs primarias/secundarias | idle, hover, focus, active, loading, disabled | primary (gradient), secondary (outline), ghost (icon) |
| **Dialog** | Modal para trailer, confirmaciones | closed, open, loading | fullscreen (trailer 16:9), medium (500px), small (300px) |
| **Tabs** | Categorías, secciones (Trending/Popular/My List) | idle, hover, active, disabled | underline, pills |
| **DropdownMenu** | Filtros, user menu, sort | closed, open, hover | compact (density), with icons, with separators |

**Ejemplo de uso**:
- `Button` en Navbar (Sign In), MovieCard (Add to List), Detail (Watch Now)
- `Dialog` para trailers, feedback confirmations
- `Tabs` para Home (Trending | Popular | My Lists)
- `DropdownMenu` para Sort (Rating ↓, Release ↓, Trending), Filters (Genre, Year), User (Profile, Logout)

---

### Categoría: Entrada de Datos

| Componente | Uso | Estados | Variantes |
|-----------|-----|---------|-----------|
| **Input** | Búsqueda, filtros, login | empty, focused, typing, error, loading, disabled | text, email, password (masked), with icon (search ×), with clear button |
| **Command** | Búsqueda avanzada con autocomplete | idle, searching, results, empty, loading | combobox (select), search with preview |
| **Badge** | Rating, géneros, tags | filled, outlined, variant | rating (8.8/10, color coded), genre (pill), status (New, Trending) |

**Ejemplo de uso**:
- `Input` en Navbar para búsqueda rápida
- `Command` en SearchPage (autocomplete with debounce)
- `Badge` en MovieCard (rating + count), DetailCard (genres list)

---

### Categoría: Feedback & Estado

| Componente | Uso | Estados | Variantes |
|-----------|-----|---------|-----------|
| **Skeleton** | Placeholder de carga | loading, skeleton shimmer | card (200×300), text line (100%, 80%), circular (avatar) |
| **Toast** | Notificaciones (agregado a lista, error) | success, error, warning, info | top-right (default), bottom-right, center |

**Ejemplo de uso**:
- `Skeleton` en Grid mientras carga películas
- `Toast` al agregar a favoritos ("Added to My List")

---

### Categoría: Media

| Componente | Uso | Estados | Variantes |
|-----------|-----|---------|-----------|
| **AspectRatio** | Poster (2:3), Backdrop (16:9), Trailer (16:9) | - | 2:3 (vertical poster), 16:9 (wide), 1:1 (square) |

**Ejemplo de uso**:
- `AspectRatio` para mantener proporción de imágenes sin CSS custom

---

## B. TOKENS Y ESTILO BASE (Tailwind)

### Color Palette (Dark-First)

```tailwind
# En tailwind.config.js
colors:
  # Base
  background: '#0b0b0f'        # Fondo principal
  surface-primary: '#11131a'   # Cards, inputs
  surface-secondary: '#151827' # Hover states, dialogs
  
  # Texto
  text-primary: '#f2f2f7'      # Texto principal
  text-secondary: '#a0a0a7'   # Texto secundario
  text-tertiary: '#71727a'    # Placeholder, disabled
  
  # Bordes
  border: '#282a35'            # Subtle borders
  border-light: '#3a3d46'     # Highlighted borders
  
  # Acentos (Netflix-style)
  accent-red: '#ef4444'        # Primario (rojo/rosa)
  accent-purple: '#9333ea'     # Secundario (púrpura)
  accent-blue: '#0ea5e9'       # Terciario (azul)
  
  # Feedback
  success: '#22c55e'
  warning: '#eab308'
  danger: '#ef4444'
  info: '#0ea5e9'
```

### Spacing System (4px base)

```
4px   (0.25rem)  - xs - gaps pequeños
8px   (0.5rem)   - sm - gaps normales
12px  (0.75rem)  - base - gaps medianos
16px  (1rem)     - md - gaps grandes
24px  (1.5rem)   - lg - gaps extra
32px  (2rem)     - xl - gaps grandes
```

**Uso**:
- Navbar: `px-4 py-3` (8/12px)
- Card: `p-4 gap-3` (16px padding, 12px gap)
- Grid: `gap-6` (24px)
- Section: `space-y-8` (secciones)

### Border Radius

```
rounded-lg   (0.5rem)  - Inputs, buttons, small elements
rounded-xl   (0.75rem) - Cards, media containers
rounded-2xl  (1rem)    - MovieCard, large containers
rounded-full (50%)      - Avatars, badges redondas
```

**Uso**: `rounded-2xl` por defecto en Cards/MovieCard

### Typography

```
text-xs    - 12px/16px - Labels, hints
text-sm    - 14px/20px - Body copy, secondary
text-base  - 16px/24px - Default body
text-lg    - 18px/28px - Subheadings
text-xl    - 20px/28px - Heading 3
text-2xl   - 24px/32px - Heading 2
text-4xl   - 36px/40px - Heading 1 (hero)

font-light    - Descripción, metadata
font-normal   - Body, default
font-semibold - Títulos, strong
font-bold     - Headings principales
```

**Tracking** (Espaciado de letras):
- Títulos: `tracking-tight` (títulos compactos en Netflix)
- Body: `tracking-normal`

### Shadows

```
shadow-sm  - Subtle (default para cards en hover)
shadow-md  - Medium (modals, dialogs)
shadow-lg  - Large (dropdowns, overlays)
shadow-2xl - Extra (hero overlays)
```

**Uso**: Cards con `shadow-sm`, Hover elevado con `shadow-md`

### Backdrop & Blur

```
backdrop-blur      - Navbar sticky
backdrop-blur-md   - Modal overlays
opacity-80         - Dim overlays
```

---

## C. MAPEO "PANTALLA → COMPONENTES"

### 1. Navbar (Header Sticky)

```
├─ Container (sticky top-0 backdrop-blur)
│  ├─ Flex row between
│  ├─ Logo (left)
│  ├─ Search Area (center)
│  │  ├─ Input o Command (buscar películas)
│  │  └─ Dropdown (sort/filter)
│  └─ User Menu (right)
│     ├─ Button (icon: user)
│     └─ DropdownMenu
│        ├─ Profile link
│        ├─ Separator
│        └─ Logout
```

**Clases Tailwind**:
```css
sticky top-0 backdrop-blur-md bg-background/80 
border-b border-border px-4 py-3 z-50
flex items-center justify-between gap-6
```

**Estados**:
- `Idle`: Navbar semi-transparente
- `Hover over elements`: Elevación con shadow-md
- `Scroll`: Blur mantiene
- `Mobile`: Hamburger menu en lugar de horizontal

---

### 2. Home - Grids (Categorías)

```
├─ Container (max-w-7xl)
│  ├─ Tabs (Trending | Popular | My Lists)
│  │  └─ Tres opciones 
│  ├─ Separator
│  └─ ScrollArea (si es carousel)
│     ├─ Grid (gap-6, responsive cols)
│     └─ MovieCard × N
```

**Grid Layout**:
```css
grid gap-6 
grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6
```

**Cada categoría sección**:
```css
space-y-6 
border-b border-border/50 pb-8
```

---

### 3. MovieCard (Grid Item)

```
├─ Card (rounded-2xl overflow-hidden interactive)
│  ├─ AspectRatio (2:3)
│  │  ├─ Image (poster_url)
│  │  └─ Overlay (hover: view details)
│  ├─ Separator
│  └─ Content (p-4)
│     ├─ Title (text-sm font-semibold line-clamp-2)
│     ├─ Row: Year | Rating
│     │  ├─ Text (text-xs text-secondary)
│     │  └─ Badge (rating 8.8/10)
│     └─ Genres (gap-1 flex wrap)
│        └─ Badge × 2 (genre pills)
```

**Clases Tailwind**:
```css
Card: rounded-2xl overflow-hidden cursor-pointer
      transition-all duration-300
      hover:shadow-md hover:scale-105
      focus-visible:ring-2 ring-accent-blue

AspectRatio: bg-surface-primary skeleton-loading

Overlay (hover): 
      absolute inset-0 bg-black/70 backdrop-blur-sm
      flex items-center justify-center
      opacity-0 hover:opacity-100 transition-opacity
      Button "View Details"

Content: space-y-2 text-text-primary
```

**Estados**:
- `Idle`: Card normal, shadow-sm
- `Hover`: Elevado (shadow-md), scale(1.05), overlay visible
- `Focus`: ring-2 ring-blue
- `Loading`: Skeleton en lugar de imagen

---

### 4. DetailPage / Modal

```
├─ Dialog (fullscreen/medium dependiendo)
│  ├─ Header
│  │  ├─ AspectRatio (16:9) Backdrop
│  │  └─ Overlay (titulo + cierre)
│  ├─ Separator
│  └─ Content (container max-w-4xl space-y-6)
│     ├─ Title (text-4xl font-bold)
│     ├─ Meta Row
│     │  ├─ Year | Runtime
│     │  └─ Badge Rating
│     ├─ Genres (flex gap-2)
│     │  └─ Badge × N
│     ├─ Overview (text-lg text-secondary)
│     ├─ Buttons
│     │  ├─ Button primary (Watch Now/Add to List)
│     │  └─ Button secondary (Share)
│     ├─ Separator
│     └─ Videos/Credits (expandible o tabs)
```

**Clases Tailwind**:
```css
Dialog: bg-background text-text-primary
        max-w-4xl rounded-2xl

Backdrop: AspectRatio 16:9 relative
          bg-gradient-to-b from-black/50 to-background

Overlay buttons: 
        absolute bottom-6 left-6 right-6
        flex gap-3 items-center

Content: space-y-6 p-8 on mobile p-4
```

**Estados**:
- `Closed`: Dialog no visible (opacity-0)
- `Open`: Animación fade-in + slide-up
- `Buttons loading`: Spinner en botones
- `Error`: Toast notification

---

### 5. SearchResults

```
├─ Container
│  ├─ Command (search bar sticky)
│  │  └─ Autocomplete results preview
│  ├─ Filters Row
│  │  ├─ DropdownMenu (Genre)
│  │  ├─ DropdownMenu (Year)
│  │  └─ DropdownMenu (Rating)
│  ├─ Results Count (text-secondary)
│  ├─ Grid (mismo que Home)
│  │  └─ MovieCard × N
│  └─ Pagination
│     ├─ Button (Previous)
│     ├─ Page indicators (1, 2, 3...)
│     └─ Button (Next)
```

---

## D. PROMPTS ESPECÍFICOS (Listos para Copiar/Pegar)

### Prompt 1: Especificación de UI Kit Completo

```
Rol: UI Engineer + a11y Lead

Tarea: Define el kit mínimo de componentes para una UI tipo Netflix 
       usando shadcn/ui y Tailwind CSS.

Contexto:
- App: Netflix-like streaming
- Data: Películas/series desde TMDB
- Dark mode: Fondo #0b0b0f, superficies #11131a/#151827, texto #f2f2f7
- Responsive: Mobile-first (2 cols) → lg (6 cols)

Entrega (SIN CÓDIGO, solo especificación):

1. **Catálogo de Componentes Seleccionados**
   - Para cada componente (Card, Button, Input, Badge, Dialog, etc.)
   - Indicar: uso principal, 3+ variantes, estados (idle/hover/focus/disabled/loading)
   - Tabla format: Componente | Uso | Variantes | Estados

2. **Variants Detalladas**
   - Card: compact (cover only), wide (con metadata debajo), media (poster 2:3)
   - Button: primary (gradient), secondary (outline), ghost (icon-only), loading state
   - Badge: rating (numeric + color), genre (pill outline)
   - Input: text, search with clear, error state, disabled

3. **Tokens Tailwind**
   - Color palette (fondo, superficies, texto, border, acentos, feedback)
   - Espaciado (4/8/12/16/24 px)
   - Border radius (lg/xl/2xl/full)
   - Shadow (sm/md/lg)
   - Typography (sizes, weights, tracking)

4. **Reglas de Accesibilidad (A11y)**
   - ARIA labels para botones icon-only
   - Focus visible (ring-2 con color acentuado)
   - Estado disabled (text-tertiary, cursor-not-allowed)
   - Contrast minimum (AA) en todos los colores
   - Keyboard navigation (Tab, Enter, Escape para modals)
   - Semantic HTML (button, link, dialog, form)
   - Motion (prefers-reduced-motion para animaciones)
```

### Prompt 2: Diseño de GridSystem Responsive

```
Rol: Product Designer

Tarea: Define el grid system responsive para mostrar películas 
       en diferentes viewports (Netflix-style).

Contexto:
- Mobile (320-640): 2 columnas (posters 160px ancho)
- Tablet (641-1024): 3 columnas (posters 200px ancho)
- Desktop (1025-1440): 4 columnas (posters 250px ancho)
- Ultra-wide (1441+): 6 columnas (posters 280px ancho)
- Spacing entre items: 24px (gap-6)
- Max-width container: 1280px (max-w-7xl)

Entrega (Especificación):

1. **Breakpoints & Grid Config**
   - Tabla con viewport, cols, poster width, container px
   - Tailwind classes (grid-cols-2, sm:grid-cols-3, etc.)

2. **Ejemplo de layout**
   - Wireframe ASCII mostrando 2/3/4/6 col layouts

3. **Espaciado vertical**
   - Sección title → gap → grid (space-y-6)
   - Separator entre secciones (pb-8 border-b)

4. **Skeleton loading**
   - Mismo grid con Skeleton en lugar de images
   - Shimmer animation (pulse)

5. **Empty states**
   - Cuándo mostrar "No results found"
   - Centering + icon + text
```

### Prompt 3: Componente MovieCard Especificación

```
Rol: Component Architect

Tarea: Define la especificación visual completa del componente MovieCard
       incluyendo todos los estados y micro-interacciones.

Contexto:
- Proporción poster: 2:3 (vertical)
- Hover elevación visual
- Rating score + count de votos
- 1-2 badge de géneros
- Accesible a keyboard

Entrega (SIN CÓDIGO):

1. **Estructura Jerárquica**
   - Card wrapper (borderradius, overflow)
     ├─ Image container (AspectRatio)
     │  ├─ Poster image (lazy load)
     │  ├─ Overlay (hover)
     │  │  ├─ Gradient dark bottom
     │  │  ├─ Icon "play" (hover)
     │  │  └─ Button "View"
     │  └─ Badge (top-right corner)
     │     └─ Rating score (8.8)
     └─ Content area
        ├─ Title (line-clamp-2)
        ├─ Meta (Year | Runtime)
        ├─ Genres (2 pills max)
        └─ Action buttons (min/compact)

2. **Estados de Diseño**
   - `Idle`: Normal, shadow-sm, sin overlay
   - `Hover`: Elevado (shadow-md), scale(1.05), overlay visible
   - `Focus`: ring-2 blue, keyboard navigation
   - `Loading`: Skeleton placeholder
   - `Error`: Placeholder image + error icon
   - `Disabled/Unavailable`: Opacidad 50%, no clickeable

3. **Micro-interacciones**
   - Hover duration: 300ms
   - Overlay fade-in: 200ms
   - Play icon animation: pulse 1s
   - Title truncation: 2 líneas max (line-clamp-2)

4. **Responsive Behavior**
   - Mobile: Más espaciado entre cards (gap-4)
   - Tablet+: Más compacto (gap-6)
   - Portrait: Cards más anchas si es landscape

5. **Typography & Spacing**
   - Title: text-sm font-semibold text-text-primary
   - Meta: text-xs text-text-secondary
   - Rating badge: text-xs font-bold white on accent-red
   - Genre badges: text-xs outline variant
   - Padding content: p-4
```

### Prompt 4: Navbar & Header Especificación

```
Rol: Senior Product Engineer

Tarea: Define la especificación del Navbar/Header sticky type Netflix
       con búsqueda, filtros y user menu.

Contexto:
- Sticky top (z-50)
- Backdrop blur semi-transparent
- Logo + Search + User menu (flex between)
- Mobile: Hamburger menu collapses search
- Búsqueda con debounce + autocomplete

Entrega:

1. **Layout & Componentes**
   - Navbar container: sticky top-0 z-50 backdrop-blur
   - Logo (left): Fixed width, clickable to home
   - Search (center): Input o Command component
     - Placeholder: "Search movies, shows..."
     - Clear button (×)
     - Autocomplete (dropdown cuando typing)
   - User menu (right): Button icon + DropdownMenu
     - Items: Profile, Settings, Logout

2. **Estados & Interacciones**
   - Idle: Transparent bg with border-b
   - Scroll down: Blur aumenta, border-b visible
   - Search focus: Input expands (flex-grow), autocomplete visible
   - Dropdown open: Menu items appear (animate down)
   - Mobile: Hamburger icon, vertical menu

3. **Responsive Design**
   - Desktop (md+): Todos los elementos visible
   - Tablet: Search normal, user menu compact
   - Mobile: Search collapsible, hamburger menu

4. **Accessibility**
   - Logo: Semantic button o link to home
   - Input: label asociado (aria-label)
   - Dropdown: ARIA expanded, aria-haspopup
   - Keyboard: Tab through items, Enter to select, Escape to close
   - Focus visible: ring-2 en todos los elements

5. **Visual Spec**
   - Background: bg-background/80 (semi-transparent)
   - Border: border-b border-border
   - Padding: px-4 py-3
   - Logo height: h-8 w-auto
   - Input width: w-48 focus:w-80 (expand on focus)
   - User icon: h-8 w-8 rounded-full
```

### Prompt 5: Modal/Dialog para Trailer Especificación

```
Rol: UX Specialist + Accessibility Lead

Tarea: Especifica un Dialog modal para reproducir trailers
       (fullscreen video experience).

Contexto:
- Contenido: Video player (16:9) + metadata
- Trigger: Button en MovieCard
- Close: ESC key, close button, backdrop click
- A11y: Trap focus, announce state

Entrega:

1. **Estructura Jerárquica**
   - Dialog overlay (bg-black/80 backdrop-blur)
     ├─ Video container (max-w-5xl AspectRatio 16:9)
     │  ├─ Video player (iframe YouTube/Vimeo)
     │  ├─ Play button overlay
     │  └─ Loading spinner
     ├─ Escape/Close button (top-right)
     └─ Metadata (opcional, below video)
        ├─ Title
        ├─ Duration
        └─ Share button

2. **Estados**
   - Closed: Hidden (display-none o opacity-0)
   - Opening: Fade-in backdrop + zoom-in video (300ms)
   - Playing: Video fullscreen-like experience
   - Error: "Video unavailable" message
   - Mobile: Fullscreen vertical

3. **Interacciones**
   - Open: Button click → Dialog animate in
   - ESC key → Close modal
   - Backdrop click → Close modal
   - Close button click → Close modal
   - Auto-play: true (muted initially)

4. **Accessibility**
   - role="dialog" aria-labelledby="dialog-title"
   - Focus trap (Tab cycles within dialog)
   - aria-modal="true"
   - Keyboard: ESC to close, Tab to navigate
   - ARIA live region: "Video loading..."
   - Semantic close button: aria-label="Close"

5. **Visual & Animation**
   - Backdrop: bg-black/80
   - Video container: rounded-2xl overflow-hidden
   - Close button: position-fixed top-4 right-4
   - Animation: fade-in 200ms, zoom 300ms
```

### Prompt 6: Rating Badge Diseño & Variants

```
Rol: Design System Maintainer

Tarea: Define todas las variantes del Badge para ratings y géneros.

Contexto:
- Ratings: Score numérico (0-10), con color según calidad
- Géneros: Texto corto (Action, Drama), pill style
- Ambos usados en MovieCard + Detail

Entrega:

1. **Rating Badge Variants**
   
   | Score | Color | Hex | Background |
   |-------|-------|-----|-----------|
   | 9-10  | Verde | #22c55e | bg-green-500/20 |
   | 7-8.9 | Amarillo | #eab308 | bg-yellow-500/20 |
   | 5-6.9 | Naranja | #f97316 | bg-orange-500/20 |
   | 0-4.9 | Rojo | #ef4444 | bg-red-500/20 |
   
   - Formato: "8.8/10" o solo "8.8"
   - Tamaño: text-xs o text-sm
   - Padding: px-2 py-1

2. **Genre Badge Variants**
   - Style: Outlined (border-border) con rounded-full
   - Bg: Transparent
   - Text: text-text-secondary
   - Hover: bg-surface-secondary/50
   - Max width: Truncate si > 20 chars
   
3. **States & Hover**
   - Idle: Normal appearance
   - Hover: Slight bg-color/opacity
   - Focus: ring-1 ring-border (keyboard)
   - Loading: Pulse animation

4. **Tailwind Classes Template**
   ```
   Rating-based coloring:
   score >= 9: text-green-400 bg-green-950
   score >= 7: text-yellow-400 bg-yellow-950
   score >= 5: text-orange-400 bg-orange-950
   score < 5:  text-red-400 bg-red-950
   ```
```

---

## E. TAREAS SIGUIENTES (Implementación)

### Fase 1: Setup Inicial
- [ ] Crear proyecto React + Tailwind
- [ ] Instalar shadcn/ui + dependencias
- [ ] Configurar tailwind.config.js con tokens

### Fase 2: Componentes Base
- [ ] Primitivos de shadcn/ui (Button, Card, Dialog, etc.)
- [ ] Theme provider (dark mode)
- [ ] Layouts (Container, Navbar, GridSystem)

### Fase 3: Componentes Compuestos
- [ ] MovieCard (con todas las variantes)
- [ ] NavBar sticky
- [ ] Grid responsiva
- [ ] SearchBar + Results

### Fase 4: Páginas
- [ ] Home (grids with categories)
- [ ] DetailPage (modal)
- [ ] SearchPage (results grid)

### Fase 5: Polish & A11y
- [ ] Keyboard navigation completa
- [ ] ARIA labels audit
- [ ] Performance (lazy load, optimize images)
- [ ] Testing A11y

---

## F. REFERENCIAS & RECURSOS

### Documentación Oficial
- [shadcn/ui Components](https://ui.shadcn.com)
- [Tailwind CSS Documentation](https://tailwindcss.com)
- [Tailwind CSS Config](https://tailwindcss.com/docs/configuration)
- [Web Accessibility Guidelines (WCAG)](https://www.w3.org/WAI/WCAG21/quickref/)

### Netflix Design References
- Netflix Tudum Font (open source)
- Netflix Color Palette (dark streaming UX)
- Netflix Grid System (responsive, 6-col max)
- Netflix Motion Guidelines (subtle, no distraction)

### Herramientas Útiles
- [Tailwind UI (paid)](https://tailwindui.com) - Pre-built components
- [Headless UI](https://headlessui.dev) - Base components for shadcn
- [Radix UI](https://www.radix-ui.com) - Unstyled accessible components

---

**Estado**: Especificación completada  
**Siguiente paso**: Usar Prompt 1 para elaboración de especificación detallada en equipo  
**Implementación**: Referir a Plan de Commits (arquitectura.md Fase 4 & 5)