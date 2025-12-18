export type Experience = {
  id: string;
  jobTitle: string;
  company: string;
  startDate: string;
  endDate: string;
  description: string;
  isCurrent: boolean;
};

export type Education = {
  id: string;
  degree: string;
  description? : string
  institution: string;
  startDate: string;
  endDate: string;
};

export type TemplateStyle = {
  primaryColor: string;
  fontFamily: string;
  layoutVariant: "classic" | "modern" | "ats";
};

export type ResumeData = {
  certifications: certifications[];
  personalInfo: {
    name: string;
    title: string;
    email: string;
    phone: string;
    summary: string;
    photo?: string; 
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
  issue_date: number | null;
  expiration_date: number | null;
  description: string;
};
