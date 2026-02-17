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

    const scrollAmount = 600;
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
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">{title}</h2>

          {/* Navigation Arrows - Top Right */}
          <div className="flex gap-2">
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
          className="flex gap-6 overflow-x-auto scroll-smooth scrollbar-hide"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {movies.map((movie) => (
            <div key={movie.id} className="w-[235px] flex-shrink-0">
              <MovieCard movie={movie} />
            </div>
          ))}
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
