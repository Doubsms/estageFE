import React, { useState } from 'react';
import {
  Container,
  Typography,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Grid,
  Box,
  Button,
  Card,
  CssBaseline,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Liste from './liste';

const theme = createTheme({
  palette: {
    primary: { main: '#4caf50' },
    secondary: { main: '#f44336' },
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          borderColor: '#4caf50',
        },
        focused: {
          borderColor: '#4caf50',
        },
      },
    },
  },
});

const DemandeStage = () => {
  const [departement, setDepartement] = useState('');
  const [division, setDivision] = useState('');
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [poste, setPoste] = useState('');
  const [matricule, setMatricule] = useState('');

  const departments = {
    "Département des statistiques démographiques et sociales": [
      "Division des statistiques sociales et du suivi de l’inflation",
      "Division des statistiques démographiques",
      "Division de la cartographie des statistiques sur l’environnement et les changements climatique",
    ],
    "Département des statistiques d'entreprise": [
      "Secrétariat Permanent du Plan Comptable",
      "Division des Statistiques des Secteurs Productifs",
    ],
    "Département des synthèses économiques": [
      "Division de la Comptabilité Nationale",
      "Division des Analyses Conjoncturelles",
    ],
    "Département de la coordination statistique, de la coopération et de la recherche": [
      "Division de la Coordination Statistique et de la Diffusion",
      "Division de la Coopération, de la Révision et de la Recherche Appliquée",
    ],
    "Département de l'informatique": [
      "Division des Traitements et des Systèmes d’Information Géographique",
      "Division du Développement des Applications et de la Maintenance",
    ],
  };

  const handleDepartmentChange = (event) => {
    setDepartement(event.target.value);
    setDivision("");
  };

  const handleDivisionChange = (event) => {
    setDivision(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:4000/encadreurs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          MATRICULEENCADREUR: matricule,
          NOMENCADREUR: nom,
          PRENOMENCADREUR: prenom,
          DEPARTEMENT: departement,
          DIVISION: division,
          POSTE: poste
        }),
      });

      if (response.ok) {
        toast.success('Nouveau encadreur créé avec succès');
        setNom('');
        setPrenom('');
        setDepartement('');
        setDivision('');
        setPoste('');
        setMatricule('');
      } else {
        toast.error('Erreur lors de l\'enregistrement de l\'encadreur');
      }
    } catch (error) {
      toast.error('Erreur lors de l\'enregistrement de l\'encadreur');
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container sx={{ padding: '25px', bgcolor: 'rgba(0, 128, 0, 0.049)' }}>
        <Paper elevation={3} sx={{ padding: '15px', marginTop: '20px', display: 'flex' }}>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ width: '40%', height: '62vh', display: 'flex', flexDirection: 'column', marginTop:'0' }}>
            <Typography
              variant="h5"
              gutterBottom
              sx={{
                fontWeight: 700,
                color: '#4caf50',
                textAlign: 'center',
                backgroundColor: 'rgba(76, 175, 80, 0.1)',
                padding: '7px',
                borderRadius: '5px',
                boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
              }}
            >
              Enregistrez un nouvel encadreur
            </Typography>
            <Card sx={{ mt: 1, p: 2 }}>
              <FormControl variant="standard" sx={{ mt: -2, minWidth: 120 }}>
                <InputLabel id="departement-select-label">Département</InputLabel>
                <Select
                  labelId="departement-select-label"
                  value={departement}
                  onChange={handleDepartmentChange}
                  label="Département"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {Object.keys(departments).map((dep) => (
                    <MenuItem key={dep} value={dep}>{dep}</MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl variant="standard" sx={{ mt: 1, width: '100%' }}>
                <InputLabel id="division-select-label">Division</InputLabel>
                <Select
                  labelId="division-select-label"
                  value={division}
                  onChange={handleDivisionChange}
                  label="Division"
                  disabled={!departement}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {departement && departments[departement].map((div) => (
                    <MenuItem key={div} value={div}>{div}</MenuItem>
                  ))}
                </Select>
              </FormControl>

              <TextField
                required
                fullWidth
                name="matricule"
                label="Matricule"
                value={matricule}
                onChange={(e) => setMatricule(e.target.value)}
                sx={{ mt: 1 }}
              />
              <TextField
                required
                fullWidth
                name="nom"
                label="Nom"
                value={nom}
                onChange={(e) => setNom(e.target.value)}
                sx={{ mt: 1 }}
              />
              <TextField
                required
                fullWidth
                name="prenom"
                label="Prénom"
                value={prenom}
                onChange={(e) => setPrenom(e.target.value)}
                sx={{ mt: 1 }}
              />
              <TextField
                required
                fullWidth
                name="poste"
                label="Poste"
                value={poste}
                onChange={(e) => setPoste(e.target.value)}
                sx={{ mt: 1 }}
              />
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 0.5 }}>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    width: '50%',
                    backgroundColor: '#4caf50',
                    '&:hover': {
                      backgroundColor: '#388e3c',
                    },
                  }}
                >
                  Enregistrer
                </Button>
              </Box>
            </Card>
          </Box>
          <Card sx={{ width: '60%', marginLeft: '20px' }}>
            <Liste />
          </Card>
        </Paper>
      </Container>
      <ToastContainer />
    </ThemeProvider>
  );
};

export default DemandeStage;