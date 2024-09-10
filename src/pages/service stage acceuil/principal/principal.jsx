import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { 
  FaBars, FaTimes, FaAngleDown, FaAngleUp, FaHome, FaChartLine, FaUserCircle, FaCog,
  FaFileAlt, FaFilePdf, FaHistory,
  FaChartBar,
  FaStarHalfAlt,
  FaChalkboardTeacher
} from 'react-icons/fa';
import PrintIcon from '@mui/icons-material/Print';
import ImgBas from './Capturebassidebar.jpg';
import { FaPencil } from 'react-icons/fa6';
import Accueil from '../dashboard/dashboard';
import Login from '../signginsignup/SignInSide';
import { useLocation } from 'react-router-dom';
import Demande1 from '../demmande non traité/demandesNT';
import Demande2 from '../stagiares actuels/stagiaresactules';
import Demande3 from '../demandes acceptées/demandeaccepte';
import Rapport1 from '../gestion rapport/nouveau_rapport';
import Rapport2 from '../gestion rapport/rapportSpeciaux';
import Rapport3 from '../gestion rapport/historique';
import Document1 from '../Badge/index';
import Document2 from '../Lettre acceptation/index';
import Document3 from '../attestation/index';
import Profil from '../profil/profil';
import './principal.css';
import { MailOutline, NewReleases } from '@mui/icons-material';
import {Badge} from '@mui/icons-material';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import Encadreur from '../encadreur/nouveauencadreur';

