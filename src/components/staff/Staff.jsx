import './Staff.css'

import Card from './Card'
import { useContext, useEffect, useState } from 'react'
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { AuthContext } from '../auth/AuthContext';
import API_URL from '../../config';



function Staff() {

  const [isAdmin, setIsAdmin] = useState(false);
  const { token } = useContext(AuthContext);
  const [staff, setStaff] = useState([]);

  useEffect(() => {
    if (token && token !== 'null') {
      const decodedToken = jwtDecode(token);
      setIsAdmin(decodedToken.scope.includes("admin"))
      axios.get(API_URL + '/staff')
        .then((response) => {
          const data = response.data
          setStaff(data)
          console.log(data)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }, [token])


  return (
    <div className="main-div-staff">
      <h1 className="title-staff">Nuestro Equipo</h1>
      { isAdmin && (
        <div>
          <div className="button-container">
          <div className="custom-button">
          <a href="/newstaff">Agregar Técnico</a>
          </div>
          <div className="custom-button">
          <a href="/updatestaff">Actualizar Técnico</a>
          </div>
          <div className="custom-button">
          <a href="/deletestaff"> Eliminar Técnico</a>
          </div>
          </div>
        </div>
      )}

      <div className='grid-staff'>
        { staff.map((persona, index) => (
          <Card key={index} persona={persona}></Card>
        ))}
      </div>
    </div>
  )
}

export default Staff