//Const settings
const router = require("express").Router();
const bcrypt = require("bcrypt");

//Schemas
const providerSchema = require("../models/provider");
const customerSchema = require("../models/customer");

//Middles
const passMailer = require("../middlewares/passMailer");

//Alerts via email if any user has forgotten his password
router.post("/", passMailer, async (req, res, next) => {
    const body = req.body;
    const randomCode = req.randomCode
    const schema = body.role === "PROVIDER" ? providerSchema : customerSchema

    const mailerInfo = req.mailerInfo;
    const mailerError = req.mailerError;

    if (mailerError) {
        res.status(500).json({ ok: false, error: "No se pudo enviar el correo" })

    } else {

        try {
            const userToChangePass = await schema.findOne({ active: true, email: body.email });
            userToChangePass.activationCode = randomCode;
            await userToChangePass.save()
            res.status(200).json({ ok: true, message: mailerInfo.accepted });
        }

        catch (error) {
            next(error)
        }
    }
})

//Sets the new password when the user has forgotten it
router.put("/setPass", async (req, res, next) => {
    const body = req.body;
    const schema = body.role && body.role === "PROVIDER" ? providerSchema : customerSchema;

    const userToChangePass = await schema.findOne({ active: true, email: body.email })

    if (!userToChangePass) {
        res.status(400).json({ ok: false, error: "El email no existe" })
    } else if (Number(body.code) !== userToChangePass.activationCode) {
        res.status(400).json({ ok: false, error: "El código de activación no es correcto" })
    } else {
        try {
            userToChangePass.password = bcrypt.hashSync(body.password, 10)
            userToChangePass.activationCode = undefined
            userToChangePass.save()
            res.status(200).json({ ok: true, message: "Contraseña actualizada" })
        }
        catch (error) {
            next(error);
        }
    }
})

module.exports = router;