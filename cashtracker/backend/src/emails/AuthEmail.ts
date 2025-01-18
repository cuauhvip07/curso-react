import nodemailer from 'nodemailer'

type EmailType = {
    name: string,
    email: string,
    token: string
}



// Looking to send emails in production? Check out our Email API/SMTP product!
var transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525, // Usa 587 o 465 para SSL
    auth: {
      user: "021900e817ea00", // Usuario correcto
      pass: "a6dfc8903a8dcf"  // Contraseña correcta
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
                    <a href="#">Confirma tu cuenta</a>
                    <p>en ingresa el código <b>${user.token}</b></p>
                `
            })
            console.log(email)
        } catch (error) {
            console.log(error)
        }
    }
}