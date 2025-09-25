// TMDB API Configuration
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';
const TMDB_API_KEY = '8265bd1679663a7ea12ac168da84d2e8'; // Public demo key

export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  vote_average: number;
  genre_ids: number[];
}

export interface TVShow {
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  first_air_date: string;
  vote_average: number;
  genre_ids: number[];
}

export const movieApi = {
  // Get trending movies
  getTrending: async (): Promise<Movie[]> => {
    const response = await fetch(`${TMDB_BASE_URL}/trending/movie/week?api_key=${TMDB_API_KEY}`);
    const data = await response.json();
    return data.results;
  },

  // Get popular movies
  getPopular: async (): Promise<Movie[]> => {
    const response = await fetch(`${TMDB_BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}`);
    const data = await response.json();
    return data.results;
  },

  // Get top rated movies
  getTopRated: async (): Promise<Movie[]> => {
    const response = await fetch(`${TMDB_BASE_URL}/movie/top_rated?api_key=${TMDB_API_KEY}`);
    const data = await response.json();
    return data.results;
  },

  // Get upcoming movies
  getUpcoming: async (): Promise<Movie[]> => {
    const response = await fetch(`${TMDB_BASE_URL}/movie/upcoming?api_key=${TMDB_API_KEY}`);
    const data = await response.json();
    return data.results;
  },

  // Get movies by genre
  getByGenre: async (genreId: number): Promise<Movie[]> => {
    const response = await fetch(`${TMDB_BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&with_genres=${genreId}`);
    const data = await response.json();
    return data.results;
  },

  // Get popular TV shows
  getPopularTVShows: async (): Promise<TVShow[]> => {
    const response = await fetch(`${TMDB_BASE_URL}/tv/popular?api_key=${TMDB_API_KEY}`);
    const data = await response.json();
    return data.results;
  },

  // Get top rated TV shows
  getTopRatedTVShows: async (): Promise<TVShow[]> => {
    const response = await fetch(`${TMDB_BASE_URL}/tv/top_rated?api_key=${TMDB_API_KEY}`);
    const data = await response.json();
    return data.results;
  },

  // Get TV shows airing today
  getAiringToday: async (): Promise<TVShow[]> => {
    const response = await fetch(`${TMDB_BASE_URL}/tv/airing_today?api_key=${TMDB_API_KEY}`);
    const data = await response.json();
    return data.results;
  }
};

// Helper function to get full image URL
export const getImageUrl = (path: string): string => {
  return path ? `${TMDB_IMAGE_BASE_URL}${path}` : '/placeholder.svg';
};

// Genre mapping
export const movieGenres = {
  28: 'Action',
  12: 'Adventure',
  16: 'Animation',
  35: 'Comedy',
  80: 'Crime',
  99: 'Documentary',
  18: 'Drama',
  10751: 'Family',
  14: 'Fantasy',
  36: 'History',
  27: 'Horror',
  10402: 'Music',
  9648: 'Mystery',
  10749: 'Romance',
  878: 'Science Fiction',
  10770: 'TV Movie',
  53: 'Thriller',
  10752: 'War',
  37: 'Western'
};