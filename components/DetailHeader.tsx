'use client';

import Image from 'next/image';
import { MovieDetails } from '@/types/tmdb';
import { getImageUrl, getYear, formatRating } from '@/lib/tmdb';

interface DetailHeaderProps {
  movie: MovieDetails;
  onPlayClick?: () => void;
}

export default function DetailHeader({ movie, onPlayClick }: DetailHeaderProps) {
  const backdropUrl = getImageUrl(movie.backdrop_path, 'w1280');
  const year = getYear(movie.release_date);
  const rating = formatRating(movie.vote_average);
  const runtime = movie.runtime ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m` : 'N/A';

  return (
    <div className="relative h-screen max-h-[600px] w-full overflow-hidden rounded-b-2xl bg-surface-primary">
      {/* Backdrop Image */}
      <div className="relative h-full w-full">
        <Image
          src={backdropUrl}
          alt={movie.title}
          fill
          sizes="100vw"
          className="object-cover"
          priority
          quality={85}
        />

        {/* Gradient Overlay (bottom to top) */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-background" />
      </div>

      {/* Content Overlay */}
      <div className="absolute inset-0 flex flex-col justify-end p-8 text-text-primary">
        {/* Title and Metadata */}
        <div className="space-y-4">
          {/* Title */}
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
            {movie.title}
          </h1>

          {/* Meta Info Row */}
          <div className="flex flex-wrap items-center gap-4 text-sm md:gap-6">
            {/* Year */}
            <span className="text-text-secondary">{year}</span>

            {/* Runtime */}
            {movie.runtime > 0 && (
              <>
                <span className="text-text-tertiary">•</span>
                <span className="text-text-secondary">{runtime}</span>
              </>
            )}

            {/* Genres */}
            {movie.genres && movie.genres.length > 0 && (
              <>
                <span className="text-text-tertiary">•</span>
                <div className="flex gap-2">
                  {movie.genres.slice(0, 3).map((genre) => (
                    <span
                      key={genre.id}
                      className="rounded-full border border-border px-3 py-1 text-xs"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
              </>
            )}

            {/* Rating Badge */}
            {movie.vote_average > 0 && (
              <>
                <span className="text-text-tertiary">•</span>
                <div className={`flex items-center gap-1 rounded-lg px-3 py-1 text-xs font-bold ${
                  movie.vote_average >= 9
                    ? 'bg-green-950 text-green-400'
                    : movie.vote_average >= 7
                      ? 'bg-yellow-950 text-yellow-400'
                      : movie.vote_average >= 5
                        ? 'bg-orange-950 text-orange-400'
                        : 'bg-red-950 text-red-400'
                }`}>
                  <span>★</span>
                  <span>{rating}</span>
                  <span className="text-text-secondary">({movie.vote_count.toLocaleString()})</span>
                </div>
              </>
            )}
          </div>

          {/* Tagline (if exists) */}
          {movie.tagline && (
            <p className="text-lg italic text-text-secondary">&quot;{movie.tagline}&quot;</p>
          )}

          {/* Synopsis */}
          <p className="max-w-2xl text-base leading-relaxed text-text-secondary line-clamp-3">
            {movie.overview}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 pt-4 md:gap-3">
            {/* Play Button */}
            <button
              onClick={onPlayClick}
              className="flex items-center gap-2 rounded-lg bg-accent-red px-6 py-3 font-semibold text-white transition-all hover:bg-red-600 focus-visible:ring-2 focus-visible:ring-accent-blue md:px-8"
              aria-label="Play trailer or watch now"
            >
              <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 5v14l11-7z" />
              </svg>
              <span>Play Now</span>
            </button>

            {/* Add to List */}
            <button
              className="flex items-center gap-2 rounded-lg border border-border bg-surface-primary px-6 py-3 font-semibold text-text-primary transition-all hover:bg-surface-secondary focus-visible:ring-2 focus-visible:ring-accent-blue"
              aria-label="Add to watchlist"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              <span className="hidden sm:inline">Add to List</span>
            </button>

            {/* Share */}
            <button
              className="rounded-lg p-3 text-text-secondary transition-all hover:bg-surface-secondary hover:text-text-primary focus-visible:ring-2 focus-visible:ring-accent-blue"
              aria-label="Share this movie"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M13 13H11V7H13M13 17H11V15H13M17 1H7C5.89543 1 5 1.89543 5 3V21C5 22.1046 5.89543 23 7 23H17C18.1046 23 19 22.1046 19 21V3C19 1.89543 18.1046 1 17 1Z" />
              </svg>
            </button>

            {/* Like */}
            <button
              className="rounded-lg p-3 text-text-secondary transition-all hover:bg-surface-secondary hover:text-accent-red focus-visible:ring-2 focus-visible:ring-accent-blue"
              aria-label="Like this movie"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
