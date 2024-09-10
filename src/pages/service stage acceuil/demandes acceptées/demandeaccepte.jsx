import React, { useState, useEffect } from 'react';
import { Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';

const App = () => {
  const [main, setMain] = useState(true);
  const [acceptedStageRequests, setAcceptedStageRequests] = useState([]);

  useEffect(() => {
    const fetchAcceptedStageRequests = async () => {
      try {
        const response = await fetch('http://localhost:4000/stagiaresAccepte');
        const data = await response.json();
        setAcceptedStageRequests(data);
      } catch (error) {
        console.error('Erreur lors du chargement des données :', error);
      }
    };

    fetchAcceptedStageRequests();
  }, []);

  return (
    <div style={{ overflow: "auto", width: "100%", height: "70vh", backgroundColor: '#f0f4f1', padding: '24px' }}>
      {main && (
        <div style={{ height: "100%" }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <Typography variant="h5" sx={{ color: '#2e7d32' }}>
              Stagiaires acceptés
            </Typography>
          </div>

          <Paper sx={{ height: "58vh", overflowY: 'auto' }} elevation={3}>
            <Table stickyHeader>
              <TableHead sx={{ position: 'sticky', top: 0, backgroundColor: '#f0f4f1' }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f0f4f1' }}>Nom</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f0f4f1' }}>Prénom</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f0f4f1' }}>Établissement</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f0f4f1' }}>Date de début</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f0f4f1' }}>Date de fin</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f0f4f1' }}>Thème de stage</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f0f4f1' }}>Encadreur</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {acceptedStageRequests.length > 0 ? (
                  acceptedStageRequests.map((request, index) => (
                    <TableRow key={index}>
                      <TableCell>{request.NOMETUDIANT}</TableCell>
                      <TableCell>{request.PRENOMETUDIANT}</TableCell>
                      <TableCell>{request.ETABLISSEMENT}</TableCell>
                      <TableCell>{request.DATEDEBUTDESEANCE}</TableCell>
                      <TableCell>{request.DATEFINDESEANCE}</TableCell>
                      <TableCell>{request.THEME || 'Non défini'}</TableCell>
                      <TableCell>{request.NOMENCADREUR} {request.PRENOMENCADREUR}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} align="center">Aucune donnée disponible</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </Paper>
        </div>
      )}
    </div>
  );
};

export default App;