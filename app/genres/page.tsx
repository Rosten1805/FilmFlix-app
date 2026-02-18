import Link from 'next/link';
import { tmdbClient } from '@/lib/tmdb';
import HeroBanner from '@/components/HeroBanner';
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
    <div className="min-h-screen bg-[#000000] text-white">
      {/* Hero Banner */}
      <HeroBanner movies={heroMovies} />

      {/* Main Content */}
      <main className="mx-auto px-4 sm:px-6 lg:px-[65px] py-8 sm:py-12">
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
