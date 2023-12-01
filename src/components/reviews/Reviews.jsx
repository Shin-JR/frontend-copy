/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import './Reviews.css';
import axios from 'axios';
import API_URL from '../../config';

function Reviews() {
    // Estado para almacenar las reseñas
    const [reviews, setReviews] = useState([]);
    // Estado para el formulario de nueva reseña
    const [newReview, setNewReview] = useState({
        nombre: '',
        calificacion: '',
        comentario: '',
    });



    useEffect(() => {
        // Realizar la consulta a la ruta /reviews al cargar el componente
        axios.get(`${API_URL}/reviews`)
            .then((response) => {
                const data = response.data;
                setReviews(data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    // Manejar cambios en el formulario de nueva reseña
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewReview({
            ...newReview,
            [name]: value,
        });
    };

    // Manejar el envío del formulario de nueva reseña
    const handleFormSubmit = (e) => {
        e.preventDefault();

        // Realizar la solicitud POST para crear una nueva reseña
        axios.post(`${API_URL}/reviews`, newReview)
            .then((response) => {
                // Actualizar el estado de las reseñas después de la creación
                setReviews([...reviews, response.data]);
                // Limpiar el formulario
                setNewReview({
                    nombre: '',
                    calificacion: '',
                    comentario: '',
                });
            })
            .catch((error) => {
                console.log(error);
            });
    };




    // Función para eliminar una reseña
    const handleDeleteReview = (index) => {
        // Realizar la solicitud DELETE para eliminar la reseña
        const reviewToDelete = reviews[index];
        axios.delete(`${API_URL}/reviews/${reviewToDelete.id}`)
            .then(() => {
                // Actualizar el estado de las reseñas después de la eliminación
                const updatedReviews = [...reviews];
                updatedReviews.splice(index, 1);
                setReviews(updatedReviews);
            })
            .catch((error) => {
                console.log(error);
            });
    };



    return (
        <div className="reviews-page">
            <div className="contenedor-vertical-reviews">
                <div className="elemento1">
                    <form onSubmit={handleFormSubmit}>
                        <label htmlFor='calificacion'>Queremos saber tu experiencia</label>
                        <input type="number" id="calificacion" name="calificacion" placeholder="Calificanos de 1 a 5" value={newReview.calificacion} onChange={handleInputChange} />
                        <label htmlFor="comentario">Comentario</label>
                        <textarea id="comentario" name="comentario" placeholder="Comentanos tu experiencia" value={newReview.comentario} onChange={handleInputChange} />
                        <button type="submit">Enviar</button>
                    </form>
                </div>
                <div className="elemento2">
                    <h3>Otras opiniones sobre nuestro trabajo</h3>
                </div>
                <div className="elemento3">
                    {/* Mapea sobre las reseñas y renderiza los componentes de reseña */}
                    {reviews.map((review, index) => (
    <Review
        key={index}
        id={review.id}  // Pasa el id como prop
        nombre={review.nombre}
        calificacion={review.calificacion}
        comentario={review.comentario}
        onDelete={() => handleDeleteReview(index)}
    />
))}
                </div>
            </div>
        </div>
    );
}

// Componente de reseña individual
function Review({ id, nombre, calificacion, comentario }) {
    // Función para generar las estrellas en base a la calificación
    const renderStars = () => {
        const maxStars = 5; // Número máximo de estrellas permitidas
        const starArray = [];

        // Limitar la calificación al rango de 1 a maxStars
        const limitedRating = Math.min(Math.max(calificacion, 1), maxStars);

        // Crear un array con elementos de estrella para cada punto de calificación
        for (let i = 0; i < limitedRating; i++) {
            starArray.push(<img key={i} src="../../../public/img/estrella.png" alt="Estrella" />);
        }

        return starArray;
    };

    return (
        <div className="review">
            <div className="icono-calificacion">
                <img src="../../../public/img/hombre.png" alt="Icono de calificación" style={{ width: '70%', height: '80%' }} />
            </div>

            <div className="box-calificacion">
            <div className="header-review">
                    {nombre}{" "}{renderStars()}

                <div className="comentario">{comentario}</div>



                </div>

            </div>
        </div>
    );
}

export default Reviews;
