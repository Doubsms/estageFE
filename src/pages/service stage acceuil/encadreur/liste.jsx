import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Box,
  createTheme,
  ThemeProvider,
} from '@mui/material';

// Création d'un thème personnalisé
const theme = createTheme({
  palette: {
    primary: {
      main: '#81c784', // Vert clair
    },
    secondary: {
      main: '#ff7043', // Couleur secondaire
    },
  },
});

const EncadreursList = () => {
  const [encadreurs, setEncadreurs] = useState([]);

  useEffect(() => {
    const fetchEncadreurs = async () => {
      try {
        const response = await fetch('http://localhost:4000/encadreurs');
        const data = await response.json();
        setEncadreurs(data);
      } catch (error) {
        console.error('Erreur lors de la récupération des encadreurs :', error);
      }
    };

    fetchEncadreurs();
  }, []);

  return (
    <ThemeProvider theme={theme} >
      <Container sx={{ padding: '10px', bgcolor: 'rgba(129, 199, 132, 0.1)', borderRadius: '8px', height:'52vh' }}>
      <Typography
        variant="h5"
        gutterBottom
        sx={{
            fontWeight: 700,
            color: '#4caf50',
            textAlign: 'center',
            backgroundColor: 'rgba(76, 175, 80, 0.1)',
            padding: '10px',
            borderRadius: '5px',
            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
            width: '100%', // Corrigé pour remplir la largeur
            marginTop: '2px'
        }}
        >
        Encadreurs enregistrés
        </Typography>
        <TableContainer component={Paper} elevation={3} sx={{ borderRadius: '8px' }} style={{width: '104%', marginTop:'0px', height:'60vh', overflow:'auto'}}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold', bgcolor: '#81c784' }}>MATRICULE</TableCell>
                <TableCell sx={{ fontWeight: 'bold', bgcolor: '#81c784' }}>NOM</TableCell>
                <TableCell sx={{ fontWeight: 'bold', bgcolor: '#81c784' }}>PRÉNOM</TableCell>
                <TableCell sx={{ fontWeight: 'bold', bgcolor: '#81c784' }}>DÉPARTEMENT</TableCell>
                <TableCell sx={{ fontWeight: 'bold', bgcolor: '#81c784' }}>DIVISION</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {encadreurs.map((encadreur) => (
                <TableRow key={encadreur.MATRICULEENCADREUR} sx={{ '&:hover': { backgroundColor: '#e8f5e9' } }}>
                  <TableCell>{encadreur.MATRICULEENCADREUR}</TableCell>
                  <TableCell>{encadreur.NOMENCADREUR}</TableCell>
                  <TableCell>{encadreur.PRENOMENCADREUR}</TableCell>
                  <TableCell>{encadreur.DEPARTEMENT}</TableCell>
                  <TableCell>{encadreur.DIVISION}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
       </Container>
    </ThemeProvider>
  );
};

export default EncadreursList;