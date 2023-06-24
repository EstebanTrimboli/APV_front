import { useState, useEffect } from "react"
import Alerta from "./Alerta";
import usePacientes from "../hooks/usePacientes";

const Formulario = () => {

    const [ nombre, setNombre ] = useState('');
    const [ humano, setHumano ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ fecha, setFecha ] = useState(''); //Date.now() ??
    const [ sintomas, setSintomas ] = useState('');
    const [ id, setId ] = useState(null);

    const [ alerta, setAlerta ] = useState({});

    const { guardarPaciente, paciente } = usePacientes();

    useEffect( () => {
        if(paciente?.nombre) {
            setNombre(paciente.nombre);
            setHumano(paciente.humano);
            setEmail(paciente.email);
            setFecha(paciente.fecha);
            setSintomas(paciente.sintomas);
            setId(paciente._id);
        }
    }, [paciente])

    const handleSubmit = e => {
        e.preventDefault();

        if([nombre, humano, email, fecha, sintomas].includes('')) {
            setAlerta(
                { msg:'Todos los campos son obligatorios',
                  error: true} );
            return;
        }

        
        guardarPaciente({nombre, humano, email, fecha, sintomas, id});

        setAlerta({
            msg: "Guardado correctamente"
        });


        setNombre('');
        setHumano('');
        setEmail('');
        setFecha('');
        setSintomas('');
        setId('');
    }

    const { msg } = alerta

  return (
    <>

        <h2 className="text-center font-black text-3xl mt-3">
            Nuevo paciente 
        </h2>

        <p className="text-center text-xl mt-5 mb-10">
            Agregá tus pacientes y {''}
            <span className="text-indigo-600 font-bold">
                     administralos
            </span>
        </p>
        
        {msg && <Alerta alerta={alerta} />}

        <form
        className="bg-white py-10 px-5 mb-10 lg:mb-0 shadow-md rounded-md border-4 border-indigo-100"
        onSubmit={handleSubmit}>
            <div className="mb-5">
                <label htmlFor="nombre"
                className="text-gray-700 uppercase font-bold">
                    Nombre Mascota
                </label>
                <input 
                id="nombre"
                type="text"
                placeholder="Nombre de la mascota"
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                />
            </div>
            <div className="mb-5">
                <label htmlFor="humano"
                className="text-gray-700 uppercase font-bold">
                    Nombre Humano
                </label>
                <input 
                id="humano"
                type="text"
                placeholder="Nombre del Humano"
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                value={humano}
                onChange={(e) => setHumano(e.target.value)}
                />
            </div>
            <div className="mb-5">
                <label htmlFor="email"
                className="text-gray-700 uppercase font-bold">
                    Email
                </label>
                <input 
                id="email"
                type="email"
                placeholder="Email del Humano"
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className="mb-5">
                <label htmlFor="fecha"
                className="text-gray-700 uppercase font-bold">
                    Fecha alta
                </label>
                <input 
                id="fecha"
                type="date"
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                value={fecha}
                onChange={(e) => setFecha(e.target.value)}
                />
            </div>
            <div className="mb-5">
                <label htmlFor="sintomas"
                className="text-gray-700 uppercase font-bold">
                    Síntomas
                </label>
                <textarea 
                id="sintomas"
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                value={sintomas}
                onChange={(e) => setSintomas(e.target.value)}
                />
            </div>

            <input
            type="submit"
            className="bg-indigo-600 w-full uppercase p-3 text-white font-bold hover:bg-indigo-700 cursor-pointer transition-colors"
            value={id ? "Guardar cambios" : "Agregar paciente"}/>

        </form>
    </>
  )
}

export default Formulario