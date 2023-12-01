import { useEffect, useState, useContext } from "react";
import axios from 'axios';
import { AuthContext } from "../auth/AuthContext";
import API_URL from "../../config";

function UserCheck() {
    const { token } = useContext(AuthContext);
    const [msg, setMsg] = useState('');
    const [auth, setAuth] = useState(false);

    

    useEffect(() => {
        const config = {
            'method': 'get',
            'url': `${API_URL}/scope-example/protecteduser`,
            'headers': {
                'Authorization': `Bearer ${token}`
                
            }
        };

        axios(config).then((response) => {
            console.log('Enviaste un token correcto y estas logeado');
            setAuth(true);

            console.log(response);
            setMsg(response.data.message);
        }).catch((error) => {
            console.log('No estas logeado, hubo un error, el token expiro');
            console.log(error);
            setMsg(error.message);
        })

    }, [token]);

    return (
        <div className="UserCheck">
            <h1>{msg}</h1>
        </div>
    )
}

export default UserCheck;