//Const declarations
const router = require("express").Router();

//Schemas
const customer = require("../models/customer");
const provider = require("../models/provider");

//Alert if any user has forgotten his password
router.post("/", (req, res) => {
    const body = req.body;
    const schema = body.role === "PROVIDER" ? provider : customer;

        schema.findOne({ email: body.email }, (err, userDB) => {
            if (err) {
                res.status(500).json({ ok: false, err });

            } else if (!userDB) {
                res.status(400).json({ ok: false, error: "Email no encontrado" })

            } else {
                /*CONFIGURAR MAILER Y PASSWORD PARA ENVIAR CORREO CON INSTRUCCIONES DE RECUPERACIÓN */
                res.status(200).json({ ok: true, message: "Usuario encontrado" });
            }
        })
    
})

module.exports = router;