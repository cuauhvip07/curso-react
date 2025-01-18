import bcrypt from 'bcrypt'

export const hashPassword = async (password: string) => {
    const salt = await bcrypt.genSalt(10) // Numero de rondas
    return await bcrypt.hash(password,salt)
}