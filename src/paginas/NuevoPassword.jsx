import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom";
import Alerta from "../components/Alerta";

const NuevoPassword = () => {
    const [ password, setPassword ] = useState('');
    const [ alerta, setAlerta ] = useState({});
    const [ tokenValido, setTokenValido ] = useState(false);
    const [ passModificado, setPassModificado ] = useState(false);

    const params = useParams();
    const {token} = params;

    useEffect(() => {
     const comprobarToken = async () => {
        try {
            await clienteAxios(`/veterinarios/olvide-password/${token}`);
            setAlerta({
                msg: 'Ingresá tu nuevo password'
            });
            setTokenValido(true);
        } catch (error) {
            setAlerta({
                msg: 'Hubo un error con el enlace',
                error: true
            })
        }
     }
     comprobarToken()
    }, []);

    const {msg} = alerta;

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(password.length < 6) {
            setAlerta({
                msg: 'El password debe tener al menos 6 caracteres',
                error: true
            });

        try {
            const url = `/veterinarios/olvide-password/${token}`;
            const { data } = await clienteAxios.post(url, {password});

            setAlerta({
                msg: data.msg
            });
            setPassModificado(true);
            return
        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            });
        }

        }
    }

  return (
    <>
    <div>
        <h1 className="text-indigo-600 font-black text-6xl">
            Reestablece
            <span className="text-emerald-600"> tu password</span>
        </h1>
    </div>

    <div className="mt-20 md:mt-5 shadow-lg px-5 rounded-xl bg-white lg:w-5/6">

    { msg && 
        <Alerta
        alerta={alerta}
        /> }

    { tokenValido && ( 
        <form
        onSubmit={handleSubmit}>
            <div className="my-5">
                <label 
                className="text-gray-600 font-bold uppercase block text-xl">
                  Nuevo Password
                </label>
                <input 
                type="password"
                placeholder="Escribí una contraseña para tu cuenta"
                className="mt-3 p-3 w-full border bg-gray-50 rounded-xl"
                value={password}
                onChange={ e => setPassword(e.target.value) }/>
            </div>

            <input 
             type="submit"
             value="Guardar"
             className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white font-bold uppercase hover:cursor-pointer hover:bg-indigo-800 md:w-auto" />
        </form> ) }


        { passModificado && <Link to="/" 
        className="text-indigo-600 font-bold"> Iniciá sesión
        </Link>}
    </div>

    </>
  )
}

export default NuevoPassword