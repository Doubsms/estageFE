import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import PeopleIcon from '@mui/icons-material/People';
import EventNoteIcon from '@mui/icons-material/EventNote';
import HourglassFullIcon from '@mui/icons-material/HourglassFull';

function GestionDesStages() {
  const [dashboardData, setDashboardData] = useState({
    currentInterns: 0,
    pendingRequests: 0,
    totalStaff: 0,
  });

  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch('http://localhost:4000/dashboard/dashboard-data');
        const data = await response.json();
        setDashboardData(data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div style={{ flexGrow: 1, padding: '24px' }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Card
            sx={{
              bgcolor: '#fff',
              borderRadius: 4,
              boxShadow: 2,
              transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
              position: 'relative',
              overflow: 'hidden',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: 3,
              },
            }}
            onMouseEnter={() => setHoveredCard('totalStaff')}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <CardHeader
              sx={{ bgcolor: 'rgba(0, 128, 0, 0.049)' }}
              title={<Typography sx={{ color: '#00c853' }}>Total des demandes reçues</Typography>}
              avatar={<PeopleIcon sx={{ fontSize: 32, color: '#2e7d32' }} />}
            />
            <CardContent sx={{ fontSize: 24, fontWeight: 500 }}>{dashboardData.totalStaff}</CardContent>
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                color: '#fff',
                padding: '16px',
                opacity: hoveredCard === 'totalStaff' ? 1 : 0,
                transform: hoveredCard === 'totalStaff' ? 'translateY(0)' : 'translateY(100%)',
                transition: 'opacity 0.3s ease-in-out, transform 0.3s ease-in-out',
              }}
            >
              <Typography>Nombre total de stagiaires reçus par l'institution</Typography>
              <Typography>Augmentation de 20% par rapport à l'année dernière</Typography>
            </div>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <Card
            sx={{
              bgcolor: '#fff',
              borderRadius: 4,
              boxShadow: 2,
              transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
              position: 'relative',
              overflow: 'hidden',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: 3,
              },
            }}
            onMouseEnter={() => setHoveredCard('pendingRequests')}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <CardHeader
              sx={{ bgcolor: 'rgba(0, 128, 0, 0.049)' }}
              title={<Typography sx={{ color: '#00c853' }}>Demandes de stage en attente</Typography>}
              avatar={<EventNoteIcon sx={{ fontSize: 32, color: '#2e7d32' }} />}
            />
            <CardContent sx={{ fontSize: 24, fontWeight: 500 }}>{dashboardData.pendingRequests}</CardContent>
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                color: '#fff',
                padding: '16px',
                opacity: hoveredCard === 'pendingRequests' ? 1 : 0,
                transform: hoveredCard === 'pendingRequests' ? 'translateY(0)' : 'translateY(100%)',
                transition: 'opacity 0.3s ease-in-out, transform 0.3s ease-in-out',
              }}
            >
              <Typography>Nombre de demandes de stage en attente</Typography>
              <Typography>Baisse de 10% par rapport au mois dernier</Typography>
            </div>
          </Card>
        </Grid>
        
        <Grid item xs={12}>
          <Card
            sx={{
              bgcolor: '#fff',
              borderRadius: 4,
              boxShadow: 2,
              transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
              position: 'relative',
              overflow: 'hidden',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: 3,
              },
            }}
            onMouseEnter={() => setHoveredCard('currentInterns')}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <CardHeader
              sx={{ bgcolor: 'rgba(0, 128, 0, 0.115)' }}
              title={<Typography sx={{ color: '#00c853' }}>Stagiaires actuels</Typography>}
              avatar={<HourglassFullIcon sx={{ fontSize: 32, color: '#2e7d32' }} />}
            />
            <CardContent sx={{ fontSize: 24, fontWeight: 500 }}>{dashboardData.currentInterns}</CardContent>
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                color: '#fff',
                padding: '16px',
                opacity: hoveredCard === 'currentInterns' ? 1 : 0,
                transform: hoveredCard === 'currentInterns' ? 'translateY(0)' : 'translateY(100%)',
                transition: 'opacity 0.3s ease-in-out, transform 0.3s ease-in-out',
              }}
            >
              <Typography>Nombre de stagiaires actuellement dans l'institution</Typography>
              <Typography>Augmentation de 5% par rapport au mois dernier</Typography>
            </div>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}

export default GestionDesStages;