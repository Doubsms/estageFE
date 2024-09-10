import React from 'react';
import {
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Container,
  Box,
} from "@mui/material";
import { useNavigate } from 'react-router-dom';

const HowToApply = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="lg">
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}>
            <CardContent sx={{ padding: 3 }}>
              <Typography variant="h4" gutterBottom>
                « Comment faire une demande de stage ? »
              </Typography>
              <Typography variant="body1">
                Pour faire une demande de stage, suivez ces étapes :
              </Typography>
              <ol>
                <li>Remplissez le formulaire de demande de stage en ligne</li>
                <li>Joignez les documents requis (CV, lettre de motivation, etc.)</li>
                <li>Validez votre demande et recevez un accusé de réception</li>
                <li>Attendez la réponse de l'Institut national de statistique</li>
              </ol>
            </CardContent>
            <CardActions sx={{ padding: 2, backgroundColor: '#e8f5e9' }}>
              <Button
                onClick={() => navigate('/formulaireD')}
                variant="contained"
                sx={{
                  color: '#2e7d32',
                  backgroundColor: '#e8f5e9',
                  '&:hover': {
                    backgroundColor: '#c8e6c9',
                  },
                }}
                size="small"
              >
                Postuler en ligne
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}>
            <CardContent sx={{ padding: 3 }}>
              <Typography variant="h4" gutterBottom>
                Documents requis
              </Typography>
              <Typography variant="body1">
                Pour postuler à un stage à l'Institut national de statistique du Cameroun, vous devez fournir les documents suivants :
              </Typography>
              <ul>
                <li>Curriculum vitae (CV)</li>
                <li>Lettre de motivation</li>
                <li>Copie du diplôme le plus élevé</li>
                <li>Copie de la pièce d'identité</li>
                <li>Attestation de stage (si vous avez déjà effectué un stage)</li>
              </ul>
            </CardContent>
            <CardActions sx={{ padding: 2, backgroundColor: '#e8f5e9' }}>
              <Button
                variant="contained"
                sx={{
                  color: '#2e7d32',
                  backgroundColor: '#e8f5e9',
                  '&:hover': {
                    backgroundColor: '#c8e6c9',
                  },
                }}
                size="small"
              >
                {/* Tu peux ajouter un texte ou un lien ici si nécessaire */}
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default HowToApply;