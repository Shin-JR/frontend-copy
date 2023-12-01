import { useContext, useEffect, useState } from 'react';
import './GetModules.css';
import axios from 'axios';
import { AuthContext } from '../../auth/AuthContext';
import UpdateModule from './UpdateModule';
import API_URL from '../../../config';


const GetModules = () => {
  const { token } = useContext(AuthContext);
  const [modules, setModules] = useState([])
  const [deleteFlag, setDeleteFlag] = useState(false)
  const [updateFlag, setUpdateFlag] = useState(false)
  const [moduleUpdated, setModuleUpdated] = useState(null)

  useEffect(() => {
    if (token && token !== 'null') {
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
          console.log(data)
          setModules(data)
         })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [token, deleteFlag, updateFlag])

  const handleDelete = async (moduleID) => {
    const config = {
      method: 'delete',
      url: `${API_URL}/modules/${moduleID}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios(config)
      .then((response) => {
        console.log("Deleted exitosamente!")
        console.log(response)
       })
      .catch((error) => {
        console.log(error);
      });
      setDeleteFlag(!deleteFlag)
  }

  const handleUpdate = (module) => {
    setUpdateFlag(!updateFlag)
    setModuleUpdated(module)
  }
  

  


  return (
    <div className="main-div-getmodules">
      <table className='modules-table'>
        <thead>
        <tr>
          <th>ID Módulo</th>
          <th>ID Usuario</th>
          <th>ID Técnico</th>
          <th>Fecha</th>
          <th>Hora</th>
          <th>Duración (mins)</th>
          <th>Update</th>
          <th>Delete</th>
        </tr>
        </thead>
        <tbody>
          { modules.map( (modulo, index) => (
            <tr key={ index }>
            <td> { modulo.id } </td>
            <td> { modulo.usuarioId } </td>
            <td> { modulo.tecnicoId } </td>
            <td> { modulo.fecha } </td>
            <td> { modulo.hora_inicio } </td>
            <td> { modulo.duracion } </td>
            <td>
              <button onClick={ () => handleUpdate(modulo) }>Update</button>
            </td>
            <td>
              <button onClick={ () => handleDelete(modulo.id) }>Delete</button>
            </td>
            </tr>
          ))}
        </tbody>
        
        
      </table>

      <br />

      { updateFlag && (
        <UpdateModule module={ moduleUpdated } token={ token } setUpdateFlag={ setUpdateFlag } />
      )} 
    </div>
  );
};

export default GetModules;
