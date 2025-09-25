import { Play, Plus, ThumbsUp, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';

interface MovieCardProps {
  title: string;
  genre?: string;
  year: string;
  rating: string;
  duration?: string;
  image: string;
  size?: 'default' | 'large';
}

export const MovieCard = ({ 
  title, 
  genre = "Adventure", 
  year, 
  rating, 
  duration = "2h", 
  image, 
  size = 'default' 
}: MovieCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={`movie-card relative rounded-lg overflow-hidden cursor-pointer group ${
        size === 'large' ? 'aspect-[16/9]' : 'aspect-[2/3]'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Movie Poster */}
      <div className="relative w-full h-full">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Hover Content */}
        {isHovered && (
          <div className="absolute inset-0 flex flex-col justify-end p-4 animate-fade-in">
            {/* Quick Actions */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <Button size="icon" className="w-8 h-8 bg-foreground text-background hover:bg-foreground/90">
                  <Play className="w-4 h-4" />
                </Button>
                <Button size="icon" variant="outline" className="w-8 h-8 glass border-border-glass">
                  <Plus className="w-4 h-4" />
                </Button>
                <Button size="icon" variant="outline" className="w-8 h-8 glass border-border-glass">
                  <ThumbsUp className="w-4 h-4" />
                </Button>
              </div>
              <Button size="icon" variant="outline" className="w-8 h-8 glass border-border-glass">
                <ChevronDown className="w-4 h-4" />
              </Button>
            </div>

            {/* Movie Info */}
            <div className="space-y-2">
              <h3 className="font-bold text-foreground text-sm leading-tight">{title}</h3>
              <div className="flex items-center space-x-2 text-xs">
                <Badge variant="secondary" className="text-xs px-1 py-0">
                  {rating}
                </Badge>
                <span className="text-muted-foreground">{year}</span>
                <span className="text-muted-foreground">•</span>
                <span className="text-muted-foreground">{duration}</span>
              </div>
              <p className="text-xs text-muted-foreground">{genre}</p>
            </div>
          </div>
        )}

        {/* Play Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button size="icon" className="w-16 h-16 bg-foreground/90 text-background hover:bg-foreground backdrop-blur-sm">
            <Play className="w-8 h-8" />
          </Button>
        </div>
      </div>
    </div>
  );
};