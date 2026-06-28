import { Hammer, Mail, Phone, MapPin, ShieldCheck, Heart, Database, LayoutDashboard, Sparkles, Server, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface FooterProps {
  isDarkMode: boolean;
  openConsultation: () => void;
  showAdmin: boolean;
  setShowAdmin: (show: boolean) => void;
}

export default function Footer({
  isDarkMode,
  openConsultation,
  showAdmin,
  setShowAdmin
}: FooterProps) {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (id: string) => {
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
    <footer
      className={`pt-16 pb-12 transition-colors duration-300 border-t ${
        isDarkMode 
          ? "bg-slate-950 border-slate-900 text-slate-400" 
          : "bg-slate-50 border-slate-200 text-slate-600"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Segment */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-slate-200/5 items-start text-left">
          
          {/* Column 1 - Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2 cursor-pointer group" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
              <div className="p-1.5 rounded bg-amber-500/10 text-amber-500">
                <Hammer className="w-5 h-5" id="footer-logo-icon" />
              </div>
              <span className={`text-lg font-sans font-extrabold tracking-tight ${isDarkMode ? "text-white" : "text-slate-900"}`}>
                APEX <span className="text-amber-500">ROOFWORKS</span>
              </span>
            </div>
            <p className="text-xs leading-relaxed max-w-sm">
              We design premium and architectural Grade-A metal paneling, natural stone slate, and composite shingling systems across the Austin metro area. GAF Master-Elite Certified installers.
            </p>
            
            {/* Accreditation badge */}
            <div className="flex items-center gap-2 pt-2">
              <ShieldCheck className="w-7 h-7 text-amber-500" />
              <div>
                <h4 className={`text-[10px] font-bold uppercase tracking-wider ${isDarkMode ? "text-slate-350" : "text-slate-800"}`}>GAF Master Elite®</h4>
                <p className="text-[9px] text-slate-500">License ID: ME-TX-84930</p>
              </div>
            </div>
          </div>

          {/* Column 2 - Links */}
          <div className="md:col-span-3 space-y-4">
            <h4 className={`text-xs font-mono uppercase tracking-widest font-bold ${isDarkMode ? "text-white" : "text-slate-900"}`}>
              Structural Services
            </h4>
            <div className="space-y-2.5 text-xs text-left">
              <button onClick={() => scrollToSection("services")} className="block hover:text-amber-500 transition-colors cursor-pointer">Residential Roofing</button>
              <button onClick={() => scrollToSection("services")} className="block hover:text-amber-500 transition-colors cursor-pointer">Standing Seam Metal</button>
              <button onClick={() => scrollToSection("services")} className="block hover:text-amber-500 transition-colors cursor-pointer">FLIR Thermal Drone Scans</button>
              <button onClick={() => scrollToSection("services")} className="block hover:text-amber-500 transition-colors cursor-pointer">Commercial Membranes</button>
            </div>
          </div>

          {/* Column 3 - Contact information */}
          <div className="md:col-span-4 space-y-4 text-left">
            <h4 className={`text-xs font-mono uppercase tracking-widest font-bold ${isDarkMode ? "text-white" : "text-slate-900"}`}>
              Headquarters & Sales
            </h4>
            <div className="space-y-3 text-xs">
              
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                <p>
                  <span className={`block font-bold ${isDarkMode ? "text-white" : "text-slate-900"}`}>Apex Offices</span>
                  1204 South Congress Ave, Austin TX 78704
                </p>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-500 shrink-0" />
                <p className="font-semibold">(512) 480-1920</p>
              </div>

              <div className="flex items-center gap-2.5 font-mono">
                <Mail className="w-4 h-4 text-amber-500 shrink-0" />
                <p>contact@apex-roofworks.com</p>
              </div>

            </div>
          </div>

        </div>

        {/* Massive Logo Text Segment */}
        <div className="mt-16 mb-8 select-none py-4 overflow-hidden border-t border-slate-200/5 dark:border-white/[0.05] flex justify-center items-center w-full">
          <h2 className={`text-[12vw] sm:text-[10vw] md:text-[8vw] lg:text-[7.5vw] xl:text-[7.4rem] font-sans font-black tracking-tighter uppercase leading-none text-center select-none flex flex-col sm:flex-row items-center justify-center gap-y-2 sm:gap-x-4 w-full ${
            isDarkMode 
              ? "text-slate-800 dark:text-slate-850" 
              : "text-slate-200"
          } transition-all`}>
            <span>APEX</span>
            <span className="text-amber-500/30 dark:text-amber-500/15">ROOFWORKS</span>
          </h2>
        </div>

        {/* Bottom copyright segment */}
        <div className="pt-8 border-t border-slate-205/10 dark:border-slate-900/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sans text-center sm:text-left">
          
          <div className="space-y-1 max-w-xl">
            <p className={`font-semibold ${isDarkMode ? "text-slate-355" : "text-slate-800"}`}>
              © {currentYear} APEX ROOFWORKS. All Rights Reserved.
            </p>
            <p className={`text-[11px] leading-relaxed ${isDarkMode ? "text-slate-500" : "text-slate-500"}`}>
              <span className="font-bold text-amber-505 dark:text-amber-400">Notice:</span> This website is crafted strictly as a beautiful visual design and technical portfolio showcase, representing high-end mock business services, and does not belong to an active commercial roofing company or real business entity.
            </p>
          </div>

          {/* Standout Interactive Staff CRM Card Component */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="w-full sm:w-auto"
          >
            <div 
              id="footer-crm-shortcut"
              onClick={() => {
                setShowAdmin(!showAdmin);
                if (!showAdmin) {
                  // Scroll to top where the dashboard will render
                  setTimeout(() => {
                    const crmSec = document.getElementById("crm-portal-scroller");
                    if (crmSec) crmSec.scrollIntoView({ behavior: "smooth", block: "start" });
                  }, 250);
                }
              }}
              className={`p-4 rounded-2xl border transition-all duration-300 cursor-pointer flex items-center justify-between gap-5 text-left group relative overflow-hidden max-w-sm sm:max-w-md ${
                showAdmin
                  ? "bg-amber-500 text-slate-950 border-amber-600 shadow-xl shadow-amber-500/10"
                  : isDarkMode
                    ? "bg-slate-900/90 hover:bg-slate-850 border-white/[0.06] hover:border-amber-500/30 text-white shadow-2xl"
                    : "bg-white hover:bg-slate-50 border-slate-200 hover:border-amber-500/30 text-slate-905 shadow-lg shadow-slate-200/50"
              }`}
            >
              {/* Decorative Subtle Grid Line */}
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/[0.02] via-transparent to-transparent pointer-events-none" />
              
              <div className="flex items-center gap-3">
                <div className={`p-2.5 rounded-xl transition-all ${
                  showAdmin 
                    ? "bg-slate-950 text-amber-400" 
                    : isDarkMode 
                      ? "bg-slate-950 border border-white/[0.04] text-amber-500 group-hover:bg-amber-500/10" 
                      : "bg-amber-500/10 text-amber-600 group-hover:bg-amber-500/20"
                }`}>
                  <Database className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className={`text-[9px] font-mono tracking-widest uppercase font-bold px-1.5 py-0.5 rounded ${
                      showAdmin ? "bg-slate-950 text-amber-400" : "bg-amber-550/10 text-amber-600 dark:text-amber-500"
                    }`}>
                      System Live
                    </span>
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                  </div>
                  <h4 className="text-xs font-sans font-extrabold tracking-tight mt-0.5 uppercase">
                    Staff CRM Board
                  </h4>
                  <p className={`text-[9px] uppercase font-mono tracking-wider font-semibold ${
                    showAdmin ? "text-slate-900" : "text-slate-400"
                  }`}>
                    {showAdmin ? "Tap to close CRM" : "Touch to view leads"}
                  </p>
                </div>
              </div>

              <div className={`p-1 rounded-lg ${showAdmin ? "bg-slate-950/20 text-slate-950" : "bg-slate-100/5 text-slate-400 group-hover:text-amber-500"}`}>
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>
          </motion.div>

        </div>

      </div>
    </footer>
  );
}
