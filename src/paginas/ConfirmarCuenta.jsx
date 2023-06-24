import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import Alerta from '../components/Alerta'
import clienteAxios from '../config/axios'

const ConfirmarCuenta = () => {
  
  const [ cuentaConfirmada, setCuentaConfirmada ] = useState(false);
  const [ cargando, setCargando ] = useState(true);
  const params = useParams();
  const { id } = params;
  const [ alerta, setAlerta ] = useState({});

  useEffect(() => {
    const confirmarCuenta = async () => {
      try {
        const { data } = await clienteAxios(`/veterinarios/confirmar/${id}`);
        setCuentaConfirmada(true);
        setAlerta({msg: data.msg})
        
      } catch (error) {
        setAlerta({
          msg: 'Token no válido',
          error: true
        })
      }
      setCargando(false);
    }
    confirmarCuenta();

  }, []);
  

  return (
    <>
        <div>
            <h1 className="text-indigo-600 font-black text-6xl">
              Por favor, confirmá tu cuenta
              <span className="text-emerald-600"> para comenzar</span>
            </h1>
        </div>

        <div className="mt-20 md:mt-5 shadow-lg px-5 rounded-xl bg-white lg:w-5/6 items-center">
          {!cargando && <Alerta
            alerta={alerta}
          />}

          {cuentaConfirmada && (
            <Link to='/' 
            className="text-indigo-600 font-bold text-center"> Iniciar sesión
            </Link>
            )
          }
        </div>
    </>
  )
}

export default ConfirmarCuenta