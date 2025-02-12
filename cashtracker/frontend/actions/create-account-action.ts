"use server"

// formData -> Recupera los datos del formulario
export async function register(formData : FormData){
    console.log(formData.get('name'))
}