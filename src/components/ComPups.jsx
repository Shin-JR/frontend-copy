import React, { useState, useEffect } from 'react';

function ComPups() {
    const [word, setWord] = useState('ComPups');

    useEffect(() => {
        let interval;

        // Función para manejar la eliminación de letras
        const deleteLetter = () => {
            if (word.length > 0) {
                setWord(word.slice(0, -1));
            } else {
                // Cuando se eliminen todas las letras, reiniciar la palabra
                setWord('ComPups');
            }
        };

        // Configurar un intervalo para llamar a deleteLetter cada segundo
        interval = setInterval(deleteLetter, 1000);

        // Limpieza: detener el intervalo al desmontar el componente
        return () => clearInterval(interval);
    }, [word]); // Dependencia: cuando la palabra cambie, reiniciará el efecto

    return (
        <div className="Nombre">
            <h1 onClick={() => setWord('ComPups')}>{word}</h1>
        </div>
    );
}

export default ComPups;
