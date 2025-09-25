import { Navigation } from '@/components/ui/navigation';
import { MovieRow } from '@/components/ui/movie-row';

const TVShows = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* TV Shows Header */}
      <div className="pt-24 pb-8 px-4">
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold gradient-text mb-2">TV Shows</h1>
          <p className="text-muted-foreground">Binge-watch the best series</p>
        </div>
      </div>

      {/* TV Show Categories */}
      <div className="space-y-8 px-4">
        <MovieRow title="Popular TV Shows" type="tv" category="popular" />
        <MovieRow title="Top Rated TV Shows" type="tv" category="top_rated" />
        <MovieRow title="Airing Today" type="tv" category="airing_today" />
        <MovieRow title="Action TV Shows" type="movie" category="action" />
        <MovieRow title="Comedy Series" type="movie" category="comedy" />
        <MovieRow title="Horror Series" type="movie" category="horror" />
        <MovieRow title="Sci-Fi Series" type="movie" category="sci-fi" />
        <MovieRow title="Trending Shows" type="tv" category="popular" />
      </div>
    </div>
  );
};

export default TVShows;