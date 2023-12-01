/* eslint-disable react/prop-types */
import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../auth/AuthContext';
import './UserDropdown.css';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import API_URL from '../../config';

const UserDropdown = ({auth, setAuth}) => {
    const { token, logout } = useContext(AuthContext);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const navigate = useNavigate();
    const [perfil, setPerfil] = useState({
        nombre: 'Nombre de Usuario',
        correo: 'usuario@example.com',
        contraseña: 'contraseña',
        // Otros campos del perfil
    });

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleLogout = () => {
        logout();
        setPerfil({
            nombre: 'Nombre de Usuario',
            correo: 'usuario@example.com',
            contraseña: 'contraseña',
})
        
        setIsDropdownOpen(false);
        setAuth(false);
        navigate('/');
        // Puedes agregar más lógica de redirección u otras acciones después de cerrar sesión.
    };

    const handleNavigatetoReservations = () => {
        navigate('/reservations');
        setIsDropdownOpen(false);
    };

    const handleNavigatetoProfile = () => {
        navigate('/profile');
        setIsDropdownOpen(false);
    };

    useEffect(() => {
        if (token && token !== 'null') {
            const decodedToken = jwtDecode(token);
            const userId = decodedToken.sub;
            console.log('ID de usuario:', userId);
            
            const config = {
                method: 'get',
                url: `${API_URL}/users/${userId}`,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            axios(config)
                .then((response) => {
                    const data = response.data;
                    setPerfil(data)
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [token])


return (
    <div className="user-dropdown">
        <button onClick={toggleDropdown}>{perfil.nombre}</button>
        {isDropdownOpen && (
            <div className="dropdown-content">
                <button onClick={handleNavigatetoReservations}>Mis reservas</button>
                <button onClick={handleNavigatetoProfile}>Mi perfil</button>
                <button onClick={handleLogout}>Cerrar sesión</button>
            </div>
        )}
    </div>
);
};

export default UserDropdown;
