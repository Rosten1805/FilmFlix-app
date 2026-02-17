'use client';

import Image from 'next/image';
import { Crew } from '@/types/tmdb';
import { getImageUrl } from '@/lib/tmdb';

interface DirectorSectionProps {
  crew: Crew[];
  title?: string;
}

export default function DirectorSection({ crew, title = 'Director' }: DirectorSectionProps) {
  if (!crew || crew.length === 0) {
    return null;
  }

  // Buscar al director (o directores si hay múltiples)
  const directors = crew.filter((person) => person.job === 'Director');

  if (directors.length === 0) {
    return null;
  }

  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-text-primary">{title}</h2>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {directors.map((director) => (
          <article
            key={director.id}
            className="flex flex-col gap-3 rounded-lg border border-border bg-surface-secondary p-4 transition-all hover:bg-surface-tertiary"
            aria-label={`${director.name}, Director`}
          >
            {/* Director Photo */}
            <div className="relative h-48 w-full overflow-hidden rounded-lg bg-surface-tertiary">
              {director.profile_path ? (
                <Image
                  src={getImageUrl(director.profile_path, 'w185')}
                  alt={director.name}
                  fill
                  className="object-cover"
                  sizes="300px"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-text-tertiary">
                  <svg
                    className="h-16 w-16"
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

            {/* Director Info */}
            <div className="space-y-1">
              <h3 className="text-lg font-semibold text-text-primary">
                {director.name}
              </h3>
              <p className="text-sm text-text-secondary">
                {director.department}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
