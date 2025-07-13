import api from './api';

export const generateReport = async () => {
  const response = await api.post('/api/relatorios/gerar');
  return response.data;
};

export const getReports = async () => {
  const response = await api.get('/api/relatorios');
  return response.data;
};

export const downloadReport = async (id: string) => {
  const response = await api.get(`/api/relatorios/${id}`, {
    responseType: 'blob',
  });
  return response.data;
};