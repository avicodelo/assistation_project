//CONFIGURES MAILER TO CONTACT WITH AN USER

const config = require("../config/config");
//Modules imports
const nodemailer = require("nodemailer");

const mailer = (req, _res, next) => {
    const body = req.body;
    // Create a SMTP transporter object
    const transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 465,
        secure: true,
        auth: {
            user: config.MAIL,
            pass: config.MAILPASS
        }
    });
    // Message object
    const message = {
        from: `${body.name} <${body.email}>`,
        to: `Equipo de Assistation <${config.MAIL}>`,
        subject: 'Message from Contact page',
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