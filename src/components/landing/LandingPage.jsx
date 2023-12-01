// src/components/LandingPage.js

import React from 'react'
import './LandingPage.css' // Crea este archivo CSS para estilizar la página de inicio
import Hero from './hero'
import moboicon from '../../../public/img/tarjeta-madre.png'
import gallery_1 from '../../../public/img/gallery_1.jpg'
import gallery_2 from '../../../public/img/gallery_2.jpg'
import gallery_3 from '../../../public/img/gallery_3.jpg'
import gallery_4 from '../../../public/img/gallery_4.jpg'
import gallery_5 from '../../../public/img/gallery_5.jpg'
import gallery_6 from '../../../public/img/gallery_6.jpg'

function LandingPage() {
  return (
    
    <div className="landing-page">
      <div className = "content">
        <Hero />
        <section>
        <div className='wrapper'>
          <div className='box box1'>
            <div className='texto'>
              <h1>Servicio técnico básico</h1>
              <h2>Mantenimiento preventivo, armados personalizados y cotizaciones </h2>
              <h3>¿Tu consola o pc suenan como un avión despegando y antes no era así?</h3>
              <p className='parrafo-landing'>En ComPups ofrecemos los servicios ya mencionados y más. A lo largo de los ultimos 3
                años hemos ayudado a cientos de clientes a recuperar sus equipos y consolas de videojuegos
                a su estado original. Como también a nuevos clientes que buscan armar su primer pc gamer o una 
                nueva máquina de trabajo.
              </p>
              <a href="/booking">
              <button className='contacto'>¡Contáctanos ya!</button>
              </a>
            </div>
            <div className='imagen'>
              <img src={moboicon} alt="mother" />
            {/* <a href="https://www.flaticon.es/iconos-gratis/placa-base" title="placa base iconos">Placa base iconos creados por Vectoricons - Flaticon</a> */}
            </div>

          </div>
        </div>
        </section>

        <section>
          <div className='wrapper'>
            <div className='expo'>
              <h1>Trabajos destacados</h1>
            </div>
            <div className='box box2'>
              
                <img className='gallery1' src={gallery_1} alt="" />
                <img className='gallery2' src={gallery_2} alt="" />
                <img className='gallery3' src={gallery_3} alt="" />
                <img className='gallery4' src={gallery_4} alt="" />
                <img className='gallery5' src={gallery_5} alt="" />
                <img className='gallery6' src={gallery_6} alt="" />
              
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default LandingPage;
