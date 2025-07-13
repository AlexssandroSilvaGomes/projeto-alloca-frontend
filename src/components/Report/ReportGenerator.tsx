import React, { useState } from 'react';
import { generateReport } from '../../services/reportService';
import { Button, CircularProgress, Box, Typography } from '@mui/material';

const ReportGenerator: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [reportResult, setReportResult] = useState<{
    batch_id: string;
    total_funcionarios: number;
    funcionarios_adequados: number;
    percentual_adequacao: number;
  } | null>(null);

  const handleGenerateReport = async () => {
    setLoading(true);
    try {
      const response = await generateReport();
      setReportResult(response.data);
    } catch (error) {
      console.error('Erro ao gerar relatório:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ mb: 4 }}>
      <Button
        variant="contained"
        color="primary"
        onClick={handleGenerateReport}
        disabled={loading}
      >
        {loading ? <CircularProgress size={24} /> : 'Gerar Relatório de Alocação'}
      </Button>

      {reportResult && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="h6">Resultado do Relatório:</Typography>
          <Typography>Total de Funcionários: {reportResult.total_funcionarios}</Typography>
          <Typography>Funcionários Adequados: {reportResult.funcionarios_adequados}</Typography>
          <Typography>
            Percentual de Adequação: {reportResult.percentual_adequacao.toFixed(2)}%
          </Typography>
          <Typography>ID do Relatório: {reportResult.batch_id}</Typography>
        </Box>
      )}
    </Box>
  );
};

export default ReportGenerator;