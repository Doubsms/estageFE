import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { Box, Typography, Paper, Button } from '@mui/material';
import Logo from './logo.png'; // Assuming this is the institute's logo

// Component for the Attestation de Fin de Stage
const AttestationLetter = React.forwardRef((props, ref) => (
  <div style={{ height: "77vh", overflow: 'auto', marginTop: "-65px" }}>
    <Paper
        style={{
          padding: '40px', // Padding for the letter content
          borderRadius: '8px',
          textAlign: 'left', // Align text to the left for a formal letter format
          boxShadow: '0 12px 40px rgba(0, 0, 0, 0.4)',
          width: '210mm', // Width for A4 format
          height: '320mm', // Height for A4 format
          fontFamily: 'Times New Roman, serif', // Apply Times New Roman font
          margin: 'auto',
          marginTop: '20mm',
          backgroundColor:""
      }}
    >
      <br/>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0px', lineHeight: "1", fontSize:"10px" }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '50%', textAlign: 'center' }}>
            REPUBLIQUE DU CAMEROUN<br />
            paix-travail-patrie<br />
            ****************<br />
            INSTITUT NATIONALE DE LA STATISTIQUE<br />
            ****************<br />
            DIRECTION GENERALE<br />
            ****************<br />
            DIRECTION DES AFFAIRES ADMINISTRATIVES ET FINANCIERES<br />
            ****************<br />
            SOUS DIRECTION DES RESSOURCES HUMAINES<br />
            ****************<br />
            SERVICE DE LA FORMATION<br />
            ****************<br />
        </div>
        <img src={Logo} alt='Institute Logo' style={{ height: '4%', width: '15%', margin: '4%' }} />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '50%', textAlign: 'center' }}>
            REPUBLIC OF CAMEROON<br />
            Peace-Work-Fatherland<br />
            ****************<br />
            NATIONAL INSTITUTE OF STATISTICS<br />
            ****************<br />
            GENERAL DIRECTORATE<br />
            ****************<br />
            DIRECTORATE OF ADMINISTRATIVE AND FINANCIAL AFFAIRS<br />
            ****************<br />
            SUB-DEPARTMENT OF HUMAN RESOURCES<br />
            ****************<br />
            TRAINING SERVICE<br />
            ****************<br />
        </div>
        </div>
        <br/>
        <Typography variant="h4" component="div" style={{ marginBottom: '20px', textAlign:"end", fontFamily: 'Times New Roman, serif', fontSize:"15px", marginRight:"20%" }}>
        Yaoundé, le    
        </Typography>

        <Typography variant="h4" component="div" style={{ marginBottom: '5px', fontFamily: 'Times New Roman, serif', fontSize:"15px" }}>
        N°_____________/INS/DG/DAF/SDRH/SFO/ydt
        </Typography>
        
      <Typography variant="body1" component="div" style={{ marginBottom: '20px', lineHeight: '1', fontFamily: 'Times New Roman, serif', textAlign:'center', fontSize:'20px' }}>
        <br/>
        <br/>
        <br/>
        <strong>ATTESTATION DE FIN DE STAGE</strong><br/>
        -----------------
        <br/>
      </Typography>
      <br/>

      <div style={{width:'80%', marginLeft:'10%'}}>
      <Typography variant="body1" component="div" className="typewriter" style={{ marginBottom: '5px', fontFamily: 'Times New Roman, serif', textIndent:'2em' }}>
      Je soussigné, Monsieur Joseph TEDOU, Directeur Général d l'institut National de la statistique, atteste que : 
      </Typography>
      
      <Typography variant="body1" component="div" className="typewriter" style={{ marginBottom: '5px', fontFamily: 'Times New Roman, serif', textIndent:'2em' }}>
      {props.sexe==='M'? 'Monsieur' : 'Madame'} 
      <strong> {props.name} {props.prenom} </strong>
         a effectué un stage académique au {props.departement}, {props.division} de l'Institut National de Staitistique pour la période allant du {props.dateDebut} au {props.dateFin}.  
      </Typography>
      
      <Typography variant="body1" component="div" className="typewriter"  style={{ marginBottom: '20px', fontFamily: 'Times New Roman, serif' }}>
        Ce stage s'est achevé par la rédaction d'un rapport portant sur le thème : 
        <strong style={{textTransform:'uppercase'}}>« {props.theme} ».</strong>
      </Typography>
      <Typography variant="body1" component="div" style={{ marginBottom: '20px', fontFamily: 'Times New Roman, serif', textIndent:'2em' }}>
        La présente attestation est établie pour servir et valoir ce que de droit./-
      </Typography>
      <br/>
      </div>

      <Typography variant="body1" component="div" style={{textAlign:'center' , fontFamily: 'Times New Roman, serif',fontSize:'12px', marginTop:'40%' }}>
      <hr/>
      Institut National de la Statistique (INS)/National Institute of Statistics (NIS)<br/>
      Rusz 3025, Quartier du Lac. Yanunde Cameroun: RP. 134. Yaounde: Tel: (237) 222 22 04 45<br/>
      Fax: (237) 222 23 24 37; Site web http: www.ins-cameroun.cm, Email: info@ins-cameroun.cm       
      </Typography>
    </Paper>
  </div>
));

// Component to Print the Attestation
const AttestationPrinter = (props) => {
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  function formattedDate(date) {
    const [day, month, year] = date.split('/');
    const monthNames = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];
    const formattedMonth = monthNames[parseInt(month) - 1];
    return `${day} ${formattedMonth} ${year}`;
  }

  return (
    <Box style={{ position: 'relative', height: '73vh', backgroundColor: "rgba(0, 128, 0, 0.07)" }}>
      <AttestationLetter
        ref={componentRef}
        name={props.name}
        prenom={props.prenom}
        etablissement={props.etablissement}
        departement={props.departement}
        nomencadreur={props.nomencadreur}
        prenomencadreur={props.prenomencadreur}
        niveau={props.niveau}
        parcours={props.parcours}
        date={formattedDate(props.date)}
        dateDebut={formattedDate(props.dateDebut)}
        dateFin={formattedDate(props.dateFin)}
        theme={props.theme}
        division={props.division}
        sexe={props.sexe}
      />
      <Button
        variant="contained"
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          backgroundColor: '#d3d3d3',
          color: '#000',
          zIndex: 1000,
          height: '5%',
          width: '15%'
        }}
        onClick={handlePrint}
      >
        Imprimer l'attestation
      </Button>
      <style>
        {`
          @media print {
            @page { size: A4; margin: -10%; }
            body {
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }
          }
        `}
      </style>
    </Box>
  );
};

export default AttestationPrinter;