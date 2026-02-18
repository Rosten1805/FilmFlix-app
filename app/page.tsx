import { tmdbClient } from '@/lib/tmdb';
import MovieSlider from '@/components/MovieSlider';
import HeroBanner from '@/components/HeroBanner';
import Footer from '@/components/Footer';

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
    <div className="min-h-screen bg-[#000000] text-white">
      {/* Hero Banner */}
      <HeroBanner movies={heroMovies} />

      {/* Main Content */}
      <main className="mx-auto px-4 sm:px-6 lg:px-[65px] py-6 sm:py-8">
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
