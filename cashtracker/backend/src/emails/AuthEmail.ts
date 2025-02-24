import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()

type EmailType = {
    name: string,
    email: string,
    token: string
}



// Looking to send emails in production? Check out our Email API/SMTP product!
var transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: +process.env.EMAIL_PORT, // Usa 587 o 465 para SSL
    auth: {
      user: process.env.EMAIL_USER, // Usuario correcto
      pass: process.env.EMAIL_PASS  // Contraseña correcta
    }
});
  


export class AuthEmail {
    static sendConfirmationEmail = async (user : EmailType) => {
        try {
            const email = await transport.sendMail({
                from: 'CashTracker <admin@demomailtrap.com>',
                to: user.email,
                subject: 'Cashtracker - Confirma tu cuenta',
                html: `
                    <p>Hola: ${user.name}, has creado tu cuenta en CashTracker, ya esta casi lista</p>
                    <p>Visita el siguiente enlace;</p>
                    <a href="${process.env.FRONTEND_URL}/auth/confirm-account">Confirma tu cuenta</a>
                    <p>en ingresa el código <b>${user.token}</b></p>
                `
            })
            console.log(email)
        } catch (error) {
            console.log(error)
        }
    }

    static sendPasswordResetToken = async (user : EmailType) => {
        try {
            const email = await transport.sendMail({
                from: 'CashTracker <admin@demomailtrap.com>',
                to: user.email,
                subject: 'Cashtracker - Restablace tu password',
                html: `
                    <p>Hola: ${user.name}, has solicitado restablecer tu password</p>
                    <p>Visita el siguiente enlace;</p>
                    <a href="${process.env.FRONTEND_URL}/auth/new-password">Restablacer password</a>
                    <p>en ingresa el código <b>${user.token}</b></p>
                `
            })
            console.log(email)
        } catch (error) {
            console.log(error)
        }
    }
}