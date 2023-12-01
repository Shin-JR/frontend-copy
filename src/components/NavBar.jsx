import React from 'react'
import './NavBar.css' // Create this CSS file for styling
function NavigationBar() {
    return (
      <nav className="navbar">
        <ul className="navbar-nav">
          <li className="nav-item">
            <a href="/" className="nav-link">
              Inicio
            </a>
          </li>
          <li className="nav-item">
            <a href="/about" className="nav-link">
              Sobre nosotros
            </a>
          </li>
          <li className="nav-item">
            <a href="/contact" className="nav-link">
              Contacto
            </a>
          </li>
         <li className="nav-item">
            <a href="/instructions" className="nav-link">
              Instructions
            </a>
          </li> 
        </ul>
      </nav>
    );
  }
  
  export default NavigationBar;