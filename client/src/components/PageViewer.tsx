import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import { useEffect, useState } from "react";

interface PageViewerProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onModuleComplete?: (moduleId: number) => void;
  moduleVideoUrl?: string;
  isModuleEnd?: boolean;
}

export function PageViewer({
  currentPage,
  totalPages,
  onPageChange,
  onModuleComplete,
  moduleVideoUrl,
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

  // Botões de índice para a página 2
  const IndexButtons = () => {
    if (currentPage !== 2) return null;

    const buttons = [
      { id: 1, page: 3, color: "bg-blue-500", shadow: "shadow-blue-500/50", label: "Módulo 1" },
      { id: 2, page: 6, color: "bg-green-500", shadow: "shadow-green-500/50", label: "Módulo 2" },
      { id: 3, page: 9, color: "bg-purple-500", shadow: "shadow-purple-500/50", label: "Módulo 3" },
      { id: 4, page: 12, color: "bg-orange-500", shadow: "shadow-orange-500/50", label: "Módulo 4" },
    ];

    return (
      <div className="absolute inset-0 pointer-events-none flex items-end justify-center pb-[5%] md:pb-[8%] gap-[2%] md:gap-[4%] px-[10%]">
        {buttons.map((btn) => (
          <Button
            key={btn.id}
            onClick={() => onPageChange(btn.page)}
            className={cn(
              "pointer-events-auto flex-1 h-10 md:h-14 text-xs md:text-sm font-bold uppercase tracking-wider text-white border-none transition-all duration-300 hover:scale-105 hover:-translate-y-1",
              btn.color,
              `shadow-[0_0_20px_rgba(0,0,0,0.5),0_4px_0_rgba(0,0,0,0.3)] hover:${btn.shadow} hover:shadow-[0_0_30px_5px]`
            )}
          >
            {btn.label}
          </Button>
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-[80vh] gap-6 p-4">
      {/* Main Content Area - Theater Mode */}
      <div className="relative w-full max-w-5xl aspect-video bg-black/40 rounded-xl border border-primary/20 shadow-[0_0_30px_-5px_rgba(var(--primary),0.1)] overflow-hidden group">
        
        {/* Glow Effect Background */}
        <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-secondary/5 opacity-50 pointer-events-none" />

        {showVideo && videoId ? (
          <div className="w-full h-full animate-in fade-in duration-500">
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
            
            {/* Camada de Botões do Índice (apenas página 2) */}
            <IndexButtons />
          </div>
        )}

        {/* 3D Neon Navigation Buttons (Always visible on desktop, overlay on mobile) */}
        <div className="absolute inset-y-0 left-0 flex items-center px-2 md:px-4 pointer-events-none">
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "pointer-events-auto h-16 w-16 md:h-20 md:w-20 rounded-full transition-all duration-300 group/btn",
              "bg-black/40 backdrop-blur-md border border-primary/30 text-primary shadow-[0_0_15px_rgba(var(--primary),0.2)]",
              "hover:bg-primary hover:text-black hover:border-primary hover:shadow-[0_0_30px_rgba(var(--primary),0.6)] hover:scale-110",
              "disabled:opacity-0 disabled:pointer-events-none"
            )}
            onClick={handlePrev}
            disabled={currentPage === 1 && !showVideo}
          >
            <ChevronLeft className="h-8 w-8 md:h-10 md:w-10 drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]" />
          </Button>
        </div>

        <div className="absolute inset-y-0 right-0 flex items-center px-2 md:px-4 pointer-events-none">
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "pointer-events-auto h-16 w-16 md:h-20 md:w-20 rounded-full transition-all duration-300 group/btn",
              "bg-black/40 backdrop-blur-md border border-primary/30 text-primary shadow-[0_0_15px_rgba(var(--primary),0.2)]",
              "hover:bg-primary hover:text-black hover:border-primary hover:shadow-[0_0_30px_rgba(var(--primary),0.6)] hover:scale-110",
              isModuleEnd && !showVideo && "animate-pulse border-primary shadow-[0_0_20px_rgba(var(--primary),0.4)]",
              "disabled:opacity-0 disabled:pointer-events-none"
            )}
            onClick={handleNext}
            disabled={currentPage === totalPages && showVideo}
          >
            {isModuleEnd && !showVideo ? (
              <Play className="h-8 w-8 md:h-10 md:w-10 ml-1 drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]" />
            ) : (
              <ChevronRight className="h-8 w-8 md:h-10 md:w-10 drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]" />
            )}
          </Button>
        </div>
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
