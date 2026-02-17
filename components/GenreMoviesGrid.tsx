'use client';

import { useState } from 'react';
import MovieCard from './MovieCard';
import { Movie } from '@/types/tmdb';

interface GenreMoviesGridProps {
  initialMovies: Movie[];
  genreId: number;
  totalPages: number;
}

export default function GenreMoviesGrid({ initialMovies, genreId, totalPages }: GenreMoviesGridProps) {
  const [movies, setMovies] = useState<Movie[]>(initialMovies);
  const [currentPage, setCurrentPage] = useState(3); // páginas 1 y 2 ya cargadas
  const [loading, setLoading] = useState(false);

  const hasMore = currentPage <= totalPages;

  const loadMore = async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/genres/${genreId}/movies?page=${currentPage}`);
      const data = await res.json();
      setMovies((prev) => [...prev, ...data.results]);
      setCurrentPage((prev) => prev + 1);
    } catch (error) {
      console.error('Error cargando más películas:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="grid grid-cols-4 gap-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 xl:grid-cols-8">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>

      {hasMore && (
        <div className="mt-10 flex justify-center">
          <button
            onClick={loadMore}
            disabled={loading}
            className="cursor-pointer flex items-center gap-2 rounded-lg bg-red-600/70 px-8 py-3 text-base font-semibold text-white backdrop-blur-md transition-all hover:bg-red-600/90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? (
              <>
                <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Cargando...
              </>
            ) : (
              <>
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
                Ver más películas
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
