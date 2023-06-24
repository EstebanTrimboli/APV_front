import { useState, useEffect, createContext } from "react";
import clienteAxios from "../config/axios";

const AuthContext = createContext();  //Creo una instancia de la clase Context

const AuthProvider = ({children}) => {  // children hace referencia a todos los componentes hijos del Provider en App.jsx

    const [ auth, setAuth ] = useState({});
    const [ cargando, setCargando ] = useState(true);

    useEffect(() => {
        const autenticarUsuario = async () => {
            const token = localStorage.getItem('apv_token');

            if(!token) {
                setCargando(false);
                return
            }
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            }

            try {
                const { data } = await clienteAxios('/veterinarios/perfil', config);

                setAuth(data);

            } catch (error) {
                console.log(error);
                setAuth({});
            }

            setCargando(false);

        }
        autenticarUsuario();
    }, []);

    const cerrarSesion = () => {
        localStorage.removeItem('apv_token');
        setAuth({});
    }

    const actualizarPerfil = async (datos) => {
        const token = localStorage.getItem('apv_token');

            if(!token) {
                setCargando(false);
                return
            }
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            try {
                const url = `/veterinarios/perfil/${datos._id}`;
                const { data } = await clienteAxios.put(url, datos, config);

                return {msg: 'Actualizado correctamente'}

            } catch (error) {
                return {
                    msg: error.response.data.msg,
                    error: true
                };
            }

    }   

    const guardarPassword = async (datos) => {
        const token = localStorage.getItem('apv_token');

            if(!token) {
                setCargando(false);
                return
            }
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

        try {
            const url = 'veterinarios/actualizar-password';
            const { data } = await clienteAxios.put(url, datos, config);

            return {
                msg: data.msg
            }
        } catch (err) {
          return {
            msg: err.response.data.msg,
            error: true}
        }
    }

    return (
        <AuthContext.Provider
        value={{
            auth,
            setAuth,
            cargando,
            cerrarSesion,
            actualizarPerfil,
            guardarPassword
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export{
    AuthProvider
}

export default AuthContext