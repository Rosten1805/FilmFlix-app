'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import type { Movie, TVShow } from '@/types/tmdb';

interface SearchBarProps {
  className?: string;
}

export default function SearchBar({ className = '' }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<{ movies: Movie[]; shows: TVShow[] }>({
    movies: [],
    shows: [],
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Búsqueda con debounce
  useEffect(() => {
    if (!query.trim()) {
      setResults({ movies: [], shows: [] });
      setShowResults(false);
      return;
    }

    const timeoutId = setTimeout(async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        const data = await res.json();
        setResults({ movies: data.movies, shows: data.shows });
        setShowResults(true);
      } catch (error) {
        console.error('Search error:', error);
      } finally {
        setIsLoading(false);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [query]);

  // Cerrar al hacer click fuera
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    }
    if (showResults) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showResults]);

  const handleClear = () => {
    setQuery('');
    setResults({ movies: [], shows: [] });
    setShowResults(false);
    inputRef.current?.focus();
  };

  const handleResultClick = () => {
    setShowResults(false);
    setQuery('');
  };

  const hasResults = results.movies.length > 0 || results.shows.length > 0;

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <div className="relative">
        <div className="flex h-10 items-center gap-2 rounded-md border border-zinc-700 bg-zinc-900/50 px-3 backdrop-blur-sm transition-all focus-within:border-zinc-500">
          {/* Icono búsqueda */}
          <svg className="h-4 w-4 flex-shrink-0 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>

          {/* Input */}
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => query && setShowResults(true)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && query.trim()) {
                setShowResults(false);
                window.location.href = `/search?q=${encodeURIComponent(query.trim())}`;
              }
            }}
            placeholder="Buscar..."
            className="flex-1 bg-transparent text-sm text-white placeholder-zinc-500 outline-none"
          />

          {/* Spinner */}
          {isLoading && (
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-red-500 border-t-transparent" />
          )}

          {/* Borrar */}
          {query && !isLoading && (
            <button onClick={handleClear} className="flex-shrink-0 text-zinc-500 transition-colors hover:text-zinc-300" aria-label="Limpiar">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Dropdown */}
        {showResults && (hasResults || (query && !isLoading)) && (
          <div className="absolute right-0 top-12 z-50 w-[420px] max-h-[520px] overflow-y-auto rounded-xl border border-zinc-800 bg-zinc-900/98 shadow-2xl backdrop-blur-lg">

            {/* Películas */}
            {results.movies.length > 0 && (
              <div className="p-3">
                <p className="mb-2 px-1 text-xs font-semibold uppercase tracking-wider text-zinc-500">
                  Películas
                </p>
                <div className="space-y-1">
                  {results.movies.map((movie) => (
                    <Link
                      key={movie.id}
                      href={`/movie/${movie.id}`}
                      onClick={handleResultClick}
                      className="flex gap-3 rounded-lg p-2 transition-colors hover:bg-zinc-800/80 group"
                    >
                      <div className="h-[72px] w-12 flex-shrink-0 overflow-hidden rounded bg-zinc-800">
                        {movie.poster_path ? (
                          <img
                            src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                            alt=""
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-zinc-600">
                            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" />
                            </svg>
                          </div>
                        )}
                      </div>
                      <div className="flex-1 overflow-hidden">
                        <p className="truncate text-sm font-semibold text-white group-hover:text-red-400 transition-colors">{movie.title}</p>
                        <div className="flex items-center gap-2 text-xs text-zinc-400 mt-0.5">
                          <span>{movie.release_date?.split('-')[0] || 'N/A'}</span>
                          {movie.vote_average > 0 && (
                            <>
                              <span>·</span>
                              <span className="flex items-center gap-1">
                                <span className="text-yellow-400">★</span>
                                {movie.vote_average.toFixed(1)}
                              </span>
                            </>
                          )}
                          <span className="ml-auto rounded bg-zinc-700/80 px-1.5 py-0.5 text-zinc-400">Película</span>
                        </div>
                        {movie.overview && (
                          <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-zinc-500">
                            {movie.overview}
                          </p>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Divisor si hay ambos */}
            {results.movies.length > 0 && results.shows.length > 0 && (
              <div className="mx-3 border-t border-zinc-800" />
            )}

            {/* Series */}
            {results.shows.length > 0 && (
              <div className="p-3">
                <p className="mb-2 px-1 text-xs font-semibold uppercase tracking-wider text-zinc-500">
                  Series
                </p>
                <div className="space-y-1">
                  {results.shows.map((show) => (
                    <Link
                      key={show.id}
                      href={`/tv/${show.id}`}
                      onClick={handleResultClick}
                      className="flex gap-3 rounded-lg p-2 transition-colors hover:bg-zinc-800/80 group"
                    >
                      <div className="h-[72px] w-12 flex-shrink-0 overflow-hidden rounded bg-zinc-800">
                        {show.poster_path ? (
                          <img
                            src={`https://image.tmdb.org/t/p/w92${show.poster_path}`}
                            alt=""
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-zinc-600">
                            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" />
                            </svg>
                          </div>
                        )}
                      </div>
                      <div className="flex-1 overflow-hidden">
                        <p className="truncate text-sm font-semibold text-white group-hover:text-red-400 transition-colors">{show.name}</p>
                        <div className="flex items-center gap-2 text-xs text-zinc-400 mt-0.5">
                          <span>{show.first_air_date?.split('-')[0] || 'N/A'}</span>
                          {show.vote_average > 0 && (
                            <>
                              <span>·</span>
                              <span className="flex items-center gap-1">
                                <span className="text-yellow-400">★</span>
                                {show.vote_average.toFixed(1)}
                              </span>
                            </>
                          )}
                          <span className="ml-auto rounded bg-zinc-700/80 px-1.5 py-0.5 text-zinc-400">Serie</span>
                        </div>
                        {show.overview && (
                          <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-zinc-500">
                            {show.overview}
                          </p>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Sin resultados */}
            {query && !hasResults && !isLoading && (
              <div className="p-8 text-center">
                <svg className="mx-auto mb-3 h-10 w-10 text-zinc-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <p className="text-sm text-zinc-400">Sin resultados para &quot;{query}&quot;</p>
              </div>
            )}

            {/* Footer: ver todos */}
            {hasResults && (
              <div className="border-t border-zinc-800 p-3">
                <Link
                  href={`/search?q=${encodeURIComponent(query)}`}
                  onClick={handleResultClick}
                  className="block text-center text-sm text-red-400 transition-colors hover:text-red-300"
                >
                  Ver todos los resultados de &quot;{query}&quot; →
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