const Sidebar = () => {

  const location = useLocation();
  const { user } = location.state || {}; // Récupérer les données utilisateur

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [isDemandeOpen, setIsDemandeOpen] = useState(false);
    const [isReportsOpen, setIsReportsOpen] = useState(false);
    const [isEvaluationOpen, setIsEvaluationOpen] = useState(false);
    const [isActive,setIsActive] = useState('acceuil');
  
    useEffect(() => {

      const handleResize = () => {
        setIsMobile(window.innerWidth < 992);
      };
      window.addEventListener('resize', handleResize);
      handleResize();
      return () => window.removeEventListener('resize', handleResize);
    }, []);
  
    const toggleSidebar = () => {
      setIsSidebarOpen(!isSidebarOpen);
    };
  
    const toggleDemande = () => {
      setIsDemandeOpen(!isDemandeOpen);
    };
    const toggleReports = () => {
      setIsReportsOpen(!isReportsOpen);
    };
    const toggleEvaluation = () => {
      setIsEvaluationOpen(!isEvaluationOpen);
    };
  
    const handleOptionClick = (option) => {
      setIsActive(option);
      console.log(`Option clicked: ${option}`);
    };

  return (
    <div style={{ userSelect: 'none', WebkitUserSelect: 'none', MozUserSelect: 'none', msUserSelect: 'none', height:'100%', width:'100%' }}>
      {isMobile && (
        <button
          className="btn sidebar-toggle-btn position-fixed top-0 end-0 m-3"
          onClick={toggleSidebar}
        >
          {isSidebarOpen ? <FaTimes /> : <FaBars />}
        </button>
      )}
      <div style={{ display: "flex", flexDirection: "row", height: "15%"}}>
        <div style={{
          width: "21.7%", position: isMobile ? 'fixed' : 'static',
          left: isMobile ? (isSidebarOpen ? '0' : '-100%') : '0',
        }} className={`d-flex backgroundm flex-column p-3 bg-light sidebar ${isMobile ? (isSidebarOpen ? 'show' : '') : 'show'}`}>
        </div>
        <header className="text-white text-center background" style={{height:"200px"}}>
          <div style={{ backgroundColor: "rgba(3, 81, 3, 0.681)", height: "100%", display: "flex", flexDirection: "row" }}>
            <div>
              <h2 className="display-3">Institut National de la Statistique du Cameroun </h2>
              <h7>(Gestion de Stage)</h7>
            </div>
          </div>
        </header>
      </div>
      {/* contenu de la page */}
      <div style={{display:"flex", flexDirection:"row"}}>
      <div
        className={`d-flex flex-column  p-3 bg-light sidebar ${isMobile ? (isSidebarOpen ? 'show' : '') : 'show'}`}
        style={{
          width: '20.8%',
          height: '73vh',
          position: isMobile ? 'fixed' : 'static',
          left: isMobile ? (isSidebarOpen ? '0' : '-100%') : '0',
          transition: 'left 0.4s ease-in-out',
          zIndex: '1000',
          overflow: 'auto',
        }}
      >
        <div style={{ fontSize: "14px" }}>Selections</div>
        <hr/>
        <div style={{display:"flex", flexDirection:"row"}} className="ml-0 mb-3 hover">
          <a href="" className="d-flex align-items-center text-dark text-decoration-none" >
            < FaHome />
            <span onClick={() => handleOptionClick('acceuil')} className="ms-2">Accueil</span>
          </a>
        </div>
        <hr/>
        
        <div className="mb-3 " >
          <h6 className="d-flex justify-content-between align-items-center">
          <FaFileAlt />
            Reception des demandes
            <span onClick={toggleDemande}>
              {isDemandeOpen ? <FaAngleUp /> : <FaAngleDown />}
            </span>
          </h6>
          <div className="ms-3">
            {isDemandeOpen && (
              <div>
                <button onClick={() => handleOptionClick('Demande1')} class="btn-light hover option">Demandes non traitées</button>
                <hr/>
                <button onClick={() => handleOptionClick('Demande3')} class="btn-light hover option">Demandes acceptées</button>
                <hr/>
                <button onClick={() => handleOptionClick('Demande2')} class="btn-light hover option">Stagiaires actuels</button>
              </div>
            )}
          </div>
        </div>
        <hr />

        <div className="mb-3">
          <h6 className="d-flex justify-content-between align-items-center">
            <FaChartLine/>
             Gestion des Rapports
            <span onClick={toggleReports}>
              {isReportsOpen ? <FaAngleUp /> : <FaAngleDown />}
            </span>
          </h6>
          {isReportsOpen && (
            <div className="ms-3">
              <button onClick={() => handleOptionClick('Rapport1')} className="btn-light hover option">
                <FaFilePdf />
                <span className="ms-2">Nouveau rapport</span>
              </button>
              <hr/>
              <button onClick={() => handleOptionClick('Rapport2')}  className="btn-light hover option">
                <FaFileAlt />
                <span className="ms-2">Rapports spéciaux</span>
              </button>
              <hr/>
              <button onClick={() => handleOptionClick('Rapport3')}  className="btn-light hover option">
                <FaHistory />
                <span className="ms-2">Historique</span>
              </button>
            </div>
          )}
        </div>
        <hr />

        <div className="mb-3">
          <h6 className="d-flex justify-content-between align-items-center">
          <PrintIcon />
            Imprimer des fichiers
            <span onClick={toggleEvaluation}>
              {isEvaluationOpen ? <FaAngleUp /> : <FaAngleDown />}
            </span>
          </h6>
          {isEvaluationOpen && (
            <div className="ms-3">
              <button onClick={() => handleOptionClick('Document1')} className="btn-light hover option">
                <Badge />
                <span className="ms-2">Badge</span>
              </button>
              <hr/>
              <button onClick={() => handleOptionClick('Document2')} className="btn-light hover option">
                <MailOutline />
                <span className="ms-2">Lettre d'acceptation</span>
              </button>
              <hr/>
              <button onClick={() => handleOptionClick('Document3')} className="btn-light hover option">
                <WorkspacePremiumIcon />
                <span className="ms-2">Attestation</span>
              </button>
            </div>
          )}
        </div>
        <hr />       
        <div className="mb-3 hover">
          <a className="d-flex align-items-center text-dark text-decoration-none souris">
            <FaChalkboardTeacher />
            <span onClick={() => handleOptionClick('encadreur')} className="ms-2">Nouveau encadreur</span>
          </a>
        </div>         
        <hr />
        <div className="mb-3 hover">
          <a className="d-flex align-items-center text-dark text-decoration-none souris">
            <FaUserCircle />
            <span onClick={() => handleOptionClick('Profil')} className="ms-2">Profil</span>
          </a>
        </div>
        <hr />
        <img src={ImgBas} alt='contact INS'/>
        <hr />
      </div>
      {isMobile && isSidebarOpen && (
        <div
          className="d-flex justify-content-center align-items-center position-fixed top-0 start-0 w-100 h-100"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: '999' }}
          onClick={toggleSidebar}
        >
          {/* Contenu de la page principale à obscurcir */}
        </div>
      )}
      <div style={{ overflow:"auto",width:"80%", height:'73vh',  backgroundColor: 'rgba(0, 128, 0, 0.049)'}}>
         {isActive === 'acceuil' ? <Accueil/> : null}
         {isActive === 'Demande1' ? <Demande1 adminemail={user.email}/> : null}
         {isActive === 'Demande3' ? <Demande3/> : null}
         {isActive === 'Demande2' ? <Demande2/> : null}
         {isActive === 'Rapport1' ? <Rapport1/> : null}
         {isActive === 'Rapport2' ? <Rapport2/> : null}
         {isActive === 'Rapport3' ? <Rapport3/> : null}
         {isActive === 'Document1' ? <Document1/> : null}
         {isActive === 'Document2' ? <Document2/> : null}
         {isActive === 'Document3' ? <Document3/> : null}
         {isActive === 'encadreur' ? <Encadreur/> : null}
         {isActive === 'Profil' ? <Profil email={user.email} name={user.name}/> : null} 
        </div>
      </div>
    </div>
  );
};


export default Sidebar;