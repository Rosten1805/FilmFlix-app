import Image from 'next/image';
import { tmdbClient, getImageUrl, getYear, formatRating, formatRuntime } from '@/lib/tmdb';
import CastCard from '@/components/CastCard';
import MovieSlider from '@/components/MovieSlider';
import Footer from '@/components/Footer';
import TrailerSection from '@/components/TrailerSection';

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
  const similarMovies = movie.similar?.results.slice(0, 30) || [];

  return (
    <div className="min-h-screen bg-[#000000] text-white">
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
          <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-black/40 to-transparent" />
        </div>

        {/* Content with Poster */}
        <div className="relative mx-auto flex h-full items-end px-[65px] pb-12">
          <div className="flex gap-8">
            {/* Poster */}
            <div className="hidden shrink-0 sm:block">
              <div className="relative h-[450px] w-[300px] overflow-hidden rounded-lg shadow-2xl">
                <Image
                  src={posterUrl}
                  alt={movie.title}
                  fill
                  className="object-cover"
                  sizes="300px"
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
      <main className="mx-auto px-[65px] py-8">
        {/* Trailer */}
        <TrailerSection videos={movie.videos?.results} />

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
            <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
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
        <Footer />
      </main>
    </div>
  );
}
