//Const declarations, collection "contactsAlone"
const router = require("express").Router();

//Schemas
const contactAloneSchema = require("../models/contactsAlone");

//Middles
const mailer = require("../middlewares/mailer");

//ContactAlone creation "POST"
router.post("/", mailer, (req, res) => {
    const body = req.body;
    const mailerInfo = req.mailerInfo;
    const mailerError = req.mailerError;

    const { name, surname, email } = body

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

module.exports = router;