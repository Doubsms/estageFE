import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { Box, Typography, Paper, Button, Avatar } from '@mui/material';
import Background from './background.png';
import Logo from './logo.png';
import LogoImg from './logoimg.png';
import { QRCode } from 'react-qrcode';
// Composant Badge
const Badge = React.forwardRef((props,ref) => (
  <Paper
    ref={ref}
    style={{
      color: '#ffffff',
      padding: '10px', // Ajustement pour le format
      borderRadius: '8px',
      textAlign: 'center',
      boxShadow: '0 12px 40px rgba(0, 0, 0, 0.4)',
      width: '100mm', // Largeur du badge
      height: '150mm', // Hauteur du badge
      backgroundImage: `url(${Background})`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      marginRight:"30px"
    }}
  >
    <div style={{display:"flex", flexDirection:"row"}}>
    <img src={LogoImg} alt='logo ins' style={{height:"25%", width:"35%", marginLeft:"-10px", marginTop:"-10px"}}/>
    <img src={Logo} alt='logo ins' style={{height:"70px", width:"75%", marginTop:"30px", marginLeft:"-10px"}}/>
    </div>
    <div style={{ marginLeft: '80%', marginTop: '-6%'}}>
      <span><div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
    <QRCode
      value={`Nom :\n ${props.name} ${props.prenom}\n
              Etablissement : ${props.etablissement}\n
              Département : ${props.departement}\n
              Encadreur : ${props.nomencadreur} ${props.prenomencadreur}`}
      bgColor="#ffffff"
      fgColor="#000000"
      level="L"
      style={{
        width: '80px',
        height: '80px',
        textAlign: 'left', // Aligne le texte à gauche
      }}
    />
  </div></span>
    </div>
    <img
      src={`http://localhost:4000/uploads/${props.photo}`}
      alt={props.name}
      style={{
        width: '200px', // Ajustement de la taille de l'image
        height: '200px',
        borderRadius: '50%',
        marginTop:"0%",
        marginLeft: "-1px",
        display:'flex',
        alignItems:'flex-start'
      }}
    />
    <br/>
    <hr/>
    <Typography style={{marginLeft:"-5%",marginTop:"-15%"}} variant="h4" component="div" fontWeight="bold">
      {props.name} {props.prenom}
    </Typography>
    <hr/>
    <Typography component="div" fontWeight="medium" style={{marginLeft:"35%",marginTop:"-30px", color:"rgba(21, 12, 144, 0.442)", fontSize:"40px", fontWeight: "bold"}}>
    stagiaire 
    </Typography>
    
  </Paper>
));

// Composant pour imprimer le badge
const BadgePrinter = (props ) => {
  const componentRef = useRef();
  
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    // pageStyle: '@page { size: 100mm 15mm; margin: 0; }',
  });

  return (
    <Box style={{display:"flex", flexDirection:"row", height:"73vh"}}>
      <Badge ref={componentRef} name={props.name} prenom={props.prenom} photo={props.photo} id={props.id} etablissement={props.etablissement}
                                nomencadreur={props.nomencadreur} prenomencadreur = {props.prenomencadreur} departement = {props.departement} />
      <Button
        variant="contained"
        color="inherit"
        onClick={handlePrint}
        style={{ marginTop: '10px', color: 'black' }}
      >
       Cliquez ici pour Imprimer
      </Button>
      <style>
        {`
          @media print {
            @page { size: 105mm 148.5mm; margin: 0; }
            body {
              -webkit-print-color-adjust: exact; /* Chrome */
              print-color-adjust: exact; /* Firefox */
            }
          }
        `}
      </style>
    </Box>
  );
};

export default BadgePrinter;