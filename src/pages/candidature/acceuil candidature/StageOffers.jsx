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

const StageOffers = () => {
  const navigate = useNavigate();

  const stageOffers = [
    {
      title: 'Stage en communication',
      duration: '3 mois',
      description:
        'Immergez-vous dans le monde de la communication et participez à la création de campagnes et de contenus percutants.',
    },
    {
      title: 'Stage en statistique',
      duration: '6 mois',
      description:
        'Contribuez à des projets d\'analyse statistique et développez des compétences avancées dans le traitement des données.',
    },
    // Ajoute d'autres offres ici...
  ];

  return (
    <Container maxWidth="lg">
      <Box mb={4} color="#1b5e20">
        <Typography variant="h3">Offres de Stage</Typography>
      </Box>
      <Grid container spacing={3}>
        {stageOffers.map((offer, index) => (
          <Grid item key={index} xs={12} sm={6} md={4}>
            <Card sx={{
              backgroundColor: 'rgba(20, 87, 20, 0.092)',
              color: 'black',
              borderRadius: 2,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              height: '100%',
            }}>
              <CardContent sx={{ padding: 3 }}>
                <Typography variant="h4" gutterBottom>
                  {offer.title}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Durée : {offer.duration}
                </Typography>
                <Typography variant="body2">{offer.description}</Typography>
              </CardContent>
              <CardActions sx={{ padding: 2, backgroundColor: 'rgba(18, 110, 18, 0.119)', borderBottomLeftRadius: 8, borderBottomRightRadius: 8 }}>
                <Button
                  onClick={() => navigate('/formulaireD')}
                  variant="contained"
                  sx={{
                    color: '#fff',
                    backgroundColor: 'rgba(18, 110, 18, 0.634)',
                    '&:hover': {
                      backgroundColor: '#1b5e20',
                    },
                  }}
                  size="small"
                >
                  Postuler
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default StageOffers;