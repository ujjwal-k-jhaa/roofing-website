import { useState } from "react";
import { MapPin, Calendar, Wrench, Star, X, CheckSquare, Hammer } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { PortfolioItem } from "../types";
import { PORTFOLIO } from "../data";

interface PortfolioSectionProps {
  isDarkMode: boolean;
  onSelectServiceForBooking: (serviceTitle: string) => void;
}

export default function PortfolioSection({ isDarkMode, onSelectServiceForBooking }: PortfolioSectionProps) {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [isCategoryLoading, setIsCategoryLoading] = useState(false);
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});
  const [selectedProject, setSelectedProject] = useState<PortfolioItem | null>(null);

  const categories = ["All", "Residential", "Metal", "Commercial"];

  const handleCategoryChange = (cat: string) => {
    if (cat === activeCategory) return;
    setIsCategoryLoading(true);
    setTimeout(() => {
      setActiveCategory(cat);
      setIsCategoryLoading(false);
    }, 600);
  };

  const filteredPortfolio = activeCategory === "All"
    ? PORTFOLIO
    : PORTFOLIO.filter(item => item.category === activeCategory);

  const getStructuralDetails = (id: string) => {
    switch (id) {
      case "port-1":
        return {
          slope: "10:12 High-Pitch Complex Gable",
          area: "4,500 Sq. Ft.",
          underlayment: "Synthetic Multi-Layer WeatherLock",
          fasteners: "Ring-shank Hot-Dipped Galvanized Nails"
        };
      case "port-2":
        return {
          slope: "4:12 Low-Slope Shed Roof",
          area: "3,800 Sq. Ft.",
          underlayment: "Self-Adhering High-Temp Ice & Water Shield",
          fasteners: "Concealed Stainless Steel Clips"
        };
      case "port-3":
        return {
          slope: "12:12 Gothic Revival Steep-Slope",
          area: "5,200 Sq. Ft.",
          underlayment: "Breathable Premium Deck Protection",
          fasteners: "Pneumatic Double-Coated Copper Rivets"
        };
      default:
        return {
          slope: "1/4\" per Foot Flat Roof Drainage",
          area: "12,000 Sq. Ft.",
          underlayment: "DensDeck Prime Roof Board Substrate",
          fasteners: "Mechanical Stress Plates & Fasteners"
        };
    }
  };

  return (
    <section
      id="portfolio"
      className={`py-24 transition-colors duration-300 relative ${
        isDarkMode ? "bg-slate-950 text-white" : "bg-slate-50 text-slate-900"
      }`}
    >
      <div className="absolute top-1/2 right-0 w-1/4 h-1/2 bg-amber-500/[0.02] blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-left">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="space-y-4 max-w-2xl">
            <span className="text-xs font-mono uppercase tracking-widest text-amber-500 font-bold block">
              Architectural Showroom
            </span>
            <h2 className="text-3xl sm:text-4xl font-sans font-bold tracking-tight">
              Pristine Completed Projects
            </h2>
            <div className="h-1 w-16 bg-amber-500 rounded-full" />
            <p className={`text-sm sm:text-base ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>
              Explore our architectural gallery. Each project showcases precise flashing lines, uniform tile seams, and top-tier roofing material combinations.
            </p>
          </div>

          {/* Filtering Tabs */}
          <div className="flex flex-wrap items-center gap-2 bg-slate-900/10 dark:bg-slate-900/40 p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 w-fit">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                disabled={isCategoryLoading}
                className={`px-4 py-2 rounded-lg text-xs font-semibold font-sans uppercase tracking-wider transition-all cursor-pointer ${
                  activeCategory === cat
                    ? "bg-amber-500 text-slate-950 font-bold shadow"
                    : isDarkMode
                      ? "text-slate-400 hover:text-white"
                      : "text-slate-600 hover:text-slate-950"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Portfolio Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {isCategoryLoading ? (
              [1, 2, 3, 4].map((skeletonId) => (
                <motion.div
                  key={`skeleton-${skeletonId}`}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className={`overflow-hidden rounded-2xl border ${
                    isDarkMode 
                      ? "bg-slate-900/40 border-white/[0.04]" 
                      : "bg-white border-slate-200"
                  } animate-pulse text-left h-full flex flex-col justify-between`}
                >
                  <div className="relative aspect-video w-full bg-slate-200/50 dark:bg-slate-800/50 flex items-center justify-center overflow-hidden">
                    {/* Inner glowing logo badge */}
                    <Hammer className="w-10 h-10 text-amber-500/20 dark:text-amber-500/10 animate-bounce" />
                    <div className="absolute bottom-4 left-4 space-y-2 w-2/3">
                      <div className="h-2.5 bg-slate-300 dark:bg-slate-700/80 rounded w-1/4" />
                      <div className="h-4 bg-slate-300 dark:bg-slate-700/80 rounded w-5/6" />
                    </div>
                  </div>
                  <div className="p-6 space-y-4">
                    <div className="space-y-2">
                      <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-full" />
                      <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-5/6" />
                    </div>
                    <div className="h-px bg-slate-200/10 dark:bg-white/[0.02] pt-1" />
                    <div className="flex justify-between items-center pt-2">
                      <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-1/3" />
                      <div className="h-2.5 bg-slate-200 dark:bg-slate-800 rounded w-1/4" />
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              filteredPortfolio.map((project) => (
                <motion.div
                  layout
                  key={project.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 220, damping: 24 }}
                  onClick={() => setSelectedProject(project)}
                  className={`group overflow-hidden rounded-2xl border transition-colors duration-300 cursor-pointer text-left relative ${
                    isDarkMode 
                      ? "bg-slate-900/60 backdrop-blur-md border-white/[0.06] hover:border-amber-400/30" 
                      : "bg-white border-slate-200 hover:border-amber-500/30 hover:shadow-xl hover:shadow-slate-200/30"
                  }`}
                >
                  <div className="relative aspect-video w-full overflow-hidden bg-slate-850">
                    {/* Shimmer loading mask while image loads */}
                    {!loadedImages[project.id] && (
                      <div className="absolute inset-0 bg-gradient-to-r from-slate-200/50 via-slate-300/50 to-slate-200/50 dark:from-slate-900 dark:via-slate-850 dark:to-slate-900 animate-pulse flex items-center justify-center">
                        <Hammer className="w-8 h-8 text-amber-550/30 animate-pulse" />
                      </div>
                    )}
                    <img
                      src={project.image}
                      alt={project.title}
                      onLoad={() => setLoadedImages(prev => ({ ...prev, [project.id]: true }))}
                      className={`w-full h-full object-cover transform scale-100 group-hover:scale-[1.03] transition-all duration-700 pointer-events-none ${
                        loadedImages[project.id] ? "opacity-100" : "opacity-0"
                      }`}
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent opacity-90 transition-opacity" />
                    
                    {/* Upper Status Badges */}
                    <div className="absolute top-4 left-4 flex gap-2">
                      <span className="px-2.5 py-1 text-[9px] font-mono tracking-widest uppercase font-extrabold bg-slate-950/80 backdrop-blur-sm border border-white/[0.05] text-amber-400 rounded-md">
                        {project.category}
                      </span>
                    </div>

                    {/* Overlaid Title */}
                    <div className="absolute bottom-4 left-4 right-4 text-white text-left">
                      <div className="flex items-center gap-1.5 text-xs text-amber-400 font-bold mb-1">
                        <MapPin className="w-3 h-3" />
                        <span>{project.location}</span>
                      </div>
                      <h3 className="text-xl font-bold font-sans tracking-tight">{project.title}</h3>
                    </div>
                  </div>

                  {/* Descriptive Content Section */}
                  <div className="p-6 space-y-4">
                    <p className={`text-xs font-sans leading-relaxed line-clamp-2 ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>
                      {project.description}
                    </p>

                    <div className="flex flex-wrap items-center justify-between text-xs pt-4 border-t border-slate-250/[0.08] gap-3 text-left">
                      <div className="flex items-center gap-1.5 text-slate-500">
                        <Wrench className="w-3.5 h-3.5 text-amber-500" />
                        <span className={`font-bold uppercase tracking-wider text-[10px] ${isDarkMode ? "text-slate-300" : "text-slate-705"}`}>{project.materials}</span>
                      </div>

                      <span className={`font-mono text-[10px] ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>
                        Year: {project.completionDate}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </motion.div>

        {/* Project Detailed Study Case Modal */}
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in text-left">
            <div
              className={`w-full max-w-3xl rounded-3xl border overflow-hidden shadow-2xl relative transition-colors duration-300 ${
                isDarkMode ? "bg-slate-900 border-slate-800 text-white" : "bg-white border-slate-200 text-slate-900"
              }`}
            >
              {/* Close Button overlay */}
              <button
                id="close-portfolio-modal"
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-slate-950/70 text-white border border-white/10 hover:bg-slate-950/90 transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Top cover image */}
              <div className="relative aspect-[16/9] w-full bg-slate-800">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover pointer-events-none"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white text-left">
                  <span className="px-2.5 py-1 text-[10px] font-mono tracking-widest uppercase font-extrabold bg-amber-500 text-slate-950 rounded-md">
                    {selectedProject.category} SPEC STUDY
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-sans font-bold tracking-tight mt-3">{selectedProject.title}</h3>
                  <p className="flex items-center gap-1.5 text-xs text-amber-400 mt-1 font-medium">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{selectedProject.location}</span>
                  </p>
                </div>
              </div>

              {/* Specs detailed layout */}
              <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-12 gap-6 max-h-[50vh] overflow-y-auto">
                {/* Info summary */}
                <div className="md:col-span-7 space-y-4">
                  <div className="space-y-1">
                    <h4 className="text-xs font-mono uppercase tracking-wider text-amber-500 font-bold">Project Scope</h4>
                    <p className={`text-sm leading-relaxed ${isDarkMode ? "text-slate-300" : "text-slate-600"}`}>
                      {selectedProject.description}
                    </p>
                  </div>

                  <div className="space-y-2 pt-2 text-left">
                    <h4 className="text-xs font-mono uppercase tracking-wider text-amber-500 font-bold">Key Project Achievements</h4>
                    <div className="space-y-2">
                      <div className="flex gap-2 text-xs font-sans">
                        <CheckSquare className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>Successfully navigated comprehensive historical district building approvals.</span>
                      </div>
                      <div className="flex gap-2 text-xs font-sans">
                        <CheckSquare className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>Integrated concealed solar-bracket flashing supporting zero-penetration arrays.</span>
                      </div>
                      <div className="flex gap-2 text-xs font-sans">
                        <CheckSquare className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>Implemented full 12-sensor soffit-to-ridge passive thermal exchange ventilation.</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Specific stats */}
                <div className="md:col-span-5 space-y-4">
                  <div className="space-y-1">
                    <h4 className="text-xs font-mono uppercase tracking-wider text-amber-500 font-bold">Architectural Specifications</h4>
                    <div className={`border rounded-2xl p-4 space-y-3.5 ${
                      isDarkMode ? "border-slate-800 bg-slate-950" : "border-slate-200 bg-slate-50"
                    }`}>
                      <div className="text-xs flex justify-between gap-2">
                        <span className={`font-mono ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>Pitch:</span>
                        <span className="font-bold">{getStructuralDetails(selectedProject.id).slope}</span>
                      </div>
                      <div className="text-xs flex justify-between gap-2">
                        <span className={`font-mono ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>Total Decking:</span>
                        <span className="font-bold">{getStructuralDetails(selectedProject.id).area}</span>
                      </div>
                      <div className="text-xs flex justify-between gap-2">
                        <span className={`font-mono ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>Underlayment:</span>
                        <span className="font-bold text-right text-[11px] max-w-[130px] leading-snug">{getStructuralDetails(selectedProject.id).underlayment}</span>
                      </div>
                      <div className="text-xs flex justify-between gap-2">
                        <span className={`font-mono ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>Fastener Specs:</span>
                        <span className="font-bold text-right text-[11px] max-w-[130px] leading-snug">{getStructuralDetails(selectedProject.id).fasteners}</span>
                      </div>
                      <div className="h-px bg-slate-200/10" />
                      <div className="text-xs flex justify-between items-center gap-2">
                        <span className={`font-mono ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>Owner Rating:</span>
                        <div className="flex items-center text-amber-500 gap-0.5">
                          {[...Array(selectedProject.rating || 5)].map((_, idx) => (
                            <Star key={idx} className="w-3.5 h-3.5 fill-amber-500" />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom CTAs */}
              <div className={`p-4 border-t px-6 flex flex-col sm:flex-row items-center justify-between gap-4 ${
                isDarkMode ? "border-slate-800 bg-slate-950" : "border-slate-200 bg-slate-50"
              }`}>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-amber-500" />
                  <span className={`text-[11px] font-mono ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>
                    Final inspection signed off: {selectedProject.completionDate}
                  </span>
                </div>
                <div className="flex gap-2 w-full sm:w-auto">
                  <button
                    onClick={() => setSelectedProject(null)}
                    className={`flex-1 sm:flex-initial px-4 py-2 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                      isDarkMode ? "border-slate-850 hover:bg-slate-800" : "border-slate-300 hover:bg-white"
                    }`}
                  >
                    Close Study
                  </button>
                  <button
                    id="btn-project-modal-inquire"
                    onClick={() => {
                      onSelectServiceForBooking(`Consultation matching ${selectedProject.title}`);
                      setSelectedProject(null);
                    }}
                    className="flex-1 sm:flex-initial bg-amber-500 hover:bg-amber-600 text-slate-950 font-semibold px-4 py-2 rounded-lg text-xs flex items-center justify-center gap-1 shadow"
                  >
                    <span>Request Similar Build</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
