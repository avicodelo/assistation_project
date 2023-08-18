//CONFIGURES MAILER TO CONTACT WITH AN USER

const config = require("../config/config");
//Modules imports
const nodemailer = require("nodemailer");


const mailer = (req, _res, next) => {
    const body = req.body;
    // Create a SMTP transporter object
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: config.MAIL,
            pass: config.MAILPASS
        }
    });

    // Message object
    const message = {
        to: `Equipo de Assistation`,
        subject: `Contacto desde Assistation <${body.email}>`,
        html: `<p>${body.helpText}</p>`
    };

    transporter.sendMail(message, (err, info) => {
        if (err) {
            req.mailerError = err;
            next();
        } else {
            req.mailerInfo = info;
            next();
        }
    });
}

module.exports = mailer;