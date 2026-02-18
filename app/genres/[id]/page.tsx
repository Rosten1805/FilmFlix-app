import Link from 'next/link';
import { tmdbClient } from '@/lib/tmdb';
import Footer from '@/components/Footer';
import HeroBanner from '@/components/HeroBanner';
import GenreMoviesGrid from '@/components/GenreMoviesGrid';

interface GenrePageProps {
  params: Promise<{ id: string }>;
}

export default async function GenrePage({ params }: GenrePageProps) {
  const { id } = await params;
  const genreId = parseInt(id, 10);

  // Obtener nombre del género y películas en paralelo
  const [genresData, page1, page2] = await Promise.all([
    tmdbClient.getMovieGenres(),
    tmdbClient.getMoviesByGenre(genreId, 1),
    tmdbClient.getMoviesByGenre(genreId, 2),
  ]);

  const genre = genresData.genres.find((g) => g.id === genreId);
  const genreName = genre?.name ?? 'Género';

  // Películas iniciales (40 = 2 páginas de 20)
  const initialMovies = [...page1.results, ...page2.results].filter(
    (m) => m.poster_path && m.backdrop_path
  );

  // Hero: top 10 películas con backdrop
  const heroMovies = page1.results
    .filter((m) => m.backdrop_path)
    .slice(0, 10);

  const totalPages = page1.total_pages;

  return (
    <div className="min-h-screen bg-[#000000] text-white">
      {/* Hero Banner con películas del género */}
      <HeroBanner movies={heroMovies} />

      {/* Main Content */}
      <main className="mx-auto px-4 sm:px-6 lg:px-[65px] py-8 sm:py-12">
        {/* Título y breadcrumb */}
        <div className="mb-6 sm:mb-8 flex flex-wrap items-center gap-2 sm:gap-3">
          <Link href="/genres" className="text-zinc-400 transition-colors hover:text-white text-sm">
            Géneros
          </Link>
          <svg className="h-4 w-4 text-zinc-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">{genreName}</h2>
          <span className="rounded-full bg-zinc-800 px-3 py-1 text-xs sm:text-sm text-zinc-400 whitespace-nowrap">
            {page1.total_results.toLocaleString('es-ES')} películas
          </span>
        </div>

        {/* Grid de películas con "Ver más" */}
        <GenreMoviesGrid
          initialMovies={initialMovies}
          genreId={genreId}
          totalPages={totalPages}
        />
        <Footer />
      </main>
    </div>
  );
}
