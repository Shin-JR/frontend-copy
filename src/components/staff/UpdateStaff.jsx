import { useState, useEffect } from 'react';
import './UpdateStaff.css';
import axios from 'axios';
import API_URL from '../../config';

function Form() {
  const [formData, setFormData] = useState({
    id: '', 
    nombre: '',
    correo: '',
    descripcion: '',
    calificacion: ''
  });

  const [tecnicos, setTecnicos] = useState([]); 

  useEffect(() => {
    axios.get(API_URL + '/staff')
      .then((response) => {
        setTecnicos(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener la lista de técnicos:', error);
      });
  }, []); // Esta solicitud se ejecutará solo una vez al cargar el componente

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    const updatedData = {};

    if (formData.nombre !== tecnicos.find(tecnico => tecnico.id === Number(formData.id)).nombre) {
      updatedData.nombre = formData.nombre;
    }
    if (formData.correo !== tecnicos.find(tecnico => tecnico.id === Number(formData.id)).correo) {
      updatedData.correo = formData.correo;
    }
    if (formData.descripcion !== tecnicos.find(tecnico => tecnico.id === Number(formData.id)).descripcion) {
      updatedData.descripcion = formData.descripcion;
    }
    if (formData.calificacion !== tecnicos.find(tecnico => tecnico.id === Number(formData.id)).calificacion) {
      updatedData.calificacion = formData.calificacion;
    }
    axios.put(`${API_URL}/staff/${formData.id}`, updatedData)
      .then((response) => {
        console.log('Datos actualizados correctamente:', response.data);
      })
      .catch((error) => {
        console.error('Error al actualizar los datos:', error);
      });
  };

  return (
    <div>
      <h1>Actualizar Información Técnico</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="id"></label>
          <select
            id="id"
            name="id"
            value={formData.id}
            onChange={(e) => {
              const selectedId = e.target.value;
              const selectedTecnico = tecnicos.find(tecnico => tecnico.id === Number(selectedId));

              setFormData({
                ...formData,
                id: selectedId,
                nombre: selectedTecnico.nombre,
                correo: selectedTecnico.correo,
                descripcion: selectedTecnico.descripcion,
                calificacion: selectedTecnico.calificacion
              });
            }}
          >
            <option value="">Seleccione un ID</option>
            {tecnicos.map((tecnico) => (
              <option key={tecnico.id} value={tecnico.id}>
                {tecnico.id}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="nombre">Nombre</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="correo">Correo</label>
          <input
            type="text"
            id="correo"
            name="correo"
            value={formData.correo}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="descripcion">Misión</label>
          <textarea
            type="text"
            id="descripcion"
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="calificacion">Calificación</label>
          <input
            type="number"
            id="calificacion"
            name="calificacion"
            min="1"
            max="5"
            value={formData.calificacion}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Actualizar</button>
      </form>
    </div>
  );
}

export default Form;
