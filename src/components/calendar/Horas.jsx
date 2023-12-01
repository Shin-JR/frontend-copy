import "./Horas.css";


export default function Horas ({ modulo, idUser, onClickFunc }) {
    return (
        <div className="main-horas" onClick={() => onClickFunc(modulo, idUser)}>
            <div className="horas-time">
                <p>{ modulo.hora_inicio }</p>
            </div>
            <div className="horas-staff">
                <p>{ modulo.tecnicoId }</p>
            </div>
        </div>
    );
};
