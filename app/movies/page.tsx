import { tmdbClient } from '@/lib/tmdb';
import MovieSlider from '@/components/MovieSlider';
import SearchBar from '@/components/SearchBar';
import HeroBanner from '@/components/HeroBanner';
import Footer from '@/components/Footer';
import Image from 'next/image';
import Link from 'next/link';

export default async function MoviesPage() {
  // Fetch películas desde TMDB
  const recentMoviesData = await tmdbClient.getRecentMovies();
  const popularMoviesData = await tmdbClient.getPopularMovies();
  const topRatedMoviesData = await tmdbClient.getTopRatedMovies();
  const classicMoviesData = await tmdbClient.getClassicMovies();

  // Buscar películas específicas para el hero
  const shawshankSearch = await tmdbClient.searchMovies('The Shawshank Redemption');
  const darkKnightSearch = await tmdbClient.searchMovies('The Dark Knight');
  const inceptionSearch = await tmdbClient.searchMovies('Inception');
  const parasiteSearch = await tmdbClient.searchMovies('Parasite');
  const oppenheimerSearch = await tmdbClient.searchMovies('Oppenheimer');
  const interstellarSearch = await tmdbClient.searchMovies('Interstellar');
  const godfatherSearch = await tmdbClient.searchMovies('The Godfather');

  // Crear lista de películas para el hero con las películas específicas
  const heroMovies = [];

  // Agregar películas específicas
  if (shawshankSearch.results.length > 0) heroMovies.push(shawshankSearch.results[0]);
  if (darkKnightSearch.results.length > 0) heroMovies.push(darkKnightSearch.results[0]);
  if (inceptionSearch.results.length > 0) heroMovies.push(inceptionSearch.results[0]);
  if (parasiteSearch.results.length > 0) heroMovies.push(parasiteSearch.results[0]);
  if (oppenheimerSearch.results.length > 0) heroMovies.push(oppenheimerSearch.results[0]);
  if (interstellarSearch.results.length > 0) heroMovies.push(interstellarSearch.results[0]);
  if (godfatherSearch.results.length > 0) heroMovies.push(godfatherSearch.results[0]);

  // Completar con películas recientes hasta llegar a 10, filtrando las que no tengan imágenes
  const remainingSlots = 10 - heroMovies.length;
  if (remainingSlots > 0) {
    const filteredMovies = recentMoviesData.results.filter(
      movie => movie.poster_path !== null && movie.backdrop_path !== null
    );
    heroMovies.push(...filteredMovies.slice(0, remainingSlots));
  }

  return (
    <div className="min-h-screen bg-[#0b0b0f] text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-zinc-800/50 bg-black/95 backdrop-blur-sm">
        <div className="mx-auto px-[65px] py-5">
          <div className="flex items-center gap-8">
            {/* Logo */}
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

            {/* Navigation Links */}
            <nav className="hidden flex-1 gap-6 md:flex">
              <Link href="/" className="cursor-pointer text-sm font-medium text-zinc-300 transition-colors hover:text-white">
                Inicio
              </Link>
              <Link href="/movies" className="cursor-pointer text-sm font-medium text-white transition-colors hover:text-white">
                Películas
              </Link>
              <Link href="/tv" className="cursor-pointer text-sm font-medium text-zinc-300 transition-colors hover:text-white">
                Series
              </Link>
              <Link href="/genres" className="cursor-pointer text-sm font-medium text-zinc-300 transition-colors hover:text-white">
                Géneros
              </Link>
              <a href="/milista" className="cursor-pointer text-sm font-medium text-zinc-300 transition-colors hover:text-white">
                Mi Lista
              </a>
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center gap-4">
              {/* Search Bar - Always Visible */}
              <SearchBar className="w-[280px]" />

              {/* Sign In Button */}
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
      <main className="mx-auto px-[65px] py-8">
        {/* Recientes Section */}
        <section className="mb-12">
          <MovieSlider
            movies={recentMoviesData.results}
            title="Recientes"
          />
        </section>

        {/* Películas Populares */}
        <section className="mb-12">
          <MovieSlider
            movies={popularMoviesData.results}
            title="Populares"
          />
        </section>

        {/* Películas Mejor Valoradas */}
        <section className="mb-12">
          <MovieSlider
            movies={topRatedMoviesData.results}
            title="Mejor Valoradas"
          />
        </section>

        {/* Clásicos */}
        <section className="mb-12">
          <MovieSlider
            movies={classicMoviesData.results}
            title="Clásicos"
          />
        </section>
        <Footer />
      </main>
    </div>
  );
}
