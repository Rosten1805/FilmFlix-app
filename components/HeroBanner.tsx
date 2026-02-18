'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Movie, TVShow } from '@/types/tmdb';
import { getImageUrl, getYear, formatRating } from '@/lib/tmdb';

interface HeroBannerProps {
  movies: (Movie | TVShow)[];
  mediaType?: 'movie' | 'tv';
}

export default function HeroBanner({ movies, mediaType = 'movie' }: HeroBannerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const currentMovie = movies[currentIndex] || movies[0];

  // Helper para determinar si es una película
  const isMovie = (item: Movie | TVShow): item is Movie => 'title' in item;

  // Obtener título correcto
  const title = currentMovie ? (isMovie(currentMovie) ? currentMovie.title : currentMovie.name) : '';

  // Obtener fecha correcta
  const releaseDate = currentMovie ? (isMovie(currentMovie) ? currentMovie.release_date : currentMovie.first_air_date) : '';

  // Auto-advance carousel
  useEffect(() => {
    if (!isAutoPlaying || movies.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % movies.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, movies.length]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + movies.length) % movies.length);
    setIsAutoPlaying(false);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % movies.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  if (!currentMovie) return null;

  const backdropUrl = getImageUrl(currentMovie.backdrop_path, 'w1280');
  const year = getYear(releaseDate);
  const rating = currentMovie.vote_average > 0 ? formatRating(currentMovie.vote_average) : null;

  return (
    <section className="relative h-[300px] sm:h-[400px] lg:h-[600px] w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={backdropUrl}
          alt={title}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />

        {/* Dark Gradient Overlay - More transparent for better image visibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-black/20 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative flex h-full items-center px-4 sm:px-6 lg:pl-[65px] lg:pr-4">
        <div className="max-w-2xl space-y-2 sm:space-y-3 lg:space-y-4">
          {/* Badge */}
          <div>
            <span className="inline-flex items-center rounded-full bg-red-600/80 px-3 sm:px-4 py-1 sm:py-1.5 text-xs sm:text-sm font-semibold text-white backdrop-blur-md">
              {mediaType === 'tv' ? 'Serie' : 'Película'}
            </span>
          </div>

          {/* Title */}
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold leading-tight text-white lg:text-6xl">
            {title}
          </h2>

          {/* Metadata */}
          <div className="flex items-center gap-2 sm:gap-4 text-xs sm:text-sm">
            {rating && (
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`h-3 sm:h-5 w-3 sm:w-5 ${
                      i < Math.round(currentMovie.vote_average / 2)
                        ? 'text-yellow-400'
                        : 'text-gray-600'
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="ml-1 sm:ml-2 font-semibold text-white">{rating}</span>
              </div>
            )}
            <span className="text-zinc-300">{year}</span>
          </div>

          {/* Description */}
          <p className="line-clamp-2 sm:line-clamp-3 text-sm sm:text-lg leading-relaxed text-zinc-300">
            {currentMovie.overview || 'Sin descripción disponible'}
          </p>

          {/* CTA Button */}
          <div className="pt-1 sm:pt-2">
            <Link href={`/${mediaType}/${currentMovie.id}`}>
              <button className="cursor-pointer flex items-center gap-2 rounded-lg bg-red-600/70 px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-base font-semibold text-white backdrop-blur-md transition-all hover:bg-red-600/90">
                <svg className="h-4 sm:h-5 w-4 sm:w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Más información
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Controls: arrows + dots in a single row */}
      {movies.length > 1 && (
        <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 sm:gap-3">
          <button
            onClick={goToPrevious}
            className="cursor-pointer rounded-full bg-black/50 p-1.5 sm:p-2 text-white backdrop-blur-sm transition-all hover:bg-black/70"
            aria-label="Anterior"
          >
            <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div className="flex items-center gap-1 sm:gap-2">
            {movies.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`cursor-pointer h-1 sm:h-1.5 rounded-full transition-all ${
                  index === currentIndex
                    ? 'w-6 sm:w-8 bg-red-600'
                    : 'w-1 sm:w-1.5 bg-white/50 hover:bg-white/70'
                }`}
                aria-label={`Ir a slide ${index + 1}`}
              />
            ))}
          </div>

          <button
            onClick={goToNext}
            className="cursor-pointer rounded-full bg-black/50 p-1.5 sm:p-2 text-white backdrop-blur-sm transition-all hover:bg-black/70"
            aria-label="Siguiente"
          >
            <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}
    </section>
  );
}
