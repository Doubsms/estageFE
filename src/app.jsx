import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import Accueil from './pages/candidature/acceuil candidature/acceuilcandidature';
import FormulaireD from './pages/candidature/formulairecandidature/formulairecandidature';
import Admin from './pages/service stage acceuil/principal/principal';
import Traitement from './pages/service stage acceuil/demmande non traité/traitement';
import DemandeNT from './pages/service stage acceuil/demmande non traité/demandesNT';
import Test from './test/test';
import CarouselComponent from './pages/candidature/acceuil candidature/carrousel';
import Signin from './pages/service stage acceuil/signginsignup/SignInSide';
import SignUp from './pages/service stage acceuil/signginsignup/signup';
import Badge from './pages/service stage acceuil/Badge/index';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* Routes commentées */}
          {/* <Route path='' element={<Signin/>} /> */}
          {/* <Route path='' element={<SignUp/>} /> */}
          <Route path='/test' element={<Test />} />
          {/* <Route path='' element={<Admin/>} /> */}
          {/* <Route path='' element={<Traitement/>} /> */}
          {/* <Route path='' element={<DemandeNT/>} /> */}
          <Route path='/' element={<Accueil />} />
          <Route path='/signup' element={<SignUp />} />
          {/* <Route path='/signin' element={<Signin/>} /> */}
          <Route path='/admin' element={<Signin />} />
          <Route path='/carousel' element={<CarouselComponent />} />
          <Route path='/acceuil' element={<Accueil />} />
          <Route path='/formulaireD' element={<FormulaireD />} />
          <Route path='/adminpage' element={<Admin />} />
          <Route path='/traitement' element={<Traitement />} />
          <Route path='/demandent' element={<DemandeNT />} />
          <Route path='/badge' element={<Badge />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;