import React from 'react';
import './hero.css';

function Hero () {
  return (
    <div className="hero">
        <div className='hero-content'>
          <div className='herobox slide1_bg'>
            <div className='content'>
              <div className="hero-text">
                <h1>¿Los juegos ya no corren como antes?</h1>
                <h3>No dudes en agendar con nosotros una hora de diagnóstico 
                  y traigamos de vuelta ese pc a sus tiempos de gloria</h3>
                  <a href="/booking">  
                <button className="hero-button">Agendar</button>
                </a> 
              </div>
            </div>
          </div>
          
        </div>
    </div>
  );
};

export default Hero;