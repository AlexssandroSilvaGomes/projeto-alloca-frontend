import api from './api';

interface AuthData {
  email: string;
  senha: string;
  nome?: string;
}

export const register = async (data: AuthData) => {
  const response = await api.post('/auth/register', data);
  return response.data;
};

export const login = async (data: AuthData) => {
  const response = await api.post('/auth/login', data);
  return response.data;
};