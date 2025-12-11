export type Experience = {
  id: string; // Untuk key di React list
  jobTitle: string;
  company: string;
  startDate: string;
  endDate: string;
  description: string; // Bisa menggunakan list bullet points
  isCurrent: boolean;
};

export type Education = {
  id: string;
  degree: string;
  institution: string;
  city: string;
  startDate: string;
  endDate: string;
};

export type TemplateStyle = {
  primaryColor: string;
  fontFamily: string;
  layoutVariant: "classic" | "modern" | "minimalist";
};

export type ResumeData = {
  certifications: certifications[];
  personalInfo: {
    name: string;
    title: string;
    email: string;
    phone: string;
    summary: string;
  };
  experience: Experience[];
  education: Education[];
  skills: string[];
};

export type certifications = {
  id: number;
  resume_id: number;
  name: string;
  issuer: string;
  issue_date: number;
  expiration_date: number;
  description: string;
};