'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Movie, TVShow } from '@/types/tmdb';
import { getImageUrl, getYear } from '@/lib/tmdb';

const FAVORITES_KEY = 'filmflix-favorites';

export type StoredFavorite = {
  id: number;
  mediaType: 'movie' | 'tv';
  title: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  overview: string;
  year: string;
};

interface MovieCardProps {
  movie: Movie | TVShow;
}

export default function MovieCard({ movie }: MovieCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const posterUrl = getImageUrl(movie.poster_path, 'w500');

  const isMovie = (item: Movie | TVShow): item is Movie => 'title' in item;

  const title = isMovie(movie) ? movie.title : movie.name;
  const releaseDate = isMovie(movie) ? movie.release_date : movie.first_air_date;
  const year = getYear(releaseDate);
  const rating = movie.vote_average > 0 ? (movie.vote_average / 10 * 10).toFixed(1) : '0.0';
  const mediaType = isMovie(movie) ? 'movie' : 'tv';

  // Leer estado inicial desde localStorage tras hidratación
  useEffect(() => {
    const stored = localStorage.getItem(FAVORITES_KEY);
    if (stored) {
      const favs: StoredFavorite[] = JSON.parse(stored);
      setIsFavorite(favs.some((f) => f.id === movie.id));
    }
  }, [movie.id]);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const stored = localStorage.getItem(FAVORITES_KEY);
    const favs: StoredFavorite[] = stored ? JSON.parse(stored) : [];

    if (isFavorite) {
      const updated = favs.filter((f) => f.id !== movie.id);
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
      setIsFavorite(false);
    } else {
      const newFav: StoredFavorite = {
        id: movie.id,
        mediaType,
        title,
        poster_path: movie.poster_path,
        backdrop_path: movie.backdrop_path ?? null,
        vote_average: movie.vote_average,
        overview: movie.overview,
        year,
      };
      localStorage.setItem(FAVORITES_KEY, JSON.stringify([...favs, newFav]));
      setIsFavorite(true);
    }

    // Notificar a FavoritesGrid si está en la misma página
    window.dispatchEvent(new CustomEvent('favoritesUpdated'));
  };

  return (
    <Link href={`/${mediaType}/${movie.id}`}>
      <div className="group relative cursor-pointer">
        <div className="relative aspect-[2/3] w-full overflow-hidden rounded-lg">
          <Image
            src={posterUrl}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=="
          />

          {/* Heart Icon */}
          <button
            onClick={handleFavoriteClick}
            className="absolute left-2 top-2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 backdrop-blur-sm transition-all hover:scale-110 hover:bg-black/80"
            aria-label={isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
          >
            {isFavorite ? (
              <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg className="h-5 w-5 text-white transition-colors hover:text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            )}
          </button>

          {/* Rating Badge */}
          {movie.vote_average > 0 && (
            <div className="absolute right-2 top-2 rounded-full bg-black/80 px-2 py-1 text-xs font-semibold text-white backdrop-blur-sm">
              {rating}/10
            </div>
          )}

          {/* Play on Hover */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white">
              <svg className="ml-0.5 h-5 w-5 text-black" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="mt-2">
          <h3 className="line-clamp-1 text-sm font-medium text-white transition-colors group-hover:text-red-500">
            {title}
          </h3>
          <p className="text-sm text-zinc-400">{year}</p>
        </div>
      </div>
    </Link>
  );
}
