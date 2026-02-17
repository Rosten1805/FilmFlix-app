# Skeleton Loading Patterns - Verflix

**Versión**: 1.0  
**Fecha**: Febrero 2026  
**Contexto**: shadcn/ui Skeleton component + Tailwind CSS  
**Objetivo**: Especificar loading states, timing, y criterios de decisión

---

## A. SKELETON BASE - COMPONENTES Y DIMENSIONES

### 1. Skeleton Component (shadcn/ui)

```javascript
// Estructura base de shadcn Skeleton
<Skeleton className="w-full h-12 rounded-md" />

// Propiedades
- rounded-md: 0.375rem
- rounded-lg: 0.5rem
- rounded-xl: 0.75rem
- rounded-2xl: 1rem
- Altura: h-4, h-6, h-12, etc (4px, 24px, 48px base)
- Ancho: w-full, w-3/4, w-1/2, etc (responsivo)
```

### 2. Colores Skeleton (Dark Mode)

```tailwind
Skeleton default color: bg-surface-primary/50 (#11131a con opacity 50%)
├─ Shimmer color: bg-surface-secondary (#151827 más claro)
├─ Contrast: Subtle diferencia visual
└─ Animación: pulse (opacity 0.5 → 1 → 0.5)
```

---

## B. SKELETON PATTERNS - MOVIECARD

### MovieCard Skeleton Layout

```
┌──────────────────┐
│ ┌──────────────┐ │
│ │ ████████████ │ │  AspectRatio Skeleton (2:3)
│ │ ████████████ │ │  Ancho: 100% del card
│ │ ████████████ │ │  Alto: 300px (2:3 ratio)
│ │ ████████████ │ │  Border radius: rounded-xl
│ │ ████████████ │ │  Animación: pulse 2s
│ │ ████████████ │ │
│ └──────────────┘ │
├──────────────────┤
│ ███████     ⭐   │  Título skeleton (text-sm)
│ ███████████      │  Ancho: 80% (w-4/5)
├──────────────────┤
│ ███  ███  ███    │  Meta row skeletons
│ (Year, Rating, Rating badge)
├──────────────────┤
│ ██████  ██████   │  Genre badges
│ (2 badge skeletons)
└──────────────────┘
```

### MovieCard Skeleton - Breakdown Detallado

```
┌─────────────────────────────────────────┐
│ MOVIECARD SKELETON ESTRUCTURA            │
├─────────────────────────────────────────┤
│                                          │
│ Contenedor: Card (rounded-2xl overflow)  │
│ ├─ Skeleton Image (AspectRatio 2:3)    │
│ │  ├─ Ancho: w-full (100% del card)   │
│ │  ├─ Alto: h-[300px] (aspect-2/3)    │
│ │  ├─ Radius: rounded-xl                │
│ │  ├─ BG: bg-surface-primary/50       │
│ │  └─ Animate: pulse infinite           │
│ │                                        │
│ ├─ Seperator (divider)                 │
│ │                                        │
│ ├─ Content (p-4 space-y-2)             │
│ │  ├─ Title Skeleton                   │
│ │  │  ├─ Ancho: w-4/5                 │
│ │  │  ├─ Alto: h-4                    │
│ │  │  ├─ Radius: rounded-md            │
│ │  │  ├─ BG: bg-surface-primary/50   │
│ │  │  └─ Animate: pulse (2s)          │
│ │  │                                    │
│ │  ├─ Meta Row Skeleton               │
│ │  │  ├─ Row: flex gap-2               │
│ │  │  ├─ Skeleton 1: w-1/4 h-3       │
│ │  │  ├─ Skeleton 2: w-1/3 h-3       │
│ │  │  ├─ Skeleton 3: w-1/4 h-3       │
│ │  │  └─ Animate: pulse (2s, offset)  │
│ │  │                                    │
│ │  └─ Genre Row Skeleton              │
│ │     ├─ Row: flex gap-1               │
│ │     ├─ Skeleton 1: w-1/3 h-6       │
│ │     ├─ Skeleton 2: w-1/4 h-6       │
│ │     ├─ Radius: rounded-full         │
│ │     └─ Animate: pulse (2s, offset)  │
│ │                                        │
│ └─ Hover: Disabled (no scale)           │
│                                          │
└─────────────────────────────────────────┘
```

