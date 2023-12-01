// Resena.js
import React from 'react';
import PropTypes from 'prop-types';
import './Resena.css'; // Agrega estilos adicionales si es necesario

const Resena = ({ icono, nombre, calificacion, comentario }) => {
  return (
    <div className="resena">
      <div className="icono">
        <img src={icono} alt="Icono de reseña" />
      </div>
      <div className="informacion">
        <div className="cabecera">
          <p className="nombre">{nombre}</p>
          <p className="calificacion">Calificación: {calificacion}</p>
        </div>
        <p className="comentario">{comentario}</p>
      </div>
    </div>
  );
};

Resena.propTypes = {
  icono: PropTypes.string.isRequired,
  nombre: PropTypes.string.isRequired,
  calificacion: PropTypes.number.isRequired,
  comentario: PropTypes.string.isRequired,
};

export default Resena;
