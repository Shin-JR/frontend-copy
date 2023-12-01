/* eslint-disable react/prop-types */
import { useState } from 'react';
import axios from 'axios';
import API_URL from '../../../config';


const UpdateModule = ({token, module, setUpdateFlag}) => {

  const [modulo, setModulo] = useState(module);
  const [msg, setMsg] = useState("Editando módulo con ID: " + module.id + " y fecha: " + module.fecha);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setModulo({
      ...modulo,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Datos del nuevo módulo:', modulo);
    try {
      const config = {
        method: 'put',
        url: `${API_URL}/modules/${module.id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: modulo
      };
      const response = await axios(config);

      console.log('Respuesta del servidor:', response.data);
      setMsg("Módulo actualizado exitosamente")
      setUpdateFlag(false)
    } catch (error) {
      console.error('Error al registrar el módulo:', error);
      setMsg("Error en la actualización del módulo")

    }
  };

  


  return (
    <div className="formulario-container">
      <h2>{ msg }</h2>
      <form onSubmit={handleSubmit}>

        <label>
          Id de Usuario
          <input
            type="number"
            id="usuarioId"
            name="usuarioId"
            value={modulo.usuarioId}
            onChange={handleChange}
          />
        </label>
        <label>
          Id de técnico
          <input
            type="number"
            id="tecnicoId"
            name="tecnicoId"
            value={modulo.tecnicoId}
            onChange={handleChange}
          />
        </label>

        <label>
          Fecha
          <input
            type="date"
            name="fecha"
            autoFocus={true}
            value={modulo.fecha}
            onChange={handleChange}
          />
        </label>

        <label>
          Hora de inicio
          <input
            type="time"
            name="hora_inicio"
            value={modulo.hora_inicio}
            onChange={handleChange}
          />
        </label>
        
        <label>
          Duración
          <input
            type="number"
            id="duracion"
            name="duracion"
            min="1"
            max="60"
            value={modulo.duracion}
            onChange={handleChange}
          />
        </label>

        <label>
          Tipo
          <input
            type="text"
            name="tipo"
            value={modulo.tipo}
            onChange={handleChange}
          />
        </label>

        <button type="submit">Actualizar Módulo</button>
      </form>
    </div>
  );
};

export default UpdateModule;
