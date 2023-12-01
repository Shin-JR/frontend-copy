import { useContext, useEffect, useState } from 'react';
// import axios from 'axios';
import CompupsLogo from '../../public/img/logo.png';
import ComPups from './ComPups';
import './Header.css';
import UserDropdown from './users/UserDropdown';
import { AuthContext } from './auth/AuthContext';


function Header() {
  const { token } = useContext(AuthContext);
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    if (token && token !== 'null') {      
        console.log('Enviaste un token correcto y estás logeado');
        setAuth(true);
    } else {
      console.log('No estás logeado');
      setAuth(false);
    }
  }, [token]);

  return (
    <div className="row">
      <a href="/" className="logo">
        <img src={CompupsLogo} className="logo" alt="Compups logo" />
      </a>
      <div className="nombre">
        <ComPups />
      </div>


      <nav className="navbar">
        <ul className="navbar-nav">
          <li className="nav-item"><a className="nav-link" href="/">Inicio</a></li>
          <li className="nav-item"><a className="nav-link" href="/instructions">Instrucciones</a></li>
          <li className="nav-item"><a className="nav-link" href="/booking">Reservar</a></li>
          <li className="nav-item"><a className="nav-link" href="/staff">Equipo</a></li>
          {!auth && (
            <>
              <li className="nav-item">
                <a className="nav-link" href="/newuser">
                  Regístrate
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/login">
                  Iniciar sesión
                </a>
              </li>
            </>
          )}
          {auth && (
            <>
            <li className="nav-item"><a className="nav-link" href="/reviews">Reseñas</a></li>
            <li className="nav-item"><UserDropdown auth={ auth } setAuth={ setAuth } /></li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
}

export default Header;
