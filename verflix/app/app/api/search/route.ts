import { tmdbClient } from '@/lib/tmdb';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get('q') ?? '';

  if (!q.trim()) {
    return Response.json({ movies: [], shows: [] });
  }

  const [moviesData, showsData] = await Promise.all([
    tmdbClient.searchMovies(q, 1),
    tmdbClient.searchTVShows(q, 1),
  ]);

  return Response.json({
    movies: moviesData.results.slice(0, 4),
    shows: showsData.results.slice(0, 4),
  });
}