### MovieCard Skeleton - Tailwind Classes

```jsx
<Card className="rounded-2xl overflow-hidden">
  {/* Image Skeleton */}
  <Skeleton className="w-full h-[300px] rounded-xl" />
  
  <Separator />
  
  {/* Content */}
  <div className="p-4 space-y-2">
    {/* Title */}
    <Skeleton className="w-4/5 h-4 rounded-md" />
    
    {/* Meta Row */}
    <div className="flex gap-2 items-center">
      <Skeleton className="w-1/4 h-3 rounded-sm" />
      <Skeleton className="w-1/3 h-3 rounded-sm" />
      <Skeleton className="w-1/4 h-3 rounded-sm" />
    </div>
    
    {/* Genre Badges */}
    <div className="flex gap-1">
      <Skeleton className="w-1/3 h-6 rounded-full" />
      <Skeleton className="w-1/4 h-6 rounded-full" />
    </div>
  </div>
</Card>
```

### Animación Skeleton - MovieCard

```css
/* Global pulse animation (Tailwind default) */
@keyframes pulse {
  0%, 100% {
    opacity: 0.5;
  }
  50% {
    opacity: 1;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* Aplicado a Skeleton component */
<Skeleton /> /* Already has animate-pulse in shadcn */

/* Optional: Stagger effect (cada skeleton con delay) */
.skeleton-image {
  animation: pulse 2s ease-in-out infinite;
  animation-delay: 0s;
}

.skeleton-title {
  animation: pulse 2s ease-in-out infinite;
  animation-delay: 0.1s;
}

.skeleton-meta {
  animation: pulse 2s ease-in-out infinite;
  animation-delay: 0.2s;
}

.skeleton-genre {
  animation: pulse 2s ease-in-out infinite;
  animation-delay: 0.3s;
}
```

---

## C. SKELETON PATTERNS - DETAIL PAGE

### Detail Page Skeleton Layout

```
┌───────────────────────────────────────────────┐
│ DETAIL MODAL OPENING STATE (Skeleton)         │
├───────────────────────────────────────────────┤
│                                               │
│ ╔════════════════════════════════════════╗   │
│ ║ BACKDROP IMAGE SKELETON (16:9)         ║   │
│ ║ ████████████████████████████████████ 🏗️ ║   │
│ ║ ████████████████████████████████████   ║   │
│ ║ ████████████████████████████████████   ║   │
│ ║ ████████████████████████████████████   ║   │
│ ╚════════════════════════════════════════╝   │
│                                               │
│ TITLE SKELETON                                │
│ ██████████████████████████████ (text-3xl)    │
│                                               │
│ META SKELETON                                 │
│ ████  ████  ████  (year | runtime | rating) │
│                                               │
│ GENRE BADGES SKELETON                        │
│ ██████████  ██████████  ██████████           │
│                                               │
│ ─────────────────────────────────────        │
│                                               │
│ SYNOPSIS SKELETON                             │
│ ████████████████████████████████████████     │
│ ████████████████████████████████████████     │
│ ██████████████ (text-base, 3 líneas)        │
│                                               │
│ BUTTON SKELETONS                              │
│ ███████████  ███████████  ████████           │
│ (Watch, Add, Share)                          │
│                                               │
│ ─────────────────────────────────────        │
│                                               │
│ CAST SKELETON                                 │
│ [Avatar] [Avatar] [Avatar]                   │
│ Names...                                     │
│                                               │
└───────────────────────────────────────────────┘
```

### Detail Page Skeleton - Breakdown Detallado

