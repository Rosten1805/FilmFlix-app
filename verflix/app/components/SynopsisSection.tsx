'use client';

import { MovieDetails } from '@/types/tmdb';

interface SynopsisSectionProps {
  movie: MovieDetails;
}

export default function SynopsisSection({ movie }: SynopsisSectionProps) {
  return (
    <section className="space-y-6">
      {/* Overview */}
      <div className="space-y-2">
        <h2 className="text-lg font-semibold text-text-primary">Overview</h2>
        <p className="text-base leading-relaxed text-text-secondary">
          {movie.overview}
        </p>
      </div>

      {/* Genres */}
      {movie.genres && movie.genres.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-text-primary">Genres</h3>
          <div className="flex flex-wrap gap-2">
            {movie.genres.map((genre) => (
              <span key={genre.id} className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold bg-surface-secondary text-text-primary border border-border">
                {genre.name}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="h-px w-full bg-border my-6" />

      {/* Production Details */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2">
        {/* Status */}
        {movie.status && (
          <div className="space-y-1">
            <p className="text-xs font-semibold uppercase text-text-tertiary">Status</p>
            <p className="text-sm text-text-secondary">{movie.status}</p>
          </div>
        )}

        {/* Original Language */}
        {movie.original_language && (
          <div className="space-y-1">
            <p className="text-xs font-semibold uppercase text-text-tertiary">Language</p>
            <p className="text-sm text-text-secondary">
              {new Intl.DisplayNames(['en'], { type: 'language' }).of(
                movie.original_language
              )}
            </p>
          </div>
        )}

        {/* Budget */}
        {movie.budget && movie.budget > 0 && (
          <div className="space-y-1">
            <p className="text-xs font-semibold uppercase text-text-tertiary">Budget</p>
            <p className="text-sm text-text-secondary">
              ${(movie.budget / 1000000).toFixed(1)}M
            </p>
          </div>
        )}

        {/* Revenue */}
        {movie.revenue && movie.revenue > 0 && (
          <div className="space-y-1">
            <p className="text-xs font-semibold uppercase text-text-tertiary">Revenue</p>
            <p className="text-sm text-text-secondary">
              ${(movie.revenue / 1000000).toFixed(1)}M
            </p>
          </div>
        )}

        {/* Production Companies */}
        {movie.production_companies && movie.production_companies.length > 0 && (
          <div className="space-y-1 sm:col-span-2">
            <p className="text-xs font-semibold uppercase text-text-tertiary">
              Production Companies
            </p>
            <p className="text-sm text-text-secondary">
              {movie.production_companies.map((company) => company.name).join(', ')}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
