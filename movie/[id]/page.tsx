import Image from 'next/image';
import Link from 'next/link';
import { tmdbClient, getImageUrl, getYear, formatRating, formatRuntime } from '@/lib/tmdb';
import CastCard from '@/components/CastCard';
import MovieSlider from '@/components/MovieSlider';
import SearchBar from '@/components/SearchBar';

interface MoviePageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function MoviePage({ params }: MoviePageProps) {
  const { id } = await params;
  const movieId = parseInt(id, 10);

  // Fetch movie details with credits and similar movies
  const movie = await tmdbClient.getMovieDetails(movieId);

  const backdropUrl = getImageUrl(movie.backdrop_path, 'w1280');
  const posterUrl = getImageUrl(movie.poster_path, 'w500');
  const year = getYear(movie.release_date);
  const rating = movie.vote_average > 0 ? formatRating(movie.vote_average) : null;
  const runtime = formatRuntime(movie.runtime);

  // Extract cast and crew
  const cast = movie.credits?.cast.slice(0, 10) || [];
  const director = movie.credits?.crew.find((person) => person.job === 'Director');
  const similarMovies = movie.similar?.results.slice(0, 6) || [];

  return (
    <div className="min-h-screen bg-[#0b0b0f] text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-zinc-800/50 bg-black/95 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center gap-8">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <svg className="h-7 w-7 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18 3v2h-2V3H8v2H6V3H4v18h2v-2h2v2h8v-2h2v2h2V3h-2zM8 17H6v-2h2v2zm0-4H6v-2h2v2zm0-4H6V7h2v2zm10 8h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V7h2v2z" />
              </svg>
              <h1 className="text-xl font-bold text-blue-500">FilmFlix</h1>
            </Link>

            {/* Navigation Links */}
            <nav className="hidden flex-1 gap-6 md:flex">
              <Link href="/" className="text-sm font-medium text-zinc-300 transition-colors hover:text-white">
                Inicio
              </Link>
              <a href="#" className="text-sm font-medium text-zinc-300 transition-colors hover:text-white">
                Películas
              </a>
              <a href="#" className="text-sm font-medium text-zinc-300 transition-colors hover:text-white">
                Series
              </a>
              <a href="#" className="text-sm font-medium text-zinc-300 transition-colors hover:text-white">
                Mi Lista
              </a>
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center gap-4">
              {/* Search Bar - Always Visible */}
              <SearchBar className="w-[280px]" />

              {/* Sign In Button */}
              <button className="flex h-9 items-center gap-2 text-sm font-medium text-zinc-300 transition-colors hover:text-white focus:outline-none focus:text-white">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
                Iniciar sesión
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section with Backdrop */}
      <section className="relative h-[500px] w-full overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src={backdropUrl}
            alt={movie.title}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />

          {/* Dark Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0f] via-black/40 to-transparent" />
        </div>

        {/* Content with Poster */}
        <div className="relative mx-auto flex h-full max-w-7xl items-end px-4 pb-12 sm:px-6 lg:px-8">
          <div className="flex gap-8">
            {/* Poster */}
            <div className="hidden shrink-0 sm:block">
              <div className="relative h-[300px] w-[200px] overflow-hidden rounded-lg shadow-2xl">
                <Image
                  src={posterUrl}
                  alt={movie.title}
                  fill
                  className="object-cover"
                  sizes="200px"
                />
              </div>
            </div>

            {/* Movie Info */}
            <div className="flex flex-col justify-end space-y-4">
              {/* Title */}
              <h1 className="text-4xl font-bold text-white md:text-5xl">
                {movie.title}
              </h1>

              {/* Metadata */}
              <div className="flex flex-wrap items-center gap-4 text-sm">
                {rating && (
                  <div className="flex items-center gap-2">
                    <svg className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="font-semibold text-white">{rating}</span>
                  </div>
                )}
                <span className="text-zinc-300">{year}</span>
                <span className="text-zinc-300">{runtime}</span>
              </div>

              {/* Genres */}
              {movie.genres && movie.genres.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {movie.genres.map((genre) => (
                    <span
                      key={genre.id}
                      className="rounded-full bg-zinc-800 px-3 py-1 text-xs font-medium text-zinc-300"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Synopsis */}
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold text-white">Sinopsis</h2>
          <p className="text-lg leading-relaxed text-zinc-300">
            {movie.overview || 'Sin sinopsis disponible.'}
          </p>
          {movie.tagline && (
            <p className="mt-4 italic text-zinc-400">"{movie.tagline}"</p>
          )}
        </section>

        {/* Director */}
        {director && (
          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-bold text-white">Director</h2>
            <p className="text-lg text-zinc-300">{director.name}</p>
          </section>
        )}

        {/* Cast */}
        {cast.length > 0 && (
          <section className="mb-12">
            <h2 className="mb-6 text-2xl font-bold text-white">Reparto</h2>
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {cast.map((person) => (
                <CastCard key={person.id} person={person} />
              ))}
            </div>
          </section>
        )}

        {/* Similar Movies */}
        {similarMovies.length > 0 && (
          <section className="mb-12">
            <MovieSlider movies={similarMovies} title="Películas similares" />
          </section>
        )}
      </main>
    </div>
  );
}