```
┌──────────────────────────────────────────────┐
│ DETAIL SKELETON ESTRUCTURA COMPLETA           │
├──────────────────────────────────────────────┤
│                                              │
│ 1. BACKDROP IMAGE SKELETON                  │
│    ├─ AspectRatio: 16:9                     │
│    ├─ Ancho: w-full                         │
│    ├─ Alto: h-[360px] (16:9 ratio)         │
│    ├─ Radius: rounded-t-2xl                 │
│    ├─ BG: bg-surface-primary/50             │
│    ├─ Animate: pulse 2s                     │
│    └─ Nota: No shimmer visible en imagen    │
│                                              │
│ 2. OVERLAY GRADIENT SKELETON                │
│    ├─ Position: absolute inset-0           │
│    ├─ Bg: gradient fade (transparent→dark)  │
│    └─ Nota: Decorativo, no afecta carga    │
│                                              │
│ 3. CLOSE BUTTON SKELETON                    │
│    ├─ Position: absolute top-4 right-4      │
│    ├─ Size: w-10 h-10 rounded-full         │
│    ├─ BG: bg-surface-primary/50             │
│    └─ Animate: pulse                        │
│                                              │
│ 4. TITLE SKELETON                           │
│    ├─ Ancho: w-2/3                          │
│    ├─ Alto: h-8 (text-2xl)                 │
│    ├─ Radius: rounded-md                    │
│    ├─ Margin: mt-4                          │
│    └─ Animate: pulse (delay 0.1s)          │
│                                              │
│ 5. META SKELETONS (Year | Runtime | Rating) │
│    ├─ Row: flex gap-3                       │
│    ├─ Skeleton 1: w-1/6 h-4               │
│    ├─ Skeleton 2: w-1/6 h-4               │
│    ├─ Skeleton 3: w-1/5 h-6 (badge)       │
│    └─ Animate: pulse (delay 0.2s)          │
│                                              │
│ 6. GENRE BADGES ROW                         │
│    ├─ Flex: gap-2, wrap                     │
│    ├─ Skeleton 1: w-1/5 h-6 rounded-full   │
│    ├─ Skeleton 2: w-1/6 h-6 rounded-full   │
│    ├─ Skeleton 3: w-1/5 h-6 rounded-full   │
│    └─ Animate: pulse (delay 0.1s)          │
│                                              │
│ 7. SEPARATOR                                │
│    └─ border-t border-border/50             │
│                                              │
│ 8. SYNOPSIS SKELETON                        │
│    ├─ 3-4 líneas de texto                   │
│    ├─ Skeleton 1: w-full h-4               │
│    ├─ Skeleton 2: w-full h-4               │
│    ├─ Skeleton 3: w-full h-4               │
│    ├─ Skeleton 4: w-3/4 h-4                │
│    ├─ Spacing: space-y-2                    │
│    └─ Animate: pulse (delay 0.15s)         │
│                                              │
│ 9. BUTTON SKELETONS (Watch, Add, Share)    │
│    ├─ Row: flex gap-3                       │
│    ├─ Button 1: w-32 h-10 rounded-lg       │
│    ├─ Button 2: w-32 h-10 rounded-lg       │
│    ├─ Button 3: w-24 h-10 rounded-lg       │
│    └─ Animate: pulse (delay 0.2s)          │
│                                              │
│ 10. CAST SECTION SKELETON (opcional)        │
│     ├─ Title: w-1/3 h-5                    │
│     ├─ Row: flex gap-4 overflow-x-auto     │
│     ├─ Avatar 1: w-16 h-16 rounded-full    │
│     ├─ Avatar 2: w-16 h-16 rounded-full    │
│     ├─ Avatar 3: w-16 h-16 rounded-full    │
│     └─ Animate: pulse (delay 0.25s)        │
│                                              │
└──────────────────────────────────────────────┘
```

### Detail Page Skeleton - Tailwind Classes

