import React, { useState, useEffect, useCallback } from 'react';
import _ from 'lodash';
import Badge from './badge';
import { styled } from '@mui/material/styles';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  InputAdornment,
  IconButton
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const Container = styled('div')(({ theme }) => ({
  backgroundColor: '#f0f4f1',
  padding: theme.spacing(3),
  height: '100%',
}));

const HeaderCell = styled(TableCell)({
  fontWeight: 'bold',
  backgroundColor: '#f0f4f1',
});

const TableHeadSticky = styled(TableHead)({
  position: 'sticky',
  top: 0,
  backgroundColor: '#f0f4f1',
  zIndex: 1,
});

const SelectedRow = styled(TableRow)(({ isSelected }) => ({
  backgroundColor: isSelected ? '#e0e0e0' : 'inherit',
  cursor: 'pointer', // Optional: Makes it clear that the row is clickable
}));

const SearchBar = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'green',
    },
    '&:hover fieldset': {
      borderColor: 'darkgreen',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'green',
    },
  },
  '& .MuiInputLabel-outlined': {
    color: 'green',
  },
  '& .MuiInputLabel-outlined.Mui-focused': {
    color: 'green',
  },
}));

const TableContainer = styled(Paper)(({ theme }) => ({
  maxHeight: 'calc(100vh - 200px)',
  overflowY: 'auto',
}));

const App = () => {
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [photo, setPhoto] = useState('');
  const [etablissement, setEtablissement] = useState('');
  const [departement, setDepartement] = useState('');
  const [encadreurNom, setEncadreurNom] = useState('');
  const [encadreurPrenom, setEncadreurPrenom] = useState('');
  const [niveau, setNiveau] = useState('');
  const [parcours, setParcours] = useState('');
  const [filiere, setFiliere] = useState('');
  const [tel, setTel] = useState('');
  const [date, setDate] = useState('');
  const [dateDebut, setDateDebut] = useState('');
  const [dateFin, setDateFin] = useState('');
  const [selectedRowIndex, setSelectedRowIndex] = useState(-1);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredRequests, setFilteredRequests] = useState([]);

  const [acceptedStageRequests, setAcceptedStageRequests] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/stagiaresAccepte')
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data)) {
          setAcceptedStageRequests(data);
        } else {
          console.error('Data is not an array:', data);
          setAcceptedStageRequests([]);
        }
      })
      .catch(error => console.error('Erreur lors du chargement des données :', error));
  }, []);

  const handleRowClick = (request, index) => {
    setSelectedRowIndex(index);
    setNom(request.NOMETUDIANT);
    setPrenom(request.PRENOMETUDIANT);
    setPhoto(request.PHOTOPROFIL);
    setEtablissement(request.ETABLISSEMENT);
    setDepartement(request.DEPARTEMENT);
    setEncadreurNom(request.NOMENCADREUR);
    setEncadreurPrenom(request.PRENOMENCADREUR);
    setNiveau(request.NIVEAU);
    setFiliere(request.FILIERE);
    setParcours(request.PARCOURS);
    setTel(request.TEL);
    setDate(request.DATE);
    setDateDebut(request.DATEDEBUTDESEANCE);
    setDateFin(request.DATEFINDESEANCE);
  };

  const handleSearchChange = useCallback(
    _.debounce((query) => {
      setFilteredRequests(
        acceptedStageRequests.filter(request =>
          request.NOMETUDIANT.toLowerCase().includes(query.toLowerCase()) ||
          request.PRENOMETUDIANT.toLowerCase().includes(query.toLowerCase()) ||
          request.ETABLISSEMENT.toLowerCase().includes(query.toLowerCase())
        )
      );
    }, 300),
    [acceptedStageRequests]
  );

  useEffect(() => {
    handleSearchChange(searchQuery);
  }, [searchQuery, handleSearchChange]);

  return (
    <div style={{ display: 'flex', flexDirection: "row", height: "73vh", justifyContent: "space-between" }}>
      <div style={{ height: "73vh", marginRight: '-10px', marginLeft: '-10px' }}>
        <Container>
          <SearchBar
            label="Rechercher un stagiaire"
            variant="outlined"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
          <TableContainer elevation={3}>
            <Table stickyHeader>
              <TableHeadSticky>
                <TableRow>
                  <HeaderCell>Nom</HeaderCell>
                  <HeaderCell>Prenom</HeaderCell>
                  <HeaderCell>Établissement</HeaderCell>
                </TableRow>
              </TableHeadSticky>
              <TableBody>
                {filteredRequests.length > 0 ? (
                  filteredRequests.map((request, index) => (
                    <SelectedRow
                      key={index}
                      onClick={() => handleRowClick(request, index)}
                      isSelected={selectedRowIndex === index}
                    >
                      <TableCell>{request.NOMETUDIANT}</TableCell>
                      <TableCell>{request.PRENOMETUDIANT}</TableCell>
                      <TableCell>{request.ETABLISSEMENT}</TableCell>
                    </SelectedRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={3} align="center">Aucune donnée disponible</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      </div>
      <Badge
        name={nom}
        prenom={prenom}
        photo={photo}
        etablissement={etablissement}
        departement={departement}
        nomencadreur={encadreurNom}
        prenomencadreur={encadreurPrenom}
        niveau={niveau}
        filiere={filiere}
        parcours={parcours}
        tel={tel}
        date={date}
      />
    </div>
  );
};

export default App;
