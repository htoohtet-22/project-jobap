import client from './client';
import { type AuthResponse } from '../lib/types';

export const registerUser = async (
  email: string,
  password: string,
  username: string,
): Promise<AuthResponse> => {
  const { data } = await client.post<AuthResponse>('/auth/register', {
    email,
    password,
    username,
  });
  return data;
};

export const loginUser = async (
  username: string,
  password: string,
): Promise<AuthResponse> => {
  const { data } = await client.post<AuthResponse>('/auth/login', {
    username,
    password,
  });
  return data;
};