```jsx
<Dialog open={loading}>
  <DialogContent className="max-w-4xl bg-background rounded-2xl">
    {/* Backdrop Image Skeleton */}
    <Skeleton className="w-full h-[360px] rounded-t-2xl" />
    
    {/* Close Button Skeleton */}
    <Skeleton className="absolute top-4 right-4 w-10 h-10 rounded-full" />
    
    {/* Content Container */}
    <div className="space-y-6 p-8">
      {/* Title Skeleton */}
      <Skeleton className="w-2/3 h-8 rounded-md" />
      
      {/* Meta Row Skeletons */}
      <div className="flex gap-3 items-center">
        <Skeleton className="w-1/6 h-4 rounded-sm" />
        <Skeleton className="w-1/6 h-4 rounded-sm" />
        <Skeleton className="w-1/5 h-6 rounded-full" />
      </div>
      
      {/* Genre Badges */}
      <div className="flex gap-2 flex-wrap">
        <Skeleton className="w-1/5 h-6 rounded-full" />
        <Skeleton className="w-1/6 h-6 rounded-full" />
        <Skeleton className="w-1/5 h-6 rounded-full" />
      </div>
      
      <Separator />
      
      {/* Synopsis Skeleton (3 lines) */}
      <div className="space-y-2">
        <Skeleton className="w-full h-4 rounded-md" />
        <Skeleton className="w-full h-4 rounded-md" />
        <Skeleton className="w-3/4 h-4 rounded-md" />
      </div>
      
      {/* Button Skeletons */}
      <div className="flex gap-3">
        <Skeleton className="w-32 h-10 rounded-lg" />
        <Skeleton className="w-32 h-10 rounded-lg" />
        <Skeleton className="w-24 h-10 rounded-lg" />
      </div>
      
      <Separator />
      
      {/* Cast Skeleton */}
      <div className="space-y-3">
        <Skeleton className="w-1/3 h-5 rounded-md" />
        <div className="flex gap-4 overflow-x-auto">
          <Skeleton className="w-16 h-16 rounded-full flex-shrink-0" />
          <Skeleton className="w-16 h-16 rounded-full flex-shrink-0" />
          <Skeleton className="w-16 h-16 rounded-full flex-shrink-0" />
        </div>
      </div>
    </div>
  </DialogContent>
</Dialog>
```

---

## D. SHIMMER EFFECT - OPCIONAL AVANZADO

### Shimmer Animation (Advanced Pattern)

```css
/* Alternativa a pulse: Shimmer effect (onda de luz) */
@keyframes shimmer {
  -100% {
    background-position: 100% 0;
  }
  0% {
    background-position: -100% 0;
  }
}

.skeleton-shimmer {
  background: linear-gradient(
    90deg,
    rgb(17, 19, 26) 0%,     /* surface-primary */
    rgb(21, 24, 39) 50%,    /* surface-secondary */
    rgb(17, 19, 26) 100%    /* surface-primary */
  );
  background-size: 200% 100%;
  animation: shimmer 2s infinite;
}

/* Aplicación */
<Skeleton className="skeleton-shimmer w-full h-[300px]" />
```

### Cuándo Usar Shimmer vs Pulse

| Patrón | Caso de Uso | Pros | Contras |
|--------|----------|------|---------|
| **Pulse** (fade opacity) | Loading general, imágenes | Simple, menos CPU | Menos visual, puede ser aburrido |
| **Shimmer** (onda luz) | Imágenes grandes, hero sections | Más dinámico, Netflix-style | Más CPU, puede ser distracción |

**Recomendación Verflix**: 
- Usar **Pulse** para MovieCard (simple, rápido)
- Usar **Pulse** para Detail (menos carga, focus en contenido)
- Opcional: **Shimmer** solo en Backdrop si se desea efecto premium

---

## E. CRITERIOS DE DECISIÓN - CUÁNDO MOSTRAR SKELETON

### Decision Tree - Skeleton vs Empty vs Loading

