import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import './Reservation.css';
import { AuthContext } from '../auth/AuthContext';
import { jwtDecode } from 'jwt-decode';
import API_URL from '../../config';

function Reservations() {
  const [modules, setModules] = useState([]);
  const [selectedModule, setSelectedModule] = useState(null);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    if (token && token !== 'null') {
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.sub;
      

      const config = {
        method: 'get',
        url: `${API_URL}/modules`,
        headers: {
          Authorization: `Bearer ${token}`,
        }
      }

      axios(config)
        .then((response) => {
          const data = response.data.filter((module) => module.usuarioId == userId);
          console.log(data)
          setModules(data)
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [token, selectedModule]);

  const handleReservationClick = (module) => {
    setSelectedModule(module);
  };

  const handleCancelReservation = async () => {
    if (selectedModule!= null && token != 'null') {

      const data = {
        usuarioId: null
      }
      
      const config = {
        method: 'put',
        url: `${API_URL}/modules/${selectedModule.id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: data
      }

      axios(config)
        .then((response) => {
          const data = response.data;
          console.log(data)
          setSelectedModule(null);

         })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div className="reservation-page">
      <div className="contenedor-horizontal">
        <div className="contenedor-vertical">
          <div className="contenedor-vertical">
            <div className='elemento-30'>
              <div className='elemento-30-contenido'>
                <h1>Tus</h1>
                <h1>reservas</h1>
              </div>
            </div>
            <div className='elemento-70'>
              <div className="contenedor-vertical">
                { modules.map((reservation) => (
                  <div
                    key={reservation.id}
                    className='rectangulo-redondeado'
                    onClick={() => handleReservationClick(reservation)}
                  >
                    <p>Fecha: {reservation.fecha}</p>
                    <p>Hora: {reservation.hora_inicio}</p>
                  </div>
                )) }
              </div>
            </div>
          </div>
        </div>
        {selectedModule != null && (
          <div className="contenedor-vertical-detalles">
            <h2>Detalles</h2>
            <div className="linea-con-texto">
              <hr className="linea" />
              <p>Fecha: { selectedModule.fecha }</p>
            </div>

            <div className="linea-con-texto">
              <hr className="linea" />
              <p>Hora: {selectedModule.hora_inicio}</p>
            </div>
            <div className="linea-con-texto">
              <hr className="linea" />
              <p>Técnico: { selectedModule.tecnicoId}</p>
            </div>
            <div className="linea-con-texto">
              <hr className="linea" />
              <p>Motivo de consulta: { selectedModule.tipo}</p>
            </div>
            <div className="linea-con-texto">
              <hr className="linea" />
              <p>Estado: { selectedModule.estado}</p>
            </div>
            <button className="boton-cancelar" onClick={handleCancelReservation}>
              Cancelar reserva
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Reservations;
