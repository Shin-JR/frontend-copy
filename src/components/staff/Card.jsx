/* eslint-disable react/prop-types */
import './Card.css'
import { useState } from 'react';

function CardContent({ persona }) {
  return (
    <div className='cards-div'>
      <img className='images' src={persona.imagen} alt={persona.nombre + "_image"} />
      <h1 className='title-and-score-style'>{persona.nombre}</h1>
      <h2 className='title-and-score-style'>Score: {persona.calificacion}</h2>
    </div>
  );
}

function HoverBox({ persona }) {
  return (
    <div className="hover-box">
      <img className='images' src={persona.imagen} alt={persona.nombre + "_image"} />
      <h1 className='name-hover'>{persona.nombre}</h1>
      <p>Score: {persona.calificacion}</p>
      <p>Correo: {persona.correo}</p>
      <p>Misión: {persona.descripcion}</p>
    </div>
  );
}

function Card({ persona }) { 
  const [hovered, setHovered] = useState(false);
  
  const handleHover = () => {
    setHovered(!hovered);
  };

  return (
    <div className="staff" onMouseEnter={handleHover} onMouseLeave={handleHover}>
      <CardContent persona={persona} />
      {hovered && <HoverBox persona={persona} />}
    </div>
  );
}

export default Card;
  