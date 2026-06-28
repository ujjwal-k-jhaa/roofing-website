import { useState, useEffect } from "react";
import { Sun, Moon, Hammer, Menu, X, Phone, Shield, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface NavbarProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  openConsultation: () => void;
  showAdmin: boolean;
  setShowAdmin: (show: boolean) => void;
}

export default function Navbar({
  isDarkMode,
  toggleDarkMode,
  openConsultation,
  showAdmin,
  setShowAdmin
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 15) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    setShowAdmin(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <nav
      id="main-navbar"
      className={`fixed top-2 sm:top-4 left-2 sm:left-4 right-2 sm:right-4 z-50 transition-all duration-300 rounded-2xl overflow-hidden ${
        isScrolled || isMobileMenuOpen
          ? isDarkMode
            ? "bg-slate-950/95 backdrop-blur-xl shadow-2xl border border-white/[0.08] py-2 sm:py-3"
            : "bg-white/95 backdrop-blur-xl shadow-xl border border-slate-200/60 py-2 sm:py-3"
          : isDarkMode
            ? "bg-transparent py-4 sm:py-5 border border-transparent"
            : "bg-transparent py-4 sm:py-5 border border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <div 
            className="flex items-center gap-1.5 sm:gap-3 cursor-pointer group"
            onClick={() => {
              setShowAdmin(false);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <motion.div 
              whileHover={{ scale: 1.05, rotate: -5 }}
              whileTap={{ scale: 0.95 }}
              className={`p-1.5 sm:p-2 rounded-xl transition-all duration-300 ${
                isScrolled || isMobileMenuOpen
                  ? isDarkMode ? "bg-amber-500/10 text-amber-400" : "bg-amber-500/10 text-amber-600"
                  : isDarkMode ? "bg-slate-900 border border-slate-800 text-amber-400" : "bg-white border border-slate-200 text-amber-500 shadow-sm"
              }`}
            >
              <Hammer className="w-4 h-4 sm:w-5 sm:h-5 transform -rotate-45 group-hover:rotate-12 transition-transform duration-300" id="nav-logo-icon" />
            </motion.div>
            <div>
              <span className={`text-sm sm:text-lg font-sans font-bold tracking-tight block ${
                isDarkMode ? "text-white" : "text-slate-950"
              }`}>
                APEX <span className="text-amber-500 font-extrabold tracking-wide text-[9px] sm:text-xs px-1 sm:px-1.5 py-0.5 rounded bg-amber-500/10 ml-0.5">ROOFWORKS</span>
              </span>
              <span className={`text-[8px] sm:text-[9px] font-mono tracking-widest uppercase block -mt-1 font-semibold ${
                isDarkMode ? "text-slate-400" : "text-slate-500"
              }`}>
                Texas Craftsmanship
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-2 bg-slate-900/[0.03] dark:bg-white/[0.02] p-1 rounded-xl border border-slate-200/10">
            {[
              { label: "Home", id: "hero", active: !showAdmin },
              { label: "Services", id: "services", active: false },
              { label: "Our Work", id: "portfolio", active: false },
              { label: "Testimonials", id: "testimonials", active: false }
            ].map((tab) => (
              <button
                key={tab.label}
                onClick={() => scrollToSection(tab.id)}
                className={`relative px-4 py-2 text-xs font-semibold font-sans tracking-wide uppercase transition-all rounded-lg cursor-pointer ${
                  tab.active && !showAdmin
                    ? "text-amber-500 font-bold"
                    : isDarkMode 
                      ? "text-slate-300 hover:text-white" 
                      : "text-slate-600 hover:text-slate-950"
                }`}
              >
                <span className="relative z-10">{tab.label}</span>
                {tab.active && !showAdmin && (
                  <motion.span 
                    layoutId="activeTabIndicator"
                    className="absolute inset-0 bg-amber-500/[0.08] dark:bg-amber-500/[0.12] rounded-lg border border-amber-500/20"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
            
            {/* Real-time CRM Demo Tab Indicator */}
            <button
              id="btn-nav-admin"
              onClick={() => setShowAdmin(!showAdmin)}
              className={`relative text-xs px-3.5 py-2 uppercase font-sans font-bold tracking-wide rounded-lg border transition-all duration-300 cursor-pointer ${
                showAdmin
                  ? "bg-amber-500 text-slate-950 border-amber-600 font-black shadow-md shadow-amber-500/20"
                  : isDarkMode
                    ? "bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-850"
                    : "bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-150"
              }`}
            >
              <div className="flex items-center gap-1.5">
                <span className={`w-2 h-2 rounded-full ${showAdmin ? "bg-slate-950 animate-pulse" : "bg-amber-500 animate-pulse"}`} />
                <span>{showAdmin ? "Interactive CRM Board" : "Inquiry CRM"}</span>
              </div>
            </button>
          </div>

          {/* Right utility panel */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Dark Mode Icon Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              id="theme-toggler"
              onClick={toggleDarkMode}
              className={`p-2.5 rounded-xl border transition-all duration-300 cursor-pointer ${
                isDarkMode 
                  ? "bg-slate-900 hover:bg-slate-850 border-slate-800 text-amber-400 shadow-lg" 
                  : "bg-slate-100 hover:bg-slate-150 border-slate-200 text-slate-600 shadow-sm"
              }`}
              aria-label="Toggle visual mode"
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </motion.button>

            {/* Book Inspection CTA */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              id="cta-nav-consult"
              onClick={openConsultation}
              className="relative overflow-hidden bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-600 hover:to-amber-500 text-slate-950 font-sans font-extrabold text-xs tracking-wider uppercase px-5 py-3 rounded-xl shadow-lg shadow-amber-500/10 hover:shadow-amber-500/20 transition-all duration-300 group cursor-pointer border border-amber-600/10"
            >
              <span className="relative z-10 flex items-center gap-1.5">
                Free Estimate
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </motion.button>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex items-center gap-1.5 sm:gap-3 lg:hidden">
            {/* Dark Mode switcher */}
            <button
              id="theme-toggler-mobile"
              onClick={toggleDarkMode}
              className={`p-1.5 sm:p-2 rounded-lg sm:rounded-xl border transition-all cursor-pointer ${
                isDarkMode ? "bg-slate-900 border-slate-800 text-amber-400" : "bg-slate-100 border-slate-200 text-slate-600"
              }`}
            >
              {isDarkMode ? <Sun className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <Moon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
            </button>

            <button
              id="btn-mobile-menu"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-1.5 sm:p-2 rounded-lg sm:rounded-xl transition-colors cursor-pointer border ${
                isDarkMode ? "hover:bg-slate-900 border-slate-800 text-white" : "hover:bg-slate-100 border-slate-200 text-slate-900"
              }`}
            >
              {isMobileMenuOpen ? <X className="w-4 h-4 sm:w-5 sm:h-5" /> : <Menu className="w-4 h-4 sm:w-5 sm:h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0, scaleY: 0.95 }}
            animate={{ opacity: 1, height: "auto", scaleY: 1 }}
            exit={{ opacity: 0, height: 0, scaleY: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className={`lg:hidden px-4 pt-2 pb-6 border-t overflow-hidden origin-top ${
              isDarkMode ? "bg-slate-950 border-slate-800/60" : "bg-white border-slate-200/60"
            }`}
          >
            <div className="space-y-2 mt-2">
              <button
                onClick={() => {
                  scrollToSection("hero");
                  setIsMobileMenuOpen(false);
                }}
                className={`block w-full text-left px-3 py-2.5 rounded-xl text-xs uppercase font-extrabold tracking-wider ${
                  isDarkMode ? "text-slate-300 hover:bg-slate-900" : "text-slate-700 hover:bg-slate-100"
                }`}
              >
                Home
              </button>
              <button
                onClick={() => {
                  scrollToSection("services");
                  setIsMobileMenuOpen(false);
                }}
                className={`block w-full text-left px-3 py-2.5 rounded-xl text-xs uppercase font-extrabold tracking-wider ${
                  isDarkMode ? "text-slate-300 hover:bg-slate-900" : "text-slate-700 hover:bg-slate-100"
                }`}
              >
                Services
              </button>
              <button
                onClick={() => {
                  scrollToSection("portfolio");
                  setIsMobileMenuOpen(false);
                }}
                className={`block w-full text-left px-3 py-2.5 rounded-xl text-xs uppercase font-extrabold tracking-wider ${
                  isDarkMode ? "text-slate-300 hover:bg-slate-900" : "text-slate-700 hover:bg-slate-100"
                }`}
              >
                Portfolio Work
              </button>
              <button
                onClick={() => {
                  scrollToSection("testimonials");
                  setIsMobileMenuOpen(false);
                }}
                className={`block w-full text-left px-3 py-2.5 rounded-xl text-xs uppercase font-extrabold tracking-wider ${
                  isDarkMode ? "text-slate-300 hover:bg-slate-900" : "text-slate-700 hover:bg-slate-100"
                }`}
              >
                Client Reviews
              </button>
              
              <hr className={isDarkMode ? "border-slate-800 my-2" : "border-slate-200 my-2"} />

              <button
                onClick={() => {
                  setShowAdmin(!showAdmin);
                  setIsMobileMenuOpen(false);
                }}
                className={`flex items-center justify-between w-full text-left px-3.5 py-3 rounded-xl text-xs font-sans border font-bold uppercase ${
                  showAdmin
                    ? "bg-amber-500 text-slate-950 border-amber-600 font-extrabold"
                    : isDarkMode
                      ? "bg-slate-905 text-slate-300 border-slate-800"
                      : "bg-slate-50 text-slate-600 border-slate-200"
                }`}
              >
                <span>Lead CRM Board (Live)</span>
                <span className="text-[10px] px-2 py-0.5 rounded-md bg-amber-500 text-slate-950 font-sans font-extrabold">CRM</span>
              </button>

              <button
                onClick={() => {
                  openConsultation();
                  setIsMobileMenuOpen(false);
                }}
                className="mt-3 w-full bg-amber-500 hover:bg-amber-600 text-slate-950 text-center font-extrabold uppercase tracking-wider text-xs py-3.5 rounded-xl flex items-center justify-center gap-2 shadow"
              >
                Free Instant Estimate
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