```
START: User Action (Load Home, Open Detail, Search)
│
├─ Data fetching initiated?
│  ├─ YES → Show Skeleton
│  │       └─ Duration < 2s: Skeleton
│  │       └─ Duration 2-5s: Skeleton
│  │       └─ Duration > 5s: Skeleton + "Taking longer..." message
│  │
│  └─ NO → Go to next
│
├─ Network error occurred?
│  ├─ YES → Show Error State
│  │       └─ Icon: ⚠️
│  │       └─ Message: "Failed to load"
│  │       └─ Button: "Retry"
│  │
│  └─ NO → Go to next
│
├─ API returned empty array?
│  ├─ YES → Show Empty State
│  │       └─ Icon: 🎬
│  │       └─ Message: "No movies found"
│  │       └─ Action: "Try different search" ou "Browse categories"
│  │
│  └─ NO → Go to next
│
├─ Data successfully loaded?
│  ├─ YES → Show Content (fade in)
│  │       └─ Transition: fade-in 300ms
│  │
│  └─ NO → Error (see above)
│
END
```

### Checklist - SKELETON vs EMPTY vs ERROR

```
┌─────────────────────────────────────────────┐
│ SHOW SKELETON WHEN:                         │
├─────────────────────────────────────────────┤
│ ✓ Fetch iniciado (isLoading = true)        │
│ ✓ Data === undefined o null               │
│ ✓ Duration < 5 segundos                    │
│ ✓ Usuario espera muy activamente          │
│ ✓ Grid está recargándose (tab switch)     │
│ ✓ Modal Detail se está abriendo          │
│ ✓ Search autocomplete buscando            │
│                                            │
│ Duración: 2-5 segundos típico              │
│ Transición: fade-in 200ms                  │
│ Animación: pulse 2s infinite               │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│ SHOW EMPTY STATE WHEN:                      │
├─────────────────────────────────────────────┤
│ ✓ Fetch completó (isLoading = false)      │
│ ✓ Data = [] (array vacío)                 │
│ ✓ NO es error de red                       │
│ ✓ Búsqueda sin resultados                 │
│ ✓ "My Lists" cuando no hay películas      │
│                                            │
│ Componentes:                                │
│ - Icon: 🎬 (cine) o 🔍 (búsqueda)        │
│ - Headline: "Sin resultados"              │
│ - Subtext: "Intenta otra búsqueda"        │
│ - Button: "Volver a Inicio" / "Explorar"  │
│                                            │
│ Transición: fade-in 300ms                  │
│ Duración: Permanente (hasta nueva búsqueda)
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│ SHOW ERROR STATE WHEN:                      │
├─────────────────────────────────────────────┤
│ ✓ Network error (catch en fetch)           │
│ ✓ HTTP status 4xx/5xx                      │
│ ✓ Timeout > 5 segundos                     │
│ ✓ CORS error                               │
│ ✓ API quota excedido                       │
│                                            │
│ Componentes:                                │
│ - Icon: ⚠️ (warning) o 🔴 (error)        │
│ - Headline: "Error al cargar"             │
│ - Subtext: Error message (ej: "Timeout")  │
│ - Button: "Reintentar" + "Ir a Inicio"    │
│                                            │
│ Transición: fade-in 300ms                  │
│ Duración: Permanente (hasta retry)         │
│ Toast: Mostrar error toast simultáneamente│
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│ HIDE SKELETON WHEN:                         │
├─────────────────────────────────────────────┤
│ ✓ Data loaded (isLoading = false)         │
│ ✓ API response recibida                    │
│ ✓ Timeout alcanzado (5s)                  │
│ ✓ Error capturado                          │
│                                            │
│ Acción: Fade-out skeleton + fade-in content
│ Timing: 300ms transition                   │
│ Nota: Nunca mostrar skeleton + content juntos
└─────────────────────────────────────────────┘
```

---

## F. IMPLEMENTACIÓN LÓGICA - ESTADOS EN REACT

### State Machine Pattern

