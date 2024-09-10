import React from 'react';
import {
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Container,
  TextField,
  Divider,
} from '@mui/material';
import { PhoneInTalk, Email, LocationOn } from "@mui/icons-material";

const ContactUs = () => {
  return (
    <Container maxWidth="lg">
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            backgroundColor: 'rgba(18, 110, 18, 0.119)',
            borderRadius: 2,
            padding: 3,
          }}>
            <CardContent>
              <div>
                <PhoneInTalk sx={{ fontSize: 40, color: '#2e7d32', mb: 2 }} />
                <Typography variant="h5" gutterBottom>
                  Téléphone
                </Typography>
                <Typography variant="body1">+237 222 22 22 22</Typography>
              </div>
              <Divider sx={{ my: 2 }} />
              <div>
                <Email sx={{ fontSize: 40, color: '#2e7d32', mb: 2 }} />
                <Typography variant="h5" gutterBottom>
                  Email
                </Typography>
                <Typography variant="body1">info@ins.cm</Typography>
              </div>
              <Divider sx={{ my: 2 }} />
              <div>
                <LocationOn sx={{ fontSize: 40, color: '#2e7d32', mb: 2 }} />
                <Typography variant="h5" gutterBottom>
                  Adresse
                </Typography>
                <Typography variant="body1">
                  Quartier du lac, Yaoundé, Cameroun
                </Typography>
              </div>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            backgroundColor: 'rgba(18, 110, 18, 0.119)',
            borderRadius: 2,
            padding: 3,
          }}>
            <CardContent>
              <Typography variant="h4" gutterBottom>
                Donnez-nous vos avis et suggestions du stage passé chez nous
              </Typography>
              <form>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField label="Nom" variant="outlined" fullWidth />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField label="Email" variant="outlined" fullWidth />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Message"
                      variant="outlined"
                      multiline
                      rows={4}
                      fullWidth
                    />
                  </Grid>
                </Grid>
                <CardActions>
                  <Button
                    variant="contained"
                    sx={{
                      color: '#fff',
                      backgroundColor: 'rgb(18, 110, 18)',
                      '&:hover': {
                        backgroundColor: '#1b5e20',
                      },
                      width: '100%',
                    }}
                  >
                    Envoyer
                  </Button>
                </CardActions>
              </form>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ContactUs;