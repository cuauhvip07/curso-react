import Pacientes from "./Pacientes"


function ListaPacientes(){

    return(
        <div className="md:w-1/2 md:h-screen overflow-y-scroll">
            <h2 className="font-black text-3xl text-center">Listado Pacientes</h2>
            <p className="mb-10 mt-5 text-center">Administra tus <span className="text-indigo-600">Pacientes y Citas</span></p>

            <Pacientes />
        </div>
    )
}

export default ListaPacientes