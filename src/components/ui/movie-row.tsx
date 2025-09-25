import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MovieCard } from '@/components/ui/movie-card';
import { movieApi, getImageUrl, type Movie, type TVShow } from '@/services/movieApi';

interface MovieRowProps {
  title: string;
  type?: 'movie' | 'tv';
  category?: string;
}

export const MovieRow = ({ title, type = 'movie', category }: MovieRowProps) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [movies, setMovies] = useState<(Movie | TVShow)[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        let data: (Movie | TVShow)[] = [];
        
        if (type === 'tv') {
          switch (category) {
            case 'popular':
              data = await movieApi.getPopularTVShows();
              break;
            case 'top_rated':
              data = await movieApi.getTopRatedTVShows();
              break;
            case 'airing_today':
              data = await movieApi.getAiringToday();
              break;
            default:
              data = await movieApi.getPopularTVShows();
          }
        } else {
          switch (category) {
            case 'trending':
              data = await movieApi.getTrending();
              break;
            case 'popular':
              data = await movieApi.getPopular();
              break;
            case 'top_rated':
              data = await movieApi.getTopRated();
              break;
            case 'upcoming':
              data = await movieApi.getUpcoming();
              break;
            case 'action':
              data = await movieApi.getByGenre(28);
              break;
            case 'comedy':
              data = await movieApi.getByGenre(35);
              break;
            case 'horror':
              data = await movieApi.getByGenre(27);
              break;
            case 'sci-fi':
              data = await movieApi.getByGenre(878);
              break;
            default:
              data = await movieApi.getPopular();
          }
        }
        
        setMovies(data);
      } catch (error) {
        console.error('Error fetching movies:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [type, category]);

  const scroll = (direction: 'left' | 'right') => {
    const container = document.getElementById(`movie-row-${title.replace(/\s+/g, '-').toLowerCase()}`);
    if (container) {
      const scrollAmount = 320;
      const newPosition = direction === 'left' 
        ? Math.max(0, scrollPosition - scrollAmount)
        : scrollPosition + scrollAmount;
      
      container.scrollTo({ left: newPosition, behavior: 'smooth' });
      setScrollPosition(newPosition);
    }
  };

  if (loading) {
    return (
      <div className="px-4 py-2">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <div className="flex space-x-4 overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="w-60 h-36 bg-muted animate-pulse rounded-lg flex-shrink-0" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="relative group px-4 py-2">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      
      <div className="relative">
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 glass border border-border-glass opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={() => scroll('left')}
        >
          <ChevronLeft className="w-5 h-5" />
        </Button>
        
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 glass border border-border-glass opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={() => scroll('right')}
        >
          <ChevronRight className="w-5 h-5" />
        </Button>
        
        <div 
          id={`movie-row-${title.replace(/\s+/g, '-').toLowerCase()}`}
          className="flex space-x-4 overflow-x-auto scroll-smooth scrollbar-hide"
        >
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              title={'title' in movie ? movie.title : movie.name}
              image={getImageUrl(movie.poster_path)}
              year={('release_date' in movie ? 
                new Date(movie.release_date).getFullYear() : 
                new Date(movie.first_air_date).getFullYear()
              ).toString()}
              rating={movie.vote_average.toFixed(1)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};