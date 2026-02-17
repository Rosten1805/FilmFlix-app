'use client';

import Image from 'next/image';
import { Cast } from '@/types/tmdb';
import { getImageUrl } from '@/lib/tmdb';

interface CastSectionProps {
  cast: Cast[];
  title?: string;
}

export default function CastSection({ cast, title = 'Cast' }: CastSectionProps) {
  if (!cast || cast.length === 0) {
    return null;
  }

  // Limitar a los primeros 15 actores principales
  const mainCast = cast.slice(0, 15);

  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-text-primary">{title}</h2>

      <div className="w-full rounded-lg border border-border bg-surface-secondary p-4 overflow-x-auto">
        <div className="flex gap-4">
          {mainCast.map((actor) => (
            <div
              key={`${actor.id}-${actor.character}`}
              className="flex h-full flex-shrink-0 flex-col items-center gap-2 w-32 text-center"
              role="article"
              aria-label={`${actor.name} as ${actor.character}`}
            >
              {/* Actor Photo */}
              <div className="relative h-40 w-32 overflow-hidden rounded-lg bg-surface-tertiary">
                {actor.profile_path ? (
                  <Image
                    src={getImageUrl(actor.profile_path, 'w185')}
                    alt={actor.name}
                    fill
                    className="object-cover"
                    sizes="128px"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-text-tertiary">
                    <svg
                      className="h-12 w-12"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.7 15.01C13.46 15.01 14.209 15.05 14.945 15.129c4.53 4.064 8.86 1.755 8.055-3.128z" />
                      <circle cx="12" cy="8" r="6" />
                    </svg>
                  </div>
                )}
              </div>

              {/* Actor Name */}
              <h3 className="text-sm font-semibold text-text-primary line-clamp-2">
                {actor.name}
              </h3>

              {/* Character Name */}
              {actor.character && (
                <p className="text-xs text-text-secondary line-clamp-2">
                  as {actor.character}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* View all link (future implementation) */}
      {cast.length > mainCast.length && (
        <button className="text-sm text-accent-blue hover:underline focus-visible:ring-2 focus-visible:ring-accent-blue rounded px-2 py-1">
          View all {cast.length} cast members
        </button>
      )}
    </section>
  );
}
