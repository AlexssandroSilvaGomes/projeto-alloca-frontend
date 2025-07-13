import React, { useEffect, useState } from 'react';
import { getReports, downloadReport } from '../../services/reportService';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Button } from '@mui/material';

interface Report {
  id: string;
  data_geracao: string;
  total_funcionarios: number;
  funcionarios_adequados: number;
  percentual_adequacao: number;
}

const ReportList: React.FC = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchReports = async () => {
    setLoading(true);
    try {
      const response = await getReports();
      setReports(response.data);
    } catch (error) {
      console.error('Erro ao carregar relatórios:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (id: string) => {
    try {
      const blobData = await downloadReport(id);

      // Adiciona BOM para UTF-8
      const BOM = '\uFEFF';
      let blob;
      if (blobData instanceof Blob) {
        blob = blobData;
      } else {
        blob = new Blob([BOM + blobData], { type: 'text/csv;charset=utf-8;' });
      }

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `relatorio_${id}.csv`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      alert('Erro ao baixar relatório');
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID do Relatório</TableCell>
            <TableCell>Data de Geração</TableCell>
            <TableCell>Total de Funcionários</TableCell>
            <TableCell>Funcionários Adequados</TableCell>
            <TableCell>Percentual de Adequação</TableCell>
            <TableCell>Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {reports.map((report) => (
            <TableRow key={report.id}>
              <TableCell>{report.id}</TableCell>
              <TableCell>{new Date(report.data_geracao).toLocaleString()}</TableCell>
              <TableCell>{report.total_funcionarios}</TableCell>
              <TableCell>{report.funcionarios_adequados}</TableCell>
              <TableCell>{Number(report.percentual_adequacao).toFixed(2)}%</TableCell>
              <TableCell>
                <Button variant="outlined" color="primary" onClick={() => handleDownload(report.id)}>
                  Download
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Button
        variant="contained"
        color="primary"
        onClick={fetchReports}
        style={{ margin: '16px' }}
      >
        Atualizar
      </Button>
    </TableContainer>
  );
};

export default ReportList;