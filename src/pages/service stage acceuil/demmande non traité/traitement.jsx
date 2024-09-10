import React, { useState, useEffect } from 'react';
import { Container, Typography, Paper, List, ListItem, ListItemText, Link, CssBaseline, Card, CardContent, Grid, Box, Button, IconButton, CircularProgress, InputLabel, MenuItem, FormControl, Select } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PrintIcon from '@mui/icons-material/Print';
import DemandesNT from './demandesNT';
import { PDFDocument } from "pdf-lib";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const theme = createTheme({
  palette: {
    primary: { main: '#4caf50' },
    secondary: { main: '#f44336' },
  },
  typography: {
    h4: { fontWeight: 700 },
    h6: { fontWeight: 600 },
    body1: { fontSize: '1rem' },
  },
});

const App = (props) => {
  const [main, setMain] = useState(false);
  const [isLoadingAccept, setIsLoadingAccept] = useState(false);
  const [isLoadingReject, setIsLoadingReject] = useState(false);
  const [department, setDepartment] = useState('');
  const [division, setDivision] = useState('');
  const [supervisors, setSupervisors] = useState([]);
  const [selectedSupervisor, setSelectedSupervisor] = useState('');
  const [mergedPdfUrl, setMergedPdfUrl] = useState("");

  useEffect(() => {
    const fetchSupervisors = async () => {
      const response = await fetch('http://localhost:4000/encadreurs');
      const data = await response.json();
      setSupervisors(data);
    };

    fetchSupervisors();
  }, []);

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
    setDepartment(event.target.value);
    setDivision(""); // Reset division when department changes
  };

  const handleDivisionChange = (event) => {
    setDivision(event.target.value);
  };

  const handleSupervisorChange = (event) => {
    setSelectedSupervisor(event.target.value);
  };

  const sendDecision = async (decision, setLoading) => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:4000/mail/decision', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          decision,
          NUMERODEDOSSIER: props.dossier,
          nom: props.nom,
          adresseEmail: props.adresseEmail,
        }),
      });

      if (!response.ok) throw new Error('Erreur de réseau');

      const result = await response.json();
      toast[decision === 'accepté' ? 'success' : 'error'](`Demande ${decision}. E-mail envoyé avec succès.`);
      return result.message;

    } catch (error) {
      console.error('Erreur lors de l\'envoi de la décision :', error);
      toast.error('Erreur lors de l\'envoi de la décision.');
    } finally {
      setLoading(false);
    }
  };

  const createAttribution = async () => {
    try {
      const response = await fetch('http://localhost:4000/attributions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          adminemail: props.adminemail,
          selectedSupervisor,
          dossier: props.dossier,
        }),
      });
      if (!response.ok) throw new Error('Erreur de création');

      const result = await response.json();
      toast.success('Attribution de l\'encadreur réussie !.');
      return result;

    } catch (error) {
      console.error('Erreur lors de la création de l\'attribution :', error);
      toast.error('Erreur lors de la création de l\'attribution.');
    }
  };

  const handleAccept = async () => {
    const decision = await sendDecision('accepté', setIsLoadingAccept);
    await createAttribution();
    console.log(decision);
  };

  const handleReject = async () => {
    await sendDecision('rejeté', setIsLoadingReject);
  };

  const filteredSupervisors = supervisors.filter(supervisor => supervisor.DEPARTEMENT === department && supervisor.DIVISION === division);

  const pdfUrls = [
    props.cni,
    props.certificat,
    props.lettremotivation,
    props.lettrerecommendation
  ];

  const mergePdfs = async () => {
    try {
      const pdfBytesArray = await Promise.all(
        pdfUrls.map((url) => fetch(url).then((res) => res.arrayBuffer()))
      );

      const mergedPdf = await PDFDocument.create();

      for (const pdfBytes of pdfBytesArray) {
        const pdf = await PDFDocument.load(pdfBytes);
        const pages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        pages.forEach((page) => mergedPdf.addPage(page));
      }

      const mergedPdfBytes = await mergedPdf.save();
      const mergedPdfBlob = new Blob([mergedPdfBytes], { type: "application/pdf" });
      const mergedPdfUrl = URL.createObjectURL(mergedPdfBlob);

      setMergedPdfUrl(mergedPdfUrl);
    } catch (error) {
      console.error("Erreur lors de la fusion des PDF : ", error);
    }
  };

  const printPdf = () => {
    toast.warning(' veuillez cliquer encore');
    if (mergedPdfUrl) {
      const printWindow = window.open(mergedPdfUrl);
      printWindow.addEventListener('load', () => {
        printWindow.focus();
        printWindow.print();
      });
    }
  };

  const handlePrint = async () => {
    await mergePdfs();
    printPdf();
  };

  const DemandeStage = (props) => {
    return (
      <div style={{display:"flex", backgroundColor:"rgba(0, 128, 0, 0.049)"}}>
        <Container style={{ padding: '25px'}}>
          <CssBaseline />
          <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
            <Typography variant="h5" gutterBottom>
              <IconButton style={{position:"relative", left:"-430px"}} color="primary" onClick={() => setMain(true)}>
                <ArrowBackIcon />
              </IconButton>
              Demande de Stage 
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h6" color="primary" gutterBottom>
                      Informations Personnelles
                    </Typography>
                    <Typography variant="body1"><strong>Nom:</strong> {props.nom}</Typography>
                    <Typography variant="body1"><strong>Prénom:</strong> {props.prenom}</Typography>
                    <Typography variant="body1" gutterBottom><strong>Établissement:</strong> {props.etablissement}</Typography>
                    <Typography variant="body1" gutterBottom><strong>Email:</strong> {props.adresseEmail}  </Typography>
                    <Typography variant="body1" gutterBottom><strong>numerodossier:</strong> {props.dossier}  </Typography>
                  </CardContent>
                </Card>
                <Card>
                  <div>
                  <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="departement-select-label">Département</InputLabel>
                    <Select
                      labelId="departement-select-label"
                      value={department}
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

                  <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="division-select-label">Division</InputLabel>
                    <Select
                      labelId="division-select-label"
                      value={division}
                      onChange={handleDivisionChange}
                      label="Division"
                      disabled={!department} // Disable if no department is selected
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {department && departments[department].map((div) => (
                        <MenuItem key={div} value={div}>{div}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                    <FormControl variant="outlined" sx={{ m: 1, minWidth: 120 }}>
                      <InputLabel id="encadreur-select-label">Encadreur</InputLabel>
                      <Select
                        labelId="encadreur-select-label"
                        value={selectedSupervisor}
                        onChange={handleSupervisorChange}
                        disabled={!division} // Disable if no department is selected
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        {filteredSupervisors.map((supervisor) => (
                          <MenuItem key={supervisor.MATRICULEENCADREUR} value={supervisor.MATRICULEENCADREUR}>
                            {supervisor.NOMENCADREUR} {supervisor.PRENOMENCADREUR}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                </Card>
              </Grid>
              <Grid item xs={12} md={6}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h6" color="primary" gutterBottom>
                      Documents Téléversés
                    </Typography>
                    <List>
                      {[
                        { title: "CNI", link: props.cni },
                        { title: "Certificat de Scolarité", link: props.certificat },
                        { title: "Lettre de Motivation", link: props.lettremotivation },
                        { title: "Lettre de Recommandation", link: props.lettrerecommendation }
                      ].map((doc) => (
                        <ListItem key={doc.title}>
                          <ListItemText primary={doc.title} />
                          <Link href={doc.link} target="_blank" rel="noopener noreferrer" style={{color:"black"}}>
                            Visualiser
                          </Link>
                        </ListItem>
                      ))}
                    </List>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
            <Box display="flex" justifyContent="flex-end" marginTop={2}>
              <Button color="inherit" style={{marginRight:'45%', backgroundColor:'lightgrey', color:'dark', boxShadow: '0 12px 40px rgba(0, 0, 0, 0.4)',}} onClick={handlePrint}>
                <PrintIcon style={{marginRight:'4px'}} />
                Imprimer le dossier
              </Button>
              <Button variant="contained" color="primary" onClick={handleAccept} style={{ marginRight: '10px' }} disabled={isLoadingAccept || !selectedSupervisor}>
                {isLoadingAccept ? <CircularProgress size={24} /> : 'Accepter'}
              </Button>
              <Button variant="contained" color='secondary' onClick={handleReject} disabled={isLoadingReject}>
                {isLoadingReject ? <CircularProgress size={24} /> : 'Rejeter'}
              </Button>           
            </Box>
          </Paper>
        </Container>
      </div>
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer />
      {main === false 
        ? <DemandeStage 
            nom={props.nom} 
            prenom={props.prenom} 
            etablissement={props.etablissement} 
            cni={props.cni} 
            certificat={props.certificat} 
            lettremotivation={props.lettremotivation} 
            lettrerecommendation={props.lettrerecommendation} 
            adresseEmail={props.adresseEmail} 
            dossier={props.dossier}
          /> 
        : <DemandesNT />
      }
    </ThemeProvider>
  );
};

export default App;