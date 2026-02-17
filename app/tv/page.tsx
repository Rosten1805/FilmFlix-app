import { tmdbClient } from '@/lib/tmdb';
import MovieSlider from '@/components/MovieSlider';
import SearchBar from '@/components/SearchBar';
import HeroBanner from '@/components/HeroBanner';
import Footer from '@/components/Footer';
import Image from 'next/image';
import Link from 'next/link';

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
              <Link href="/movies" className="cursor-pointer text-sm font-medium text-zinc-300 transition-colors hover:text-white">
                Películas
              </Link>
              <Link href="/tv" className="cursor-pointer text-sm font-medium text-white transition-colors hover:text-white">
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
      <HeroBanner movies={heroTVShows} mediaType="tv" />

      {/* Main Content */}
      <main className="mx-auto px-[65px] py-8">
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
