import { tmdbClient } from '@/lib/tmdb';
import HeroBanner from '@/components/HeroBanner';
import FavoritesGrid from '@/components/FavoritesGrid';
import Footer from '@/components/Footer';

export default async function MiListaPage() {
  // Hero: películas y series famosas no usadas en otros heros
  const [
    forrestGumpSearch,
    avengersSearch,
    jurassicParkSearch,
    fightClubSearch,
    backToFutureSearch,
    breakingBadSearch,
    gameOfThronesSearch,
    witcherSearch,
    blackMirrorSearch,
    lastOfUsSearch,
  ] = await Promise.all([
    tmdbClient.searchMovies('Forrest Gump'),
    tmdbClient.searchMovies('Avengers Endgame'),
    tmdbClient.searchMovies('Jurassic Park 1993'),
    tmdbClient.searchMovies('Fight Club'),
    tmdbClient.searchMovies('Back to the Future'),
    tmdbClient.searchTVShows('Breaking Bad'),
    tmdbClient.searchTVShows('Game of Thrones'),
    tmdbClient.searchTVShows('The Witcher'),
    tmdbClient.searchTVShows('Black Mirror'),
    tmdbClient.searchTVShows('The Last of Us'),
  ]);

  const heroItems = [
    forrestGumpSearch.results[0],
    avengersSearch.results[0],
    jurassicParkSearch.results[0],
    fightClubSearch.results[0],
    backToFutureSearch.results[0],
    breakingBadSearch.results[0],
    gameOfThronesSearch.results[0],
    witcherSearch.results[0],
    blackMirrorSearch.results[0],
    lastOfUsSearch.results[0],
  ].filter(Boolean);

  return (
    <div className="min-h-screen bg-[#000000] text-white">
      {/* Hero Banner  mezcla de películas y series */}
      <HeroBanner movies={heroItems} />

      {/* Main Content */}
      <main className="mx-auto px-4 sm:px-6 lg:px-[65px] py-8 sm:py-12">
        <FavoritesGrid />
        <Footer />
      </main>
    </div>
  );
}
