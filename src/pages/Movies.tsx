import { Navigation } from '@/components/ui/navigation';
import { MovieRow } from '@/components/ui/movie-row';

const Movies = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Movies Header */}
      <div className="pt-24 pb-8 px-4">
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold gradient-text mb-2">Movies</h1>
          <p className="text-muted-foreground">Discover your next favorite movie</p>
        </div>
      </div>

      {/* Movie Categories */}
      <div className="space-y-8 px-4">
        <MovieRow title="Popular Movies" type="movie" category="popular" />
        <MovieRow title="Top Rated Movies" type="movie" category="top_rated" />
        <MovieRow title="Upcoming Movies" type="movie" category="upcoming" />
        <MovieRow title="Action Movies" type="movie" category="action" />
        <MovieRow title="Comedy Movies" type="movie" category="comedy" />
        <MovieRow title="Horror Movies" type="movie" category="horror" />
        <MovieRow title="Sci-Fi Movies" type="movie" category="sci-fi" />
        <MovieRow title="Trending Movies" type="movie" category="trending" />
      </div>
    </div>
  );
};

export default Movies;