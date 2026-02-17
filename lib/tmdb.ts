import { Movie, TMDBResponse, TVShow, MovieDetails, TVShowDetails, Genre } from '@/types/tmdb';

const API_KEY = process.env.TMDB_API_KEY;
const BASE_URL = process.env.NEXT_PUBLIC_TMDB_API_URL || 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = process.env.NEXT_PUBLIC_TMDB_IMAGE_URL || 'https://image.tmdb.org/t/p';

/**
 * TMDB API Client
 * Wrapper para interactuar con The Movie Database API
 */
class TMDBClient {
  private apiKey: string;
  private baseUrl: string;

  constructor() {
    this.apiKey = API_KEY || '';
    this.baseUrl = BASE_URL;
  }

  /**
   * Realiza una petición a la API de TMDB
   */
  private async fetch<T>(endpoint: string, params: Record<string, string> = {}): Promise<T> {
    const url = new URL(`${this.baseUrl}${endpoint}`);
    url.searchParams.append('api_key', this.apiKey);

    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });

    const response = await fetch(url.toString(), {
      next: { revalidate: 1800 } // Cache por 30 minutos
    });

    if (!response.ok) {
      throw new Error(`TMDB API Error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * Obtiene películas populares
   */
  async getPopularMovies(page: number = 1): Promise<TMDBResponse<Movie>> {
    return this.fetch<TMDBResponse<Movie>>('/movie/popular', {
      page: page.toString(),
      language: 'es-ES'
    });
  }

  /**
   * Obtiene películas mejor valoradas
   */
  async getTopRatedMovies(page: number = 1): Promise<TMDBResponse<Movie>> {
    return this.fetch<TMDBResponse<Movie>>('/movie/top_rated', {
      page: page.toString(),
      language: 'es-ES'
    });
  }

  /**
   * Obtiene películas próximas a estrenar
   */
  async getUpcomingMovies(page: number = 1): Promise<TMDBResponse<Movie>> {
    return this.fetch<TMDBResponse<Movie>>('/movie/upcoming', {
      page: page.toString(),
      language: 'es-ES'
    });
  }

  /**
   * Obtiene películas actualmente en cines
   */
  async getNowPlayingMovies(page: number = 1): Promise<TMDBResponse<Movie>> {
    return this.fetch<TMDBResponse<Movie>>('/movie/now_playing', {
      page: page.toString(),
      language: 'es-ES'
    });
  }

  /**
   * Obtiene películas recientes del año actual
   */
  async getRecentMovies(page: number = 1): Promise<TMDBResponse<Movie>> {
    return this.fetch<TMDBResponse<Movie>>('/discover/movie', {
      page: page.toString(),
      language: 'es-ES',
      'primary_release_date.gte': '2026-01-01',
      'primary_release_date.lte': '2026-12-31',
      sort_by: 'popularity.desc'
    });
  }

  /**
   * Obtiene películas clásicas (1970-2000, alta valoración)
   */
  async getClassicMovies(page: number = 1): Promise<TMDBResponse<Movie>> {
    return this.fetch<TMDBResponse<Movie>>('/discover/movie', {
      page: page.toString(),
      language: 'es-ES',
      'primary_release_date.gte': '1970-01-01',
      'primary_release_date.lte': '2000-12-31',
      'vote_average.gte': '7.5',
      'vote_count.gte': '500',
      sort_by: 'vote_average.desc'
    });
  }

  /**
   * Obtiene la lista de géneros de películas
   */
  async getMovieGenres(): Promise<{ genres: Genre[] }> {
    return this.fetch<{ genres: Genre[] }>('/genre/movie/list', {
      language: 'es-ES'
    });
  }

  /**
   * Obtiene películas por género
   */
  async getMoviesByGenre(genreId: number, page: number = 1): Promise<TMDBResponse<Movie>> {
    return this.fetch<TMDBResponse<Movie>>('/discover/movie', {
      page: page.toString(),
      language: 'es-ES',
      with_genres: genreId.toString(),
      sort_by: 'popularity.desc'
    });
  }

  /**
   * Obtiene series de TV populares
   */
  async getPopularTVShows(page: number = 1): Promise<TMDBResponse<TVShow>> {
    return this.fetch<TMDBResponse<TVShow>>('/tv/popular', {
      page: page.toString(),
      language: 'es-ES'
    });
  }

  /**
   * Obtiene series de TV mejor valoradas
   */
  async getTopRatedTVShows(page: number = 1): Promise<TMDBResponse<TVShow>> {
    return this.fetch<TMDBResponse<TVShow>>('/tv/top_rated', {
      page: page.toString(),
      language: 'es-ES'
    });
  }

  /**
   * Obtiene series de TV actualmente en emisión
   */
  async getOnTheAirTVShows(page: number = 1): Promise<TMDBResponse<TVShow>> {
    return this.fetch<TMDBResponse<TVShow>>('/tv/on_the_air', {
      page: page.toString(),
      language: 'es-ES'
    });
  }

  /**
   * Obtiene series de anime/animación
   */
  async getAnimeTVShows(page: number = 1): Promise<TMDBResponse<TVShow>> {
    return this.fetch<TMDBResponse<TVShow>>('/discover/tv', {
      page: page.toString(),
      language: 'es-ES',
      with_genres: '16', // 16 es el ID de género para Animación
      sort_by: 'popularity.desc'
    });
  }

  /**
   * Obtiene películas de animación
   */
  async getAnimationMovies(page: number = 1): Promise<TMDBResponse<Movie>> {
    return this.fetch<TMDBResponse<Movie>>('/discover/movie', {
      page: page.toString(),
      language: 'es-ES',
      with_genres: '16', // 16 es el ID de género para Animación
      sort_by: 'popularity.desc'
    });
  }

  /**
   * Obtiene detalles de una película con información adicional
   */
  async getMovieDetails(movieId: number): Promise<MovieDetails> {
    return this.fetch<MovieDetails>(`/movie/${movieId}`, {
      language: 'es-ES',
      append_to_response: 'credits,similar,recommendations,videos'
    });
  }

  /**
   * Obtiene detalles de una serie con información adicional
   */
  async getTVShowDetails(tvId: number): Promise<TVShowDetails> {
    return this.fetch<TVShowDetails>(`/tv/${tvId}`, {
      language: 'es-ES',
      append_to_response: 'credits,similar,recommendations,videos'
    });
  }

  /**
   * Obtiene solo el elenco de una película
   */
  async getMovieCredits(movieId: number) {
    return this.fetch(`/movie/${movieId}/credits`, {
      language: 'es-ES'
    });
  }

  /**
   * Obtiene películas similares
   */
  async getSimilarMovies(movieId: number, page: number = 1): Promise<TMDBResponse<Movie>> {
    return this.fetch<TMDBResponse<Movie>>(`/movie/${movieId}/similar`, {
      page: page.toString(),
      language: 'es-ES'
    });
  }

  /**
   * Obtiene personas por ID
   */
  async getPerson(personId: number) {
    return this.fetch(`/person/${personId}`, {
      language: 'es-ES'
    });
  }

  /**
   * Busca películas por término
   */
  async searchMovies(query: string, page: number = 1): Promise<TMDBResponse<Movie>> {
    return this.fetch<TMDBResponse<Movie>>('/search/movie', {
      query,
      page: page.toString(),
      language: 'es-ES'
    });
  }

  /**
   * Busca series de TV por término
   */
  async searchTVShows(query: string, page: number = 1): Promise<TMDBResponse<TVShow>> {
    return this.fetch<TMDBResponse<TVShow>>('/search/tv', {
      query,
      page: page.toString(),
      language: 'es-ES'
    });
  }
}

// Singleton instance
export const tmdbClient = new TMDBClient();

/**
 * Helper para construir URLs de imágenes de TMDB
 */
export function getImageUrl(path: string | null, size: string = 'w500'): string {
  if (!path) return '/placeholder-movie.png';
  return `${IMAGE_BASE_URL}/${size}${path}`;
}

/**
 * Helper para obtener el año de una fecha
 */
export function getYear(date: string): string {
  if (!date) return 'N/A';
  return new Date(date).getFullYear().toString();
}

/**
 * Helper para formatear rating
 */
export function formatRating(rating: number): string {
  return rating.toFixed(1);
}

/**
 * Helper para formatear duración en minutos a horas y minutos
 */
export function formatRuntime(minutes: number): string {
  if (!minutes) return 'N/A';
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins}min`;
}
