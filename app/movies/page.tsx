import { tmdbClient } from '@/lib/tmdb';
import MovieSlider from '@/components/MovieSlider';
import HeroBanner from '@/components/HeroBanner';
import Footer from '@/components/Footer';

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
    <div className="min-h-screen bg-[#000000] text-white">
      {/* Hero Banner */}
      <HeroBanner movies={heroMovies} />

      {/* Main Content */}
      <main className="mx-auto px-4 sm:px-6 lg:px-[65px] py-6 sm:py-8">
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
