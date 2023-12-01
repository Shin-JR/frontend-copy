import { useContext, useState } from 'react';
import './CreateModule.css';
import axios from 'axios';
import { AuthContext } from '../../auth/AuthContext';
import API_URL from '../../../config';


const CreateModule = () => {
  const { token } = useContext(AuthContext);
  const [msg, setMsg] = useState("")
  const [modulo, setModulo] = useState({
    usuarioId: null,
    tecnicoId: -1,
    hora_inicio: -1,
    duracion: -1,
    estado: "free",
    tipo: null,
    fecha: -1
  });

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
        method: 'post',
        url: `${API_URL}/modules`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: modulo
      };
      const response = await axios(config);

      console.log('Respuesta del servidor:', response.data);
      setMsg("Módulo creado exitosamente")
    } catch (error) {
      console.error('Error al registrar el módulo:', error);
      setMsg("Error en la creación del módulo")

    }
  };

  


  return (
    <div className="formulario-container">
      <h2>{ msg }</h2>
      <form onSubmit={handleSubmit}>
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
            max="30"
            value={modulo.duracion}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Crear Módulo</button>
      </form>
    </div>
  );
};

export default CreateModule;
