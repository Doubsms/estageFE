import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  Typography,
  Chip,
  Box,
} from '@mui/material';
import Traitement from './traitement';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: "#2e7d32",
    },
  },
});

const App = (props) => {
  const [main, setMain] = useState(true);
  
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [etablissement, setEtablissement] = useState('');
  const [cni, setCni] = useState('');
  const [certificat, setCertificat] = useState('');
  const [lettremotivation, setLettremotivation] = useState('');
  const [lettrerecommendation, setLettrerecommendation] = useState('');
  const [email, setEmail] = useState('');
  const [numerodossier, setNumerodossier] = useState('');

  const PendingStageRequestsPage = () => {
    const navigate = useNavigate();
    const [pendingStageRequests, setPendingStageRequests] = useState([]);

    useEffect(() => {
      fetch('http://localhost:4000/demandesNT')
        .then(response => response.json())
        .then(data => setPendingStageRequests(data))
        .catch(error => console.error('Erreur lors du chargement des données :', error));
    }, []);

    return (
      <Box sx={{ backgroundColor: '#f0f4f1', padding: 3, height: '100%' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h5" sx={{ color: '#2e7d32' }}>
            Demandes de stages non traitées
          </Typography>
          <Button onClick={() => navigate('/FormulaireD')} variant="contained" color="primary" sx={{ backgroundColor: '#2e7d32' }}>
            Nouvelle demande
          </Button>
        </Box>

        <Paper sx={{ height: "58vh", overflow: 'auto' }} elevation={3}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f0f4f1' }}>Nom</TableCell>
                <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f0f4f1' }}>Prenom</TableCell>
                <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f0f4f1' }}>Établissement</TableCell>
                <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f0f4f1' }}>Date de début de stage</TableCell>
                <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f0f4f1' }}>Statut</TableCell>
                <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f0f4f1' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pendingStageRequests.length > 0 ? (
                pendingStageRequests.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell>{request.NOMETUDIANT}</TableCell>
                    <TableCell>{request.PRENOMETUDIANT}</TableCell>
                    <TableCell>{request.ETABLISSEMENT}</TableCell>
                    <TableCell>{request.DATEDEBUTDESEANCE}</TableCell>
                    <TableCell>
                      <Chip label="Non traité" style={{ color: 'grey' }} />
                    </TableCell>
                    <TableCell>
                      <Button
                        onClick={() => {
                          setNom(request.NOMETUDIANT);
                          setPrenom(request.PRENOMETUDIANT);
                          setEtablissement(request.ETABLISSEMENT);
                          setCni(request.CNI);
                          setCertificat(request.CERTIFICAT);
                          setLettremotivation(request.LETTREMOTIVATION);
                          setLettrerecommendation(request.LETTRERECOMMENDATION);
                          setEmail(request.EMAIL);
                          setNumerodossier(request.NUMERODEDOSSIER);
                          setMain(false);
                        }}
                        variant="outlined"
                        sx={{ color: '#2e7d32' }}
                      >
                        Traiter
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} align="center">Aucune donnée disponible</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Paper>
      </Box>
    );
  };

  return (
    <Box sx={{ overflow: "auto", width: "100%", height: "70vh" }}>
      {main ? (
        <PendingStageRequestsPage />
      ) : (
        <Traitement 
          adminemail={props.adminemail}
          nom={nom}
          prenom={prenom}
          etablissement={etablissement}
          cni={cni}
          certificat={certificat}
          lettremotivation={lettremotivation}
          lettrerecommendation={lettrerecommendation}
          adresseEmail={email}
          dossier={numerodossier} 
        />
      )}
    </Box>
  );
};

export default App;