import { useState } from 'react';
import './NewStaff.css';
import axios from 'axios';
import API_URL from '../../config';
import { useNavigate } from 'react-router-dom';

function Form() {
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    descripcion: '',
    calificacion: '',
    imagen: ''
  });
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

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
    axios.post(API_URL +'/staff', formData)
      .then((response) => {
        // Aquí podrías manejar la respuesta del servidor, si es necesario
        console.log('Datos enviados correctamente:', response.data);
        setMsg('Técnico creado exitosamente!');
        navigate('/staff')
      })
      .catch((error) => {
        // Aquí puedes manejar el error en caso de que falle la solicitud
        console.error('Error al enviar los datos:', error);
        // setMsg('Ocurrió un error al crear el técnico');
        navigate('/staff')
      });
  };

  return (
    <div>
      <h1>Información Técnico</h1>
      <h2>{ msg }</h2>
      <form onSubmit={handleSubmit}>
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
          <label htmlFor="imagen">URL de imagen (asegúrate de que sea un URL válido)</label>
          <textarea
            type="text"
            id="imagen"
            name="imagen"
            value={formData.imagen}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="Calificación">Calificación</label>
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
        <button type="submit">Crear técnico</button>
      </form>
    </div>
  );
}

export default Form;
