import { useState, useEffect, FormEvent } from "react";
import { Calendar, Clock, MapPin, Hammer, CheckSquare, Sparkles, AlertCircle, RefreshCw, Send, ShieldAlert, ChevronLeft, ChevronRight, Check } from "lucide-react";
import { Booking } from "../types";

interface ConsultationFormProps {
  isDarkMode: boolean;
  prefilledServiceType: string;
  clearPrefill: () => void;
}

export default function ConsultationForm({
  isDarkMode,
  prefilledServiceType,
  clearPrefill
}: ConsultationFormProps) {
  // Field values
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [roofType, setRoofType] = useState("Architectural Shingles");
  const [serviceType, setServiceType] = useState("Full Replacement Estimate");
  const [message, setMessage] = useState("");
  const [preferredDate, setPreferredDate] = useState("");
  const [preferredTime, setPreferredTime] = useState<"morning" | "afternoon" | "anytime">("anytime");

  // Dynamic states
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionProgress, setSubmissionProgress] = useState("");
  const [successBooking, setSuccessBooking] = useState<Booking | null>(null);
  const [submitError, setSubmitError] = useState("");

  // Handle outside prefill trigger
  useEffect(() => {
    if (prefilledServiceType) {
      setCurrentStep(1);
      if (prefilledServiceType.toLowerCase().includes("metal")) {
        setRoofType("Standing Seam Metal");
        setServiceType("Full Replacement Estimate");
      } else if (prefilledServiceType.toLowerCase().includes("inspection") || prefilledServiceType.toLowerCase().includes("thermal") || prefilledServiceType.toLowerCase().includes("drone")) {
        setRoofType("Any / Uncertain");
        setServiceType("Thermal Drone Inspection");
      } else if (prefilledServiceType.toLowerCase().includes("commercial") || prefilledServiceType.toLowerCase().includes("tpo")) {
        setRoofType("Commercial Membrane (TPO)");
        setServiceType("Commercial Commercial Maintenance");
      } else {
        setRoofType("Architectural Shingles");
        setServiceType("Storm Restoration & Repair");
      }
      
      // Auto scroll to make form fully visible
      const element = document.getElementById("booking-scroller-target");
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      
      // clean up prefill so user can change manually afterwards
      setTimeout(() => {
        clearPrefill();
      }, 1000);
    }
  }, [prefilledServiceType, clearPrefill]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone) {
      setSubmitError("Please fill out all required fields: Name, Email, and Phone.");
      return;
    }

    setSubmitError("");
    setIsSubmitting(true);
    
    // Simulate multi-step enterprise confirmation checks
    setSubmissionProgress("Analyzing roof safety coordinates...");
    await new Promise(r => setTimeout(r, 600));
    
    setSubmissionProgress("Checking commercial field drone inspector availability...");
    await new Promise(r => setTimeout(r, 600));
    
    setSubmissionProgress("Encrypting lead consultation socket...");
    await new Promise(r => setTimeout(r, 550));

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          address,
          roofType,
          serviceType,
          message,
          preferredDate,
          preferredTime
        })
      });

      const data = await response.json();
      if (response.ok && data.success) {
        setSuccessBooking(data.booking);
        // Clear inputs
        setName("");
        setEmail("");
        setPhone("");
        setAddress("");
        setMessage("");
        setPreferredDate("");
      } else {
        setSubmitError(data.error || "An error occurred during submission. Please try again.");
      }
    } catch (err) {
      console.error("Booking error:", err);
      setSubmitError("Failed to reach server. Please check connection and try again.");
    } finally {
      setIsSubmitting(false);
      setSubmissionProgress("");
    }
  };

  return (
    <div id="booking-scroller-target" className="scroll-mt-24">
      <div className={`p-6 sm:p-10 rounded-3xl border text-left relative overflow-hidden transition-all duration-300 ${
        isDarkMode 
          ? "bg-slate-950 border-slate-800 shadow-2xl text-white" 
          : "bg-white border-slate-205 shadow-xl text-slate-900"
      }`}>
        
        {/* Decorative corner tag */}
        <div className="absolute top-0 right-0 bg-amber-500 text-slate-950 text-[10px] font-mono font-bold tracking-widest px-4 py-1.5 uppercase rounded-bl-xl">
          Instantly Confirmed
        </div>

        {successBooking ? (
          /* High quality booking ticket summary state */
          <div className="space-y-6 text-center py-6 animate-fade-in text-left">
            <div className="inline-flex p-3 rounded-full bg-emerald-500/10 text-emerald-500 mb-2">
              <Sparkles className="w-8 h-8 animate-spin" style={{ animationDuration: '6s' }} />
            </div>

            <div className="space-y-1">
              <h3 className="text-2xl font-bold font-sans tracking-tight text-emerald-500">
                Inspection Consultation Confirmed!
              </h3>
              <p className={`text-xs ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>
                Your master scheduler booking slot has been secured. Ref code: <span className="font-mono font-bold text-amber-500">{successBooking.id}</span>
              </p>
            </div>

            {/* Structured Ticket Pass */}
            <div className={`max-w-md mx-auto border rounded-2xl p-5 text-left divide-y ${
              isDarkMode ? "border-slate-800 bg-slate-900/50 divide-slate-800" : "border-slate-200 bg-slate-50 divide-slate-200"
            }`}>
              
              <div className="pb-3.5 space-y-1">
                <p className="text-[10px] font-mono uppercase text-slate-400">Client Contact</p>
                <h4 className="text-sm font-bold">{successBooking.name}</h4>
                <p className="text-xs text-slate-500">{successBooking.phone} • {successBooking.email}</p>
              </div>

              <div className="py-3.5 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-[10px] font-mono uppercase text-slate-400">Material Selection</p>
                  <p className="text-xs font-semibold">{successBooking.roofType}</p>
                </div>
                <div>
                  <p className="text-[10px] font-mono uppercase text-slate-400">Action Ordered</p>
                  <p className="text-xs font-semibold">{successBooking.serviceType}</p>
                </div>
              </div>

              {successBooking.address && (
                <div className="py-3.5 space-y-0.5">
                  <p className="text-[10px] font-mono uppercase text-slate-400">Inspection Address</p>
                  <p className="text-xs font-semibold flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    <span>{successBooking.address}</span>
                  </p>
                </div>
              )}

              <div className="pt-3.5 flex justify-between gap-4">
                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                  <Calendar className="w-4 h-4 text-emerald-500" />
                  <span>{successBooking.preferredDate || "Within 48 hours"}</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                  <Clock className="w-4 h-4 text-emerald-500" />
                  <span>Preferred: <span className="capitalize font-semibold">{successBooking.preferredTime}</span></span>
                </div>
              </div>

            </div>

            {/* Crew Guarantee and Next steps */}
            <div className="max-w-md mx-auto space-y-2 pt-2">
              <div className="flex gap-2.5 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-slate-500 text-left">
                <Clock className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <p>
                  <span className={`font-bold block ${isDarkMode ? "text-white" : "text-slate-900"}`}>What occurs next?</span>
                  A certified inspector will contact you within 15 minutes to review satellite imagery of your roof outline and confirm your drone flight hour.
                </p>
              </div>

              <button
                onClick={() => {
                  setSuccessBooking(null);
                  setCurrentStep(1);
                }}
                className={`text-xs font-mono font-bold cursor-pointer underline hover:text-amber-500 text-slate-400 mt-2 block mx-auto`}
              >
                Submit another booking inquiry
              </button>
            </div>
          </div>
        ) : (
          /* Lead Capture Form */
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              if (currentStep === 3) {
                handleSubmit(e);
              }
            }} 
            className="space-y-6"
          >
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-amber-500 animate-pulse" />
                <h3 className="text-xl font-bold font-sans tracking-tight">Book Digital Scopes Consultation</h3>
              </div>
              <p className={`text-xs ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>
                Configure options and submit secure credentials for your thermal drone scan and certified structural roof diagnostics.
              </p>
            </div>

            {/* Premium Visual Stepper and Progress Bar */}
            <div className="relative mb-10 pt-4 pb-2">
              {/* Progress track background */}
              <div className="absolute top-7 left-0 right-0 h-1 bg-slate-200 dark:bg-slate-900 -translate-y-1/2 rounded-full" />
              
              {/* Dynamic filled progress */}
              <div 
                className="absolute top-7 left-0 h-1 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 -translate-y-1/2 rounded-full transition-all duration-500 ease-out"
                style={{ width: currentStep === 1 ? "15%" : currentStep === 2 ? "50%" : "100%" }}
              />

              {/* Step badging row */}
              <div className="relative flex justify-between z-10">
                {[
                  { id: 1, label: "Scope", desc: "Materials & Action" },
                  { id: 2, label: "Logistics", desc: "Location & Time" },
                  { id: 3, label: "Finalize", desc: "Your Credentials" }
                ].map((s) => {
                  const isCompleted = s.id < currentStep;
                  const isActive = s.id === currentStep;
                  return (
                    <div key={s.id} className="flex flex-col items-center">
                      <button
                        type="button"
                        onClick={() => {
                          if (s.id < currentStep && !isSubmitting) {
                            setCurrentStep(s.id);
                          }
                        }}
                        disabled={s.id >= currentStep || isSubmitting}
                        className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold text-xs transition-all duration-300 border-2 cursor-pointer ${
                          isCompleted 
                            ? "bg-slate-950 border-amber-500 text-amber-500 shadow-md shadow-amber-500/10" 
                            : isActive 
                              ? "bg-amber-500 border-amber-500 text-slate-950 font-black ring-4 ring-amber-500/20" 
                              : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-400 dark:text-slate-600"
                        }`}
                      >
                        {isCompleted ? (
                          <Check className="w-5 h-5 stroke-[2.5]" />
                        ) : (
                          <span>{s.id}</span>
                        )}
                      </button>
                      
                      <div className="text-center mt-2 space-y-0.5 hidden xs:block">
                        <p className={`text-[11px] sm:text-xs font-bold tracking-tight ${
                          isActive 
                            ? "text-amber-500" 
                            : isCompleted 
                              ? (isDarkMode ? "text-white" : "text-slate-900") 
                              : "text-slate-400 dark:text-slate-600"
                        }`}>
                          {s.label}
                        </p>
                        <p className="text-[9px] font-mono uppercase text-slate-400 dark:text-slate-500 tracking-wider">
                          {s.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {submitError && (
              <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-500 text-xs flex items-center gap-2 font-semibold">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{submitError}</span>
              </div>
            )}

            {/* STEP 1: MATS & ACTION */}
            {currentStep === 1 && (
              <div className="space-y-6 animate-fade-in">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Roof Type Selection */}
                  <div className="space-y-1.5 text-left">
                    <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">
                      Existing / Preferred Material Array
                    </label>
                    <select
                      disabled={isSubmitting}
                      value={roofType}
                      onChange={(e) => setRoofType(e.target.value)}
                      className={`w-full px-4 py-3 text-xs rounded-xl border focus:ring-1 focus:ring-amber-500 outline-none transition-all ${
                        isDarkMode 
                          ? "bg-slate-900 border-slate-800 text-white" 
                          : "bg-slate-50 border-slate-200 text-slate-850"
                      }`}
                    >
                      <option value="Architectural Shingles">Architectural Shingles (Asphalt)</option>
                      <option value="Standing Seam Metal">Standing Seam Metal (Sleek Kynar)</option>
                      <option value="Natural Slate Tile">Natural Slate / Spanish Tile</option>
                      <option value="Commercial Membrane (TPO)">Commercial Low-Slope Membrane (TPO)</option>
                      <option value="Any / Uncertain">Any / Uncertain</option>
                    </select>
                  </div>

                  {/* Service Requested Option Selection */}
                  <div className="space-y-1.5 text-left">
                    <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">
                      Actions Required
                    </label>
                    <select
                      disabled={isSubmitting}
                      value={serviceType}
                      onChange={(e) => setServiceType(e.target.value)}
                      className={`w-full px-4 py-3 text-xs rounded-xl border focus:ring-1 focus:ring-amber-500 outline-none transition-all ${
                        isDarkMode 
                          ? "bg-slate-900 border-slate-800 text-white" 
                          : "bg-slate-50 border-slate-200 text-slate-850"
                      }`}
                    >
                      <option value="Full Replacement Estimate">Full Replacement Estimate (GAF Platinum)</option>
                      <option value="Storm Restoration & Repair">Storm Restoration & Leak Audit</option>
                      <option value="Thermal Drone Inspection">Thermal FLIR Diagnostics</option>
                      <option value="Commercial Commercial Maintenance">Commercial Preventative Maintenance</option>
                    </select>
                  </div>
                </div>

                {/* Project Notes text area */}
                <div className="space-y-1.5 text-left">
                  <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">
                    Project Notes, Storm Details, or Special Requests
                  </label>
                  <textarea
                    disabled={isSubmitting}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="e.g. Hail strike evidence directly near chimney valleys. Interested in Matte Black color tones..."
                    rows={4}
                    className={`w-full px-4 py-3 text-xs rounded-xl border focus:ring-1 focus:ring-amber-500 outline-none resize-none transition-all ${
                      isDarkMode 
                        ? "bg-slate-900 border-slate-800 text-white focus:bg-slate-850" 
                        : "bg-slate-50 border-slate-200 focus:bg-white text-slate-900"
                    }`}
                  />
                </div>

                {/* Step navigation */}
                <div className="pt-4 border-t border-slate-250/20 dark:border-slate-800/60 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    className="bg-amber-500 hover:bg-amber-600 font-extrabold text-slate-950 w-full sm:w-auto px-8 py-3.5 rounded-xl text-xs flex items-center justify-center gap-1.5 transform active:scale-95 transition shadow-lg cursor-pointer"
                  >
                    <span>Choose Schedule & Logistics</span>
                    <ChevronRight className="w-4 h-4 ml-0.5" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: LOGISTICS */}
            {currentStep === 2 && (
              <div className="space-y-6 animate-fade-in">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Preferred inspection Date */}
                  <div className="space-y-1.5 text-left">
                    <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">
                      Preferred Inspect Date
                    </label>
                    <input
                      type="date"
                      disabled={isSubmitting}
                      value={preferredDate}
                      onChange={(e) => setPreferredDate(e.target.value)}
                      className={`w-full px-4 py-3 text-xs rounded-xl border focus:ring-1 focus:ring-amber-500 outline-none transition-all ${
                        isDarkMode 
                          ? "bg-slate-900 border-slate-800 text-white" 
                          : "bg-slate-50 border-slate-200 text-slate-800"
                      }`}
                    />
                  </div>

                  {/* Time Preference */}
                  <div className="space-y-1.5 text-left">
                    <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">
                      Preferred Inspector Call Window
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {(["morning", "afternoon", "anytime"] as const).map((time) => (
                        <button
                          key={time}
                          type="button"
                          disabled={isSubmitting}
                          onClick={() => setPreferredTime(time)}
                          className={`py-3.5 text-xs rounded-xl border font-semibold capitalize transition-all cursor-pointer ${
                            preferredTime === time
                              ? "bg-amber-500 border-amber-500 text-slate-950 font-bold shadow"
                              : isDarkMode
                                ? "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
                                : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-white"
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Property Location Address */}
                <div className="space-y-1.5 text-left">
                  <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-amber-500" />
                    Property Address (For Remote Structural Imaging)
                  </label>
                  <input
                    type="text"
                    disabled={isSubmitting}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="e.g. 1024 Ridgecrest Dr, Austin TX"
                    className={`w-full px-4 py-3.5 text-xs rounded-xl border focus:ring-1 focus:ring-amber-500 outline-none transition-all ${
                      isDarkMode 
                        ? "bg-slate-900 border-slate-800 text-white focus:bg-slate-850" 
                        : "bg-slate-50 border-slate-200 focus:bg-white text-slate-900"
                    }`}
                  />
                  <p className="text-[10px] text-slate-400 dark:text-slate-500 font-mono italic">
                    * Providing address allows certified installers to query historical wind & hail radar logs prior to contacting you.
                  </p>
                </div>

                {/* Step navigation */}
                <div className="pt-4 border-t border-slate-250/20 dark:border-slate-800/60 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className={`px-5 py-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1 cursor-pointer transition ${
                      isDarkMode 
                        ? "border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white bg-slate-900/50" 
                        : "border-slate-200 hover:border-slate-300 text-slate-600 hover:text-slate-900 bg-slate-50"
                    }`}
                  >
                    <ChevronLeft className="w-4 h-4 mr-0.5" />
                    <span>Back</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setCurrentStep(3)}
                    className="bg-amber-500 hover:bg-amber-600 font-extrabold text-slate-950 w-full sm:w-auto px-8 py-3.5 rounded-xl text-xs flex items-center justify-center gap-1.5 transform active:scale-95 transition shadow-lg cursor-pointer"
                  >
                    <span>Securing Details</span>
                    <ChevronRight className="w-4 h-4 ml-0.5" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: CONTACT CREDENTIALS */}
            {currentStep === 3 && (
              <div className="space-y-6 animate-fade-in">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  {/* Name */}
                  <div className="space-y-1.5 text-left">
                    <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      disabled={isSubmitting}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Douglas Vance"
                      className={`w-full px-4 py-3.5 text-xs rounded-xl border focus:ring-1 focus:ring-amber-500 outline-none transition-all ${
                        isDarkMode 
                          ? "bg-slate-900 border-slate-800 text-white focus:bg-slate-850" 
                          : "bg-slate-50 border-slate-200 focus:bg-white text-slate-900"
                      }`}
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5 text-left">
                    <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      disabled={isSubmitting}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@personal.com"
                      className={`w-full px-4 py-3.5 text-xs rounded-xl border focus:ring-1 focus:ring-amber-500 outline-none transition-all ${
                        isDarkMode 
                          ? "bg-slate-900 border-slate-800 text-white focus:bg-slate-850" 
                          : "bg-slate-50 border-slate-200 focus:bg-white text-slate-900"
                      }`}
                    />
                  </div>

                  {/* Phone */}
                  <div className="space-y-1.5 text-left">
                    <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      disabled={isSubmitting}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="(555) 000-0000"
                      className={`w-full px-4 py-3.5 text-xs rounded-xl border focus:ring-1 focus:ring-amber-500 outline-none transition-all ${
                        isDarkMode 
                          ? "bg-slate-900 border-slate-800 text-white focus:bg-slate-850" 
                          : "bg-slate-50 border-slate-200 focus:bg-white text-slate-900"
                      }`}
                    />
                  </div>
                </div>

                {/* Foot note and Submit button */}
                <div className="pt-6 border-t border-slate-250/20 dark:border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-2 text-left bg-slate-900/10 dark:bg-slate-900/40 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800/60 text-[11px] max-w-[420px]">
                    <ShieldAlert className="w-5 h-5 text-amber-500 shrink-0" />
                    <p className={`font-sans text-slate-500 ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>
                      We value security. We do not sell coordinates or share contact logs. You are matching with local Texas GAF certified installers.
                    </p>
                  </div>

                  <div className="flex items-center gap-3 w-full sm:w-auto shrink-0">
                    <button
                      type="button"
                      disabled={isSubmitting}
                      onClick={() => setCurrentStep(2)}
                      className={`px-5 py-3.5 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1 cursor-pointer transition ${
                        isDarkMode 
                          ? "border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white bg-slate-900/50" 
                          : "border-slate-200 hover:border-slate-300 text-slate-600 hover:text-slate-900 bg-slate-50"
                      }`}
                    >
                      <ChevronLeft className="w-4 h-4 mr-0.5" />
                      <span>Back</span>
                    </button>

                    <button
                      id="btn-lead-submit"
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-amber-500 hover:bg-amber-600 font-extrabold text-slate-950 w-full sm:w-auto px-8 py-3.5 rounded-xl text-xs flex items-center justify-center gap-2 transform active:scale-95 transition shadow-lg cursor-pointer"
                    >
                      {isSubmitting ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin" />
                          <span>{submissionProgress || "Sending inquiry..."}</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Confirm Booking</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )}

          </form>
        )}

      </div>
    </div>
  );
}
