import { tmdbClient } from '@/lib/tmdb';
import { NextRequest } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const page = request.nextUrl.searchParams.get('page') || '1';

  const data = await tmdbClient.getMoviesByGenre(parseInt(id), parseInt(page));
  return Response.json(data);
}
