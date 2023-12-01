// NuevoUsuarioFormulario.js
import { useState } from 'react';
import './NewUser.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../auth/AuthContext';
import { useContext } from 'react';
import API_URL from '../../config';

const NuevoUsuarioFormulario = () => {
  const { setToken } = useContext(AuthContext);
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState({
    nombre: '',
    correo: '',
    contraseña: '',
    fecha_nacimiento: '',
    contact: '',
    // Agrega más campos según sea necesario
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsuario({
      ...usuario,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Datos del nuevo usuario:', usuario);
    try {
      const response = await axios.post(`${API_URL}/signup`, usuario);

      console.log('Respuesta del servidor:', response.data);

      setMsg('Usuario registrado exitosamente!');

      
      setTimeout(() => {
        axios
          .post(`${API_URL}/login`, {
            correo: usuario.correo,
            contraseña: usuario.contraseña,
          })
          .then((response) => {
            console.log('Inicio de sesión exitoso');
            const access_token = response.data.access_token;
            setToken(access_token);

            navigate('/');
          })
          .catch((error) => {
            console.error('Ocurrió un error al intentar iniciar sesión:', error);
          });
      }, 3000);
    } catch (error) {
      console.error('Error al registrar el usuario:', error);
      setMsg('Ocurrió un error al registrar el usuario:', error);
    }
  };

  


  return (
    <div className="formulario-container">
      <h1>{ msg }</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Nombre
          <input
            type="text"
            name="nombre"
            autoFocus={true}
            value={usuario.nombre}
            onChange={handleChange}
          />
        </label>
        <label>
          Correo
          <input
            type="text"
            name="correo"
            value={usuario.correo}
            onChange={handleChange}
          />
        </label>
        <label>
          Contraseña
          <input
            type="password"
            name="contraseña"
            value={usuario.contraseña}
            onChange={handleChange}
          />
        </label>
        <label>
          Fecha de nacimiento
          <input
            type="date"
            name="fecha_nacimiento"
            autoFocus={true}
            value={usuario.fecha_nacimiento}
            onChange={handleChange}
          />
        </label>
        <label>
          Número de contacto
          <input
            type="text"
            name="contact"
            value={usuario.contact}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Registrarme</button>
      </form>
    </div>
  );
};

export default NuevoUsuarioFormulario;
