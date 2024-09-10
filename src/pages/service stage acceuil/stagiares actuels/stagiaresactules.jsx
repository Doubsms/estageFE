import React, { useState, useEffect } from 'react';
import { Paper, Table, TableBody, TableCell, TableHead, TableRow, Button, Typography } from '@mui/material';

const App = () => {
  const [main, setMain] = useState(true);
  const [acceptedStageRequests, setAcceptedStageRequests] = useState([]);

  useEffect(() => {
    const fetchAcceptedStageRequests = async () => {
      try {
        const response = await fetch('http://localhost:4000/stagiaresActuel');
        const data = await response.json();
        console.log(data); // Log the data to see its format
        if (Array.isArray(data)) {
          setAcceptedStageRequests(data);
        } else {
          console.error('Data is not an array:', data);
          setAcceptedStageRequests([]); // Set to an empty array if data is not an array
        }
      } catch (error) {
        console.error('Erreur lors du chargement des données :', error);
      }
    };

    fetchAcceptedStageRequests();
  }, []);

  const handleAddTheme = async (matricule) => {
    const newTheme = prompt(matricule + ' Entrez le nouveau thème :');
    if (newTheme !== null) {
      try {
        const response = await fetch('http://localhost:4000/theme', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            MATRICULEETUDIANT: matricule,
            THEME: newTheme,
          }),
        });

        if (response.ok) {
          alert('Thème mis à jour avec succès');
        } else {
          const error = await response.json();
          console.error('Erreur lors de la mise à jour du thème :', error.error);
          alert('Une erreur est survenue lors de la mise à jour du thème');
        }
      } catch (error) {
        console.error('Erreur lors de la mise à jour du thème :', error);
        alert('Une erreur est survenue lors de la mise à jour du thème');
      }
    }
  };

  return (
    <div style={{ overflow: "auto", width: "100%", height: "70vh", backgroundColor: '#f0f4f1', padding: '24px' }}>
      {main && (
        <div style={{ height: "100%" }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <Typography variant="h5" sx={{ color: '#2e7d32' }}>
              Stagiaires actuels de l'INS
            </Typography>
          </div>

          <Paper sx={{ height: "58vh", overflowY: 'auto' }} elevation={3}>
            <Table stickyHeader>
              <TableHead sx={{ position: 'sticky', top: 0, backgroundColor: '#f0f4f1' }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f0f4f1' }}>Nom</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f0f4f1' }}>Prénom</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f0f4f1' }}>Établissement</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f0f4f1' }}>Encadreur</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f0f4f1' }}>Date de début</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f0f4f1' }}>Date de fin</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f0f4f1' }}>Thème de stage</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f0f4f1' }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Array.isArray(acceptedStageRequests) && acceptedStageRequests.length > 0 ? (
                  acceptedStageRequests.map((request, index) => (
                    <TableRow key={index}>
                      <TableCell>{request.NOMETUDIANT}</TableCell>
                      <TableCell>{request.PRENOMETUDIANT}</TableCell>
                      <TableCell>{request.ETABLISSEMENT}</TableCell>
                      <TableCell>{request.NOMENCADREUR} {request.PRENOMENCADREUR}</TableCell>
                      <TableCell>{request.DATEDEBUTDESEANCE}</TableCell>
                      <TableCell>{request.DATEFINDESEANCE}</TableCell>
                      <TableCell>{request.THEME || 'Non défini'}</TableCell>
                      <TableCell>
                        <Button
                          variant="outlined"
                          color="primary"
                          sx={{ marginRight: 1, color: '#2e7d32' }}
                          onClick={() => handleAddTheme(request.MATRICULEETUDIANT)}
                        >
                          {request.THEME ? 'Modifier le thème' : 'Ajouter un thème'}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} align="center">Aucune donnée disponible</TableCell>
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