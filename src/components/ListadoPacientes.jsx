import usePacientes from "../hooks/usePacientes"
import Paciente from "./Paciente";

const ListadoPacientes = () => {

    const {pacientes} = usePacientes();

    return (
      <>
          { pacientes.length ? (
            <>
            <h2 className="text-center font-black text-3xl ">
                Listado de pacientes 
            </h2>
            <p className="text-center text-xl mt-5 mb-10">
                Administrá tus {''}
                <span className="text-indigo-600 font-bold">
                     pacientes y citas
                </span>
            </p>

            {pacientes.map( paciente => (
                <Paciente 
                 key={paciente._id}
                 paciente={paciente}
                />
            ))}

            </>
          ) 

          : (
            <>
                <h2 className="text-center font-black text-3xl ">
                    No hay pacientes aun
                </h2>
                <p className="text-center text-xl mt-5 mb-10">
                    Comenzá a agregar pacientes y {''}
                    <span className="text-indigo-600 font-bold">
                         aparecerán aquí
                    </span>
                </p>
            </>
          ) }
      </>
    )
  }
  
  export default ListadoPacientes