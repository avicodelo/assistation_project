//Const settings, collection "contactsAlone"
const router = require("express").Router();

//Schemas
const contactAloneSchema = require("../models/contactsAlone");

//Middles
const mailer = require("../middlewares/mailer");

//Saves the info of user that has contacted
router.post("/", mailer, async (req, res, next) => {
    const body = req.body;
    const mailerInfo = req.mailerInfo;
    const mailerError = req.mailerError;
    const { name, surname, email, helpText } = body

    try {
        const emailExist = await contactAloneSchema.findOne({ email: email })

        if (!emailExist) {
            const contactAlone = new contactAloneSchema({
                name,
                surname,
                email,
                helpText
            })
            await contactAlone.save()
        }

        if (mailerError) {
            res.status(500).json({ ok: false, error: mailerError, cause: "mailer fail" })
        } else {
            res.status(200).json({ ok: true, info: mailerInfo.accepted });
        }
    }
    catch (error) {
        next(error)
    }

})

module.exports = router;