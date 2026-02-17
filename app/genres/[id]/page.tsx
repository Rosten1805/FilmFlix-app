import Image from 'next/image';
import Link from 'next/link';
import { tmdbClient } from '@/lib/tmdb';
import Footer from '@/components/Footer';
import HeroBanner from '@/components/HeroBanner';
import GenreMoviesGrid from '@/components/GenreMoviesGrid';
import SearchBar from '@/components/SearchBar';

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

      {/* Hero Banner con películas del género */}
      <HeroBanner movies={heroMovies} />

      {/* Main Content */}
      <main className="mx-auto px-[65px] py-12">
        {/* Título y breadcrumb */}
        <div className="mb-8 flex items-center gap-3">
          <Link href="/genres" className="text-zinc-400 transition-colors hover:text-white text-sm">
            Géneros
          </Link>
          <svg className="h-4 w-4 text-zinc-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <h2 className="text-3xl font-bold text-white">{genreName}</h2>
          <span className="rounded-full bg-zinc-800 px-3 py-1 text-sm text-zinc-400">
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
