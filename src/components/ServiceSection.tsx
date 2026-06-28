import { useState } from "react";
import { Home, ShieldCheck, Radar, Building2, ChevronRight, X, Check, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { ServiceItem } from "../types";
import { SERVICES } from "../data";

interface ServiceSectionProps {
  isDarkMode: boolean;
  onSelectServiceForBooking: (serviceTitle: string) => void;
}

const iconMap: Record<string, any> = {
  Home,
  ShieldCheck,
  Radar,
  Building2
};

export default function ServiceSection({ isDarkMode, onSelectServiceForBooking }: ServiceSectionProps) {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  // Technical specification generator based on service ID to enrich details
  const getSpecs = (id: string) => {
    switch (id) {
      case "serv-residential":
        return {
          "Material Certs": "GAF Master-Elite Certified Materials, Owen Corning Oakridge Platinum Shingles",
          "Fire Rating": "Class A (Highest industry standard)",
          "Wind Resistance": "Up to 130 MPH matching category-4 hurricanes",
          "Average Duration": "1-2 days based on square footage"
        };
      case "serv-metal":
        return {
          "Metal Thickness": "24-Gauge structural premium steel (Standing Seam)",
          "Thermal Reflectance": "SRI rating > 78 (Cuts energy cooling costs by ~25%)",
          "Coating Rating": "Double-layer PVDF premium custom Kynar 500 paint finish",
          "Estimated Lifespan": "50+ years virtually maintenance-free"
        };
      case "serv-inspections":
        return {
          "Payload Core": "High-Definition FLIR Thermal Moister Core Mapping Sensors",
          "Aircraft Specs": "Commercial Enterprise Grade FAA Part 107 Quadcopters",
          "Audit Report Time": "Delivered within 4 hours fully digitized",
          "Inspection Angle": "Adaptive 3D structural photogrammetry mesh mapping"
        };
      default:
        return {
          "Membrane Grade": "80-Mil reinforced thick commercial-grade TPO / EPDM",
          "Coverage Level": "Backed by GAF EverGuard and complete structural testing",
          "OSHA Compliance": "Dedicated physical tie-off rigs and crane support",
          "Warranty Options": "20-Year complete NDL (No Dollar Limit) warranty"
        };
    }
  };

  return (
    <section
      id="services"
      className={`py-24 transition-colors duration-300 relative ${
        isDarkMode ? "bg-slate-900 text-white" : "bg-white text-slate-900"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-mono uppercase tracking-widest text-amber-500 font-bold">
            Spec Sheets & Architectural Capabilities
          </span>
          <h2 className="text-3xl sm:text-4xl font-sans font-bold tracking-tight">
            Our Premium Roofing Solutions
          </h2>
          <div className="h-1 w-16 bg-amber-500 mx-auto rounded-full" />
          <p className={`text-base sm:text-lg ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>
            We deliver state-of-the-art roofing systems characterized by pristine physical detailing, high material performance ratios, and safety-certified execution workflows.
          </p>
        </div>

        {/* Services Grid */}
        <motion.div 
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0 },
            show: { 
              opacity: 1,
              transition: { staggerChildren: 0.08 }
            }
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {SERVICES.map((service) => {
            const IconComponent = iconMap[service.iconName] || ShieldCheck;
            return (
              <motion.div
                key={service.id}
                id={`services-card-${service.id}`}
                variants={{
                  hidden: { opacity: 0, y: 30, scale: 0.97 },
                  show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 180, damping: 20 } }
                }}
                whileHover={{ y: -6, scale: 1.01 }}
                className={`p-6 rounded-2xl border transition-colors duration-300 flex flex-col justify-between group h-full relative ${
                  isDarkMode
                    ? "bg-slate-950/60 backdrop-blur-md border-white/[0.06] hover:border-amber-400/40 hover:shadow-2xl hover:shadow-amber-500/[0.04]"
                    : "bg-white border-slate-200 hover:border-amber-500/30 hover:shadow-xl hover:shadow-slate-200/50"
                }`}
              >
                {/* Premium Gradient Contour glow */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-br from-amber-500/[0.02] via-transparent to-amber-500/[0.02]" />

                <div className="space-y-4 relative z-10">
                  {/* Icon Frame */}
                  <div className={`p-3 rounded-xl w-fit transition-transform duration-300 group-hover:scale-105 ${
                    isDarkMode ? "bg-slate-900 border border-white/[0.04] text-amber-500" : "bg-slate-50 border border-slate-100 text-amber-600 shadow-sm"
                  }`}>
                    <IconComponent className="w-5 h-5 animate-pulse" />
                  </div>

                  {/* Title & description */}
                  <div className="text-left space-y-2">
                    <span className="text-[9px] font-mono tracking-widest text-amber-550 block uppercase font-bold">
                      CAPABILITY SPEC
                    </span>
                    <h3 className="text-sm font-bold font-sans tracking-tight group-hover:text-amber-500 transition-colors uppercase leading-tight">
                      {service.title}
                    </h3>
                    <p className={`text-[11px] font-sans leading-relaxed line-clamp-4 ${
                      isDarkMode ? "text-slate-400" : "text-slate-600"
                    }`}>
                      {service.shortDescription}
                    </p>
                  </div>
                </div>

                {/* Specs button */}
                <div className="pt-6 relative z-10 text-left">
                  <button
                    onClick={() => setSelectedService(service)}
                    className={`w-full text-xs font-semibold py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 border transition-all cursor-pointer ${
                      isDarkMode
                        ? "border-slate-800 text-slate-300 hover:border-amber-500 hover:bg-amber-500/5 hover:text-amber-400"
                        : "border-slate-300 text-slate-700 hover:border-amber-500 hover:bg-white hover:text-amber-600"
                    }`}
                  >
                    <span>View Specifications</span>
                    <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
        
        {/* premium material comparison table */}
        <motion.div 
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="mt-20 text-left"
        >
          <div className="text-center md:text-left mb-10">
            <span className="text-[10px] font-mono tracking-widest text-amber-500 font-extrabold uppercase bg-amber-500/10 px-2.5 py-1 rounded-md">
              AESTHETIC & MATERIAL INTELLIGENCE
            </span>
            <h3 className={`text-2xl md:text-3xl font-sans font-extrabold tracking-tight mt-3 uppercase ${isDarkMode ? "text-white" : "text-slate-950"}`}>
              ROOFING SYSTEMS <span className="text-amber-500 font-light font-sans">COMPARATIVE ANALYTICS</span>
            </h3>
            <p className={`text-xs mt-2 max-w-2xl font-sans leading-relaxed ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>
              Compare lifetime durability, wind shear resilience, thermal properties, and relative initial investment across Central Texas' premium roofing selections.
            </p>
            <div className="mt-4 flex items-center gap-1.5 text-[10px] font-mono text-amber-550/80 dark:text-amber-400/80 md:hidden animate-pulse">
              <span>Swipe horizontally to compare full specifications</span>
              <span>→</span>
            </div>
          </div>

          <div className="overflow-x-auto rounded-3xl border border-slate-200/10 dark:border-white/[0.06] shadow-2xl relative">
            {/* Ambient Background Glow inside comparison table container */}
            <div className="absolute inset-0 bg-slate-100/5 dark:bg-slate-900/[0.02] backdrop-blur-md -z-10 rounded-3xl" />
            <table className="w-full border-collapse text-left min-w-[780px]">
              <thead>
                <tr className={`${isDarkMode ? "bg-slate-900/60 text-white" : "bg-slate-50 text-slate-950"} border-b border-slate-200/10 dark:border-white/[0.06]`}>
                  <th className="p-4 sm:p-5 text-[10px] font-mono uppercase tracking-wider font-extrabold">Material Parameter</th>
                  <th className="p-4 sm:p-5 text-[10px] font-mono uppercase tracking-wider bg-amber-500/[0.06] text-amber-500 font-extrabold border-x border-slate-205/10 dark:border-white/[0.04] text-center">
                    ★ STANDING SEAM METAL
                  </th>
                  <th className="p-4 sm:p-5 text-[10px] font-mono uppercase tracking-wider font-extrabold text-center">NATURAL STONE SLATE</th>
                  <th className="p-4 sm:p-5 text-[10px] font-mono uppercase tracking-wider font-extrabold text-center">COMPOSITE SHINGLES</th>
                  <th className="p-4 sm:p-5 text-[10px] font-mono uppercase tracking-wider font-extrabold text-center">TPO COMMERCIAL</th>
                </tr>
              </thead>
              <tbody className={`divide-y divide-slate-200/10 dark:divide-white/[0.04] ${isDarkMode ? "bg-slate-950/40" : "bg-white"}`}>
                <tr className="hover:bg-amber-500/[0.01] transition-colors">
                  <td className={`p-4 sm:p-5 text-xs font-bold ${isDarkMode ? "text-slate-300" : "text-slate-800"}`}>Service Lifespan</td>
                  <td className="p-4 sm:p-5 text-xs font-black text-amber-500 bg-amber-500/[0.03] border-x border-slate-205/10 dark:border-white/[0.04] text-center">50 - 75 Years</td>
                  <td className={`p-4 sm:p-5 text-xs font-bold text-center ${isDarkMode ? "text-slate-350" : "text-slate-700"}`}>100+ Years (Lifetime)</td>
                  <td className={`p-4 sm:p-5 text-xs font-medium text-center ${isDarkMode ? "text-slate-400" : "text-slate-650"}`}>25 - 40 Years</td>
                  <td className={`p-4 sm:p-5 text-xs font-medium text-center ${isDarkMode ? "text-slate-400" : "text-slate-650"}`}>20 - 30 Years</td>
                </tr>
                <tr className="hover:bg-amber-500/[0.01] transition-colors">
                  <td className={`p-4 sm:p-5 text-xs font-bold ${isDarkMode ? "text-slate-300" : "text-slate-800"}`}>Material Profile</td>
                  <td className="p-4 sm:p-5 text-xs font-medium bg-amber-500/[0.03] border-x border-slate-205/10 dark:border-white/[0.04] text-center text-slate-800 dark:text-slate-300 font-semibold">GA-24 Galvalume / Kynar 500 Coating</td>
                  <td className={`p-4 sm:p-5 text-xs font-medium text-center ${isDarkMode ? "text-slate-300" : "text-slate-700"}`}>Vermont S-1 Graded Quarry Slate</td>
                  <td className={`p-4 sm:p-5 text-xs font-medium text-center ${isDarkMode ? "text-slate-400" : "text-slate-655"}`}>GAF Timberline HDZ Class-4 shingles</td>
                  <td className={`p-4 sm:p-5 text-xs font-medium text-center ${isDarkMode ? "text-slate-400" : "text-slate-655"}`}>60-mil Reinforced single-ply TPO</td>
                </tr>
                <tr className="hover:bg-amber-500/[0.01] transition-colors">
                  <td className={`p-4 sm:p-5 text-xs font-bold ${isDarkMode ? "text-slate-300" : "text-slate-800"}`}>Energy Rating</td>
                  <td className="p-4 sm:p-5 text-xs font-extrabold bg-amber-500/[0.03] border-x border-slate-205/10 dark:border-white/[0.04] text-emerald-600 dark:text-emerald-400 text-center">
                    Excellent (SRI ~85+ Cool Roof)
                  </td>
                  <td className={`p-4 sm:p-5 text-xs font-medium text-center ${isDarkMode ? "text-slate-300" : "text-slate-700"}`}>Good (High Thermal Mass benefit)</td>
                  <td className={`p-4 sm:p-5 text-xs font-medium text-center ${isDarkMode ? "text-slate-400" : "text-slate-655"}`}>Moderate (Passive Attic Venting)</td>
                  <td className={`p-4 sm:p-5 text-xs font-extrabold text-emerald-600 dark:text-emerald-400 text-center`}>Excellent (High Solar Reflective Value)</td>
                </tr>
                <tr className="hover:bg-amber-500/[0.01] transition-colors">
                  <td className={`p-4 sm:p-5 text-xs font-bold ${isDarkMode ? "text-slate-300" : "text-slate-800"}`}>Wind Resistance</td>
                  <td className="p-4 sm:p-5 text-xs font-semibold bg-amber-500/[0.03] border-x border-slate-205/10 dark:border-white/[0.04] text-center text-slate-800 dark:text-slate-300">Up to 140 MPH (Class 4 Impact)</td>
                  <td className={`p-4 sm:p-5 text-xs font-medium text-center ${isDarkMode ? "text-slate-300" : "text-slate-700"}`}>Up to 110 MPH (High Structural Mass)</td>
                  <td className={`p-4 sm:p-5 text-xs font-medium text-center ${isDarkMode ? "text-slate-400" : "text-slate-655"}`}>Up to 130 MPH (WindProof warranty)</td>
                  <td className={`p-4 sm:p-5 text-xs font-medium text-center ${isDarkMode ? "text-slate-400" : "text-slate-655"}`}>Up to 120 MPH (Robust heat fused joints)</td>
                </tr>
                <tr className="hover:bg-amber-500/[0.01] transition-colors">
                  <td className={`p-4 sm:p-5 text-xs font-bold ${isDarkMode ? "text-slate-300" : "text-slate-800"}`}>Relative Investment</td>
                  <td className="p-4 sm:p-5 text-xs font-black bg-amber-500/[0.03] border-x border-slate-205/10 dark:border-white/[0.04] text-amber-505 dark:text-amber-400 text-center">Premium High value ratio</td>
                  <td className="p-4 sm:p-5 text-xs font-black text-rose-500 dark:text-rose-400 text-center">Generational Luxury</td>
                  <td className="p-4 sm:p-5 text-xs font-extrabold text-center text-emerald-600 dark:text-emerald-400">Cost-Efficient Friendly</td>
                  <td className="p-4 sm:p-5 text-xs font-semibold text-center text-slate-700 dark:text-slate-300">Moderate Commercial budget</td>
                </tr>
                <tr className="hover:bg-amber-500/[0.01] transition-colors">
                  <td className={`p-4 sm:p-5 text-xs font-bold ${isDarkMode ? "text-slate-300" : "text-slate-800"}`}>Core System Utility</td>
                  <td className="p-4 sm:p-5 text-xs font-medium bg-amber-500/[0.03] border-x border-slate-205/10 dark:border-white/[0.04] text-left text-slate-700 dark:text-slate-300 leading-relaxed">
                    ✓ Solar integration-ready. Zero surface degradation, 100% recyclable. Ideal for high central Texas rain storms.
                  </td>
                  <td className="p-4 sm:p-5 text-xs font-medium text-left text-slate-700 dark:text-slate-300 leading-relaxed">
                    ✓ Unmatched natural aesthetic. Completely fireproof & rotproof. Holds permanent architectural superiority.
                  </td>
                  <td className="p-4 sm:p-5 text-xs font-medium text-left text-slate-600 dark:text-slate-400 leading-relaxed">
                    ✓ Fast installation cycle, extremely customizable dimensional look with minor maintenance cost parameters.
                  </td>
                  <td className="p-4 sm:p-5 text-xs font-medium text-left text-slate-600 dark:text-slate-400 leading-relaxed">
                    ✓ Seamless heat welded flat roofing standard. Zero leaking opportunities across expansive structural sheets.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Dynamic Detail Modal */}
        {selectedService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in text-left">
            <div
              className={`w-full max-w-2xl rounded-2xl border overflow-hidden shadow-2xl relative transition-colors duration-300 ${
                isDarkMode ? "bg-slate-900 border-slate-800 text-white" : "bg-white border-slate-200 text-slate-900"
              }`}
            >
              {/* Header */}
              <div className="p-6 border-b border-slate-200/10 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-amber-500/10 text-amber-500">
                    {iconMap[selectedService.iconName] ? (
                      (() => {
                        const Com = iconMap[selectedService.iconName];
                        return <Com className="w-5 h-5" />;
                      })()
                    ) : (
                      <ShieldCheck className="w-5 h-5" />
                    )}
                  </div>
                  <h3 className="text-xl font-bold font-sans tracking-tight uppercase">
                    {selectedService.title}
                  </h3>
                </div>
                <button
                  id="close-specification-modal"
                  onClick={() => setSelectedService(null)}
                  className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                    isDarkMode ? "hover:bg-slate-800 border-slate-800" : "hover:bg-slate-100 border-slate-200"
                  }`}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Body */}
              <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
                {/* Description */}
                <div className="space-y-2">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-amber-500 font-bold">Solutions Overview</h4>
                  <p className={`text-sm leading-relaxed ${isDarkMode ? "text-slate-300" : "text-slate-600"}`}>
                    {selectedService.fullDescription}
                  </p>
                </div>

                {/* Key Features Checked List */}
                <div className="space-y-3">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-amber-500 font-bold">Scope of Installation</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {selectedService.features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs font-sans">
                        <div className="p-0.5 rounded-full bg-emerald-500/10 text-emerald-500 mt-0.5">
                          <Check className="w-3.5 h-3.5" />
                        </div>
                        <span className={isDarkMode ? "text-slate-300" : "text-slate-700"}>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Technical Specification Table */}
                <div className="space-y-3">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-amber-500 font-bold text-left">Technical Specifications</h4>
                  <div className={`border rounded-xl divide-y ${
                    isDarkMode ? "border-slate-800 divide-slate-800 bg-slate-950" : "border-slate-200 divide-slate-200 bg-slate-50"
                  }`}>
                    {Object.entries(getSpecs(selectedService.id)).map(([key, val], idx) => (
                      <div key={idx} className="flex justify-between p-3 text-xs gap-4">
                        <span className={`font-mono ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>{key}:</span>
                        <span className="font-semibold text-right">{val}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Bar */}
              <div className={`p-4 border-t px-6 flex flex-col sm:flex-row items-center justify-between gap-4 ${
                isDarkMode ? "border-slate-800 bg-slate-950" : "border-slate-200 bg-slate-50"
              }`}>
                <p className={`text-[11px] font-sans text-left max-w-[300px] ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>
                  Each material specification can be customized during our digital scoping consultation.
                </p>
                <div className="flex gap-3 w-full sm:w-auto">
                  <button
                    onClick={() => setSelectedService(null)}
                    className={`flex-1 sm:flex-initial px-4 py-2 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                      isDarkMode ? "border-slate-850 hover:bg-slate-800" : "border-slate-300 hover:bg-white"
                    }`}
                  >
                    Close
                  </button>
                  <button
                    id="btn-modal-select-service"
                    onClick={() => {
                      onSelectServiceForBooking(selectedService.title);
                      setSelectedService(null);
                    }}
                    className="flex-1 sm:flex-initial bg-amber-500 hover:bg-amber-600 text-slate-950 font-semibold px-5 py-2 rounded-lg text-xs flex items-center justify-center gap-1.5 shadow"
                  >
                    <span>Request Estimate</span>
                    <ArrowRight className="w-3.5 h-3.5" />
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
