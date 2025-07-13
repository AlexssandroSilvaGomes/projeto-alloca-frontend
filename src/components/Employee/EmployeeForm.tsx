import React, { useState } from 'react';
import { addEmployee } from '../../services/employeeService';
import { TextField, Button, Box, Grid } from '@mui/material';

const EmployeeForm: React.FC = () => {
  const [formData, setFormData] = useState({
    nome: '',
    idade: 18,
    genero: 'Masculino' as 'Masculino' | 'Feminino',
    departamento: '',
    cargo: '',
    salario: 0,
    anos_empresa: 0,
    projetos_completados: 0,
    produtividade: 0,
    satisfacao: 0,
    feedback_score: 1.0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // Lista dos campos que devem ser numéricos
    const numericFields = [
      'idade',
      'salario',
      'anos_empresa',
      'projetos_completados',
      'produtividade',
      'satisfacao',
      'feedback_score',
    ];
    setFormData({
      ...formData,
      [name]: numericFields.includes(name) ? Number(value) : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Garante que todos os campos numéricos estejam como number
      const employeeData = {
        ...formData,
        idade: Number(formData.idade),
        salario: Number(formData.salario),
        anos_empresa: Number(formData.anos_empresa),
        projetos_completados: Number(formData.projetos_completados),
        produtividade: Number(formData.produtividade),
        satisfacao: Number(formData.satisfacao),
        feedback_score: Number(formData.feedback_score),
      };
      await addEmployee(employeeData);
      alert('Funcionário adicionado com sucesso!');
      setFormData({
        nome: '',
        idade: 18,
        genero: 'Masculino',
        departamento: '',
        cargo: '',
        salario: 0,
        anos_empresa: 0,
        projetos_completados: 0,
        produtividade: 0,
        satisfacao: 0,
        feedback_score: 1.0,
      });
    } catch (error) {
      alert('Erro ao adicionar funcionário.');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <Grid container spacing={2} >
        <Grid component="div" >
          <TextField
            fullWidth
            label="Nome"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid component="div" >
          <TextField
            fullWidth
            label="Idade"
            name="idade"
            type="number"
            value={formData.idade}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid component="div" >
          <TextField
            fullWidth
            select
            label="Gênero"
            name="genero"
            value={formData.genero}
            onChange={handleChange}
            SelectProps={{ native: true }}
            required
          >
            <option value="Masculino">Masculino</option>
            <option value="Feminino">Feminino</option>
          </TextField>
        </Grid>
        <Grid component="div" >
          <TextField
            fullWidth
            label="Departamento"
            name="departamento"
            value={formData.departamento}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid component="div" >
          <TextField
            fullWidth
            label="Cargo"
            name="cargo"
            value={formData.cargo}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid component="div" >
          <TextField
            fullWidth
            label="Salário"
            name="salario"
            type="number"
            value={formData.salario}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid component="div" >
          <TextField
            fullWidth
            label="Anos na Empresa"
            name="anos_empresa"
            type="number"
            value={formData.anos_empresa}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid component="div" >
          <TextField
            fullWidth
            label="Projetos Completados"
            name="projetos_completados"
            type="number"
            value={formData.projetos_completados}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid component="div" >
          <TextField
            fullWidth
            label="Produtividade (%)"
            name="produtividade"
            type="number"
            value={formData.produtividade}
            onChange={handleChange}
            inputProps={{ min: 0, max: 100 }}
            required
          />
        </Grid>
        <Grid component="div" >
          <TextField
            fullWidth
            label="Satisfação (%)"
            name="satisfacao"
            type="number"
            value={formData.satisfacao}
            onChange={handleChange}
            inputProps={{ min: 0, max: 100 }}
            required
          />
        </Grid>
        <Grid component="div" >
          <TextField
            fullWidth
            label="Feedback (1-5)"
            name="feedback_score"
            type="number"
            value={formData.feedback_score}
            onChange={handleChange}
            inputProps={{ min: 1, max: 5, step: 0.1 }}
            required
          />
        </Grid>
        <Grid component="div">
          <Button type="submit" variant="contained" color="primary">
            Adicionar Funcionário
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default EmployeeForm;