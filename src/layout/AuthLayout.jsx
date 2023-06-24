import { Outlet } from "react-router-dom"

const AuthLayout = () => {
  return (
    <>
        <main className="container mx-auto md:grid md:grid-cols-2 mt-10 gap-10 p-5 items-center"
       // style={{backgroundImage: "url('/14710.jpg')"}}
        >
          <Outlet/>
        </main>
    </>
  )
}

export default AuthLayout