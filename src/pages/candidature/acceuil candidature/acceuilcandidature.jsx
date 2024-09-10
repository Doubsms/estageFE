import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import CarouselComponent from './carrousel'; // Assurez-vous que le chemin est correct
import Actualites from '../../../components/Actualites/actualites';
import Footer from '../../../components/Footer/footer';
import imageEntete from './batiment_INS.jpeg';
import Activite1 from './activite1.jpeg';
import Activite2 from './activite2.jpeg';
import Activite3 from './activite3.jpeg';
import OffresStage from './StageOffers';
import Dossier from './HowToApply';
import Contact from './ContactUs';
import './acceuil.css';

const ScrollToBottom = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.pageYOffset +
        document.documentElement.clientHeight >=
        document.documentElement.scrollHeight
      ) {
        setShowButton(false);
      } else {
        setShowButton(true);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth'
    });
  };

  return (
    <div
      className={` ${
        showButton ? 'visible animate__animated animate__bounce animate__infinite' : ''
      }`}
      onClick={scrollToBottom}
      aria-label="Scroll to bottom"
    >
      <i className="bi bi-chevron-down"></i>
    </div>
  );
};

// Premier composant
function FirstComponent() {
  const navigate=useNavigate();
  return (
    <div style={{ display: "flex", flexDirection: "row", height: "100vh"}} >
    <div  className="d-flex flex-column flex-grow-1 overflow-auto" >
        <header style={{height:"100%"}}  className=" text-white text-center  background">
          
          <div style={{backgroundColor:"rgba(3, 81, 3, 0.681)", height:"100%", zIndex:"100"}}>
            <br/>
            <br/>
            <br/>
            <h1 className="display-3">Institut National de la Statistique du Cameroun</h1>
            <h2>(service de stage)</h2>
            <p className="lead">Trouvez votre stage idéal et postulez en ligne.</p>
            <ScrollToBottom />
          </div>
          
        </header>

        <section className="py-5">
        <div className="container">
          <div className="row text-center mb-4">
            <div className="col">
              <h2 className="display-4">Pourquoi choisir notre institut ?</h2>
              <p className="lead">
                Nous offrons des opportunités uniques de stage dans le domaine de la statistique.
                Rejoignez-nous pour une expérience enrichissante et professionnelle.
              </p>
            </div>
          </div>
          <div className="row text-center mb-4">
            <div className="col">
              <h2 className="display-4">Connaitre nos structures...</h2>
              <p className="lead">
                <a href='https://ins-cameroun.cm/company-overview/organisation/'>cliquez ici pour connaitre nos structures</a>
              </p>
            </div>
          </div>
          <div className="row text-center mb-4">
            <div className="col">
              <p className="lead">
                Découvrez les installations et les environnements de travail de notre institut.
              </p>
            </div>
          </div>
          <CarouselComponent />
        </div>
      </section>

      <section className="py-5">
        <div className="container">
          
          <div className="row justify-content-center mb-4">
            <div className="display-4 mb-4">
              Vous recherchez un stage ? 
            </div>
            <OffresStage/>
          </div>
        </div>
      </section>

      <section className="py-5 mt--4">
        <div className="container">
          <div className="row text-center mb-4">
            <div className="col">
              <h2 className="display-4 mb-3">Composition de dossier</h2>
              <Dossier/>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-light py-5">
        <div className="container text-center">
          <h3>Prêt à commencer votre carrière ?</h3>
          <p className="lead">
            Déposez votre candidature dès aujourd'hui et rejoignez notre institut prestigieux.
          </p>
          <a onClick={()=>navigate('/formulaireD')} className="btn btn-success btn-lg">
            Déposer ma candidature
          </a>
        </div>
      </section>

      <section className="py-5">
        <div className="container">
          <div className="row text-center mb-4">
            <div className="col">
              <h2 className="display-4">Découvrez nos activités</h2>
              <p className="lead">
                Explorez les différentes activités et événements organisés par notre institut.
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4 mb-4">
              <div className="card">
                <img src={Activite1} className="card-img-top" alt="Stage en analyse de données" />
                <div className="card-body">
                  <h5 className="card-title">Analyse de données</h5>
                  <p className="card-text">Participez à des projets d'analyse de données réels et développez vos compétences professionnelles.</p>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card">
                <img src={Activite2} className="card-img-top" alt="Stage en statistiques appliquées" />
                <div className="card-body">
                  <h5 className="card-title">Statistiques appliquées</h5>
                  <p className="card-text">Travaillez sur des études statistiques avec des experts et contribuez à des recherches significatives.</p>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card">
                <img src={Activite3} className="card-img-top" alt="Stage en gestion de projets" />
                <div className="card-body">
                  <h5 className="card-title">Gestion de projets</h5>
                  <p className="card-text">Développez vos compétences en gestion de projets avec des opportunités d'apprentissage pratique.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <h2 className="display-4">Contactez nous</h2>
      <Contact/>
    </div>
  </div>
  );
}

// Deuxième composant
function SecondComponent() {
  return (
    <div style={{ width: "30vw"}} className="second-component">
        <Actualites />
    </div>
  );
}

// Page principale
function MainPage() {
  return (
    <div>
      <div style={{display:"flex", flexDirection:"row"}}>
        <FirstComponent />
        <SecondComponent />
      </div>
      <div>
        <Footer/>
      </div>
    </div>
  );
}

// Styles CSS avec media queries
const styles = `
  .second-component {
    display: block;
  }

  @media (max-width: 768px) {
    .second-component {
      display: none;
    }
  }
`;
// export default FirstComponent;

export default function App() {
  return (
    <div>
      <style>{styles}</style>
      <MainPage />
    </div>
  );
}