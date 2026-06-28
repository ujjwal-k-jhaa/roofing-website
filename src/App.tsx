import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import ServiceSection from "./components/ServiceSection";
import PortfolioSection from "./components/PortfolioSection";
import TestimonialSlider from "./components/TestimonialSlider";
import ConsultationForm from "./components/ConsultationForm";
import InquiryDashboard from "./components/InquiryDashboard";
import SEOManager from "./components/SEOManager";
import Footer from "./components/Footer";
import { ArrowLeft, Clock, Hammer, ShieldCheck, Star } from "lucide-react";
import * as motion from "motion/react";

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true); // default to a visual dark aesthetic for impact
  const [showAdmin, setShowAdmin] = useState<boolean>(false);
  const [prefilledService, setPrefilledService] = useState<string>("");

  // Hydrate visual mode state from local storage
  useEffect(() => {
    const savedMode = localStorage.getItem("apex-dark-mode");
    if (savedMode !== null) {
      setIsDarkMode(savedMode === "true");
    }
  }, []);

  const toggleDarkMode = () => {
    const nextMode = !isDarkMode;
    setIsDarkMode(nextMode);
    localStorage.setItem("apex-dark-mode", String(nextMode));
  };

  const handleSelectService = (serviceTitle: string) => {
    setPrefilledService(serviceTitle);
    const element = document.getElementById("booking-enclosure");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const navigateToPortfolio = () => {
    setShowAdmin(false);
    const element = document.getElementById("portfolio");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleScrollToBooking = () => {
    setShowAdmin(false);
    const element = document.getElementById("booking-enclosure");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className={`min-h-screen font-sans antialiased selection:bg-amber-500/30 selection:text-amber-200 transition-colors duration-350 ${
      isDarkMode ? "bg-slate-950 text-white dark" : "bg-white text-slate-900"
    }`}>
      
      {/* Visual Header / Navigation */}
      <Navbar
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
        openConsultation={handleScrollToBooking}
        showAdmin={showAdmin}
        setShowAdmin={setShowAdmin}
      />

      {/* Dynamic SEO Title & Metadata Manager */}
      <SEOManager showAdmin={showAdmin} />

      {/* CRM Admin Dashboard View - Toggled dynamically */}
      {showAdmin ? (
        <div id="crm-portal-scroller" className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Trigger bar */}
          <div className="mb-6">
            <button
              onClick={() => setShowAdmin(false)}
              className={`flex items-center gap-1.5 text-xs font-mono font-bold uppercase transition hover:-translate-x-0.5 cursor-pointer ${
                isDarkMode ? "text-slate-400 hover:text-white" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <ArrowLeft className="w-4 h-4 text-amber-500" />
              <span>Back to Public Website</span>
            </button>
          </div>

          <InquiryDashboard isDarkMode={isDarkMode} />
        </div>
      ) : (
        /* Client Facing Marketing Presentation */
        <main className="animate-fade-in text-left">
          
          {/* Hero segment */}
          <HeroSection
            isDarkMode={isDarkMode}
            openConsultation={handleScrollToBooking}
            viewOurWork={navigateToPortfolio}
          />

          {/* Core Services spec sheet section */}
          <ServiceSection
            isDarkMode={isDarkMode}
            onSelectServiceForBooking={handleSelectService}
          />

          {/* Dynamic Portfolio work gallery section */}
          <PortfolioSection
            isDarkMode={isDarkMode}
            onSelectServiceForBooking={handleSelectService}
          />

          {/* Trust Reviews Slider Section */}
          <TestimonialSlider isDarkMode={isDarkMode} />

          {/* Booking lead Capture Consultation Section */}
          <section
            id="booking-enclosure"
            className={`py-24 transition-colors duration-300 relative ${
              isDarkMode ? "bg-slate-900 text-white" : "bg-slate-50 text-slate-900"
            }`}
          >
            {/* Background glowing rings */}
            <div className="absolute inset-0 max-w-7xl mx-auto pointer-events-none">
              <div className="absolute bottom-10 right-20 w-80 h-80 bg-amber-500/[0.025] blur-[100px] rounded-full" />
              <div className="absolute top-10 left-20 w-80 h-80 bg-slate-500/[0.02] blur-[100px] rounded-full" />
            </div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              
              {/* Call to arms */}
              <div className="text-center mb-12 space-y-4">
                <span className="text-xs font-mono uppercase tracking-widest text-amber-500 font-bold block">
                  Scoping Consultation
                </span>
                <h2 className="text-3xl sm:text-4xl font-sans font-bold tracking-tight">
                  Protect Your Structure for a Lifetime
                </h2>
                <div className="h-1 w-16 bg-amber-500 mx-auto rounded-full" />
                <p className={`text-base max-w-xl mx-auto ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>
                  Arrange your free thermal core flight scan and secure physical estimates. We back every project with an industry-leading craftsmanship guarantee.
                </p>
              </div>

              {/* public inquiry contact form */}
              <ConsultationForm
                isDarkMode={isDarkMode}
                prefilledServiceType={prefilledService}
                clearPrefill={() => setPrefilledService("")}
              />

            </div>
          </section>

        </main>
      )}

      {/* Structured Footer */}
      <Footer
        isDarkMode={isDarkMode}
        openConsultation={handleScrollToBooking}
        showAdmin={showAdmin}
        setShowAdmin={setShowAdmin}
      />

    </div>
  );
}
