

function Formulario(){

    return(
        <div className="md:w-1/2 mx-5">
            <h2 className="font-black text-3xl text-center">Seguimiento de Pacientes</h2>
            <p className="text-lg text-center mt-5 mb-10">Añade pacientes y <span className="text-indigo-600">Administralos</span></p>

            <form className="bg-white py-10 px-5 shadow-md mb-10 rounded-lg">
                <div className="mb-5">
                    <label htmlFor="nombre" className="font-bold uppercase block text-gray-700">Nombre:</label>
                    <input 
                    type="text" 
                    placeholder="Ingrese su nombre" 
                    id="nombre"
                    className="border-2 w-full rounded-lg placeholder-gray-400 p-2 mt-2"/>
                </div>

                <div className="mb-5">
                    <label htmlFor="apellido" className="font-bold uppercase block text-gray-700">Apellido:</label>
                    <input 
                    type="text" 
                    placeholder="Ingrese su apellido" 
                    id="apellido"
                    className="border-2 w-full mt-2 p-2 rounded-lg placeholder-gray-400"/>
                </div>
            </form>
        </div>
    )
}

export default Formulario