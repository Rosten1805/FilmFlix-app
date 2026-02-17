'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { StoredFavorite } from './MovieCard';

const FAVORITES_KEY = 'filmflix-favorites';

export default function FavoritesGrid() {
  const [favorites, setFavorites] = useState<StoredFavorite[]>([]);
  const [mounted, setMounted] = useState(false);

  const loadFavorites = () => {
    const stored = localStorage.getItem(FAVORITES_KEY);
    setFavorites(stored ? JSON.parse(stored) : []);
  };

  useEffect(() => {
    loadFavorites();
    setMounted(true);
    window.addEventListener('favoritesUpdated', loadFavorites);
    return () => window.removeEventListener('favoritesUpdated', loadFavorites);
  }, []);

  const removeFavorite = (id: number) => {
    const stored = localStorage.getItem(FAVORITES_KEY);
    const favs: StoredFavorite[] = stored ? JSON.parse(stored) : [];
    const updated = favs.filter((f) => f.id !== id);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
    setFavorites(updated);
    window.dispatchEvent(new CustomEvent('favoritesUpdated'));
  };

  if (!mounted) return null;

  if (favorites.length === 0) {
    return (
      <div className="flex flex-col items-center py-24 text-center">
        <svg className="mb-4 h-16 w-16 text-zinc-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
        <p className="text-lg font-semibold text-white">Tu lista está vacía</p>
        <p className="mt-2 text-zinc-500">
          Pulsa el <span className="text-red-500">♥</span> en cualquier película o serie para añadirla aquí
        </p>
        <Link
          href="/"
          className="mt-6 rounded-lg bg-red-600/70 px-6 py-2.5 text-sm font-semibold text-white backdrop-blur-md transition-all hover:bg-red-600/90"
        >
          Explorar contenido
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-4 flex items-center gap-3">
        <h2 className="text-2xl font-bold text-white">Mi Lista</h2>
        <span className="rounded-full bg-zinc-800 px-3 py-1 text-sm text-zinc-400">
          {favorites.length} {favorites.length === 1 ? 'título' : 'títulos'}
        </span>
      </div>

      <div className="grid grid-cols-4 gap-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 xl:grid-cols-8">
        {favorites.map((item) => (
          <div key={item.id} className="group relative cursor-pointer">
            <Link href={`/${item.mediaType}/${item.id}`}>
              <div className="relative aspect-[2/3] w-full overflow-hidden rounded-lg">
                {item.poster_path ? (
                  <Image
                    src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 200px"
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-zinc-800 text-zinc-600">
                    <svg className="h-10 w-10" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" />
                    </svg>
                  </div>
                )}

                {/* Badge tipo */}
                <span className="absolute left-2 top-2 rounded bg-black/70 px-1.5 py-0.5 text-xs font-medium text-white backdrop-blur-sm">
                  {item.mediaType === 'movie' ? 'Película' : 'Serie'}
                </span>

                {/* Rating */}
                {item.vote_average > 0 && (
                  <div className="absolute right-2 top-2 rounded-full bg-black/80 px-2 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                    {item.vote_average.toFixed(1)}/10
                  </div>
                )}

                {/* Hover overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white">
                    <svg className="ml-0.5 h-5 w-5 text-black" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>

            {/* Botón eliminar de lista */}
            <button
              onClick={() => removeFavorite(item.id)}
              className="absolute left-2 bottom-10 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-red-600/80 text-white opacity-0 backdrop-blur-sm transition-all hover:bg-red-600 group-hover:opacity-100"
              aria-label="Quitar de Mi Lista"
              title="Quitar de Mi Lista"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
              </svg>
            </button>

            <div className="mt-2">
              <h3 className="line-clamp-1 text-sm font-medium text-white transition-colors group-hover:text-red-500">
                {item.title}
              </h3>
              <p className="text-sm text-zinc-400">{item.year}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
