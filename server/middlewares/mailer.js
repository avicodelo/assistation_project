//CONFIGURES MAILER TO CONTACT WITH AN USER

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
            user: process.env.MAIL,
            pass: process.env.MAILPASS
        }
    });
    // Message object
    const message = {
        from: `${body.name} <${body.email}>`,
        to: `Equipo de Assistation <${process.env.MAIL}>`,
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