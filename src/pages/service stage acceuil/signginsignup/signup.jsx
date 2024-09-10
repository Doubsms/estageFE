import * as React from 'react';
import { makeStyles } from '@mui/styles';
import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Image from './background.jpg';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
    root: {
      padding: theme.spacing(3, 2),
      backgroundColor: '#e8f5e9',
      color: '#1b5e20'
    },
    form: {
      '& > *': {
        margin: theme.spacing(1),
        width: '100%'
      }
    },
    button: {
      backgroundColor: '#1b5e20',
      color: '#fff',
      '&:hover': {
        backgroundColor: '#004d40'
      }
    },
    fileInput: {
      display: 'none'
    },
    fileName: {
      marginLeft: theme.spacing(1)
    },
    iconButton: {
      marginLeft: theme.spacing(1)
    },
    loading: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(255, 255, 255, 0.5)',
      zIndex: 9999
    }
  
  }));

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        E-Stage
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme({
    palette: {
      primary: {
        main: '#126e12', // Vert foncé
      },
      secondary: {
        main: '#69b269', // Vert clair
      },
    },
  });

export default function SignUp() {

    const classes = useStyles();

    const [imagePreview, setImagePreview] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const [matricule, setMatricule] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [image, setImage] = useState(null);


    const handleSubmit = async (event) => {
      event.preventDefault();
      setIsLoading(true);
  
      try {
        const formData = new FormData();
        formData.append('matricule', matricule);
        formData.append('firstName', firstName);
        formData.append('lastName', lastName);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('image', image);

        const response = await fetch('http://localhost:4000/nouveauadmin', {
          method: 'POST',
          body: formData
        });
  
        if (response.ok) {
            toast.success('Nouveau administrateur créé avec succès');
          console.log('Données envoyées avec succès');
           // Réinitialiser les champs du formulaire
           setMatricule('');
           setFirstName('');
           setLastName('');
           setEmail('');
           setPassword('');
           setImage(null);
           setImagePreview(null);
        } else {
          toast.error('Erreur lors de l\'enregistrementde l\'administrateur');
          console.error('Erreur lors de l\'enregistrementde l\'administrateur');
        }
      } catch (error) {
        toast.error('Erreur lors de l\'enregistrementde l\'administrateur');
        console.error('Erreur lors de l\'envoi des données:', error);
      } finally {
        setIsLoading(false);
      }
    };
  
    const handleImageUpload = (event) => {
      const file = event.target.files[0];
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    };

  return (
    <ThemeProvider theme={theme}>
         <ToastContainer />
      {isLoading && (
        <div className={classes.loading}>
          <Typography variant="h5">Loading...</Typography>
        </div>
      )}
      <Grid container component="main" sx={{ height: '100vh' }}>
            <CssBaseline />
            <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
                backgroundColor: (t) =>
                t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                backgroundSize: 'cover',
                backgroundPosition: 'left',
            }}
            >
                <img src={Image} style={{ height: '100vh', width: '100%' }} />
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '40px', backgroundColor: 'rgba(0, 0, 0, 0.56)', height: '100vh', width: '58.3%', zIndex: '1000', position: 'absolute', left: '0px', top: '0px' }}>
                    <div style={{ width: '65%' }}><h1>Vous etês sur l'interface administrateur de E-Stage</h1></div>
                    <br />
                    <div style={{ width: '70%' }}><h3>Veuillez créer un profil pour y avoir accès</h3></div>
                </div>
            </Grid>
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                        my: 4,
                        mx: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        }}
                    >
                    
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                        <Grid container spacing={2}>
                        <Grid item xs={12} >
                            <TextField
                            required
                            fullWidth
                            name="matricule"
                            label="Matricule"
                            id="matricule"
                            autoFocus
                            value={matricule}
                            onChange={(e) => setMatricule(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                            autoComplete="given-name"
                            name="firstName"
                            required
                            fullWidth
                            id="firstName"
                            label="Nom"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                            required
                            fullWidth
                            id="lastName"
                            label="Prenom"
                            name="lastName"
                            autoComplete="family-name"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                            required
                            fullWidth
                            id="email"
                            label="Address Email "
                            name="email"
                            autoComplete="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} >
                            <TextField
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="new-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                        <input
                            name="image"
                            accept="image/*"
                            style={{ display: 'none' }}
                            id="upload-photo"
                            type="file"
                            onChange={handleImageUpload}
                        />
                        <label htmlFor="upload-photo">
                            <Button variant="contained" color="primary" component="span">
                            Télécharger une photo
                            </Button>
                            <Grid item xs={12} sx={{ml: 5, mt: 2}}>
                            {imagePreview && (
                            <Avatar
                                alt="Photo de profil"
                                src={imagePreview}
                                sx={{ width: 100, height: 100, ml: 2 }}
                            />
                            )}
                            </Grid>
                        </label>
                        </Grid>
                        </Grid>
                        <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 0, mb: 2 }}
                        >
                        Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link href="/admin" variant="body2">
                            Already have an account? Sign in
                            </Link>
                        </Grid>
                        </Grid>
                        <Copyright sx={{ mt: 0 }} />
                    </Box>
                    </Box>
                   
                </Grid>
        </Grid>
    </ThemeProvider>
  );
}