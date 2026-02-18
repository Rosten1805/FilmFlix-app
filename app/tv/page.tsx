import { tmdbClient } from '@/lib/tmdb';
import MovieSlider from '@/components/MovieSlider';
import HeroBanner from '@/components/HeroBanner';
import Footer from '@/components/Footer';

export default async function TVShowsPage() {
  // Fetch series desde TMDB
  const onTheAirData = await tmdbClient.getOnTheAirTVShows();
  const popularTVShowsData = await tmdbClient.getPopularTVShows();
  const topRatedTVShowsData = await tmdbClient.getTopRatedTVShows();
  const animeTVShowsData = await tmdbClient.getAnimeTVShows();

  // Buscar series específicas para el hero
  const falloutSearch = await tmdbClient.searchTVShows('Fallout');
  const strangerThingsSearch = await tmdbClient.searchTVShows('Stranger Things');
  const modernFamilySearch = await tmdbClient.searchTVShows('Modern Family');
  const ringsOfPowerSearch = await tmdbClient.searchTVShows('The Rings of Power');
  const jujutsuKaisenSearch = await tmdbClient.searchTVShows('Jujutsu Kaisen');
  const charmedSearch = await tmdbClient.searchTVShows('Charmed');
  const buffySearch = await tmdbClient.searchTVShows('Buffy the Vampire Slayer');

  // Crear lista de series para el hero con las series específicas
  const heroTVShows = [];

  // Agregar Fallout como primera serie
  if (falloutSearch.results.length > 0) heroTVShows.push(falloutSearch.results[0]);

  // Agregar las demás series específicas
  if (strangerThingsSearch.results.length > 0) heroTVShows.push(strangerThingsSearch.results[0]);
  if (modernFamilySearch.results.length > 0) heroTVShows.push(modernFamilySearch.results[0]);
  if (ringsOfPowerSearch.results.length > 0) heroTVShows.push(ringsOfPowerSearch.results[0]);
  if (jujutsuKaisenSearch.results.length > 0) heroTVShows.push(jujutsuKaisenSearch.results[0]);
  if (charmedSearch.results.length > 0) heroTVShows.push(charmedSearch.results[0]);
  if (buffySearch.results.length > 0) heroTVShows.push(buffySearch.results[0]);

  // Completar con series en emisión hasta llegar a 10, filtrando "Raw"
  const remainingSlots = 10 - heroTVShows.length;
  if (remainingSlots > 0) {
    const filteredSeries = onTheAirData.results.filter(
      show => !show.name.toLowerCase().includes('raw')
    );
    heroTVShows.push(...filteredSeries.slice(0, remainingSlots));
  }

  return (
    <div className="min-h-screen bg-[#000000] text-white">
      {/* Hero Banner */}
      <HeroBanner movies={heroTVShows} mediaType="tv" />

      {/* Main Content */}
      <main className="mx-auto px-4 sm:px-6 lg:px-[65px] py-6 sm:py-8">
        {/* Series de TV Section */}
        <section className="mb-12">
          <MovieSlider
            movies={onTheAirData.results}
            title="Series de TV"
          />
        </section>

        {/* Series Populares */}
        <section className="mb-12">
          <MovieSlider
            movies={popularTVShowsData.results}
            title="Populares"
          />
        </section>

        {/* Series Mejor Valoradas */}
        <section className="mb-12">
          <MovieSlider
            movies={topRatedTVShowsData.results}
            title="Mejor Valoradas"
          />
        </section>

        {/* Anime */}
        <section className="mb-12">
          <MovieSlider
            movies={animeTVShowsData.results}
            title="Animación"
          />
        </section>
        <Footer />
      </main>
    </div>
  );
}
