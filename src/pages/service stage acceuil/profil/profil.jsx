import React, { useEffect, useState } from 'react';
import { Box, Typography, Container, Paper, Avatar, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';

const ContainerStyled = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(2),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '60vh',
}));

const PaperStyled = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: 'center',
  backgroundColor: '#ffffff',
  border: '2px solid #4caf50',
  borderRadius: '10px',
  boxShadow: theme.shadows[3],
  width: '90%',
  height: 'auto', // Adjust height to fit content
}));

const AvatarStyled = styled(Avatar)({
  width: '200px',
  height: '200px',
  margin: 'auto',
  border: '4px solid #4caf50',
});

const TitleStyled = styled(Typography)({
  fontWeight: 'bold',
  fontSize: '1.5rem',
  marginBottom: '1rem', // Margin bottom for spacing
});

const SubtitleStyled = styled(Typography)({
  fontWeight: 'normal',
  fontSize: '1.2rem',
  color: '#555', // Subtitle color
  marginBottom: '2rem', // Margin bottom for better readability
});

const ButtonStyled = styled(Button)({
  borderColor: '#4caf50',
  color: '#4caf50',
  '&:hover': {
    borderColor: '#388e3c', // Darker green on hover
    color: '#388e3c',
  },
});

const Profile = ({ email }) => {
  const [user, setUser] = useState(null); // State to store user data

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch('http://localhost:4000/profile', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ adminemail: email }), // Send email to server
        });

        if (!response.ok) {
          throw new Error('Erreur lors de la récupération du profil');
        }

        const data = await response.json();
        setUser(data); // Store user data
      } catch (error) {
        console.error('Erreur:', error);
      }
    };

    fetchUserProfile();
  }, [email]); // Run only once on initial mount

  if (!user) {
    return <div>Chargement...</div>; // Show loading message
  }

  return (
    <ContainerStyled component="main" maxWidth="sm">
      <PaperStyled elevation={3}>
        <AvatarStyled
          src={`http://localhost:4000/uploads/${user.PHOTOADMIN}`} // User photo
          alt={`${user.NOMADMIN} ${user.PRENOMADMIN}`}
        />
        <hr />
        <TitleStyled variant="h6">
          <span style={{ fontSize: '15px' }}>Matricule : </span> {user.MATRICULEADMIN}
        </TitleStyled>
        <hr />
        <TitleStyled variant="h6">
          <span style={{ fontSize: '15px' }}>Nom :</span> {user.NOMADMIN}
        </TitleStyled>
        <hr />
        <TitleStyled variant="h6">
          <span style={{ fontSize: '15px' }}>Prenom :</span> {user.PRENOMADMIN}
        </TitleStyled>
        <hr />
        <TitleStyled variant="h6">
          <span style={{ fontSize: '15px' }}>Courriel :</span> {user.EMAILADMIN}
        </TitleStyled>
        <SubtitleStyled>
          <ButtonStyled variant="outlined" component={Link} to="/signup">
            Définir un nouveau administrateur
          </ButtonStyled>
        </SubtitleStyled>
      </PaperStyled>
    </ContainerStyled>
  );
};

export default Profile;
