import { useState, FormEvent } from "react";
import { Star, ChevronLeft, ChevronRight, CheckCircle, Quote, Sparkles, Plus, Smile } from "lucide-react";
import { TestimonialItem } from "../types";
import { TESTIMONIALS } from "../data";

interface TestimonialSliderProps {
  isDarkMode: boolean;
}

export default function TestimonialSlider({ isDarkMode }: TestimonialSliderProps) {
  const [reviews, setReviews] = useState<TestimonialItem[]>(TESTIMONIALS);
  const [activeIndex, setActiveIndex] = useState(0);
  
  // Custom new review state
  const [showAddReview, setShowAddReview] = useState(false);
  const [newReviewName, setNewReviewName] = useState("");
  const [newReviewRole, setNewReviewRole] = useState("");
  const [newReviewComment, setNewReviewComment] = useState("");
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewWorkType, setNewReviewWorkType] = useState("Residential Shingles");
  const [newReviewLocation, setNewReviewLocation] = useState("Austin, TX");

  const [formSuccess, setFormSuccess] = useState(false);

  const prevSlide = () => {
    setActiveIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setActiveIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  };

  const handleReviewSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!newReviewName || !newReviewComment) return;

    const userReview: TestimonialItem = {
      id: "rev_" + Math.random().toString(36).substr(2, 9),
      name: newReviewName,
      role: newReviewRole || "Homeowner",
      comment: newReviewComment,
      rating: newReviewRating,
      location: newReviewLocation || "Austin, TX",
      verified: true,
      typeOfWork: newReviewWorkType || "Inspection",
      avatar: `https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120&h=120`, // friendly placeholder
      date: "Just now"
    };

    setReviews([userReview, ...reviews]);
    setActiveIndex(0);
    setFormSuccess(true);
    
    // reset draft
    setNewReviewName("");
    setNewReviewRole("");
    setNewReviewComment("");
    setNewReviewRating(5);

    setTimeout(() => {
      setFormSuccess(false);
      setShowAddReview(false);
    }, 2500);
  };

  const curReview = reviews[activeIndex] || reviews[0];

  return (
    <section
      id="testimonials"
      className={`py-24 transition-colors duration-300 relative ${
        isDarkMode ? "bg-slate-900 text-white" : "bg-white text-slate-900"
      }`}
    >
      <div className="absolute top-10 left-10 w-1/5 h-1/3 bg-amber-500/[0.03] blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Block */}
        <div className="text-center mb-16 space-y-4">
          <span className="text-xs font-mono uppercase tracking-widest text-amber-500 font-bold block">
            Client Trust & Reviews
          </span>
          <h2 className="text-3xl sm:text-4xl font-sans font-bold tracking-tight">
            What Our Architectural Clients Say
          </h2>
          <div className="h-1 w-16 bg-amber-500 mx-auto rounded-full" />
          <p className={`text-base max-w-xl mx-auto ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>
            We take pride in our precision. Hear from residential property holders and commercial directors who upgraded to lifetime roofing setups.
          </p>
        </div>

        {/* Testimonials Slider Main Card */}
        <div className="relative">
          <div className={`p-6 sm:p-8 md:p-12 rounded-3xl border text-left flex flex-col md:flex-row gap-6 md:gap-8 items-start relative overflow-hidden transition-all duration-300 ${
            isDarkMode 
              ? "bg-slate-950 border-slate-800 text-white shadow-2xl" 
              : "bg-slate-50 border-slate-200 text-slate-900 shadow-xl"
          }`}>
            
            {/* Decorative huge Quote Icon */}
            <div className="absolute top-6 right-8 text-amber-500/10 pointer-events-none">
              <Quote className="w-24 h-24 stroke-[1.5]" />
            </div>

            {/* Profile Avatar Column */}
            <div className="flex flex-col items-center shrink-0">
              <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-amber-500 shadow-md">
                <img
                  src={curReview.avatar}
                  alt={curReview.name}
                  className="w-full h-full object-cover pointer-events-none"
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="font-mono text-[10px] uppercase font-bold tracking-widest text-amber-500 mt-3 block">
                {curReview.location}
              </span>
            </div>

            {/* Content Segment */}
            <div className="space-y-4 flex-1">
              
              {/* Star Rating & Verified */}
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center text-amber-500 gap-0.5">
                  {[...Array(curReview.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                  ))}
                </div>
                {curReview.verified && (
                  <div className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-500 px-2 py-0.5 rounded-full bg-emerald-500/10">
                    <CheckCircle className="w-3 h-3" />
                    <span>Verified Project</span>
                  </div>
                )}
              </div>

              {/* Verified Work Type Tag */}
              <p className={`text-[11px] font-mono uppercase tracking-wider ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>
                Work Done: <span className="font-bold text-amber-500">{curReview.typeOfWork}</span>
              </p>

              {/* Review Text */}
              <p className={`text-base leading-relaxed italic pr-6 ${
                isDarkMode ? "text-slate-200" : "text-slate-700"
              }`}>
                "{curReview.comment}"
              </p>

              {/* Client Metadata */}
              <div className="pt-2">
                <h4 className="text-lg font-bold font-sans tracking-tight leading-tight">{curReview.name}</h4>
                <p className={`text-xs ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>{curReview.role}</p>
                <p className={`text-[10px] mt-1 font-mono ${isDarkMode ? "text-slate-500" : "text-slate-400"}`}>Date: {curReview.date}</p>
              </div>

            </div>

          </div>

          {/* Navigation Controls Left/Right Arrow floating */}
          <div className="flex justify-between items-center mt-6">
            
            {/* Index Counter */}
            <span className={`text-xs font-mono font-bold ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>
              {activeIndex + 1} <span className="text-amber-500">/</span> {reviews.length}
            </span>

            {/* Arrows */}
            <div className="flex gap-2">
              <button
                id="btn-review-prev"
                onClick={prevSlide}
                className={`p-2.5 rounded-full border transition-all cursor-pointer ${
                  isDarkMode 
                    ? "bg-slate-950 border-slate-800 text-slate-300 hover:border-amber-500 hover:text-white" 
                    : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-white hover:border-amber-500 hover:text-amber-500"
                }`}
                aria-label="Previous quote"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button
                id="btn-review-next"
                onClick={nextSlide}
                className={`p-2.5 rounded-full border transition-all cursor-pointer ${
                  isDarkMode 
                    ? "bg-slate-950 border-slate-800 text-slate-300 hover:border-amber-500 hover:text-white" 
                    : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-white hover:border-amber-500 hover:text-amber-500"
                }`}
                aria-label="Next quote"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>

        {/* Add Review Micro-Form */}
        <div className="mt-12 text-center">
          {!showAddReview ? (
            <button
              id="btn-reveal-review-form"
              onClick={() => setShowAddReview(true)}
              className={`inline-flex items-center gap-1.5 px-4.5 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer hover:-translate-y-0.5 ${
                isDarkMode 
                  ? "border-slate-800 bg-slate-950 hover:border-amber-500/20 text-slate-300" 
                  : "border-slate-200 bg-slate-50 hover:border-amber-500/30 text-slate-700 hover:shadow-md"
              }`}
            >
              <Plus className="w-4 h-4 text-amber-500" />
              <span>Have We Roofed Your Property? Share Feedback</span>
            </button>
          ) : (
            <div className={`p-6 sm:p-8 rounded-2xl border text-left animate-fade-in ${
              isDarkMode ? "bg-slate-950 border-slate-800" : "bg-slate-50 border-slate-250"
            }`}>
              
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <Smile className="w-5 h-5 text-amber-500" />
                  <h3 className="text-base font-bold font-sans">Submit Verified Builder Review</h3>
                </div>
                <button
                  onClick={() => setShowAddReview(false)}
                  className={`p-1 rounded-md text-xs font-semibold ${isDarkMode ? "hover:bg-slate-900" : "hover:bg-white"}`}
                >
                  Cancel
                </button>
              </div>

              {formSuccess ? (
                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-center text-xs font-semibold space-y-2 py-8">
                  <Sparkles className="w-8 h-8 text-emerald-500 mx-auto animate-bounce" />
                  <p>Thank you! Your reference review was successfully queued and published dynamically.</p>
                </div>
              ) : (
                <form onSubmit={handleReviewSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1">Your Full Name *</label>
                      <input
                        type="text"
                        required
                        value={newReviewName}
                        onChange={(e) => setNewReviewName(e.target.value)}
                        placeholder="e.g. Sandra Collins"
                        className={`w-full px-3 py-2 text-xs rounded-lg border focus:ring-1 focus:ring-amber-500 outline-none ${
                          isDarkMode ? "bg-slate-900 border-slate-800 text-white" : "bg-white border-slate-300"
                        }`}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1">Profession / Role</label>
                      <input
                        type="text"
                        value={newReviewRole}
                        onChange={(e) => setNewReviewRole(e.target.value)}
                        placeholder="e.g. Real Estate Investor"
                        className={`w-full px-3 py-2 text-xs rounded-lg border focus:ring-1 focus:ring-amber-500 outline-none ${
                          isDarkMode ? "bg-slate-900 border-slate-800 text-white" : "bg-white border-slate-300"
                        }`}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1">Installation Service</label>
                      <select
                        value={newReviewWorkType}
                        onChange={(e) => setNewReviewWorkType(e.target.value)}
                        className={`w-full px-3 py-2 text-xs rounded-lg border focus:ring-1 focus:ring-amber-500 outline-none ${
                          isDarkMode ? "bg-slate-900 border-slate-800 text-white" : "bg-white border-slate-300 text-slate-800"
                        }`}
                      >
                        <option>Premium Shingles</option>
                        <option>Standing Seam Metal</option>
                        <option>Full GAF Replacement</option>
                        <option>Thermal Drone Inspection</option>
                        <option>Commercial Flat Roof</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1">Your Neighborhood/City</label>
                      <input
                        type="text"
                        required
                        value={newReviewLocation}
                        onChange={(e) => setNewReviewLocation(e.target.value)}
                        placeholder="e.g. Lake Travis, TX"
                        className={`w-full px-3 py-2 text-xs rounded-lg border focus:ring-1 focus:ring-amber-500 outline-none ${
                          isDarkMode ? "bg-slate-900 border-slate-800 text-white" : "bg-white border-slate-300"
                        }`}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1">Star Rating (1-5)</label>
                      <div className="flex items-center gap-1.5 pt-1.5">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setNewReviewRating(star)}
                            className="text-amber-500 focus:outline-none"
                          >
                            <Star className={`w-5 h-5 ${star <= newReviewRating ? "fill-amber-500" : "text-slate-400"}`} />
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1">Inspection Feedback / Comment *</label>
                    <textarea
                      required
                      value={newReviewComment}
                      onChange={(e) => setNewReviewComment(e.target.value)}
                      placeholder="e.g. Absolutely top grade roofing panels. Very tidy crew..."
                      rows={3}
                      className={`w-full px-3 py-2 text-xs rounded-lg border focus:ring-1 focus:ring-amber-500 outline-none resize-none ${
                        isDarkMode ? "bg-slate-900 border-slate-800 text-white" : "bg-white border-slate-300"
                      }`}
                    />
                  </div>

                  <div className="flex justify-end pt-2">
                    <button
                      id="btn-submit-review"
                      type="submit"
                      className="bg-amber-500 hover:bg-amber-600 font-bold text-slate-950 text-xs px-6 py-2.5 rounded-lg transition shadow"
                    >
                      Publish Verified Experience
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
