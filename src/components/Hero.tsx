import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface HeroSlide {
  title: string;
  description: string;
  image: string;
  buttons?: { text: string; href: string; variant?: "default" | "secondary" }[];
}

interface HeroProps {
  slides: HeroSlide[];
  autoPlay?: boolean;
  interval?: number;
}

const Hero = ({ slides, autoPlay = true, interval = 8000 }: HeroProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!autoPlay || isPaused || slides.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, interval);

    return () => clearInterval(timer);
  }, [autoPlay, isPaused, interval, slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section
      className="relative h-[600px] lg:h-[700px] overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {slides.map((slide, index) => (
        <div
          key={index}
          className={cn(
            "absolute inset-0 transition-opacity duration-1000",
            index === currentSlide ? "opacity-100" : "opacity-0"
          )}
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slide.image})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/70" />
          
          <div className="relative h-full container mx-auto px-4 lg:px-8 flex items-center">
            <div className="max-w-3xl text-primary-foreground">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
                {slide.title}
              </h1>
              <p className="text-lg md:text-xl mb-8 text-primary-foreground/90 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
                {slide.description}
              </p>
              {slide.buttons && (
                <div className="flex flex-wrap gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
                  {slide.buttons.map((button, btnIndex) => (
                    <Button
                      key={btnIndex}
                      asChild
                      size="lg"
                      variant={button.variant === "secondary" ? "secondary" : "default"}
                      className={cn(
                        button.variant === "secondary"
                          ? "bg-secondary hover:bg-secondary-light"
                          : "bg-primary-foreground text-primary hover:bg-primary-foreground/90"
                      )}
                    >
                      <a href={button.href}>{button.text}</a>
                    </Button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      {slides.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-background/20 backdrop-blur-sm hover:bg-background/40 text-primary-foreground flex items-center justify-center transition-all duration-300 hover:scale-110"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-background/20 backdrop-blur-sm hover:bg-background/40 text-primary-foreground flex items-center justify-center transition-all duration-300 hover:scale-110"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </>
      )}

      {/* Slide Indicators */}
      {slides.length > 1 && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={cn(
                "w-2 h-2 rounded-full transition-all duration-300",
                index === currentSlide
                  ? "bg-primary-foreground w-8"
                  : "bg-primary-foreground/40 hover:bg-primary-foreground/60"
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default Hero;
