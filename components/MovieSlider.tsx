'use client';

import { useRef } from 'react';
import { Movie, TVShow } from '@/types/tmdb';
import MovieCard from './MovieCard';

interface MovieSliderProps {
  movies: (Movie | TVShow)[];
  title?: string;
}

export default function MovieSlider({ movies, title }: MovieSliderProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;

    // Scroll exactamente un "página" (el ancho visible del contenedor)
    const scrollAmount = scrollContainerRef.current.clientWidth;
    const newScrollPosition =
      scrollContainerRef.current.scrollLeft +
      (direction === 'left' ? -scrollAmount : scrollAmount);

    scrollContainerRef.current.scrollTo({
      left: newScrollPosition,
      behavior: 'smooth',
    });
  };

  if (!movies || movies.length === 0) {
    return null;
  }

  return (
    <section className="relative w-full">
      {/* Title and Navigation */}
      {title && (
        <div className="mb-3 sm:mb-4 flex items-center justify-between">
          <h2 className="text-xl sm:text-2xl font-bold text-white">{title}</h2>

          {/* Navigation Arrows - Top Right - Hidden on mobile, shown on sm and up */}
          <div className="hidden sm:flex gap-2">
            <button
              onClick={() => scroll('left')}
              className="rounded-full bg-red-600 p-2 text-white backdrop-blur-sm transition-all hover:bg-red-700"
              aria-label="Scroll left"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={() => scroll('right')}
              className="rounded-full bg-red-600 p-2 text-white backdrop-blur-sm transition-all hover:bg-red-700"
              aria-label="Scroll right"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Slider Container */}
      <div className="relative">
        {/* Movies Scroll Container */}
        <div
          ref={scrollContainerRef}
          className="flex gap-2 sm:gap-4 lg:gap-6 overflow-x-auto scroll-smooth scrollbar-hide snap-x snap-mandatory"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {movies.map((movie) => (
            <div key={movie.id} className="w-[calc((100vw-48px)/3)] sm:w-[200px] lg:w-[235px] flex-shrink-0 snap-start">
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>

        {/* Mobile Navigation Arrows - Shown only on mobile */}
        <div className="absolute inset-0 flex items-center justify-between pointer-events-none sm:hidden px-2">
          <button
            onClick={() => scroll('left')}
            className="pointer-events-auto rounded-full bg-red-600/80 p-2 text-white backdrop-blur-sm transition-all hover:bg-red-600/100"
            aria-label="Scroll left"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={() => scroll('right')}
            className="pointer-events-auto rounded-full bg-red-600/80 p-2 text-white backdrop-blur-sm transition-all hover:bg-red-600/100"
            aria-label="Scroll right"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
