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
