import { createTransport } from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

export const transporter = createTransport({
    host: 'smtp.gmail.com',
    port: process.env.PORT_GMAIL,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
})

export const emailOptions = {
    from: process.env.EMAIL,
    to: process.env.EMAIL,
    subject: "Primer envio de email",
    html: "<h1>Hola! este es el mensaje del email con html</h1>",
    attachments: [
        {
            path: process.cwd() + "/src/services/texto.txt",
            filename: "texto-adjunto"
        }
    ]
}