export type ApplicationStatus =
  | 'APPLIED'
  | 'VIEWED'
  | 'CONTACTED'
  | 'INTERVIEWING'
  | 'OFFERED'
  | 'ACCEPTED'
  | 'REJECTED'
  | 'WITHDRAWN'
  | 'EXPIRED'
  | 'UNRESPONSIVE';

export const APPLICATION_STATUSES: ApplicationStatus[] = [
  'APPLIED',
  'VIEWED',
  'CONTACTED',
  'INTERVIEWING',
  'OFFERED',
  'ACCEPTED',
  'REJECTED',
  'WITHDRAWN',
  'EXPIRED',
  'UNRESPONSIVE',
];

export const INACTIVE_APPLICATION_STATUSES: ApplicationStatus[] = [
  'REJECTED', 
  'WITHDRAWN', 
  'EXPIRED', 
  'UNRESPONSIVE'
];

export const STATUS_LABELS: Record<ApplicationStatus, string> = {
  APPLIED: 'Applied',
  VIEWED: 'Viewed',
  CONTACTED: 'Contacted',
  INTERVIEWING: 'Interviewing',
  OFFERED: 'Offered',
  ACCEPTED: 'Accepted',
  REJECTED: 'Rejected',
  WITHDRAWN: 'Withdrawn',
  EXPIRED: 'Expired',
  UNRESPONSIVE: 'Unresponsive',
};

export interface JobApplication {
  id: string;
  company: string;
  title: string;
  status: ApplicationStatus;
  dateApplied?: string | null;
  jobLink?: string | null;
  salary?: string | null;
  followUpDate?: string | null;
  notes?: string | null;
  contactPerson?: string | null;
  contactEmail?: string | null;
  contactNumber?: string | null;
  createdAt: string;
  updatedAt: string;
}

export type JobApplicationInput = Omit<
  JobApplication,
  'id' | 'createdAt' | 'updatedAt'
>;

export interface User {
  id: string;
  email: string;
  username: string;
}

export interface AuthResponse {
  accessToken: string;
  user: User;
}
