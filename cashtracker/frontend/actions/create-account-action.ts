"use server"

// formData -> Recupera los datos del formulario
export async function register(formData : FormData){

    const registerData = {
        email: formData.get('email'),
        name: formData.get('name'),
        password: formData.get('password'),
        password_confirmation: formData.get('password_confirmation'),
    }

    // Validar

    

    // Registrar el usuario

}