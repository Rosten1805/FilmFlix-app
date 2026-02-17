'use client';

import { Movie } from '@/types/tmdb';
import MovieCard from '@/components/MovieCard';

interface SimilarMoviesSectionProps {
  movies: Movie[];
  title?: string;
}

export default function SimilarMoviesSection({
  movies,
  title = 'Similar Movies',
}: SimilarMoviesSectionProps) {
  if (!movies || movies.length === 0) {
    return null;
  }

  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-text-primary">{title}</h2>

      <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {movies.slice(0, 12).map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>

      {movies.length > 12 && (
        <button className="text-sm text-accent-blue hover:underline focus-visible:ring-2 focus-visible:ring-accent-blue rounded px-2 py-1">
          View all {movies.length} similar movies
        </button>
      )}
    </section>
  );
}
