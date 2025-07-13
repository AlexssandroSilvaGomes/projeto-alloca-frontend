import React from 'react';
import { useAuth } from './context/AuthContext';
import LoginForm from './components/Auth/LoginForm';
import DashboardLayout from './components/Layout/DashboardLayout';

const App: React.FC = () => {
  const { token } = useAuth();

  return (
    <div>
      {token ? <DashboardLayout /> : <LoginForm />}
    </div>
  );
};

export default App;