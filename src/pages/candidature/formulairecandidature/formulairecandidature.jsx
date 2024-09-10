import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserGraduate, FaBuilding, FaCity, FaCalendarAlt, FaEnvelope, FaFileUpload } from 'react-icons/fa';
import './formulaire.css';
import Footer from '../../../components/Footer/footer'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const MyComponent = () => {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div>
      {isDesktop ? <DesktopComponent /> : <MobileComponent />}
    </div>
  );
};

const DesktopComponent = () => {
  const [formData, setFormData] = useState({
    MATRICULEETUDIANT: '',
    NOMETUDIANT: '',
    PRENOMETUDIANT: '',
    ETABLISSEMENT: '',
    VILLERESIDENCE: '',
    PARCOURS: '',
    NIVEAU: '',
    EMAIL: '',
    DATEDEBUTDESEANCE: '',
    DATEFINDESEANCE: '',
    CNI: [],
    CERTIFICAT: [],
    LETTREMOTIVATION: [],
    LETTRERECOMMENDATION: [],
    PHOTOPROFIL: [],
    TEL: '',
    FILIERE: '',
    SEXE: '',
  });

  const handleInputChange = (e) => {
    const { name, value, files, id } = e.target;
    if (files) {
      // Mettre à jour le texte du label pour afficher le nom du fichier
      const fileName = files[0] ? files[0].name : '';
      const label = document.querySelector(`label[htmlFor="${id}"]`);
      if (label) {
        label.textContent = fileName || 'Choisir le fichier';
      }
      // Mettre à jour l'état avec les fichiers sélectionnés
      setFormData({
        ...formData,
        [name]: Array.from(files),
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };
  

  const sendStudentData = async () => {
    const response = await fetch('http://localhost:4000/etudiants', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        MATRICULEETUDIANT: formData.MATRICULEETUDIANT,
        NOMETUDIANT: formData.NOMETUDIANT,
        PRENOMETUDIANT: formData.PRENOMETUDIANT,
        ETABLISSEMENT: formData.ETABLISSEMENT,
        VILLERESIDENCE: formData.VILLERESIDENCE,
        PARCOURS: formData.PARCOURS,
        NIVEAU: formData.NIVEAU,
        EMAIL: formData.EMAIL,
        TEL: formData.TEL,
        FILIERE: formData.FILIERE,
        SEXE: formData.SEXE,
      }),
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la création de l\'étudiant');
    }

    const data = await response.json();
    console.log('Étudiant créé avec succès:', data);
    return data;
  };

  const sendFilesAndData = async () => {
    const formDataToSend = new FormData();
    formDataToSend.append('MATRICULEETUDIANT', formData.MATRICULEETUDIANT);
    formDataToSend.append('DATEDEBUTDESEANCE', formData.DATEDEBUTDESEANCE);
    formDataToSend.append('DATEFINDESEANCE', formData.DATEFINDESEANCE);

    // Ajouter les fichiers au formData
    if (formData.CNI.length > 0) {
      formDataToSend.append('CNI', formData.CNI[0]);
    }
    if (formData.CERTIFICAT.length > 0) {
      formDataToSend.append('CERTIFICAT', formData.CERTIFICAT[0]);
    }
    if (formData.LETTREMOTIVATION.length > 0) {
      formDataToSend.append('LETTREMOTIVATION', formData.LETTREMOTIVATION[0]);
    }
    if (formData.LETTRERECOMMENDATION.length > 0) {
      formDataToSend.append('LETTRERECOMMENDATION', formData.LETTRERECOMMENDATION[0]);
    }
    if (formData.PHOTOPROFIL.length > 0) {
      formDataToSend.append('PHOTOPROFIL', formData.PHOTOPROFIL[0]);
    }

    
    try {
      const response = await fetch('http://localhost:4000/dossiers', {
        method: 'POST',
        body: formDataToSend,
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Erreur lors de la création du dossier: ${errorData.error}`);
      }
  
      const data = await response.json();
      console.log('Dossier créé avec succès:', data);
      return data;
    } catch (error) {
      console.error('Erreur:', error.message);
      alert(`Erreur lors de la création du dossier: ${error.message}`);
      throw error;
    }
  };

  const navigate=useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Envoyer les données de l'étudiant
      await sendStudentData();
      
      // Envoyer les fichiers et les champs spécifiques
      await sendFilesAndData();
      
      // Gestion de la réponse réussie
      toast.success('Demande soumise avec succès!\n veuillez patienter un instant', {
        onClose: () => {
          navigate('/acceuil');
        },
      });
      
    } catch (error) {
      console.error('Erreur:', error);
      toast.error('Erreur lors du depot de la demande');

    }
  };
    return (
      <div style={{height:"100vh", width:"100vw"}} className="backgroundf">    
       <div className="overlay" style={{display:"flex", justifyContent:"center", alignItems:"center"}}> 
       <ToastContainer />
        <div className="container shadow-sm bg-white " style={{display:"flex", flexDirection:"row", width:"90%",borderRadius:"14px"}}>
        <div style={{ width:"35%", borderEndEndRadius:"60px", marginLeft:"-12px",  borderTopLeftRadius:"13px", borderBottomLeftRadius:"13px"}} >
        <div className="backgroundv" style={{width:"100%", height:"100%", display:"flex", justifyContent:"center", alignItems:"center", borderEndEndRadius:"60px"}}>
        <div style={{display:"flex", flexDirection:"column",  justifyContent:"center", alignItems:"center", color:"white", backgroundColor:"rgba(3, 81, 3, 0.681)", width:"100%", height:"100%", borderEndEndRadius:"60px"}}>
          <h1>INS</h1> 
          <h5>une autre vision du monde </h5>
          <h5>professionnel</h5>
        </div>
        </div>
        </div>
        <div className="card border-0 " style={{borderTopLeftRadius:"60px"}}>
          <div class="ml-4" >
            <form id="student-and-folder-form" onSubmit={handleSubmit} encType="multipart/form-data">
              <div className="row">
              <h3 className="mt-4 font-weight-bold">Informations de l'étudiant <FaUserGraduate className="ml-2 text-success" /></h3>
                <div className="col-md-4">
                  <div className="form-group">
                    <label htmlFor="matricule" className="font-weight-bold ">Matricule/ student ID</label>
                    <input
                      type="text"
                      className="form-control border-success"
                      id="matricule"
                      name="MATRICULEETUDIANT"
                      value={formData.MATRICULEETUDIANT}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="nom" className="font-weight-bold">Nom/ Lastname</label>
                    <input
                    label="Nom"
                      type="text"
                      className="form-control border-success"
                      id="nom"
                      name="NOMETUDIANT"
                      value={formData.NOMETUDIANT}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="prenom" className="font-weight-bold ">Prénom/ Firstname</label>
                    <input
                      type="text"
                      className="form-control border-success"
                      id="prenom"
                      name="PRENOMETUDIANT"
                      value={formData.PRENOMETUDIANT}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="etablissement" className="font-weight-bold ">Établissement/ School <FaBuilding className="ml-2 text-success" /></label>
                    <input
                      type="text"
                      className="form-control border-success"
                      id="etablissement"
                      name="ETABLISSEMENT"
                      value={formData.ETABLISSEMENT}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="ville" className="font-weight-bold ">Ville de résidence/ city of residence <FaCity className="ml-2 text-success" /></label>
                    <input
                      type="text"
                      className="form-control border-success"
                      id="ville"
                      name="VILLERESIDENCE"
                      value={formData.VILLERESIDENCE}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="sexe" className="font-weight-bold">Sexe</label>
                    <select
                      className="form-control border-success"
                      id="sexe"
                      name="SEXE"
                      value={formData.SEXE}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="M">M</option>
                      <option value="F">F</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="files3" className="font-weight-bold">Photo 4X4/ Passport photo<FaFileUpload className="ml-2 text-success" /></label>
                    <div className="custom-file">
                      <input
                        type="file"
                        className="custom-file-input border-success"
                        id="photoprofil"
                        name="PHOTOPROFIL"
                        onChange={(e) => {
                          handleInputChange(e);
                          const fileName = e.target.files[0].name;
                          e.target.nextElementSibling.textContent = fileName;
                        }}
                        required
                      />
                      <label className="custom-file-label " htmlFor="files">Choisir la photo/choose picture</label>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <label htmlFor="parcours" className="font-weight-bold ">Parcours/ academic path</label>
                    <input
                      type="text"
                      className="form-control border-success"
                      id="parcours"
                      name="PARCOURS"
                      value={formData.PARCOURS}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="niveau" className="font-weight-bold ">Niveau/ Level</label>
                    <input
                       label="niveau"
                      type="text"
                      className="form-control border-success"
                      id="niveau"
                      name="NIVEAU"
                      value={formData.NIVEAU}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email" className="font-weight-bold ">Adresse mail/ email address. <FaEnvelope className="ml-2 text-success" /></label>
                    <input
                      type="email"
                      className="form-control border-success"
                      id="email"
                      name="EMAIL"
                      value={formData.EMAIL}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="start-date" className="font-weight-bold">Date de début de stage/ starting date <FaCalendarAlt className="ml-2 text-success" /></label>
                    <input
                      type="date"
                      className="form-control border-success"
                      id="start-date"
                      name="DATEDEBUTDESEANCE"
                      value={formData.DATEDEBUTDESEANCE}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="end-date" className="font-weight-bold ">Date de fin de stage/ ending date <FaCalendarAlt className="ml-2 text-success" /></label>
                    <input
                      type="date"
                      className="form-control border-success"
                      id="end-date"
                      name="DATEFINDESEANCE"
                      value={formData.DATEFINDESEANCE}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="filiere" className="font-weight-bold ">Filière/Pathway</label>
                    <input
                       label="filiere"
                      type="text"
                      className="form-control border-success"
                      id="filiere"
                      name="FILIERE"
                      value={formData.FILIERE}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="TEL" className="font-weight-bold ">Tel :</label>
                    <input
                       label="tel"
                      type="text"
                      className="form-control border-success"
                      id="tel"
                      name="TEL"
                      value={formData.TEL}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <h4 className="mt-4 font-weight-bold">Fichiers à téléverser/ files to upload </h4>
                  
                  <div className="form-group">
                    <label htmlFor="files1" className="font-weight-bold ">Certificat de scolarité/ school attendance certificate <FaFileUpload className="ml-2 text-success" /></label>
                    <div className="custom-file">
                      <input
                        type="file"
                        className="custom-file-input border-success"
                        id="certificat"
                        name="CERTIFICAT"
                        onChange={(e) => {
                          handleInputChange(e);
                          const fileName = e.target.files[0].name;
                          e.target.nextElementSibling.textContent = fileName;
                        }}
                        required
                      />
                      <label className="custom-file-label " htmlFor="files">Choisir le fichier/ select the file</label>
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="files2" className="font-weight-bold">Lettre de motivation/ cover letter<FaFileUpload className="ml-2 text-success" /></label>
                    <div className="custom-file">
                      <input
                        type="file"
                        className="custom-file-input border-success"
                        id="lettremotivation"
                        name="LETTREMOTIVATION"
                        onChange={(e) => {
                          handleInputChange(e);
                          const fileName = e.target.files[0].name;
                          e.target.nextElementSibling.textContent = fileName;
                        }}
                        required
                      />
                      <label className="custom-file-label" htmlFor="files">Choisir le fichier/ select file</label>
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="files3" className="font-weight-bold">CNI/ national identity card<FaFileUpload className="ml-2 text-success" /></label>
                    <div className="custom-file">
                      <input
                        type="file"
                        className="custom-file-input border-success"
                        id="cni"
                        name="CNI"
                        onChange={(e) => {
                          handleInputChange(e);
                          const fileName = e.target.files[0].name;
                          e.target.nextElementSibling.textContent = fileName;
                        }}
                        required
                      />
                      <label className="custom-file-label " htmlFor="files">Choisir le fichier/ select file</label>
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="files4" className="font-weight-bold "> Lettre de recommandation/ recommendation letter <FaFileUpload className="ml-2 text-success" /></label>
                    <div className="custom-file">
                      <input
                        type="file"
                        className="custom-file-input border-success"
                        id="lettrerecommendation"
                        name="LETTRERECOMMENDATION"
                        onChange={(e) => {
                          handleInputChange(e);
                          const fileName = e.target.files[0].name;
                          e.target.nextElementSibling.textContent = fileName;
                        }}
                        required
                      />
                      <label className="custom-file-label " htmlFor="files">Choisir le fichier/ select file</label>
                    </div>
                  </div>
                 
                  </div>
              </div>
              <button type="submit" className="btn btn-success btn-block mb-3 w-60">
                Soumettre ma demmande/ submit my application
              </button>
            </form>
          </div>
        </div>
      </div>
      </div>
      <Footer/>
      </div>
    );
};

const MobileComponent = () => {
  const [formData, setFormData] = useState({
    MATRICULEETUDIANT: '',
    NOMETUDIANT: '',
    PRENOMETUDIANT: '',
    ETABLISSEMENT: '',
    VILLERESIDENCE: '',
    PARCOURS: '',
    NIVEAU: '',
    EMAIL: '',
    DATEDEBUTDESEANCE: '',
    DATEFINDESEANCE: '',
    CNI: [],
    CERTIFICAT: [],
    LETTREMOTIVATION: [],
    LETTRERECOMMENDATION: [],
    PHOTOPROFIL: [],
    TEL: '',
    FILIERE: '',
    SEXE: '',
  });

  const handleInputChange = (e) => {
    const { name, value, files, id } = e.target;
    if (files) {
      // Mettre à jour le texte du label pour afficher le nom du fichier
      const fileName = files[0] ? files[0].name : '';
      const label = document.querySelector(`label[htmlFor="${id}"]`);
      if (label) {
        label.textContent = fileName || 'Choisir le fichier';
      }
      // Mettre à jour l'état avec les fichiers sélectionnés
      setFormData({
        ...formData,
        [name]: Array.from(files),
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };
  

  const sendStudentData = async () => {
    const response = await fetch('http://localhost:4000/etudiants', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        MATRICULEETUDIANT: formData.MATRICULEETUDIANT,
        NOMETUDIANT: formData.NOMETUDIANT,
        PRENOMETUDIANT: formData.PRENOMETUDIANT,
        ETABLISSEMENT: formData.ETABLISSEMENT,
        VILLERESIDENCE: formData.VILLERESIDENCE,
        PARCOURS: formData.PARCOURS,
        NIVEAU: formData.NIVEAU,
        EMAIL: formData.EMAIL,
        TEL: formData.TEL,
        FILIERE: formData.FILIERE,
        SEXE: formData.SEXE,
      }),
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la création de l\'étudiant');
    }

    const data = await response.json();
    console.log('Étudiant créé avec succès:', data);
    return data;
  };

  const sendFilesAndData = async () => {
    const formDataToSend = new FormData();
    formDataToSend.append('MATRICULEETUDIANT', formData.MATRICULEETUDIANT);
    formDataToSend.append('DATEDEBUTDESEANCE', formData.DATEDEBUTDESEANCE);
    formDataToSend.append('DATEFINDESEANCE', formData.DATEFINDESEANCE);

    // Ajouter les fichiers au formData
    if (formData.CNI.length > 0) {
      formDataToSend.append('CNI', formData.CNI[0]);
    }
    if (formData.CERTIFICAT.length > 0) {
      formDataToSend.append('CERTIFICAT', formData.CERTIFICAT[0]);
    }
    if (formData.LETTREMOTIVATION.length > 0) {
      formDataToSend.append('LETTREMOTIVATION', formData.LETTREMOTIVATION[0]);
    }
    if (formData.LETTRERECOMMENDATION.length > 0) {
      formDataToSend.append('LETTRERECOMMENDATION', formData.LETTRERECOMMENDATION[0]);
    }
    if (formData.PHOTOPROFIL.length > 0) {
      formDataToSend.append('PHOTOPROFIL', formData.PHOTOPROFIL[0]);
    }

    
    try {
      const response = await fetch('http://localhost:4000/dossiers', {
        method: 'POST',
        body: formDataToSend,
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Erreur lors de la création du dossier: ${errorData.error}`);
      }
  
      const data = await response.json();
      console.log('Dossier créé avec succès:', data);
      return data;
    } catch (error) {
      console.error('Erreur:', error.message);
      alert(`Erreur lors de la création du dossier: ${error.message}`);
      throw error;
    }
  };

  const navigate=useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Envoyer les données de l'étudiant
      await sendStudentData();
      
      // Envoyer les fichiers et les champs spécifiques
      await sendFilesAndData();
      
      // Gestion de la réponse réussie
      toast.success('Demande soumise avec succès!\n veuillez patienter un instant', {
        onClose: () => {
          navigate('/acceuil');
        },
      });
      
    } catch (error) {
      console.error('Erreur:', error);
      toast.error('Erreur lors du depot de la demande');

    }
  };
  return (
    <div className="container my-5">
      <div className="card border-0 shadow-sm">
      <ToastContainer />
        <div className="card-header bg-success text-white">
          <h3 className="mb-0 text-center">Veuillez remplir le formulaire pour soumettre votre candidature</h3>
        </div>
        <div class="ml-4" >
        <form id="student-and-folder-form" onSubmit={handleSubmit} encType="multipart/form-data">
              <div className="row">
              <h3 className="mt-4 font-weight-bold">Informations de l'étudiant <FaUserGraduate className="ml-2 text-success" /></h3>
                <div className="col-md-4">
                  <div className="form-group">
                    <label htmlFor="matricule" className="font-weight-bold ">Matricule/ student ID</label>
                    <input
                      type="text"
                      className="form-control border-success"
                      id="matricule"
                      name="MATRICULEETUDIANT"
                      value={formData.MATRICULEETUDIANT}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="nom" className="font-weight-bold">Nom/ Lastname</label>
                    <input
                    label="Nom"
                      type="text"
                      className="form-control border-success"
                      id="nom"
                      name="NOMETUDIANT"
                      value={formData.NOMETUDIANT}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="prenom" className="font-weight-bold ">Prénom/ Firstname</label>
                    <input
                      type="text"
                      className="form-control border-success"
                      id="prenom"
                      name="PRENOMETUDIANT"
                      value={formData.PRENOMETUDIANT}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="etablissement" className="font-weight-bold ">Établissement/ School <FaBuilding className="ml-2 text-success" /></label>
                    <input
                      type="text"
                      className="form-control border-success"
                      id="etablissement"
                      name="ETABLISSEMENT"
                      value={formData.ETABLISSEMENT}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="ville" className="font-weight-bold ">Ville de résidence/ city of residence <FaCity className="ml-2 text-success" /></label>
                    <input
                      type="text"
                      className="form-control border-success"
                      id="ville"
                      name="VILLERESIDENCE"
                      value={formData.VILLERESIDENCE}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="sexe" className="font-weight-bold">Sexe</label>
                    <select
                      className="form-control border-success"
                      id="sexe"
                      name="SEXE"
                      value={formData.SEXE}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="M">M</option>
                      <option value="F">F</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="files3" className="font-weight-bold">Photo 4X4/ Passport photo<FaFileUpload className="ml-2 text-success" /></label>
                    <div className="custom-file">
                      <input
                        type="file"
                        className="custom-file-input border-success"
                        id="photoprofil"
                        name="PHOTOPROFIL"
                        onChange={(e) => {
                          handleInputChange(e);
                          const fileName = e.target.files[0].name;
                          e.target.nextElementSibling.textContent = fileName;
                        }}
                        required
                      />
                      <label className="custom-file-label " htmlFor="files">Choisir la photo/choose picture</label>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <label htmlFor="parcours" className="font-weight-bold ">Parcours/ academic path</label>
                    <input
                      type="text"
                      className="form-control border-success"
                      id="parcours"
                      name="PARCOURS"
                      value={formData.PARCOURS}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="niveau" className="font-weight-bold ">Niveau/ Level</label>
                    <input
                       label="niveau"
                      type="text"
                      className="form-control border-success"
                      id="niveau"
                      name="NIVEAU"
                      value={formData.NIVEAU}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email" className="font-weight-bold ">Adresse mail/ email address. <FaEnvelope className="ml-2 text-success" /></label>
                    <input
                      type="email"
                      className="form-control border-success"
                      id="email"
                      name="EMAIL"
                      value={formData.EMAIL}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="start-date" className="font-weight-bold">Date de début de stage/ starting date <FaCalendarAlt className="ml-2 text-success" /></label>
                    <input
                      type="date"
                      className="form-control border-success"
                      id="start-date"
                      name="DATEDEBUTDESEANCE"
                      value={formData.DATEDEBUTDESEANCE}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="end-date" className="font-weight-bold ">Date de fin de stage/ ending date <FaCalendarAlt className="ml-2 text-success" /></label>
                    <input
                      type="date"
                      className="form-control border-success"
                      id="end-date"
                      name="DATEFINDESEANCE"
                      value={formData.DATEFINDESEANCE}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="filiere" className="font-weight-bold ">Filière/Pathway</label>
                    <input
                       label="filiere"
                      type="text"
                      className="form-control border-success"
                      id="filiere"
                      name="FILIERE"
                      value={formData.FILIERE}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="TEL" className="font-weight-bold ">Tel :</label>
                    <input
                       label="tel"
                      type="text"
                      className="form-control border-success"
                      id="tel"
                      name="TEL"
                      value={formData.TEL}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <h4 className="mt-4 font-weight-bold">Fichiers à téléverser/ files to upload </h4>
                  
                  <div className="form-group">
                    <label htmlFor="files1" className="font-weight-bold ">Certificat de scolarité/ school attendance certificate <FaFileUpload className="ml-2 text-success" /></label>
                    <div className="custom-file">
                      <input
                        type="file"
                        className="custom-file-input border-success"
                        id="certificat"
                        name="CERTIFICAT"
                        onChange={(e) => {
                          handleInputChange(e);
                          const fileName = e.target.files[0].name;
                          e.target.nextElementSibling.textContent = fileName;
                        }}
                        required
                      />
                      <label className="custom-file-label " htmlFor="files">Choisir le fichier/ select the file</label>
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="files2" className="font-weight-bold">Lettre de motivation/ cover letter<FaFileUpload className="ml-2 text-success" /></label>
                    <div className="custom-file">
                      <input
                        type="file"
                        className="custom-file-input border-success"
                        id="lettremotivation"
                        name="LETTREMOTIVATION"
                        onChange={(e) => {
                          handleInputChange(e);
                          const fileName = e.target.files[0].name;
                          e.target.nextElementSibling.textContent = fileName;
                        }}
                        required
                      />
                      <label className="custom-file-label" htmlFor="files">Choisir le fichier/ select file</label>
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="files3" className="font-weight-bold">CNI/ national identity card<FaFileUpload className="ml-2 text-success" /></label>
                    <div className="custom-file">
                      <input
                        type="file"
                        className="custom-file-input border-success"
                        id="cni"
                        name="CNI"
                        onChange={(e) => {
                          handleInputChange(e);
                          const fileName = e.target.files[0].name;
                          e.target.nextElementSibling.textContent = fileName;
                        }}
                        required
                      />
                      <label className="custom-file-label " htmlFor="files">Choisir le fichier/ select file</label>
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="files4" className="font-weight-bold "> Lettre de recommandation/ recommendation letter <FaFileUpload className="ml-2 text-success" /></label>
                    <div className="custom-file">
                      <input
                        type="file"
                        className="custom-file-input border-success"
                        id="lettrerecommendation"
                        name="LETTRERECOMMENDATION"
                        onChange={(e) => {
                          handleInputChange(e);
                          const fileName = e.target.files[0].name;
                          e.target.nextElementSibling.textContent = fileName;
                        }}
                        required
                      />
                      <label className="custom-file-label " htmlFor="files">Choisir le fichier/ select file</label>
                    </div>
                  </div>
                 
                  </div>
              </div>
              <button type="submit" className="btn btn-success btn-block mb-3 w-60">
                Soumettre ma demmande/ submit my application
              </button>
            </form>
          </div>
      </div>
      <Footer/>
    </div>
  );
};

export default MyComponent;
