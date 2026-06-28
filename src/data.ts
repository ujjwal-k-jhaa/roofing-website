import { ServiceItem, PortfolioItem, TestimonialItem } from "./types";
import luxuryRoofHero from "./assets/images/luxury_roof_hero_1782024697889.jpg";
import metalRoofTexture from "./assets/images/metal_roof_texture_1782024714335.jpg";
import shingleDetail from "./assets/images/shingle_detail_1782024742816.jpg";
import roofingCraftsman from "./assets/images/roofing_craftsman_1782024726939.jpg";

export const SERVICES: ServiceItem[] = [
  {
    id: "serv-residential",
    title: "Premium Residential Roofing",
    iconName: "Home",
    shortDescription: "Architectural roof replacements and custom material selections designed to protect and enhance your home's aesthetic.",
    fullDescription: "Your home is your most valuable asset. We deliver top-tier residential roofing systems using hand-selected premium materials—ranging from ultra-durable architectural shingles to luxury natural slate. Each installation includes our signature ridge-vent system, double leak barriers on all valleys, and a lifetime craftsmanship guarantee.",
    features: [
      "Precision-engineered drip edges & flashing",
      "Lifetime leak-barrier sub-roofing systems",
      "Certified Platinum installers",
      "Complete post-construction cleanup & magnetic sweep"
    ]
  },
  {
    id: "serv-metal",
    title: "Sleek Standing Seam Metal",
    iconName: "ShieldCheck",
    shortDescription: "Sleek, fire-resistant, and structural metal options offering exceptional modern appeal and up to a 50-year lifespan.",
    fullDescription: "Invest in a lifetime roof. Our double-locked standing seam metal systems offer pristine minimalist architecture, supreme wind-rating (up to 140mph), and outstanding thermal insulation properties. Crafted using high-gauge structural steel and premium Kynar 500 rust-resistant finishes.",
    features: [
      "Concealed rust-proof fasteners",
      "100% recyclable premium Kynar finishes",
      "Exceptional snow-shedding & class-4 hail protection",
      "Substantial energy savings (reflective cooling)"
    ]
  },
  {
    id: "serv-inspections",
    title: "Drone-Assisted Thermal Diagnostics",
    iconName: "Radar",
    shortDescription: "Non-destructive high-resolution thermal imaging to identify micro-leaks, insulation voids, and structural compromises.",
    fullDescription: "Stop leaks before they enter your home. Utilizing state-of-the-art quadcopters with high-resolution FLIR thermal sensors, our diagnostic experts map moisture pockets, trace active wind compromises, and build exact architectural 3D models of your roof structure without standard ladder disruption.",
    features: [
      "No-contact structural scan & safety check",
      "Moisture-detection FLIR core mapping",
      "Fully digital comprehensive audit report",
      "Direct integration with insurance claim forms"
    ]
  },
  {
    id: "serv-commercial",
    title: "Commercial & Multi-Family",
    iconName: "Building2",
    shortDescription: "Complex roofing arrays including TPO, modified bitumen, and custom maintenance cycles for institutional builds.",
    fullDescription: "Engineered reliability for large-scale operations. From single-ply TPO/EPDM membranes to custom low-slope metal roofs, we minimize disruption to daily operations. Our commercial portfolio is backed by multi-million-dollar coverage, commercial OSHA-certified safety staff, and 24/7 prioritized emergency dispatch.",
    features: [
      "Certified Cool Roof rating installations",
      "Dedicated commercial project superintendents",
      "Strict compliance with municipal structural codes",
      "Multi-year preventative maintenance programs"
    ]
  }
];

