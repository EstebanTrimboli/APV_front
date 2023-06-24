import { Link } from "react-router-dom"
import { useState } from "react"
import clienteAxios from '../config/axios'
import Alerta from "../components/Alerta";


const Registrar = () => {

  const [ nombre, setNombre ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ repetirPassword, setRepetirPassword ] = useState('');

  const [ alerta, setAlerta ] = useState({});

  const handleSubmit = async e => {
    e.preventDefault();

    if( [nombre, email, password, repetirPassword].includes('') ) {
      setAlerta( {msg: 'Todos los campos son oobligatorios', error: true} );
      return;
    }

    if(password !== repetirPassword) {
      setAlerta( {msg: 'Las contraseñas no coinciden', error: true} );
      return;
    }

    if(password.length < 6) {
      setAlerta( {msg: 'Contraseña muy corta. Debe tener al menos 6 caracteres', error: true} );
      return;
    }

    setAlerta({});

    // Crea el usuario en la API
    try {
      await clienteAxios.post('/veterinarios', { nombre, email, password });
      setAlerta({
        msg: "Cuenta creada correctamente. Revisá tu correo",
        error: false
      })
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      });
    }

  }

  const { msg } = alerta; 

  return (
    <>
        <div>
            <h1 className="text-indigo-600 font-black text-6xl">
              Creá una cuenta para administrar
              <span className="text-emerald-600"> tus pacientes</span>
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
                  Nombre
                </label>
                <input 
                type="text"
                placeholder="Ej: Tu nombre"
                className="mt-3 p-3 w-full border bg-gray-50 rounded-xl" 
                value={nombre}
                onChange={ e => setNombre(e.target.value) }/>
              </div>

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
                onChange={ e => setEmail(e.target.value) }/>
              </div>

              <div className="my-5">
                <label 
                className="text-gray-600 font-bold uppercase block text-xl">
                  Password
                </label>
                <input 
                type="password"
                placeholder="Escribí una contraseña para tu cuenta"
                className="mt-3 p-3 w-full border bg-gray-50 rounded-xl"
                value={password}
                onChange={ e => setPassword(e.target.value) }/>
              </div>

              <div className="my-5">
                <label 
                className="text-gray-600 font-bold uppercase block text-xl">
                  Confirmar Password
                </label>
                <input 
                type="password"
                placeholder="Volvé a escribir la cuenta"
                className="mt-3 p-3 w-full border bg-gray-50 rounded-xl"
                value={repetirPassword}
                onChange={ e => setRepetirPassword(e.target.value) }/>
              </div>

              <input type="submit"
              value="Crear cuenta"
              className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white font-bold uppercase hover:cursor-pointer hover:bg-indigo-800 md:w-auto" />
            </form>

            <nav className="mt-10 lg:flex lg:justify-between">
                <p 
                className="block text-center my-5 text-gray-500"
                >¿Ya tenés una cuenta? 
                    <Link to="/" 
                    className="text-indigo-600 font-bold"> Iniciá sesión
                    </Link>
                </p>
                <Link to="/olvide-password"
                className="block text-center my-5 text-emerald-500"
                >Olvidé mi contraseña</Link>
            </nav>
        </div>

    </>
  )
}

export default Registrar