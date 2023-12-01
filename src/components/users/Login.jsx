import { useState, useContext, useEffect } from 'react';
import './Login.css';
import axios from 'axios';
import { AuthContext } from '../auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import API_URL from '../../config';

function Login() {
  const { token, setToken } = useContext(AuthContext);
  const [correo, setEmail] = useState('');
  const [contraseña, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Form submitted');
    axios.post(`${API_URL}/login`, {
      correo,
      contraseña
    }).then((response) => {
      console.log('Login successful');
      setError(false);
      setMsg("Login exitoso!");
      // Recibimos el token y lo procesamos
      const access_token = response.data.access_token;
      setToken(access_token);
      
      setTimeout(() => {
        navigate('/')
      } , 1000);
      
      console.log("Se seteo el token: ", access_token);
    }).catch((error) => {
      console.error('An error occurred while trying to login:', error);
      setError(true);// aquí puede haber más lógica para tratar los errores
    })
  };
  useEffect(() => {
    // Este código se ejecuta después de que token se ha actualizado
    console.log("Token actualizado:", token);
  }, [token]);
  return (
    <div className="formulario-container">
      <form onSubmit={handleSubmit}>
        <label>
          Correo
          <input
            type="email"
            name="correo"
            value={correo}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <br />
        <label>
          Contraseña
          <input
            type="password"
            name="contrasena"
            value={contraseña}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Iniciar Sesión</button>
        {msg && (
          <div className={error ? 'error-msg' : 'success-msg'}>
            {msg}
          </div>
        )}
      </form>
    </div>
  );
}
export default Login;