
import React from "react";
import "./Instructions.css";
import Row from "./Row";
import CalendarLogo from "../../../public/img/calendario.png";
import RelojLogo from "../../../public/img/reloj.png";
import TecnicoLogo from "../../../public/img/tecnico.png";
import AtencionLogo from "../../../public/img/tipo_trabajo.png";

function Instructions() {
    return (
        <div className="instructions-total">
            <div className="column-instructions">
                <h1>Instrucciones de uso</h1>
            <div className="row-instructions">
                <div className="instruction">
                    <h3>INGRESA AL CALENDARIO DE RESERVAS</h3>
                    <a href="/booking" className="logo-instructions">
                    <img src={CalendarLogo} className="logo-instructions" alt="Calendar Logo" />
                    </a>
                    <p className="parrafo-instrucciones"> Dirigite a reservas y accede a nuestro calendario</p>
                </div>
                <div className="instruction">
                    <h3>BUSCA UNA HORA QUE TE ACOMODE</h3>
                    <a href="/booking" className="logo-instructions">
                    <img src={RelojLogo} className="logo-instructions" alt="Calendar Logo" />
                    </a>                    
                    <p className="parrafo-instrucciones">Tenemos disponibilidad de Lunes a Viernes de 10 AM a 6 PM</p>

                </div>
                <div className="instruction">
                    <h3>INDICA EL TIPO DE ATENCIÓN QUE REQUIERES</h3>
                    <a href="/booking" className="logo-instructions">
                    <img src={AtencionLogo} className="logo-instructions" alt="Calendar Logo" />
                    </a>                    
                    <p className="parrafo-instrucciones">Puedes solictar un diagnostico, una asesoría o el tipo de servicio que necesites</p>

                </div>
                <div className="instruction">
                    <h3>ESCOGE AL TÉCNICO QUE TE ATENDERA</h3>
                    <a href="/staff" className="logo-instructions">
                    <img src={TecnicoLogo} className="logo-instructions" alt="Calendar Logo" />
                    </a>                    
                    <p className="parrafo-instrucciones">Accede a la información de nuestros técnicos y elige según tus necesidades</p>
                </div>
            </div>
            </div>
            </div>

            );
}

export default Instructions;

