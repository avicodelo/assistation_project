//Const declarations
const router = require("express").Router();

//Schemas
const providerSchema = require("../models/provider");
const customerSchema = require("../models/customer");

//Middles
const passMailer = require("../middlewares/passMailer");

//Alert if any user has forgotten his password
router.post("/", passMailer, async (req, res,next) => {
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
            userToChangePass.activationCode= randomCode;
            await userToChangePass.save()
            console.log(userToChangePass.activationCode);
            res.status(200).json({ ok: true, message: mailerInfo.accepted });
        }

        catch (error) {
            next(error)
        }
    }
})

router.put("/setPass", (req, res) => {

})



module.exports = router;