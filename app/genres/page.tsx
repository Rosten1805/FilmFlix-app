import Image from 'next/image';
import Link from 'next/link';
import { tmdbClient } from '@/lib/tmdb';
import HeroBanner from '@/components/HeroBanner';
import SearchBar from '@/components/SearchBar';
import Footer from '@/components/Footer';

export default async function GenresPage() {
  // Hero: 10 películas icónicas de distintos géneros
  const [
    matrixSearch,
    savingPrivateRyanSearch,
    interstellarSearch,
    godfatherSearch,
    titanicSearch,
    gladiatorSearch,
    parasiteSearch,
    pulpFictionSearch,
    dunkirkSearch,
    schindlerSearch,
  ] = await Promise.all([
    tmdbClient.searchMovies('The Matrix'),
    tmdbClient.searchMovies('Saving Private Ryan'),
    tmdbClient.searchMovies('Interstellar'),
    tmdbClient.searchMovies('The Godfather'),
    tmdbClient.searchMovies('Titanic'),
    tmdbClient.searchMovies('Gladiator'),
    tmdbClient.searchMovies('Parasite Bong Joon'),
    tmdbClient.searchMovies('Pulp Fiction'),
    tmdbClient.searchMovies('Dunkirk'),
    tmdbClient.searchMovies("Schindler's List"),
  ]);

  const heroMovies = [
    matrixSearch.results[0],
    savingPrivateRyanSearch.results[0],
    interstellarSearch.results[0],
    godfatherSearch.results[0],
    titanicSearch.results[0],
    gladiatorSearch.results[0],
    parasiteSearch.results[0],
    pulpFictionSearch.results[0],
    dunkirkSearch.results[0],
    schindlerSearch.results[0],
  ].filter(Boolean);

  // Obtener géneros y su conteo en paralelo
  const genresData = await tmdbClient.getMovieGenres();
  const genres = genresData.genres;

  const genreCounts = await Promise.all(
    genres.map((genre) => tmdbClient.getMoviesByGenre(genre.id, 1))
  );

  const genresWithCount = genres.map((genre, i) => ({
    ...genre,
    totalResults: genreCounts[i].total_results,
  }));

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
              <Link href="/" className="cursor-pointer text-sm font-medium text-zinc-300 transition-colors hover:text-white">
                Inicio
              </Link>
              <Link href="/movies" className="cursor-pointer text-sm font-medium text-zinc-300 transition-colors hover:text-white">
                Películas
              </Link>
              <Link href="/tv" className="cursor-pointer text-sm font-medium text-zinc-300 transition-colors hover:text-white">
                Series
              </Link>
              <Link href="/genres" className="cursor-pointer text-sm font-medium text-white transition-colors hover:text-white">
                Géneros
              </Link>
              <a href="/milista" className="cursor-pointer text-sm font-medium text-zinc-300 transition-colors hover:text-white">
                Mi Lista
              </a>
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

      {/* Hero Banner */}
      <HeroBanner movies={heroMovies} />

      {/* Main Content */}
      <main className="mx-auto px-[65px] py-12">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white">Géneros</h2>
          <p className="mt-2 text-zinc-400">Explora películas por género</p>
        </div>

        {/* Genres Grid */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {genresWithCount.map((genre) => (
            <Link
              key={genre.id}
              href={`/genres/${genre.id}`}
              className="group flex items-center justify-between rounded-lg bg-zinc-800/80 px-5 py-4 transition-all hover:bg-zinc-700/80 hover:border-red-600 border border-transparent"
            >
              <span className="text-sm font-medium text-white group-hover:text-red-400 transition-colors">
                {genre.name}
              </span>
              <span className="ml-3 shrink-0 rounded-md bg-zinc-700/80 px-2.5 py-1 text-xs font-semibold text-zinc-300 group-hover:bg-zinc-600/80 transition-colors">
                {genre.totalResults.toLocaleString('es-ES')}
              </span>
            </Link>
          ))}
        </div>
        <Footer />
      </main>
    </div>
  );
}
