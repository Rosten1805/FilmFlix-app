import Image from 'next/image';
import Link from 'next/link';
import { tmdbClient } from '@/lib/tmdb';
import HeroBanner from '@/components/HeroBanner';
import FavoritesGrid from '@/components/FavoritesGrid';
import SearchBar from '@/components/SearchBar';
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
              <Link href="/" className="cursor-pointer text-sm font-medium text-zinc-300 transition-colors hover:text-white">Inicio</Link>
              <Link href="/movies" className="cursor-pointer text-sm font-medium text-zinc-300 transition-colors hover:text-white">Películas</Link>
              <Link href="/tv" className="cursor-pointer text-sm font-medium text-zinc-300 transition-colors hover:text-white">Series</Link>
              <Link href="/genres" className="cursor-pointer text-sm font-medium text-zinc-300 transition-colors hover:text-white">Géneros</Link>
              <Link href="/milista" className="cursor-pointer text-sm font-medium text-white transition-colors hover:text-white">Mi Lista</Link>
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

      {/* Hero Banner — mezcla de películas y series */}
      <HeroBanner movies={heroItems} />

      {/* Main Content */}
      <main className="mx-auto px-[65px] py-12">
        <FavoritesGrid />
        <Footer />
      </main>
    </div>
  );
}
