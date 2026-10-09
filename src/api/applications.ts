import client from './client';
import type { JobApplication, JobApplicationInput } from '../lib/types';

export const fetchApplications = async (): Promise<JobApplication[]> => {
  const { data } = await client.get<JobApplication[]>('/applications');
  return data;
};

export const getApplication = async (
  id: string
): Promise<JobApplication> => {
  const { data } = await client.get<JobApplication>(`/applications/${id}`);
  return data;
};

export const createApplication = async (
  input: Partial<JobApplicationInput>,
): Promise<JobApplication> => {
  const { data } = await client.post<JobApplication>('/applications', input);
  return data;
};

export const updateApplication = async (
  id: string,
  input: Partial<JobApplicationInput>,
): Promise<JobApplication> => {
  const { data } = await client.put<JobApplication>(`/applications/${id}`, input);
  return data;
};

export const deleteApplication = async (id: string): Promise<void> => {
  await client.delete(`/applications/${id}`);
};
