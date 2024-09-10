import React, { useState, useEffect } from 'react';
import {
  Button,
  TextField,
  Typography,
  Paper,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Tooltip,
  Tab,
  Tabs
} from '@mui/material';
import { CloudUpload, Description, Delete } from '@mui/icons-material';
import SendIcon from '@mui/icons-material/SendAndArchive';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const NouveauRapport = () => {
  const [matriculeStagiaire, setMatriculeStagiaire] = useState('');
  const [fichierRapport, setFichierRapport] = useState(null);
  const [theme, setTheme] = useState('');
  const [commentaire, setCommentaire] = useState('normal');
  const [fileName, setFileName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [etudiants, setEtudiants] = useState([]);
  const [activeTab, setActiveTab] = useState('nouveau');

  useEffect(() => {
    fetch('http://localhost:4000/etudiants')
      .then(response => response.json())
      .then(data => setEtudiants(data))
      .catch(error => console.error('Erreur lors du chargement de la liste des étudiants :', error));
  }, []);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append('matriculeStagiaire', matriculeStagiaire);
      formData.append('fichierRapport', fichierRapport);
      formData.append('theme', theme);
      formData.append('commentaire', commentaire);

      const response = await fetch('http://localhost:4000/nouveaurapport', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        toast.success('Nouveau rapport téléversé avec succès');
        setMatriculeStagiaire('');
        setFichierRapport(null);
        setTheme('');
        setCommentaire('normal');
        setFileName('');
      } else {
        toast.error('Erreur lors de l\'archivage du rapport. Vérifiez vos champs');
      }
    } catch (error) {
      toast.error('Erreur lors de l\'archivage du rapport. Vérifiez vos champs');
      console.error('Erreur lors de l\'envoi du rapport au backend:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitUpdate = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append('matriculeStagiaire', matriculeStagiaire);
      formData.append('fichierRapport', fichierRapport);
      formData.append('theme', theme);
      formData.append('commentaire', commentaire);

      const response = await fetch('http://localhost:4000/updaterapport', {
        method: 'PUT',
        body: formData,
      });

      if (response.ok) {
        toast.success('Rapport mis à jour avec succès');
        setMatriculeStagiaire('');
        setFichierRapport(null);
        setTheme('');
        setCommentaire('normal');
        setFileName('');
      } else {
        toast.error('Erreur lors de la mise à jour du rapport. Vérifiez vos champs');
      }
    } catch (error) {
      toast.error('Erreur lors de la mise à jour du rapport. Vérifiez vos champs');
      console.error('Erreur lors de l\'envoi du rapport au backend:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (event) => {
    setFichierRapport(event.target.files[0]);
    setFileName(event.target.files[0].name);
  };

  return (
    <Paper
      sx={{
        p: 3,
        backgroundColor: '#e8f5e9',
        color: '#1b5e20',
        height: '100%',
      }}
    >
      <ToastContainer />
      {isLoading && (
        <div
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(255, 255, 255, 0.5)',
            zIndex: 9999,
          }}
        >
          <Typography variant="h5">Loading...</Typography>
        </div>
      )}

      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        aria-label="tabs"
        sx={{
          mb: 2,
          '.Mui-selected': {
            backgroundColor: '#fff', // Onglet actif en blanc
            color: '#1b5e20', // Couleur du texte de l'onglet actif
          },
          '.MuiTab-root': {
            color: '#1b5e20', // Couleur du texte des onglets inactifs
          },
          '.MuiTab-root:hover': {
            backgroundColor: '#e0f7fa', // Couleur de fond au survol
          },
        }}
      >
        <Tab label="Nouveau Rapport" value="nouveau" />
        <Tab label="Mettre à jour un rapport" value="update" />
      </Tabs>

      {activeTab === 'nouveau' && (
        <div>
          <Typography variant="h5" component="h1" gutterBottom>
            Archiver un nouveau rapport
          </Typography>

          <form onSubmit={handleSubmit}>
            <FormControl sx={{ width: '100%', mb: 2, '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: 'black' }, '&.Mui-focused fieldset': { borderColor: 'black' } } }}>
              <InputLabel id="stagiaire-label">Nom du stagiaire</InputLabel>
              <Select
                labelId="stagiaire-label"
                value={matriculeStagiaire}
                onChange={(event) => setMatriculeStagiaire(event.target.value)}
              >
                {etudiants.map((etudiant) => (
                  <MenuItem key={etudiant.MATRICULEETUDIANT} value={etudiant.MATRICULEETUDIANT}>
                    {etudiant.NOMETUDIANT} {etudiant.PRENOMETUDIANT}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <input
              accept="application/pdf"
              style={{ display: 'none' }}
              id="rapport-file"
              type="file"
              onChange={handleFileChange}
            />
            <label htmlFor="rapport-file">
              <Button
                variant="contained"
                component="span"
                sx={{
                  backgroundColor: '#1b5e20',
                  color: '#fff',
                  '&:hover': {
                    backgroundColor: '#004d40',
                  },
                  mb: 2,
                }}
              >
                <CloudUpload />
                Choisir le fichier
              </Button>
              {fileName && (
                <Typography variant="body2" sx={{ ml: 1 }}>
                  {fileName}
                  <Tooltip title="Supprimer le fichier">
                    <IconButton sx={{ ml: 1 }}>
                      <Delete />
                    </IconButton>
                  </Tooltip>
                </Typography>
              )}
            </label>

            <TextField
              label="Thème"
              value={theme}
              onChange={(event) => setTheme(event.target.value)}
              multiline
              rows={3}
              sx={{ width: '100%', mb: 2, '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: 'black' }, '&.Mui-focused fieldset': { borderColor: 'black' } } }}
              InputProps={{
                endAdornment: (
                  <Tooltip title="Aperçu du commentaire">
                    <IconButton sx={{ ml: 1 }}>
                      <Description />
                    </IconButton>
                  </Tooltip>
                ),
              }}
            />

            <FormControl sx={{ width: '30%', mb: 2, '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: 'black' }, '&.Mui-focused fieldset': { borderColor: 'black' } } }}>
              <InputLabel id="etat-label">COMMENTAIRE</InputLabel>
              <Select
                labelId="etat-label"
                value={commentaire}
                onChange={(event) => setCommentaire(event.target.value)}
              >
                <MenuItem value="normal">normal</MenuItem>
                <MenuItem value="important">important</MenuItem>
                <MenuItem value="utile">utile</MenuItem>
              </Select>
            </FormControl>

            <Grid container justifyContent="flex-end">
              <Button
                type="submit"
                variant="contained"
                sx={{
                  backgroundColor: '#1b5e20',
                  color: '#fff',
                  '&:hover': {
                    backgroundColor: '#004d40',
                  },
                }}
              >
                Téléverser
                <SendIcon />
              </Button>
            </Grid>
          </form>
        </div>
      )}

      {activeTab === 'update' && (
        <div>
          <Typography variant="h5" component="h1" gutterBottom>
            Mettre à jour un rapport
          </Typography>

          <form onSubmit={handleSubmitUpdate}>
            <FormControl sx={{ width: '100%', mb: 2, '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: 'black' }, '&.Mui-focused fieldset': { borderColor: 'black' } } }}>
              <InputLabel id="stagiaire-update-label">Nom du stagiaire</InputLabel>
              <Select
                labelId="stagiaire-update-label"
                value={matriculeStagiaire}
                onChange={(event) => setMatriculeStagiaire(event.target.value)}
              >
                {etudiants.map((etudiant) => (
                  <MenuItem key={etudiant.MATRICULEETUDIANT} value={etudiant.MATRICULEETUDIANT}>
                    {etudiant.NOMETUDIANT} {etudiant.PRENOMETUDIANT}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <input
              accept="application/pdf"
              style={{ display: 'none' }}
              id="rapport-update-file"
              type="file"
              onChange={handleFileChange}
            />
            <label htmlFor="rapport-update-file">
              <Button
                variant="contained"
                component="span"
                sx={{
                  backgroundColor: '#1b5e20',
                  color: '#fff',
                  '&:hover': {
                    backgroundColor: '#004d40',
                  },
                  mb: 2,
                }}
              >
                <CloudUpload />
                Choisir le fichier
              </Button>
              {fileName && (
                <Typography variant="body2" sx={{ ml: 1 }}>
                  {fileName}
                  <Tooltip title="Supprimer le fichier">
                    <IconButton sx={{ ml: 1 }}>
                      <Delete />
                    </IconButton>
                  </Tooltip>
                </Typography>
              )}
            </label>

            <TextField
              label="Thème"
              value={theme}
              onChange={(event) => setTheme(event.target.value)}
              multiline
              rows={3}
              sx={{ width: '100%', mb: 2, '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: 'black' }, '&.Mui-focused fieldset': { borderColor: 'black' } } }}
              InputProps={{
                endAdornment: (
                  <Tooltip title="Aperçu du commentaire">
                    <IconButton sx={{ ml: 1 }}>
                      <Description />
                    </IconButton>
                  </Tooltip>
                ),
              }}
            />

            <FormControl sx={{ width: '30%', mb: 2, '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: 'black' }, '&.Mui-focused fieldset': { borderColor: 'black' } } }}>
              <InputLabel id="etat-update-label">COMMENTAIRE</InputLabel>
              <Select
                labelId="etat-update-label"
                value={commentaire}
                onChange={(event) => setCommentaire(event.target.value)}
              >
                <MenuItem value="normal">normal</MenuItem>
                <MenuItem value="important">important</MenuItem>
                <MenuItem value="utile">utile</MenuItem>
              </Select>
            </FormControl>

            <Grid container justifyContent="flex-end">
              <Button
                type="submit"
                variant="contained"
                sx={{
                  backgroundColor: '#1b5e20',
                  color: '#fff',
                  '&:hover': {
                    backgroundColor: '#004d40',
                  },
                }}
              >
                Mettre à jour
                <SendIcon />
              </Button>
            </Grid>
          </form>
        </div>
      )}
    </Paper>
  );
};

export default NouveauRapport;