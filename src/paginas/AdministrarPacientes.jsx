import { useState } from "react"
import ListadoPacientes from "../components/ListadoPacientes"
import Formulario from "../components/Formulario"

const AdministrarPacientes = () => {

    const [ mostrarForm, setMostrarForm ] = useState(false);

  return (
    <div className="flex flex-col md:flex-row p-3"
         //style={{backgroundImage: "url('/14710.jpg')"}}
         >
        <button
        type="button"
        className="text-white bg-indigo-600 font-bold uppercase hover:bg-indigo-700 mx-10 p-3 rounded-md mb-10 md:hidden"
        onClick={() => setMostrarForm(state => !state)}>
            {mostrarForm ? 'Ocultar Formulario' : 'Mostrar Formulario'}
        </button>

        <div className={`${mostrarForm ? 'block' : 'hidden' } md:block md:w-1/2 lg:w-2/5`}>
            <Formulario
            className="border-4 border-indigo-00"/>
        </div>

        <div className="md:w-1/2 lg:w-3/5 mt-4">
            <ListadoPacientes/>
        </div>
    </div>
  )
}

export default AdministrarPacientes