import { Video } from '@/types/tmdb';

interface TrailerSectionProps {
  videos?: Video[];
}

export default function TrailerSection({ videos }: TrailerSectionProps) {
  if (!videos || videos.length === 0) return null;

  // Find the best trailer: prefer official YouTube trailers
  const trailer =
    videos.find((v) => v.site === 'YouTube' && v.type === 'Trailer' && v.official) ||
    videos.find((v) => v.site === 'YouTube' && v.type === 'Trailer') ||
    videos.find((v) => v.site === 'YouTube');

  if (!trailer) return null;

  return (
    <section className="mb-12">
      <h2 className="mb-6 text-2xl font-bold text-white">Tráiler</h2>
      <div className="mx-auto max-w-4xl">
        <div className="relative w-full overflow-hidden rounded-lg" style={{ paddingBottom: '56.25%' }}>
          <iframe
            className="absolute inset-0 h-full w-full"
            src={`https://www.youtube.com/embed/${trailer.key}`}
            title={trailer.name}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
}
