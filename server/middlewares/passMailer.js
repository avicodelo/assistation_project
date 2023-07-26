//CONFIGURES MAILER TO RECOVER PASSWORD

//Modules imports
const nodemailer = require("nodemailer");

//Schemas
const customer = require("../models/customer");
const provider = require("../models/provider");

const mailer = (req, res, next) => {

    //Const settings
    const randomCode = Math.floor(Math.random() * 1000000)
    const body = req.body;
    const URL_ROLE = body.role === "PROVIDER" ? "prd" : "ctm";
    const schema = body.role === "PROVIDER" ? provider : customer;

    schema.findOne({ email: body.email }, (err, userDB) => {
        if (err) {
            res.status(500).json({ ok: false, err });

        } else if (!userDB) {
            res.status(400).json({ ok: false, error: "Email no encontrado" })

        } else {
            // Create a SMTP transporter object
            const transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 465,
                secure: true,
                auth: {
                    user: process.env.MAIL,
                    pass: process.env.MAILPASS
                }
            });
            //Message object
            const message = {
                from: `Equipo de Assistation <${process.env.MAIL}>`,
                to: body.email,
                subject: 'Recuperación de contraseña',
                html: `<p>Hola de nuevo ${userDB.name},</p></br>
                <p>Recientemente nos has indicado que olvidaste la contraseña para acceder al 
                área personal de Assistation. El código de activación que se te ha asignado es ${randomCode}.</p>
                <p>Puedes acceder al siguiente link para volver a establecer tu contraseña: 
                <a href=${process.env.URL_SETPASS}/${URL_ROLE}>${process.env.URL_SETPASS}/${URL_ROLE}</a></p></br>
                <p>El equipo de Assistation te desea un buen día, estamos muy contentos de que siga utilizando 
                nuestros servicios</p></br>`

            };

            transporter.sendMail(message, (err, info) => {
                if (err) {
                    req.mailerError = err;
                    next();
                } else {
                    req.mailerInfo = info;
                    req.randomCode = randomCode;
                    next();
                }
            });
        }
    })
}

module.exports = mailer;