export type Template = {
  id: string;
  name: string;
  description: string;
  image: string;
};

export type personalInfo = {
  id: number;
  resume_id: number;
  full_name: string;
  job_title: string;
  phone: string;
  email: string;
  address: string;
  summary: string;
};
export type experiences = {
  id: number;
  resume_id: number;
  position: string;
  company: string;
  start_date: number;
  end_date: number;
  description: string;
};
export type education = {
  id: number;
  resume_id: number;
  university: string;
  degree: string;
  study_program: string;
  start_date: number;
  end_date: number;
  description: string;
};
export type skills = {
  id: number;
  resume_id: number;
  skill_name: string;
  level?: string;
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
export type saved_pdfs = {
  id: number;
  resume_id: number;
  pdf_url: string;
};
export type resume_history = {
  id: number;
  resume_id: number;
  changes: string;
};
export type resumes = {
  id: number;
  user_id: number;
  title: string;
  template: string;
  font_family: string;
  color_theme: string;
  order_config: "json";
};
export type user = {
  id: number;
  full_name: string;
  email: string;
  passwordL: string;
};
