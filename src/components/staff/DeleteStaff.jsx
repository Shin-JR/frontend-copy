import { useState, useEffect } from 'react';
import './DeleteStaff.css';
import axios from 'axios';
import API_URL from '../../config';
import { useNavigate } from 'react-router-dom';

function DeleteStaff() {
  const [technician, setTechnician] = useState(null);
  const [selectedId, setSelectedId] = useState('');
  const [isFetching, setIsFetching] = useState(false);
  const [technicianIds, setTechnicianIds] = useState([]); 
  const [msg, setMsg] = useState('')
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${API_URL}/staff`)
      .then((response) => {
        const data = response.data;
        const ids = data.map((technician) => technician.id);
        setTechnicianIds(ids);
      })
      .catch((error) => {
        console.error('Error al obtener los IDs de los técnicos:', error);
      });
  }, []);

  useEffect(() => {
    if (selectedId) {
      setIsFetching(true);
      axios.get(`${API_URL}/staff/${selectedId}`)
        .then((response) => {
          const data = response.data;
          setTechnician(data);
          setIsFetching(false);
        })
        .catch((error) => {
          console.error('Error al obtener la información del técnico:', error);
          setIsFetching(false);
        });
    }
  }, [selectedId]);

  const handleDelete = () => {
    if (selectedId) {
      axios.delete(`${API_URL}/staff/${selectedId}`)
        .then((response) => {
          console.log('Técnico eliminado con éxito:', response.data);
          setMsg('Técnico eliminado con éxito')
          setTechnician(null); 
          setSelectedId(''); 
          navigate('/staff');
          
        })
        .catch((error) => {
          console.error('Error al eliminar el técnico:', error);
          // setMsg('Error al eliminar el técnico')
          navigate('/staff');
        });
    }
  };

  return (
    <div>
      <h1>Eliminar Técnico</h1>
      <h2>{ msg }</h2>
      <div className="select-button-container">

      <form>
        <label htmlFor="idToDelete">ID del Técnico a Eliminar:</label>
        <select
          id="idToDelete"
          value={selectedId}
          onChange={(e) => setSelectedId(e.target.value)}
        >
            
          <option value="">Selecciona un ID</option>
          {technicianIds.map((id) => (
            <option key={id} value={id}>
              {id}
            </option>
          ))}
        </select>
        <button type="button" onClick={handleDelete}>Eliminar Técnico</button>
      </form>
        </div>
      {isFetching && <p>Cargando...</p>}
      {technician && (
        <div className='info'>
          <p className='parrafo-info-deletestaff'>Nombre: {technician.nombre}</p>
          <p className='parrafo-info-deletestaff'>Correo: {technician.correo}</p>
          <p className='parrafo-info-deletestaff'>Misión: {technician.descripcion}</p>
          <p className='parrafo-info-deletestaff'>Calificación: {technician.calificacion}</p>
        </div>
      )}
    </div>
  );
}

export default DeleteStaff;
