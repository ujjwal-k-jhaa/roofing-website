import { useEffect, useState } from "react";

interface SEOManagerProps {
  showAdmin: boolean;
}

export default function SEOManager({ showAdmin }: SEOManagerProps) {
  const [activeSection, setActiveSection] = useState<string>("hero");

  useEffect(() => {
    // If Admin/CRM is open, set immediate SEO metadata
    if (showAdmin) {
      updateMetadata(
        "Staff CRM Board | Apex Roofworks Texas",
        "Secure interactive leads management system, CRM board, and inquiry pipeline for Apex Roofworks roofing craftsmen in Austin, Texas."
      );
      return;
    }

    // Set up active section detection on scroll
    const handleScroll = () => {
      const sections = ["hero", "services", "portfolio", "testimonials", "booking-enclosure"];
      let currentSection = "hero";
      let minDistance = Infinity;

      sections.forEach((id) => {
        const element = document.getElementById(id);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Calculate distance from top of viewport to the section center or top
          const distance = Math.abs(rect.top);
          if (distance < minDistance) {
            minDistance = distance;
            currentSection = id;
          }
        }
      });

      if (currentSection !== activeSection) {
        setActiveSection(currentSection);
      }
    };

    // Run once on mount
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [showAdmin, activeSection]);

  // Update elements when activeSection or showAdmin changes
  useEffect(() => {
    if (showAdmin) return; // Handled in previous effect

    switch (activeSection) {
      case "hero":
        updateMetadata(
          "Apex Roofworks | Premium Central Texas Roofing & standing seam Metal",
          "Texas premium roofing design, expert standing seam metal, Vermont stone slate, and GAF Master-Elite residential roofing craftsmanship in Austin, TX."
        );
        break;
      case "services":
        updateMetadata(
          "Premium Roofing Systems Comparison | Apex Roofworks Austin",
          "Compare standing seam metal systems, natural Vermont stone slate, GAF shingles, and professional commercial TPO membranes. View our comparative material matrix."
        );
        break;
      case "portfolio":
        updateMetadata(
          "Architectural Case Studies & Project Portfolio | Apex Roofworks",
          "Browse high-end metal paneling, historic slate restorations, and clean premium shingle project galleries from West Lake Hills to Austin, Texas."
        );
        break;
      case "testimonials":
        updateMetadata(
          "Verified Texas Homeowner Reviews | Apex Roofworks Ratings",
          "Read genuine local client reviews, testimonials, and verified contractor feedback for Texas elite architectural roof craft and thermal diagnostics."
        );
        break;
      case "booking-enclosure":
        updateMetadata(
          "Free Digital Inspection Estimate | Apex Roofworks Austin",
          "Request a premium high-precision drone diagnostic inspection and receive a free digital estimate from GAF Master-Elite roofing professionals."
        );
        break;
      default:
        updateMetadata(
          "Apex Roofworks | Premium Roofing & Standing Seam Metal",
          "Texas premium roofing design, expert standing seam metal, natural Vermont stone slate, and Master-Elite residential craft in Austin, TX."
        );
    }
  }, [activeSection, showAdmin]);

  return null; // Invisible SEO Helper component
}

/**
 * Helpler function to cleanly update head element title and description properties
 */
function updateMetadata(title: string, description: string) {
  // Update Title
  if (document.title !== title) {
    document.title = title;
  }

  // Update Meta Description
  let metaDescription = document.querySelector('meta[name="description"]');
  if (!metaDescription) {
    metaDescription = document.createElement("meta");
    metaDescription.setAttribute("name", "description");
    document.head.appendChild(metaDescription);
  }
  metaDescription.setAttribute("content", description);
}
