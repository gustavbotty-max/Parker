import { Outlet, useNavigate, useLocation } from "react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect } from "react";

const slides = [
  { path: "/", label: "Cover" },
  { path: "/mission", label: "Mission" },
  { path: "/problem", label: "Problem" },
  { path: "/why-churches", label: "Why Churches First" },
  { path: "/product", label: "Product" },
];

export function DeckLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const currentIndex = slides.findIndex((slide) => slide.path === location.pathname);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" && currentIndex < slides.length - 1) {
        navigate(slides[currentIndex + 1].path);
      } else if (e.key === "ArrowLeft" && currentIndex > 0) {
        navigate(slides[currentIndex - 1].path);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex, navigate]);

  const goToPrevious = () => {
    if (currentIndex > 0) {
      navigate(slides[currentIndex - 1].path);
    }
  };

  const goToNext = () => {
    if (currentIndex < slides.length - 1) {
      navigate(slides[currentIndex + 1].path);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f1729] text-white font-['Inter'] relative overflow-hidden">
      <Outlet />

      {/* Navigation Controls */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 z-50">
        <button
          onClick={goToPrevious}
          disabled={currentIndex === 0}
          className="p-3 rounded-full bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all backdrop-blur-sm"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <div className="flex items-center gap-2">
          {slides.map((slide, index) => (
            <button
              key={slide.path}
              onClick={() => navigate(slide.path)}
              className={`h-2 rounded-full transition-all ${
                index === currentIndex
                  ? "w-8 bg-[#d4a574]"
                  : "w-2 bg-white/30 hover:bg-white/50"
              }`}
              aria-label={`Go to ${slide.label}`}
            />
          ))}
        </div>

        <button
          onClick={goToNext}
          disabled={currentIndex === slides.length - 1}
          className="p-3 rounded-full bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all backdrop-blur-sm"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Slide Counter */}
      <div className="fixed top-8 right-8 text-sm text-white/60 font-mono z-50">
        {String(currentIndex + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
      </div>
    </div>
  );
}
