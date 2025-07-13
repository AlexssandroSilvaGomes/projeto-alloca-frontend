import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { TextField, Button, Box, Typography } from '@mui/material';
import { login, register } from '../../services/AuthService';

const LoginForm: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');
  const { login: authLogin } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isLogin) {
        const response = await login({ email, senha });
        authLogin(response.data.token);
      } else {
        await register({ nome, email, senha });
        const response = await login({ email, senha });
        authLogin(response.data.token);
      }
    } catch (err) {
      setError('Falha na autenticação. Verifique suas credenciais.');
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box sx={{ maxWidth: 400, width: '100%', p: 3, boxShadow: 3, borderRadius: 2, background: '#fff' }}>
        <Typography variant="h4" gutterBottom>
          {isLogin ? 'Login' : 'Registro'}
        </Typography>
        
        {error && <Typography color="error">{error}</Typography>}
        
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <TextField
              fullWidth
              margin="normal"
              label="Nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
          )}
          
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          
          <TextField
            fullWidth
            margin="normal"
            label="Senha"
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
          
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            {isLogin ? 'Entrar' : 'Registrar'}
          </Button>
        </form>
        
        <Button
          onClick={() => setIsLogin(!isLogin)}
          fullWidth
          sx={{ mt: 1 }}
        >
          {isLogin ? 'Criar uma conta' : 'Já tenho uma conta'}
        </Button>
      </Box>
    </Box>
  );
};

export default LoginForm;