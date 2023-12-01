import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../auth/AuthContext';
import { jwtDecode } from "jwt-decode";
import './Profile.css';
import { useNavigate } from 'react-router-dom';
import API_URL from '../../config';

const PerfilUsuario = () => {
  const { token } = useContext(AuthContext);
  const [reservas, setReservas] = useState([]);
  // const [editando, setEditando] = useState(false);
  const navigate = useNavigate();
  


  const [perfil, setPerfil] = useState({
    nombre: 'Nombre de Usuario',
    correo: 'usuario@example.com',
    contraseña: 'contraseña',
    fecha_nacimiento: '01/01/2000',
  });


  useEffect(() => {

    const fetchData = async () => {
      if (token && token !== 'null') {
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.sub;

        const profileConfig = {
          method: 'get',
          url: `${API_URL}/users/${userId}`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        axios(profileConfig)
          .then((response) => {
            const data = response.data;
            console.log(data)
            setPerfil(data)

            const reservationsConfig = {
              method: 'get',
              url: `${API_URL}/modules`,
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }

            axios(reservationsConfig)
              .then((response) => {
                const data = response.data.filter((module) => module.usuarioId == userId);
                console.log(data)
                setReservas(data)
              })
              .catch((error) => {
                console.log(error);
              });
          })
          .catch((error) => {
            console.log(error);
          }); 

      }
    };

    fetchData();
  }, [token]);



  // const handleEditarClick = () => {
  //   setEditando(!editando);
  // };

  const handleEditModules = () => {
    navigate('/reservations');
  }

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log('Perfil actualizado:', perfil);
  //   setEditando(false);
  // };

  return (
    <div>
      <div className="background-container">
        <div className='profile-header'>
          <h2>Información personal</h2>
        </div>
        <div className="big-container">
          <div className='elemento-izq'>
            <img src="../../../public/img/hombre.png" alt="Icono de calificación" />
            <div className="label-profile">Nombre: {perfil.nombre}</div>
            <div className="linea-blanca"></div>
            <div className="label-profile">Correo: {perfil.correo}</div>
            <div className="linea-blanca"></div>
            <div className="label-profile">Fecha de Nacimiento: { 
              perfil.fecha_nacimiento.slice(0, 10) 
            }</div>
            <div className="linea-blanca"></div>
            {/* <button className="boton-editar" onClick={handleEditarClick}>Editar mi perfil</button> */}
          </div>
          <div className='elemento-der'>
            <button onClick={ handleEditModules } className='handleModules'>Tus reservas</button>
            {/* <button onClick={ handleEditModules }>Editar Reservas</button> */}
            <br />
            {reservas.map(reserva => (
              <div key={reserva.id} className="reserva-rectangulo">
                <p>Fecha: {reserva.fecha}</p>
                <p>Hora: {reserva.hora_inicio}</p>
                <p>Técnico: {reserva.tecnicoId}</p>
                {/* <button className="boton-cancelar" onClick={handleEditarClick}>Cancelar</button> */}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerfilUsuario;
