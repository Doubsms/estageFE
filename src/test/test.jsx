import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { Box, Typography, Paper, Button, Avatar } from '@mui/material';
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
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      marginRight:"30px"
    }}
  >

    <QRCode
      value={`https://vimeo.com/1006960579`}
      bgColor="#ffffff"
      fgColor="#000000"
      style={{
        width: '180px',
        height: '180px',
      }}
    />
   
    
    
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
      <Badge ref={componentRef} />
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