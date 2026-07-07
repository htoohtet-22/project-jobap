export interface Job {
  id: number;
  title: string;
  company_name: string;
  status: "applied" | "interview" | "offered" | "rejected" | "withdrawn";
  type: "on-site" | "remote" | "hybrid" | "unspecified";
  location?: string;
  application_date?: Date;
  interview_date?: Date;
  posting_link?: string;
  company_link?: string;
  contact_name?: string;
  contact_email?: string;
  description?: string;
  requirements?: string;
  notes?: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  jobs: number[];
}