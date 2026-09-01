export type ProjectCategory =
  | "All"
  | "Logo"
  | "Branding"
  | "Poster"
  | "Social Media"
  | "Banner"
  | "UI Design";

export interface Project {
  id: string;
  title: string;
  category: "Logo" | "Branding" | "Poster" | "Social Media" | "Banner" | "UI Design";
  categorySlug: string;
  image: string;
  description: string;
  tools: string[];
  year: string;
  link?: string;
  featured?: boolean;
  aspectRatio?: "square" | "portrait" | "wide";
  accentColor?: string;
}

export interface ServiceItem {
  number: string;
  title: string;
  tagline: string;
  description: string;
  deliverables: string[];
}

export interface JourneyMilestone {
  year: string;
  title: string;
  subtitle: string;
  status: "Completed" | "Current" | "Active";
  description: string;
}
