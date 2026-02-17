import Image from 'next/image';
import Link from 'next/link';
import { tmdbClient } from '@/lib/tmdb';
import SearchBar from '@/components/SearchBar';
import MovieCard from '@/components/MovieCard';
import Footer from '@/components/Footer';

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q } = await searchParams;
  const query = q?.trim() ?? '';

  const [moviesData, showsData] = query
    ? await Promise.all([
        tmdbClient.searchMovies(query, 1),
        tmdbClient.searchTVShows(query, 1),
      ])
    : [{ results: [], total_results: 0 }, { results: [], total_results: 0 }];

  const totalResults = moviesData.total_results + showsData.total_results;

  return (
    <div className="min-h-screen bg-[#0b0b0f] text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-zinc-800/50 bg-black/95 backdrop-blur-sm">
        <div className="mx-auto px-[65px] py-5">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2 cursor-pointer">
              <Image
                src="/logo-filmflix.png"
                alt="FilmFlix Logo"
                width={160}
                height={53}
                className="h-12 w-auto"
                priority
              />
            </Link>

            <nav className="hidden flex-1 gap-6 md:flex">
              <Link href="/" className="cursor-pointer text-sm font-medium text-zinc-300 transition-colors hover:text-white">Inicio</Link>
              <Link href="/movies" className="cursor-pointer text-sm font-medium text-zinc-300 transition-colors hover:text-white">Películas</Link>
              <Link href="/tv" className="cursor-pointer text-sm font-medium text-zinc-300 transition-colors hover:text-white">Series</Link>
              <Link href="/genres" className="cursor-pointer text-sm font-medium text-zinc-300 transition-colors hover:text-white">Géneros</Link>
              <a href="/milista" className="cursor-pointer text-sm font-medium text-zinc-300 transition-colors hover:text-white">Mi Lista</a>
            </nav>

            <div className="flex items-center gap-4">
              <SearchBar className="w-[280px]" />
              <Link href="/login" className="cursor-pointer flex h-9 items-center gap-2 text-sm font-medium text-zinc-300 transition-colors hover:text-white focus:outline-none focus:text-white">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
                Iniciar sesión
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto px-[65px] py-12">
        {/* Título */}
        <div className="mb-8">
          {query ? (
            <>
              <h1 className="text-3xl font-bold text-white">
                Resultados para <span className="text-red-500">&quot;{query}&quot;</span>
              </h1>
              <p className="mt-2 text-zinc-400">
                {totalResults.toLocaleString('es-ES')} resultados encontrados
              </p>
            </>
          ) : (
            <h1 className="text-3xl font-bold text-white">Buscar</h1>
          )}
        </div>

        {/* Sin query */}
        {!query && (
          <div className="flex flex-col items-center py-24 text-center">
            <svg className="mb-4 h-16 w-16 text-zinc-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <p className="text-lg text-zinc-500">Escribe algo en el buscador para empezar</p>
          </div>
        )}

        {/* Películas */}
        {moviesData.results.length > 0 && (
          <section className="mb-12">
            <div className="mb-5 flex items-center gap-3">
              <h2 className="text-xl font-bold text-white">Películas</h2>
              <span className="rounded-full bg-zinc-800 px-3 py-1 text-sm text-zinc-400">
                {moviesData.total_results.toLocaleString('es-ES')}
              </span>
            </div>
            <div className="grid grid-cols-4 gap-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 xl:grid-cols-8">
              {moviesData.results.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          </section>
        )}

        {/* Series */}
        {showsData.results.length > 0 && (
          <section className="mb-12">
            <div className="mb-5 flex items-center gap-3">
              <h2 className="text-xl font-bold text-white">Series</h2>
              <span className="rounded-full bg-zinc-800 px-3 py-1 text-sm text-zinc-400">
                {showsData.total_results.toLocaleString('es-ES')}
              </span>
            </div>
            <div className="grid grid-cols-4 gap-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 xl:grid-cols-8">
              {showsData.results.map((show) => (
                <MovieCard key={show.id} movie={show} />
              ))}
            </div>
          </section>
        )}

        {/* Sin resultados */}
        {query && moviesData.results.length === 0 && showsData.results.length === 0 && (
          <div className="flex flex-col items-center py-24 text-center">
            <svg className="mb-4 h-16 w-16 text-zinc-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-lg text-white">No se encontraron resultados</p>
            <p className="mt-2 text-zinc-500">Prueba con otro término de búsqueda</p>
          </div>
        )}
        <Footer />
      </main>
    </div>
  );
}
