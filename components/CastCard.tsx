import Image from 'next/image';
import { Cast } from '@/types/tmdb';
import { getImageUrl } from '@/lib/tmdb';

interface CastCardProps {
  person: Cast;
}

export default function CastCard({ person }: CastCardProps) {
  const profileUrl = getImageUrl(person.profile_path, 'w185');

  return (
    <div className="flex flex-col items-center text-center">
      {/* Profile Photo */}
      <div className="mb-3 h-48 w-full overflow-hidden rounded-lg bg-zinc-800">
        {person.profile_path ? (
          <Image
            src={profileUrl}
            alt={person.name}
            width={192}
            height={192}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-zinc-600">
            <svg className="h-16 w-16" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        )}
      </div>

      {/* Name */}
      <h4 className="mb-1 text-sm font-semibold text-white">{person.name}</h4>

      {/* Character */}
      <p className="text-xs text-zinc-400">{person.character}</p>
    </div>
  );
}
