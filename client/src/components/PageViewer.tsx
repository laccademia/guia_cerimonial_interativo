import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, Play, User } from "lucide-react";
import { useEffect, useState } from "react";

interface PageViewerProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onModuleComplete?: (moduleId: number) => void;
  moduleVideoUrl?: string;
  moduleTitle?: string;
  isModuleEnd?: boolean;
}

export function PageViewer({
  currentPage,
  totalPages,
  onPageChange,
  onModuleComplete,
  moduleVideoUrl,
  moduleTitle,
  isModuleEnd,
}: PageViewerProps) {
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [showVideo, setShowVideo] = useState(false);

  // Reset video state when page changes
  useEffect(() => {
    setShowVideo(false);
    setIsImageLoading(true);
  }, [currentPage]);

  const handlePrev = () => {
    if (showVideo) {
      setShowVideo(false);
    } else if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (isModuleEnd && !showVideo && moduleVideoUrl) {
      setShowVideo(true);
    } else if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  // Format page number to match file naming (page-01.png, page-10.png)
  const pageFileName = `page-${currentPage.toString().padStart(2, "0")}.png`;
  const imagePath = `/images/pages/${pageFileName}`;

  // Extract YouTube ID from URL
  const getYoutubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const videoId = moduleVideoUrl ? getYoutubeId(moduleVideoUrl) : null;

  return (
    <div className="flex flex-col items-center justify-center w-full h-full max-h-screen gap-4 p-4 overflow-hidden">
      {/* Cinema Mode Overlay */}
      <div 
        className={cn(
          "fixed inset-0 bg-black/95 z-40 transition-opacity duration-700 pointer-events-none",
          showVideo ? "opacity-100" : "opacity-0"
        )} 
      />

      {/* Main Content Area - Theater Mode */}
      <div className={cn(
        "relative w-full max-w-5xl aspect-video max-h-[85vh] bg-black/40 rounded-xl border border-primary/20 shadow-[0_0_30px_-5px_rgba(var(--primary),0.1)] overflow-hidden group transition-all duration-500 flex-shrink-0",
        showVideo ? "z-50 scale-105 shadow-[0_0_100px_rgba(var(--primary),0.3)] border-primary/50" : "z-0"
      )}>
        
        {/* Glow Effect Background */}
        <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-secondary/5 opacity-50 pointer-events-none" />

        {showVideo && videoId ? (
          <div className="w-full h-full flex flex-col md:flex-row animate-in fade-in duration-1000 bg-black/80 backdrop-blur-xl">
            {/* Video Section (Left/Top) */}
            <div className="w-full md:w-2/3 h-2/3 md:h-full relative border-b md:border-b-0 md:border-r border-white/10">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
            
            {/* Info Section (Right/Bottom) */}
            <div className="w-full md:w-1/3 h-1/3 md:h-full p-6 flex flex-col justify-center gap-4 bg-gradient-to-b from-transparent to-primary/5">
              <div className="space-y-2">
                <h3 className="text-xs font-mono uppercase tracking-widest text-primary/70">Vídeo Complementar</h3>
                <h2 className="text-xl md:text-2xl font-bold text-white leading-tight">
                  {moduleTitle || "Conteúdo Exclusivo"}
                </h2>
              </div>
              
              <div className="h-px w-full bg-gradient-to-r from-primary/50 to-transparent" />
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30">
                  <User className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">Apresentador</p>
                  <p className="font-semibold text-white">Welder Santos</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="relative w-full h-full flex items-center justify-center">
            {isImageLoading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
              </div>
            )}
            <img
              src={imagePath}
              alt={`Página ${currentPage}`}
              className={cn(
                "max-h-full max-w-full object-contain transition-opacity duration-500",
                isImageLoading ? "opacity-0" : "opacity-100"
              )}
              onLoad={() => setIsImageLoading(false)}
            />
          </div>
        )}

        {/* Navigation Overlay (Desktop - Reverted to side buttons but simpler) */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-between px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button
            variant="ghost"
            size="icon"
            className="pointer-events-auto h-16 w-16 rounded-full bg-black/50 hover:bg-primary/20 hover:text-primary backdrop-blur-sm border border-white/10 transition-all hover:scale-110"
            onClick={handlePrev}
            disabled={currentPage === 1 && !showVideo}
          >
            <ChevronLeft className="h-10 w-10" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "pointer-events-auto h-16 w-16 rounded-full bg-black/50 hover:bg-primary/20 hover:text-primary backdrop-blur-sm border border-white/10 transition-all hover:scale-110",
              isModuleEnd && !showVideo && "bg-primary/20 text-primary animate-pulse border-primary/50"
            )}
            onClick={handleNext}
            disabled={currentPage === totalPages && showVideo}
          >
            {isModuleEnd && !showVideo ? (
              <Play className="h-8 w-8 ml-1" />
            ) : (
              <ChevronRight className="h-10 w-10" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation Controls (Visible on small screens) */}
      <div className="flex items-center justify-between w-full max-w-md md:hidden gap-4">
        <Button
          variant="outline"
          size="lg"
          className="flex-1 border-primary/30 hover:bg-primary/10 hover:border-primary"
          onClick={handlePrev}
          disabled={currentPage === 1 && !showVideo}
        >
          <ChevronLeft className="mr-2 h-5 w-5" /> Anterior
        </Button>
        
        <span className="text-muted-foreground font-mono text-sm">
          {currentPage} / {totalPages}
        </span>

        <Button
          variant="outline"
          size="lg"
          className={cn(
            "flex-1 border-primary/30 hover:bg-primary/10 hover:border-primary",
            isModuleEnd && !showVideo && "border-primary bg-primary/10 text-primary"
          )}
          onClick={handleNext}
          disabled={currentPage === totalPages && showVideo}
        >
          {isModuleEnd && !showVideo ? (
            <>Ver Vídeo <Play className="ml-2 h-4 w-4" /></>
          ) : (
            <>Próximo <ChevronRight className="ml-2 h-5 w-5" /></>
          )}
        </Button>
      </div>

      {/* Progress Indicator */}
      <div className="w-full max-w-5xl h-1 bg-secondary/20 rounded-full overflow-hidden mt-4">
        <div 
          className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-500 ease-out shadow-[0_0_10px_rgba(var(--primary),0.5)]"
          style={{ width: `${(currentPage / totalPages) * 100}%` }}
        />
      </div>
    </div>
  );
}
