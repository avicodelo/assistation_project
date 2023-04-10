const nodemailer = require("nodemailer");

const mailer = (req, _res, next) => {
    const body = req.body;
    // Create a SMTP transporter object
    const transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
            user: "faye49@ethereal.email",
            pass: "qbDx8bq9C7gkZbVuAV"
        }
    });
    // Message object
    const message = {
        from: `${body.name} <${body.email}>`,
        to: 'Customer support <faye49@ethereal.email>',
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

//test account created to check the functionality. 
//Only needed if you don't have a real mail account for testing
//delete in production phase
/*nodemailer.createTestAccount((err, account) => {
    if (err) {
        console.error('Failed to create a testing account. ' + err.message);
        return process.exit(1);
    }
 
    console.log('Credentials obtained, sending message...');
*/







module.exports = mailer;