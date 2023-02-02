//Const declarations, collection "contactsAlone"
const express = require("express");
const contactAloneSchema = require("../models/contactsAlone");
const router = express.Router();
const mailer = require("../middlewares/mailer");

//ContactAlone creation "POST"
router.post("/", mailer, (req, res) => {
    const body = req.body;
    const mailerInfo = req.mailerInfo;
    const mailerError = req.mailerError;

    ({ name, surname, email, helpText } = body)

    const contactAlone = new contactAloneSchema({
        name,
        surname,
        email
    })


    contactAlone.save((_err, contact) => {
        if (mailerError) {
            res.status(500).json({ ok: false, err: mailerError, cause: "mailer fail" })
        }
        else {
            res.status(200).json({ ok: true, contact, info: mailerInfo.accepted });
        }
    })
})

//router export
module.exports = router;