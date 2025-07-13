import React, { useEffect, useState } from 'react';
import { getEmployees } from '../../services/employeeService';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress } from '@mui/material';

interface Employee {
  id: number;
  nome: string;
  cargo: string;
  departamento: string;
}

const EmployeeList: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await getEmployees();
        setEmployees(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao carregar funcionários:', error);
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Nome</TableCell>
            <TableCell>Cargo</TableCell>
            <TableCell>Departamento</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {employees.map((employee) => (
            <TableRow key={employee.id}>
              <TableCell>{employee.id}</TableCell>
              <TableCell>{employee.nome}</TableCell>
              <TableCell>{employee.cargo}</TableCell>
              <TableCell>{employee.departamento}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default EmployeeList;