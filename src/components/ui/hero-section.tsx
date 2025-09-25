import { Play, Info, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';
import heroBanner from '@/assets/hero-banner.jpg';

export const HeroSection = () => {
  const [isMuted, setIsMuted] = useState(true);

  return (
    <section className="relative h-screen flex items-center justify-start">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBanner})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 pt-20">
        <div className="max-w-2xl animate-fade-in">
          {/* Movie Info */}
          <div className="flex items-center space-x-3 mb-4">
            <Badge variant="secondary" className="bg-primary text-primary-foreground">
              New Release
            </Badge>
            <span className="text-accent font-semibold">2024</span>
            <span className="text-muted-foreground">•</span>
            <span className="text-muted-foreground">Action • Thriller</span>
            <span className="text-muted-foreground">•</span>
            <span className="text-muted-foreground">2h 15m</span>
          </div>

          {/* Title */}
          <h1 className="text-6xl md:text-8xl font-black mb-6 leading-tight">
            <span className="gradient-text">MIDNIGHT</span>
            <br />
            <span className="text-foreground">PROTOCOL</span>
          </h1>

          {/* Description */}
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed max-w-xl">
            When a covert mission goes wrong, an elite operative must navigate a web of 
            betrayal and conspiracy to expose the truth before time runs out.
          </p>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4 mb-8">
            <Button size="lg" className="glow-button bg-gradient-primary hover:shadow-glow">
              <Play className="w-5 h-5 mr-2" />
              Play Now
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="glass border-border-glass hover:bg-background-secondary"
            >
              <Info className="w-5 h-5 mr-2" />
              More Info
            </Button>
          </div>

          {/* Additional Info */}
          <div className="flex items-center space-x-6 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <span className="text-accent">★★★★☆</span>
              <span>8.7/10</span>
            </div>
            <span>IMDb Rating</span>
            <span>HD Available</span>
          </div>
        </div>
      </div>

      {/* Audio Control */}
      <div className="absolute bottom-8 right-8 z-10">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsMuted(!isMuted)}
          className="glass border border-border-glass hover:bg-background-secondary"
        >
          {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
        </Button>
      </div>
    </section>
  );
};