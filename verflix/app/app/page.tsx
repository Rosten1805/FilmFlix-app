import { tmdbClient } from '@/lib/tmdb';
import MovieSlider from '@/components/MovieSlider';
import SearchBar from '@/components/SearchBar';
import HeroBanner from '@/components/HeroBanner';
import Footer from '@/components/Footer';
import Image from 'next/image';
import Link from 'next/link';

export default async function Home() {
  // Fetch películas desde TMDB
  const nowPlayingData = await tmdbClient.getNowPlayingMovies();
  const popularMoviesData = await tmdbClient.getPopularMovies();
  const topRatedMoviesData = await tmdbClient.getTopRatedMovies();

  // Fetch series desde TMDB
  const popularTVShowsData = await tmdbClient.getPopularTVShows();

  // Fetch películas de animación
  const animationMoviesData = await tmdbClient.getAnimationMovies();

  // Hero: las 10 películas en cartelera más populares (dinámico)
  const heroMovies = nowPlayingData.results.slice(0, 10);

  return (
    <div className="min-h-screen bg-[#0b0b0f] text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-zinc-800/50 bg-black/95 backdrop-blur-sm">
        <div className="mx-auto px-[65px] py-5">
          <div className="flex items-center gap-8">
            {/* Logo */}
            <a href="/" className="flex items-center gap-2 cursor-pointer">
              <Image
                src="/logo-filmflix.png"
                alt="FilmFlix Logo"
                width={160}
                height={53}
                className="h-12 w-auto"
                priority
              />
            </a>

            {/* Navigation Links */}
            <nav className="hidden flex-1 gap-6 md:flex">
              <a href="/" className="cursor-pointer text-sm font-medium text-white transition-colors hover:text-white">
                Inicio
              </a>
              <a href="/movies" className="cursor-pointer text-sm font-medium text-zinc-300 transition-colors hover:text-white">
                Películas
              </a>
              <a href="/tv" className="cursor-pointer text-sm font-medium text-zinc-300 transition-colors hover:text-white">
                Series
              </a>
              <a href="/genres" className="cursor-pointer text-sm font-medium text-zinc-300 transition-colors hover:text-white">
                Géneros
              </a>
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
        {/* Tendencias Section */}
        <section className="mb-12">
          <MovieSlider
            movies={nowPlayingData.results}
            title="Tendencias"
          />
        </section>

        {/* Películas Populares */}
        <section className="mb-12">
          <MovieSlider
            movies={popularMoviesData.results}
            title="Películas Populares"
          />
        </section>

        {/* Series Populares */}
        <section className="mb-12">
          <MovieSlider
            movies={popularTVShowsData.results}
            title="Series Populares"
          />
        </section>

        {/* Películas Mejor Valoradas */}
        <section className="mb-12">
          <MovieSlider
            movies={topRatedMoviesData.results}
            title="Mejor Valoradas"
          />
        </section>

        {/* Animación */}
        <section className="mb-12">
          <MovieSlider
            movies={animationMoviesData.results}
            title="Animación"
          />
        </section>
        <Footer />
      </main>
    </div>
  );
}
