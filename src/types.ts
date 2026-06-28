export interface ServiceItem {
  id: string;
  title: string;
  iconName: string;
  shortDescription: string;
  fullDescription: string;
  features: string[];
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: "Residential" | "Commercial" | "Historic" | "Metal";
  location: string;
  description: string;
  image: string;
  materials: string;
  completionDate: string;
  rating?: number;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  comment: string;
  rating: number;
  location: string;
  verified: boolean;
  typeOfWork: string;
  avatar: string;
  date: string;
}

export interface Booking {
  id?: string;
  name: string;
  email: string;
  phone: string;
  address?: string;
  roofType?: string;
  serviceType?: string;
  message?: string;
  preferredDate?: string;
  preferredTime?: "morning" | "afternoon" | "anytime";
  status?: "New" | "Contacted" | "Scheduled" | "Completed";
  createdAt?: string;
}
