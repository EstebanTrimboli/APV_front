import { Outlet, Navigate } from "react-router-dom"
import useAuth from "../hooks/useAuth"

import Header from "../components/Header";
import Footer from "../components/Footer";

const RutaProtegida = () => {

    const {auth, cargando} = useAuth();

    if(cargando) 
        return 'Cargando...'

  return (
            <>

                <Header />

                { auth?._id ? 
                ( <main className="container mx-auto mt-10 bg-[length:2900px_2900px]"
                //style={{backgroundImage: "url('/14710.jpg')"}}
                > <Outlet/> </main> )
                 : <Navigate to="/" />}

                <Footer />
            </>
  )
}

export default RutaProtegida