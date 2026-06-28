import { Star, ShieldCheck, Check, Sparkles, ChevronRight } from "lucide-react";
import { motion } from "motion/react";

interface HeroSectionProps {
  isDarkMode: boolean;
  openConsultation: () => void;
  viewOurWork: () => void;
}

export default function HeroSection({
  isDarkMode,
  openConsultation,
  viewOurWork
}: HeroSectionProps) {
  return (
    <section
      id="hero"
      className={`relative min-h-screen pt-32 pb-20 flex items-center overflow-hidden transition-colors duration-300 ${
        isDarkMode 
          ? "bg-slate-950 text-white" 
          : "bg-slate-50 text-slate-950"
      }`}
    >
      {/* Decorative backdrop elements */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-amber-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-slate-500/5 blur-[100px] rounded-full pointer-events-none" />

      {/* Grid lines for architectural feel */}
      <div className={`absolute inset-0 opacity-15 pointer-events-none bg-[linear-gradient(to_right,rgba(128,128,128,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(128,128,128,0.1)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]`} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Text panel (Left 7 cols on large screens) */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Elite Badge */}
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border text-[10px] sm:text-xs font-mono tracking-wide bg-amber-500/10 text-amber-500 border-amber-500/20 max-w-full flex-wrap"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>PLATINUM CERTIFIED ROOF RESCUE & MASTER CRAFT</span>
            </motion.div>

            {/* Display Header */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-sans font-extrabold tracking-tight leading-[1.1]"
            >
              Architectural <span className="text-amber-500">Mastery</span>. <br />
              Lifetime Structural Safety.
            </motion.h1>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className={`text-base sm:text-lg max-w-xl font-sans ${
                isDarkMode ? "text-slate-300" : "text-slate-600"
              }`}
            >
              We design and install high-gauge standing seam metal, natural slate, and premium architectural shingle roofs that safeguard your property for 50+ years. Complete with thermal drone diagnostics.
            </motion.p>

            {/* Professional Validation Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2"
            >
              <div className="flex items-start gap-2">
                <div className="p-1 rounded-full bg-emerald-500/10 text-emerald-500 mt-0.5">
                  <Check className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold">10-Yr Workmanship Leak Guarantee</h4>
                  <p className={`text-xs ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>Directly backed and fully transferrable</p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <div className="p-1 rounded-full bg-emerald-500/10 text-emerald-500 mt-0.5">
                  <Check className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold">FLIR Drone Diagnostics</h4>
                  <p className={`text-xs ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>Micro-leak thermal scanner mapping included</p>
                </div>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4"
            >
              <button
                id="cta-hero-book"
                onClick={openConsultation}
                className="bg-amber-500 hover:bg-amber-600 font-bold hover:shadow-lg hover:shadow-amber-500/10 text-slate-950 px-8 py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 text-base cursor-pointer"
              >
                <span>Book Free Inspection</span>
                <ChevronRight className="w-5 h-5" />
              </button>

              <button
                id="cta-hero-work"
                onClick={viewOurWork}
                className={`px-8 py-4 rounded-xl font-bold border transition-all flex items-center justify-center gap-2 text-base cursor-pointer ${
                  isDarkMode 
                    ? "border-slate-800 hover:bg-slate-900 bg-slate-900/40 text-white" 
                    : "border-slate-300 hover:bg-slate-100 bg-white text-slate-800"
                }`}
              >
                <span>Explore Portfolio</span>
              </button>
            </motion.div>

            {/* Trust Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="flex flex-wrap items-center gap-4 sm:gap-6 pt-6 border-t border-slate-200/10"
            >
              <div className="min-w-[160px]">
                <div className="flex items-center text-amber-500 gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-500" />
                  ))}
                  <span className="ml-1 text-sm font-extrabold text-slate-500 font-mono">5.0</span>
                </div>
                <p className={`text-xs mt-1 ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>
                  Backed by 180+ Google reviews
                </p>
              </div>

              <div className="hidden xs:block h-8 w-px bg-slate-200/10" />

              <div className="flex items-center gap-2 min-w-[200px]">
                <ShieldCheck className="w-8 h-8 text-amber-500 shrink-0" />
                <div>
                  <h4 className="text-xs font-extrabold uppercase tracking-wider">GAF Master Elite</h4>
                  <p className={`text-[10px] ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>Only 2% of US roofers qualify</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Visual Presentation (Right 5 cols) */}
          <div className="lg:col-span-5 relative w-full flex justify-center">
            
            {/* Floating Badges */}
            <div className="absolute top-8 -left-6 z-20 bg-slate-900/75 backdrop-blur-md border border-amber-500/20 text-white p-3.5 rounded-xl shadow-2xl max-w-[170px] hidden sm:block">
              <div className="flex items-center gap-1.5 mb-1 text-amber-500 font-bold text-xs uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4" />
                <span>Double Lock</span>
              </div>
              <p className="text-[11px] text-slate-300 font-sans">
                Standing seam metal offers category-5 weather shields.
              </p>
            </div>

            <div className="absolute bottom-8 -right-6 z-20 bg-slate-900/75 backdrop-blur-md border border-emerald-500/20 text-white p-3.5 rounded-xl shadow-2xl max-w-[170px] hidden sm:block">
              <div className="flex items-center gap-1.5 mb-1 text-emerald-400 font-bold text-xs uppercase tracking-wider">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span>Active Safe</span>
              </div>
              <p className="text-[11px] text-slate-300 font-sans text-left">
                Safety harnesses, ground protection tarps, and magnetic nail sweep sweeps.
              </p>
            </div>

            {/* Main Visual Frame */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative w-full aspect-[4/5] sm:aspect-square max-w-[420px] rounded-3xl overflow-hidden shadow-2xl border-4 border-amber-500/20 bg-slate-800"
            >
              {/* Overlapping golden hour image */}
              <img
                src="/src/assets/images/luxury_roof_hero_1782024697889.jpg"
                alt="Luxury Roofworks Installation"
                className="w-full h-full object-cover transform hover:scale-[1.03] transition-transform duration-700 pointer-events-none"
                referrerPolicy="no-referrer"
              />
              {/* Visual overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />

              {/* Tag overlay inside photo */}
              <div className="absolute bottom-4 left-4 right-4 text-white text-left">
                <p className="text-[10px] font-mono tracking-wider text-amber-400 uppercase">Recent Installation</p>
                <h4 className="text-base font-bold leading-tight font-sans">The Vista Ridge Luxury Slate Upgrade</h4>
                <p className="text-xs text-slate-300">West Lake Hills Estate Project</p>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
