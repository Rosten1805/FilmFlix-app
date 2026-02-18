import { tmdbClient } from '@/lib/tmdb';
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
    <div className="min-h-screen bg-[#000000] text-white">
      {/* Main Content */}
      <main className="mx-auto px-4 sm:px-6 lg:px-[65px] py-8 sm:py-12">
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
            <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7">
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
            <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7">
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