```jsx
// Estados posibles en React
const LOAD_STATES = {
  IDLE: 'idle',           // No hay petición
  LOADING: 'loading',     // Fetching data
  SUCCESS: 'success',     // Data recibida y no vacía
  EMPTY: 'empty',         // Data recibida pero vacía
  ERROR: 'error'          // Error en fetch o API
};

// Hook personalizado
function useMovieLoad() {
  const [state, setState] = useState(LOAD_STATES.IDLE);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchMovies = async () => {
      setState(LOAD_STATES.LOADING);
      try {
        const response = await fetch('/api/trending');
        if (!response.ok) throw new Error('API error');
        const movies = await response.json();
        
        if (movies.length === 0) {
          setState(LOAD_STATES.EMPTY);
          setData([]);
        } else {
          setState(LOAD_STATES.SUCCESS);
          setData(movies);
        }
      } catch (err) {
        setState(LOAD_STATES.ERROR);
        setError(err.message);
      }
    };
    
    fetchMovies();
  }, []);
  
  return { state, data, error };
}

// Uso en componente
function MovieGrid() {
  const { state, data, error } = useMovieLoad();
  
  switch (state) {
    case LOAD_STATES.LOADING:
      return <MovieCardSkeletons count={6} />;
    
    case LOAD_STATES.SUCCESS:
      return (
        <div className="grid gap-6 grid-cols-6">
          {data.map(movie => <MovieCard key={movie.id} {...movie} />)}
        </div>
      );
    
    case LOAD_STATES.EMPTY:
      return <EmptyState icon="🎬" message="No movies found" />;
    
    case LOAD_STATES.ERROR:
      return <ErrorState message={error} onRetry={() => window.location.reload()} />;
    
    default:
      return null;
  }
}
```

### MovieCardSkeletons Component

```jsx
function MovieCardSkeletons({ count = 6 }) {
  return (
    <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
      {Array.from({ length: count }).map((_, i) => (
        <Card key={i} className="rounded-2xl overflow-hidden">
          <Skeleton className="w-full h-[300px] rounded-xl" />
          <Separator />
          <div className="p-4 space-y-2">
            <Skeleton className="w-4/5 h-4 rounded-md" />
            <div className="flex gap-2">
              <Skeleton className="w-1/4 h-3 rounded-sm" />
              <Skeleton className="w-1/3 h-3 rounded-sm" />
              <Skeleton className="w-1/4 h-3 rounded-sm" />
            </div>
            <div className="flex gap-1">
              <Skeleton className="w-1/3 h-6 rounded-full" />
              <Skeleton className="w-1/4 h-6 rounded-full" />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
```

### DetailSkeleton Component

```jsx
function DetailSkeleton() {
  return (
    <Dialog open={true}>
      <DialogContent className="max-w-4xl bg-background rounded-2xl">
        {/* Backdrop Skeleton */}
        <Skeleton className="w-full h-[360px] rounded-t-2xl" />
        
        {/* Close Button Skeleton */}
        <Skeleton className="absolute top-4 right-4 w-10 h-10 rounded-full" />
        
        {/* Content */}
        <div className="space-y-6 p-8">
          {/* Title */}
          <Skeleton className="w-2/3 h-8 rounded-md" />
          
          {/* Meta */}
          <div className="flex gap-3 items-center">
            <Skeleton className="w-1/6 h-4 rounded-sm" />
            <Skeleton className="w-1/6 h-4 rounded-sm" />
            <Skeleton className="w-1/5 h-6 rounded-full" />
          </div>
          
          {/* Genres */}
          <div className="flex gap-2 flex-wrap">
            <Skeleton className="w-1/5 h-6 rounded-full" />
            <Skeleton className="w-1/6 h-6 rounded-full" />
            <Skeleton className="w-1/5 h-6 rounded-full" />
          </div>
          
          <Separator />
          
          {/* Synopsis - 3 lines */}
          <div className="space-y-2">
            <Skeleton className="w-full h-4 rounded-md" />
            <Skeleton className="w-full h-4 rounded-md" />
            <Skeleton className="w-3/4 h-4 rounded-md" />
          </div>
          
          {/* Buttons */}
          <div className="flex gap-3">
            <Skeleton className="w-32 h-10 rounded-lg" />
            <Skeleton className="w-32 h-10 rounded-lg" />
            <Skeleton className="w-24 h-10 rounded-lg" />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
```

---

## G. TIMING Y DURACIÓN

### Skeleton Duration Targets

