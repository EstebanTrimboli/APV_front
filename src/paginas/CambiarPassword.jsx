import { useState } from "react"
import useAuth from "../hooks/useAuth";
import AdminNav from "../components/AdminNav";
import Alerta from "../components/Alerta";



const CambiarPassword = () => {

const [ alerta, setAlerta ] = useState({});
const [ pass, setPass ] = useState({
  pwd_actual: '',
  pwd_nuevo: ''
});

const { guardarPassword } = useAuth();

  const handleSubmit = async e => {
    e.preventDefault();

    if( Object.values(pass).some(campo => campo === '') ) {
      setAlerta({
        msg: 'Ambos campos son obligatorios',
        error: true
      });
      return;
    }

    if(pass.pwd_nuevo.length < 6) {
      setAlerta({
        msg: 'El password debe tener al menos 6 caracteres',
        error: true
      });
      return;
    }

    const respuesta = await guardarPassword(pass);

    setAlerta(respuesta);
  }

  const {msg} = alerta; 

  return (
    <>
        <AdminNav />

        <h2 className="font-black text-3xl text-center mt-10">Cambiar Password</h2>
        <p className="text-xl mt-5 mb-10 text-center">
            Modificá tu <span className="text-indigo-600 font-bold">password</span>
        </p>

        <div className="flex justify-center">
          <div className="w-full md:w-1/2 bg-white shadow rounded-lg p-5 border-4 border-indigo-100">

            { msg && <Alerta alerta={alerta}/> }

            <form
             onSubmit={handleSubmit}>

              <div className="my-3">
                <label className="uppercase font-bold text-gray-600">Password Actual</label>
                <input 
                type="password"
                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                name="pwd_actual"
                placeholder="Ingresá tu password actual"
                onChange={ e => setPass({
                  ...pass,
                  [e.target.name]: e.target.value
                })}
                />
              </div>

              <div className="my-3">
                <label className="uppercase font-bold text-gray-600">Nuevo Password</label>
                <input 
                type="password"
                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                name="pwd_nuevo"
                placeholder="Ingresá un nuevo password"
                onChange={ e => setPass({
                  ...pass,
                  [e.target.name]: e.target.value
                })}
                />
              </div>


              <input 
              type="submit"
              value="Actualizar Password"
              className="bg-indigo-700 px-10 py-3 font-bold text-white rounded-lg uppercase w-full mt-5 hover:cursor-pointer hover:bg-indigo-800" />

            </form>
          </div>
        </div>

    </>
  )
}

export default CambiarPassword