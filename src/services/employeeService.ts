import api from './api';

export interface EmployeeData {
  nome: string;
  idade: number;
  genero: 'Masculino' | 'Feminino';
  departamento: string;
  cargo: string;
  salario: number;
  anos_empresa: number;
  projetos_completados: number;
  produtividade: number;
  satisfacao: number;
  feedback_score: number;
}

export const addEmployee = async (data: EmployeeData) => {
  console.log(data);
  
  const response = await api.post('/api/funcionarios', data);
  console.log(response);
  
  return response.data;
};

export const getEmployees = async () => {
  const response = await api.get('/api/funcionarios');
  return response.data;
};