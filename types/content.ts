export type Locale = "en" | "ar";

export type CompanyContent = {
  locale: Locale;
  direction: "ltr" | "rtl";
  brand: string;
  tagline: string;
  summary: string;
  hero: { eyebrow: string; title: string; body: string };
  heroSlides?: Array<{ title: string; description: string; image: string }>;
  stats: Array<{ value: string; label: string }>;
  confidenceStats?: Array<{ value: string; label: string }>;
  values: Array<{ title: string; body: string }>;
  mission: string;
  vision: string;
  about?: string;
  leadershipEssay?: string;
  confidence?: string;
  timeline: Array<{ year: string; title: string; body: string }>;
  leadership: Array<{ name: string; role: string; body: string }>;
  testimonial: string;
};

export type Business = {
  slug: string;
  name: string;
  category: string;
  theme: string;
  image: string;
  summary: string;
  hero: string;
  sections: Array<{ title: string; body: string }>;
};

export type Project = {
  id: string;
  title: string;
  category: "wood" | "paint" | "auto" | "salon";
  image: string;
  location?: string;
  summary: string;
  value: string;
  story: string;
};

export type Machine = {
  name: string;
  image: string;
  description: string;
};

export type GalleryItem = {
  title: string;
  category: "wood" | "paint" | "auto" | "salon";
  image: string;
};

export type Insight = {
  slug: string;
  title: string;
  category: string;
  date: string;
  summary: string;
  body: string;
};

export type Contacts = {
  departments: Array<{ name: string; email: string; phone: string; address: string; website?: string; workingHours?: string }>;
  form: { title: string; fields: string[]; cta: string };
};
