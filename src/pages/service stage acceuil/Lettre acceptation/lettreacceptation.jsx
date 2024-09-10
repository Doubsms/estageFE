import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { Box, Typography, Paper, Button } from '@mui/material';
import Logo from './logo.png'; // Assuming this is the institute's logo
import './lettreAcceptation.css';

// Component for the Acceptance Letter
const AcceptanceLetter = React.forwardRef((props, ref) => (

  // const formattedDate = new Date(date).toLocaleDateString();

<div style={{height:"77vh", overflow: 'auto', marginTop:"-65px"}}>
  <Paper
    ref={ref}
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
      _____________/INS/DG/DAF/SDRH/SFO/ydt
    </Typography>

    <Typography variant="h4" component="div" style={{ marginBottom: '5px', fontFamily: 'Edwardian Script ITC', fontSize:"35px" }}>
      Le Directeur Général
    </Typography>

    <Typography variant="body1" component="div" style={{ marginBottom: '20px',textAlign:'end' ,fontFamily: 'Times New Roman, serif' }}>
      <strong>A {props.sexe==='M'? 'Monsieur' : 'Madame'} {props.name} {props.prenom}</strong> <br />
     <div style={{fontStyle:'italic',textAlign:''}}>{props.sexe==='M'? 'étudiant' : 'étudiante'}, niveau {props.niveau}, cycle {props.parcours} </div>
     <div style={{fontStyle:'italic'}}>filière {props.filiere}</div>
     <div style={{fontStyle:'italic'}}>{props.etablissement}</div>
     <div style={{fontStyle:'italic'}}>Tel : {props.tel}</div>
    </Typography>

    <Typography variant="body1" component="div" style={{ marginBottom: '20px', fontFamily: 'Times New Roman, serif' }}>
      <strong style={{textDecoration:'underline',}} >Réf </strong>:V/L du {props.date}
    </Typography>

    <Typography variant="body1" component="div" style={{ marginBottom: '20px', fontFamily: 'Times New Roman, serif' }}>
      <strong style={{textDecoration:'underline',}} >Objet </strong><strong>: Votre demande de stage accadémique</strong>
    </Typography>

    <Typography variant="body1" component="div" className="typewriter" style={{ marginBottom: '5px', fontFamily: 'Times New Roman, serif', textIndent:'2em' }}>
      <strong>{props.sexe==='M'? 'Monsieur' : 'Madame'},</strong>
    </Typography>

    <Typography variant="body1" component="div" className="typewriter" style={{ marginBottom: '5px', fontFamily: 'Times New Roman, serif', textIndent:'2em' }}>
      En reponse à votre correspondance citée en référence, relative à l'objet susvisé,
    </Typography>

    <Typography variant="body1" component="div" className="typewriter" style={{ marginBottom: '5px', fontFamily: 'Times New Roman, serif', textIndent:'2em' }}>
      J'ai l'honneur de vous faire connaître qu'une suite favorable a été réservée à votre sollicitation pour la période allant du {props.dateDebut} au {props.dateFin} Département de I'Informatique. Division des Traitements et des Systèmes d'Information Géographique.    
    </Typography>

    <Typography variant="body1" component="div" className="typewriter" style={{ marginBottom: '5px', fontFamily: 'Times New Roman, serif', textIndent:'2em' }}>
      Pour y faire suite, ce stage ne donne droit à aucune rémunération et la délivrance d'attestation de fin de stage sera subordonnée à la production d'un projet d'insertion professionnelle.    </Typography>

    <Typography variant="body1" component="div" className="typewriter" style={{ marginBottom: '5px', fontFamily: 'Times New Roman, serif', textIndent:'2em' }}>
      Vous voudrez prendre attache avec le Service de la Formation (étage 6, porte 608) pour les modalités pratiques du dit stage.    </Typography>

    <Typography variant="body1" component="div" className="typewriter" style={{ marginTop: '5px', fontFamily: 'Times New Roman, serif', textIndent:'2em' }}>
    Veuillez agréer, Monsieur, l'assurance de ma parfaite considération. /-
    </Typography>
    <br/>
    <Typography variant="body1" component="div" style={{ fontFamily: 'Times New Roman, serif' }}>
      <strong style={{textDecoration:'underline'}}>Ampliation</strong><br />
      <div style={{fontSize:'12px', marginLeft:'3%'}}>
       -  INS/DIN/DACEA;<br/>
       -  INSIDAFISDRH/SFD<br/>
       -  Interéssé <br/>
       -  Archives/chronos
      </div>
    </Typography>
    <br/>
    <br/>
    <br/>
    <Typography variant="body1" component="div" style={{textAlign:'center' , fontFamily: 'Times New Roman, serif',fontSize:'12px' }}>
      <hr/>
      Institut National de la Statistique (INS)/National Institute of Statistics (NIS)<br/>
      Rusz 3025, Quartier du Lac. Yanunde Cameroun: RP. 134. Yaounde: Tel: (237) 222 22 04 45<br/>
      Fax: (237) 222 23 24 37; Site web http: www.inw-cameroun.cm, Email: info@ins-cameroun.cm       
    </Typography>
  </Paper>
  </div>
));

// Component to Print the Acceptance Letter
const LetterPrinter = (props) => {
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

 
  function formattedDate(date) {
    // Vérifier le format de la date
   if (typeof date === 'string' && date.includes('/')) {
      // Format "JJ/MM/AAAA"
      const [day, month, year] = date.split('/');
      const monthNames = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];
      const formattedMonth = monthNames[parseInt(month) - 1];
      return `${day} ${formattedMonth} ${year}`;
    } else {
      // Utiliser toLocaleDateString pour les autres formats
      const formattedDate = new Date(date).toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
      return formattedDate;
    }
  }
  

  return (
    <Box style={{ position: 'relative', height: '73vh' , backgroundColor:"rgba(0, 128, 0, 0.07)"}}>
      <AcceptanceLetter
        ref={componentRef}
        name={props.name}
        prenom={props.prenom}
        etablissement={props.etablissement}
        departement={props.departement}
        nomencadreur={props.nomencadreur}
        prenomencadreur={props.prenomencadreur}
        niveau={props.niveau}
        filiere={props.filiere}
        parcours={props.parcours}
        tel={props.tel}
        sexe={props.sexe}
        date={formattedDate(props.date)}
        dateDebut={formattedDate(props.dateDebut)}
        dateFin={formattedDate(props.dateFin)}
      />
      <Button
        variant="contained"
        style={{
          position: 'fixed', // Fixed positioning to float above content
          bottom: '20px',
          height: '5%',
          width: '15%',
          right: '20px',
          backgroundColor: '#d3d3d3', // Light gray background color
          color: '#000', // Black text color
          zIndex: 1000 // Ensure button is above all other content
        }}
        onClick={handlePrint}
      >
        Click here to Print
      </Button>
      <style>
        {`
          @media print {
            @page { size: A4; margin: -10%; } /* Remove all margins for printing */
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

export default LetterPrinter;
