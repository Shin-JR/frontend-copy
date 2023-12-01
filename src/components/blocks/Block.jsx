import { useState } from 'react';

const ModulosView = () => {
  // Supongamos que modules es un array que contiene los módulos disponibles
  const [modules, setModules] = useState(["Módulo 1", "Módulo 2", "Módulo 3", "Módulo 4", "Módulo 5"]);

  return (
    <div>
      <h2>Módulos Disponibles</h2>
      <ul>
        {modules.map((modulo, index) => (
          <li key={index}>{modulo}</li>
        ))}
      </ul>
    </div>
  );
}

export default ModulosView;




