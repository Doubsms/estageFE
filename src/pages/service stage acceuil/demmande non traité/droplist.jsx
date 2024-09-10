import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SelectVariants() {
  const [department, setDepartment] = React.useState('');
  const [supervisors, setSupervisors] = React.useState([]);
  const [selectedSupervisor, setSelectedSupervisor] = React.useState('');

  const fetchSupervisors = async () => {
    const response = await fetch(`http://localhost:4000/encadreurs`);
    const data = await response.json();
    setSupervisors(data);
  };

  React.useEffect(() => {
    fetchSupervisors(); // Charger tous les encadreurs une fois au montage du composant
  }, []);

  const handleDepartmentChange = (event) => {
    const selectedDept = event.target.value;
    setDepartment(selectedDept);
    setSelectedSupervisor(''); // Réinitialiser l'encadreur sélectionné quand le département change
  };

  const handleSupervisorChange = (event) => {
    setSelectedSupervisor(event.target.value); // Mettre à jour l'encadreur sélectionné
  };

  const filteredSupervisors = supervisors.filter(supervisor => supervisor.DEPARTEMENT === department);

  return (
    <div>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-standard-label">Département</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={department}
          onChange={handleDepartmentChange}
          label="Département"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="Département des statistiques démographiques et sociales">Département des statistiques démographiques et sociales</MenuItem>
          <MenuItem value="Département des statistiques d'entreprise">Département des statistiques d'entreprise</MenuItem>
          <MenuItem value="Département des synthèses économiques">Département des synthèses économiques</MenuItem>
          <MenuItem value="Département de la coordination statistique, de la coopération et de la recherche">Département de la coordination statistique, de la coopération et de la recherche</MenuItem>
          <MenuItem value="Département de l'informatique">Département de l'informatique</MenuItem>
          <MenuItem value="Direction des affaires administratives et financières">Direction des affaires administratives et financières</MenuItem>
        </Select>
      </FormControl>

      <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-filled-label">Encadreur</InputLabel>
        <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          value={selectedSupervisor}
          onChange={handleSupervisorChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {filteredSupervisors.map((supervisor) => (
            <MenuItem key={supervisor.MATRICULEENCADREUR} value={supervisor.MATRICULEENCADREUR}>
              {supervisor.NOMENCADREUR} {supervisor.PRENOMENCADREUR}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}