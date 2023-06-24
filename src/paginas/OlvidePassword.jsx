import { useState } from "react"
import { Link } from "react-router-dom"
import Alerta from "../components/Alerta"
import clienteAxios from "../config/axios"

const OlvidePassword = () => {
  const [ email, setEmail ] = useState('');
  const [ alerta, setAlerta ] = useState({})

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(email === '') {
      setAlerta({
        msg: 'El email es obligatorio',
         error: true});

      return;
    }

    try {
      const {data} = await clienteAxios.post('/veterinarios/olvide-password', {email});
      setAlerta({msg: data.msg})
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error:true
      });
    }

  }

  const { msg } = alerta;

  return (
    <>
        <div className="align-items-center">
            <h1 className="text-indigo-600 font-black text-6xl">
            Recuperá el acceso a {''} <span className="text-emerald-600">tu cuenta</span> 
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
                placeholder="Dirección de email para recuperar la contraseña"
                className="mt-3 p-3 w-full border bg-gray-50 rounded-xl" 
                value={email}
                onChange={ e => setEmail(e.target.value) }/>
            </div>
            <input type="submit"
            value="Crear cuenta"
            className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white font-bold uppercase hover:cursor-pointer hover:bg-indigo-800 md:w-auto" />
          </form>

          <nav className="mt-10 lg:flex lg:justify-between">
                <p 
                className="block text-center my-5 text-gray-500"
                >Recordé la contraseña! {'\n'} 
                    <Link to="/" 
                    className="text-indigo-600 font-bold"> Volver a Login
                    </Link>
                </p>
                <p 
                className="block text-center my-5 text-gray-500"
                >No tengo cuenta. 
                    <Link to="/registrar" 
                    className="text-indigo-600 font-bold"> Crear una
                    </Link>
                </p>
            </nav>

        </div>
    </>
  )
}

export default OlvidePassword