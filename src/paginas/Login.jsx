import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import Alerta from "../components/Alerta";
import useAuth from "../hooks/useAuth";
import clienteAxios from "../config/axios";

const Login = () => {

    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ alerta, setAlerta ] = useState({});

    const { setAuth } = useAuth();
    const { msg } = alerta;

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if([ email, password ].includes('')) {
            setAlerta({
                msg: 'Todos los campos son obligatorios',
                error: true
            });
            return
        }
        try {
            const { data } = await clienteAxios.post('/veterinarios/login', {email, password});

            localStorage.setItem('apv_token', data.token);
    
            setAuth(data);
            navigate('/admin');

        } catch (error) {
            console.log(error)
            setAlerta({
                msg: error.response.data.msg,
                error: true
            });
        }
    }

  return (
    <>
        <div>
            <h1 className="text-indigo-600 font-black text-6xl">
                Iniciá Sesión para Administrar <span className="text-emerald-600">tus Pacientes</span>
            </h1>
        </div>
        <div className="mt-20 md:mt-5 shadow-lg px-5 rounded-xl bg-white lg:w-5/6 border-4 border-indigo-100">

        { msg && <Alerta
                alerta={alerta}
                /> }

            <form
            onSubmit={handleSubmit}>
                <div className="my-5">
                    <label 
                    className="text-gray-600 font-bold uppercase block text-xl">
                        Email
                    </label>
                    <input 
                    type="email"
                    placeholder="Ej: ana@correo.com"
                    className="mt-3 p-3 w-full border bg-gray-50 rounded-xl" 
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    />
                </div>
                <div className="my-5">
                    <label 
                    className="text-gray-600 font-bold uppercase block text-xl">
                        Password
                    </label>
                    <input 
                    type="password"
                    placeholder="Ingresá tu password"
                    className="mt-3 p-3 w-full border bg-gray-50 rounded-xl" 
                    value={password}
                    onChange={e => setPassword(e.target.value)}/>
                </div>
                <input type="submit"
                value="Iniciar sesión"
                className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white font-bold uppercase hover:cursor-pointer hover:bg-indigo-800 md:w-auto" />
            </form>

            <nav className="mt-10 lg:flex lg:justify-between">
                <p 
                className="block text-center my-5 text-gray-500"
                >No tengo cuenta. 
                    <Link to="/registrar" 
                    className="text-indigo-600 font-bold"> Crear una
                    </Link>
                </p>
                <Link to="/olvide-password"
                className="block text-center my-5 text-emerald-500"
                >Olvidé mi contraseña</Link>
            </nav>
        </div>
    </>
  );
}

export default Login