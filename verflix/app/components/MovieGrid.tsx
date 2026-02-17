import { Movie, TVShow } from '@/types/tmdb';
import MovieCard from './MovieCard';

interface MovieGridProps {
  movies: (Movie | TVShow)[];
  title?: string;
}

export default function MovieGrid({ movies, title }: MovieGridProps) {
  if (!movies || movies.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-zinc-400 text-lg">No se encontraron películas</p>
      </div>
    );
  }

  return (
    <section className="w-full">
      {title && (
        <h2 className="mb-6 text-3xl font-bold text-white">
          {title}
        </h2>
      )}

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  );
}
