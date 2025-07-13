import React, { useState } from 'react';
import { Box, Tabs, Tab, Button } from '@mui/material';
import { useAuth } from '../../context/AuthContext';
import EmployeeList from '../Employee/EmployeeList';
import EmployeeForm from '../Employee/EmployeeForm';
import ReportGenerator from '../Report/ReportGenerator';
import ReportList from '../Report/ReportList';

const DashboardLayout: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const { logout } = useAuth();

  const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <Box sx={{ p: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Tabs value={activeTab} onChange={handleChangeTab}>
          <Tab label="Funcionários" />
          <Tab label="Adicionar Funcionário" />
          <Tab label="Relatórios" />
        </Tabs>
        <Button variant="outlined" onClick={logout}>
          Sair
        </Button>
      </Box>

      {activeTab === 0 && <EmployeeList />}
      {activeTab === 1 && <EmployeeForm />}
      {activeTab === 2 && (
        <Box>
          <ReportGenerator />
          <ReportList />
        </Box>
      )}
    </Box>
  );
};

export default DashboardLayout;