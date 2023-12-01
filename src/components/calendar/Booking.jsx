import { format } from "date-fns";
import { useState } from "react";
import Calendar from "./Calendar";
import './Booking.css' 
import Horas from "./Horas";
import { useEffect } from "react";
import axios from "axios";
import { AuthContext } from '../auth/AuthContext';
import { useContext } from "react";
// import createModule from './crud_modules/createModule';
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import API_URL from '../../config';


const meses_traduccion = (mes) => {
  switch (mes) {
    case "January":
      return "Enero"
    case "February":
      return "Febrero"
    case "March":
      return "Marzo";
    case "April":
      return "Abril"
    case "May":
      return "Mayo"
    case "June":
      return "Junio";
    case "July":
      return "Julio"
    case "August":
      return "Agosto"
    case "September":
      return "Septiembre";
    case "October":
      return "Octubre"
    case "November":
      return "Noviembre"
    case "December":
      return "Diciembre";  
  
    default:
      mes
  }
}




const Booking = () => {

  const [currentDay, setCurrentDay] = useState(new Date())
  const [arrayHoras, setArrayHoras] = useState([])
  const [validToken, setValidToken] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [idUser, setIdUser] = useState(null)
  const { token } = useContext(AuthContext)
  const [reserving, setReserving] = useState(false)
  const navigate = useNavigate();


  useEffect(() => {
    if (token && token !== 'null') {
      const decodedToken = jwtDecode(token);
      setValidToken(true);
      const scope = decodedToken.scope;
      console.log('Scope:', scope);
      setIsAdmin(scope.includes("admin"));
      setIdUser(decodedToken.sub);
      console.log(idUser, typeof idUser)
    }
  }, [token, idUser]);

  useEffect(() => {
    

    const config = {
      method: 'get',
      url: `${API_URL}/modules`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios(config)
      .then((response) => {
        const data = response.data;
        setArrayHoras(data)
      })
      .catch((error) => {
        console.log(error);
      });

  }, [token, reserving])

  const handleReserveHour = (module, userId) => {

    
    const data = {
      usuarioId: parseInt(userId)
    }
  
    // Configura la solicitud POST
    const putConfig = {
      method: 'put',
      url: `${API_URL}/modules/${module.id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: data,
    };
  
    // // Realiza la solicitud POST
    axios(putConfig)
      .then((response) => {
        // Maneja la respuesta si es necesario
        console.log('Reserva exitosa:', response.data);
        setReserving(!reserving)
      })
      .catch((error) => {
        // Maneja el error si ocurre alguno
        console.error('Error al reservar la hora:', error);
      });

      
    };
  
  return (

    <div className="main-booking">
      <h1>¡Reserva tu hora aquí!</h1>
      {
        isAdmin && (
        <div>
          <button onClick={() => { navigate('/modules/')}}>Ver módulos</button>
          <button onClick={() => { navigate('/modules/new')}}>Crear módulo</button>
        </div>
      )
      }
      
      <div className="div-container">
      
        <div className="div-calendar"> 
          <h2>Fecha seleccionada: {format(currentDay, "dd") + " "  + meses_traduccion(format(currentDay, "LLLL")) + " " + format(currentDay, "yyyy")}</h2>
          <Calendar value={currentDay} onChange={setCurrentDay} />
        </div>

        <div className="booking-horas-div">
          <h2 className="horas-disponibles-title">Horas Disponibles:</h2>
          <h3>Clickea para reservar el módulo</h3>
          { !validToken && (
            <h2>Debes loguearte antes de ver si hay horas disponibles</h2>
          )}
          <div className="booking-horas">   

            {/* código para display de horas */}
            { 
              arrayHoras.map( (hora, index) => {
              // const fechaFormateada = new Date(hora.fecha)
              // console.log(fechaFormateada, format(new Date(fechaFormateada), "yyyy-LL-dd"), format(currentDay, "yyyy-LL-dd"))
                if (hora.fecha === format(currentDay, "yyyy-LL-dd") && !hora.usuarioId) {
                  return <Horas key={ index } 
                    onClickFunc={ handleReserveHour }
                    modulo={hora} 
                    idUser={ idUser }
                  ></Horas>
                }
              }
            )}
          </div>
        </div>


      </div>

    </div>


    

  );
};

export default Booking;