export const PORTFOLIO: PortfolioItem[] = [
  {
    id: "port-1",
    title: "The Vista Ridge Vista",
    category: "Residential",
    location: "West Lake Hills, Austin",
    description: "Designed to match an ultra-modern multi-level estate, featuring charcoal architectural slate accents blending seamlessly into the hillside foliage.",
    image: luxuryRoofHero,
    materials: "Premium Signature Composite Slate",
    completionDate: "May 2026",
    rating: 5
  },
  {
    id: "port-2",
    title: "Monolithic Standing Seam Estate",
    category: "Metal",
    location: "Barton Creek, TX",
    description: "A gorgeous luxury home outfitted with structural matte-black standing seam metal panels. Includes integrated hidden gutter drainage and high-performance solar cells.",
    image: metalRoofTexture,
    materials: "Grade-A Kynar-Coated 24-Gauge Steel",
    completionDate: "April 2026",
    rating: 5
  },
  {
    id: "port-3",
    title: "Overlocking Slate Texture Overhaul",
    category: "Residential",
    location: "Pemberton Heights, Austin",
    description: "Full historic renovation replacement of dynamic multi-pitch Tudor roof, selecting premium heavy-textured interlocking shingles to preserve period aesthetics.",
    image: shingleDetail,
    materials: "Century Architectural Asphalt Shingles",
    completionDate: "March 2026",
    rating: 5
  },
  {
    id: "port-4",
    title: "Sleek Commercial Workspace Loft",
    category: "Commercial",
    location: "Austin Tech District",
    description: "Drone inspection and micro-leak repair followed by localized TPO membrane laying and solar-reflective coating to lower high HVAC utility fees.",
    image: roofingCraftsman,
    materials: "80-Mil EnergyStar TPO & Core Diagnostics",
    completionDate: "June 2026",
    rating: 5
  }
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: "test-1",
    name: "Genevieve Dubois",
    role: "Architect & Homeowner",
    comment: "As an architect, I am incredibly meticulous about clean lines and material quality. Their workmanship on our standing seam metal roof was stellar. Every flashing wrap is beautifully tucked, and the crew left the site cleaner than it was when they arrived. Absolute perfection.",
    rating: 5,
    location: "Rollingwood, TX",
    verified: true,
    typeOfWork: "Metal Roofing Installation",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=120&h=120",
    date: "June 12, 2026"
  },
  {
    id: "test-2",
    name: "Dr. Robert Vance",
    role: "Retired Professor",
    comment: "After severe spring hail tore apart our shingles, finding a contractor who worked with our insurance was incredibly stressful. They handled the entire negotiation, provided thermal scans proving high-level internal damage, and finished the replacement in just two days. Terrific communication throughout.",
    rating: 5,
    location: "Tarrytown, Austin",
    verified: true,
    typeOfWork: "Storm Restoration & Shingles",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120&h=120",
    date: "May 28, 2026"
  },
  {
    id: "test-3",
    name: "Kendra Reynolds",
    role: "Operations Director, Apex Properties",
    comment: "Managing a commercial building with 12 distinct tenant storefronts means roof work can disrupt business. They worked through the night on critical sections and used drones to inspect the remaining acreage. Minimal noise, beautiful safety compliance, and zero complaints from tenants.",
    rating: 5,
    location: "Downtown Austin",
    verified: true,
    typeOfWork: "Commercial TPO Install",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=120&h=120",
    date: "April 15, 2026"
  }
];

export const FAQS = [
  {
    question: "Do you offer financing for full roof replacements?",
    answer: "Yes, we provide flexible financing options through our banking partners with low APR, including 12 months of interest-deferred financing to help manage structural upgrades comfortably."
  },
  {
    question: "How long does a standard residential roof installation take?",
    answer: "Most mid-sized residential replacements are completed in just 1 to 2 days of active installation. Our certified crews focus on single jobs sequentially to minimize your household's exposure is as short as possible."
  },
  {
    question: "Are your drone thermal scans and roofing estimates free?",
    answer: "We offer complimentary physical inspections and initial estimations. Our premium drone thermal scanning is included free of charge with all booked structural consultations and replacements."
  },
  {
    question: "What warranties do you provide with new installs?",
    answer: "We offer up to a Golden Pledge Manufacturer's warranty covering materials for 50 years, paired directly with our company-backed 10-Year Leak-Free Craftsmanship warrant."
  }
];
