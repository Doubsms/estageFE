import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Link
} from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: "#2e7d32",
    },
  },
});

const Container = styled('div')(({ theme }) => ({
  backgroundColor: '#f0f4f1',
  padding: theme.spacing(3),
  height: '100%'
}));

const Header = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: theme.spacing(3),
}));

const HeaderTitle = styled(Typography)(({ theme }) => ({
  color: '#2e7d32',
}));

const TableContainer = styled(Paper)(({ theme }) => ({
  height: '58vh',
  padding: theme.spacing(3),
  maxHeight: 'calc(100vh - 200px)',
  overflowY: 'auto',
}));

const HeaderCell = styled(TableCell)({
  fontWeight: 'bold',
  backgroundColor: '#f0f4f1',
});

const TableHeadSticky = styled(TableHead)({
  position: 'sticky',
  top: -25,
  backgroundColor: '#f0f4f1',
  zIndex: 1,
});

const ActionButton = styled(TableCell)({
  color: '#2e7d32',
});

const PendingStageRequestsPage = () => {
  const [pendingStageRequests, setPendingStageRequests] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/historiquespeciaux')
      .then(response => response.json())
      .then(data => {
        setPendingStageRequests(data);
      })
      .catch(error => console.error('Erreur lors du chargement des données :', error));
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Header>
          <HeaderTitle variant="h5">
            Rapports de stage spéciaux
          </HeaderTitle>
        </Header>

        <TableContainer elevation={3}>
          <Table stickyHeader>
            <TableHeadSticky>
              <TableRow>
                <HeaderCell>N°</HeaderCell>
                <HeaderCell>Matricule</HeaderCell>
                <HeaderCell>Nom</HeaderCell>
                <HeaderCell>Prenom</HeaderCell>
                <HeaderCell>Thème</HeaderCell>
                <HeaderCell>Date</HeaderCell>
                <HeaderCell>Actions</HeaderCell>
              </TableRow>
            </TableHeadSticky>
            <TableBody>
              {pendingStageRequests.length > 0 ? (
                pendingStageRequests.map((request, index) => (
                  <TableRow key={index}>
                    <TableCell>{request.IDDOSSIER}</TableCell>
                    <TableCell>{request.MATRICULE}</TableCell>
                    <TableCell>{request.NOMETUDIANT}</TableCell>
                    <TableCell>{request.PRENOMETUDIANT}</TableCell>
                    <TableCell>{request.THEME}</TableCell>
                    <TableCell>{request.DATE}</TableCell>
                    <ActionButton>
                      <Link href={request.FICHIER} target="_blank" rel="noopener noreferrer" style={{ color: 'green' }}>
                        Visualiser
                      </Link>
                    </ActionButton>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} align="center">Aucune donnée disponible</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </ThemeProvider>
  );
};

export default PendingStageRequestsPage;
