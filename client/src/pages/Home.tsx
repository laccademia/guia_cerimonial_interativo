import { PageViewer } from "@/components/PageViewer";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { BookOpen, Info, Menu } from "lucide-react";
import { useState } from "react";

// Definição da estrutura dos módulos
const MODULES = [
  {
    id: 1,
    title: "Fundamentos do Cerimonial Inclusivo",
    startPage: 3,
    endPage: 5,
    videoUrl: "https://youtu.be/isOBFsMMoEE"
  },
  {
    id: 2,
    title: "Planejamento e Estrutura Física",
    startPage: 6,
    endPage: 8,
    videoUrl: "https://youtu.be/Cd4by15uWro"
  },
  {
    id: 3,
    title: "Tecnologias Assistivas e Comunicação",
    startPage: 9,
    endPage: 11,
    videoUrl: "https://youtu.be/QhiFQFwL1jw"
  },
  {
    id: 4,
    title: "A Prática da Inclusão",
    startPage: 12,
    endPage: 14,
    videoUrl: "https://youtu.be/d278O47ez1k"
  }
];

const TOTAL_PAGES = 15;

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Encontrar módulo atual
  const currentModule = MODULES.find(
    m => currentPage >= m.startPage && currentPage <= m.endPage
  );

  // Verificar se é o final de um módulo
  const isModuleEnd = currentModule?.endPage === currentPage;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground overflow-x-hidden selection:bg-primary/30">
      
      {/* Header Neon */}
      <header className="fixed top-0 left-0 right-0 z-50 h-16 border-b border-white/5 bg-background/80 backdrop-blur-md flex items-center justify-between px-4 md:px-8 shadow-[0_1px_15px_-5px_rgba(var(--primary),0.1)]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-[0_0_15px_rgba(var(--primary),0.4)]">
            <BookOpen className="text-background w-5 h-5" />
          </div>
          <h1 className="font-bold text-lg md:text-xl tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
            CERIMONIAL <span className="text-primary">INCLUSIVO</span>
          </h1>
        </div>

        <div className="flex items-center gap-4">
          <span className="hidden md:block text-sm text-muted-foreground font-mono border border-white/10 px-3 py-1 rounded-full bg-white/5">
            {currentModule ? `MÓDULO ${currentModule.id}: ${currentModule.title}` : "GUIA COMPLETO"}
          </span>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="w-6 h-6" />
          </Button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl pt-20 px-6 md:hidden animate-in slide-in-from-top-10">
          <nav className="flex flex-col gap-4">
            <h3 className="text-muted-foreground text-xs uppercase tracking-widest mb-2">Navegação Rápida</h3>
            <Button 
              variant="ghost" 
              className="justify-start text-lg font-light" 
              onClick={() => { setCurrentPage(1); setIsMenuOpen(false); }}
            >
              Capa
            </Button>
            <Button 
              variant="ghost" 
              className="justify-start text-lg font-light" 
              onClick={() => { setCurrentPage(2); setIsMenuOpen(false); }}
            >
              Índice
            </Button>
            {MODULES.map(module => (
              <Button
                key={module.id}
                variant="ghost"
                className={cn(
                  "justify-start text-lg font-light border-l-2 border-transparent pl-4",
                  currentModule?.id === module.id && "border-primary text-primary bg-primary/5"
                )}
                onClick={() => { setCurrentPage(module.startPage); setIsMenuOpen(false); }}
              >
                Módulo {module.id}
              </Button>
            ))}
          </nav>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center pt-20 pb-10 relative">
        
        {/* Background Grid Effect */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background pointer-events-none" />

        <PageViewer 
          currentPage={currentPage}
          totalPages={TOTAL_PAGES}
          onPageChange={handlePageChange}
          moduleVideoUrl={currentModule?.videoUrl}
          moduleTitle={currentModule?.title}
          isModuleEnd={isModuleEnd}
        />

        {/* Footer Info */}
        <div className="mt-8 flex flex-col items-center gap-2 text-center px-4">
          <p className="text-muted-foreground text-sm max-w-md">
            Use as setas laterais ou do teclado para navegar. 
            Ao final de cada módulo, um vídeo complementar estará disponível.
          </p>
          <div className="flex gap-2 mt-2">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-xs text-primary/70 font-mono uppercase tracking-widest">Sistema Online</span>
          </div>
        </div>
      </main>
    </div>
  );
}