```
┌─────────────────────────────────────────────┐
│ SKELETON TIMING TARGETS                     │
├─────────────────────────────────────────────┤
│                                             │
│ Escenario: Home Grid (6 movies)             │
│ ├─ Network: 3G / 4G (típico)               │
│ ├─ Duration: 1-2 segundos                 │
│ ├─ Skeleton visible: 1-2s                  │
│ └─ Feels: Rápido y responsive             │
│                                             │
│ Escenario: Detail Modal (backdrop 16:9)    │
│ ├─ Network: 3G / 4G                        │
│ ├─ Duration: 1-3 segundos                 │
│ ├─ Skeleton visible: 1-3s                  │
│ └─ Feels: Snappy, user expects waiting    │
│                                             │
│ Escenario: Search Results (grid)           │
│ ├─ Network: 3G / 4G                        │
│ ├─ Duration: 2-4 segundos (debounce 400ms)│
│ ├─ Skeleton visible: 2-4s                  │
│ └─ Feels: Normal, debounce oculta delay   │
│                                             │
│ Timeout Handling:                           │
│ ├─ Si > 5 segundos: Mostrar "Taking longer..."│
│ ├─ Si > 10 segundos: Mostrar error/retry  │
│ └─ Máximo: 30s timeout (fallback error)    │
│                                             │
└─────────────────────────────────────────────┘
```

### Transición de Skeleton a Content

```css
/* Fade out skeleton, fade in content */
@keyframes fadeOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.skeleton-exit {
  animation: fadeOut 300ms ease-out forwards;
}

.content-enter {
  animation: fadeIn 300ms ease-in forwards;
}
```

---

## H. CHECKLIST FINAL

### Implementación Checklist

```
SKELETON PATTERNS:
□ MovieCard Skeleton creado (Image + Title + Meta + Genres)
□ Detail Skeleton creado (Backdrop + Title + Meta + Genres + Synopsis + Buttons)
□ Animación pulse 2s aplicada
□ Shimmer effect opcional disponible
□ Responder: Tailwind classes correctas

LÓGICA DE DECISIÓN:
□ State machine (IDLE → LOADING → SUCCESS/EMPTY/ERROR)
□ Mostrar Skeleton cuando isLoading = true
□ Mostrar Empty state cuando data.length === 0
□ Mostrar Error state cuando fetch falla
□ Nunca mostrar skeleton + content simultaneously

TIMING:
□ Skeleton anima por 2-5 segundos típicamente
□ Transición fade-in/fade-out: 300ms
□ Timeout: 30s máximo
□ Debounce en search: 400ms

TESTING:
□ Simular lentitud de red (DevTools throttle)
□ Verificar skeleton visible en 3G/4G
□ Verificar empty state (array vacío)
□ Verificar error state (fetch error)
□ Verificar que skeleton + content no superponen
□ Check responsive: mobile/tablet/desktop

ACCESSIBILITY:
□ Skeleton marcado como aria-busy="true"
□ Loading message announced (aria-live)
□ No trapear usuario en skeleton (skip con keyboard)
□ Text color readable en skeleton (contrast)
□ Botones disabled durante loading

PERFORMANCE:
□ Skeleton use minimal CPU (no JS complexity)
□ Pulse animation smooth (60 FPS)
□ Skeleton render time < 10ms
□ No jank durante transición skeleton → content
```

---

## I. REFERENCIAS

### Documentación Oficial
- [shadcn/ui Skeleton](https://ui.shadcn.com/docs/components/skeleton)
- [Tailwind CSS Animations](https://tailwindcss.com/docs/animation)
- [MDN: Skeleton Screens Best Practices](https://developer.mozilla.org/en-US/docs/Web/Performance)

### Ejemplos Referencias
- Netflix: Skeleton en grids + modales
- YouTube: Skeleton en video grid
- Spotify: Skeleton animado en playlists

### Tools para Testing
- Chrome DevTools: Network throttling
- Lighthouse: Performance auditing
- WebAIM: Contrast checking for skeleton colors

---

**Estado**: Especificación completada  
**Próximo paso**: Implementar componentes <MovieCardSkeletons /> y <DetailSkeleton /> en React  
**Referencia**: Ver [wireframes.md](wireframes.md) para contexto visual