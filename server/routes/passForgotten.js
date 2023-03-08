
const express = require("express");
const router = express.Router();

const Customer = require("../models/customer");
const Provider = require("../models/provider");

router.post("/", (req, res) => {
    const body = req.body;

    if (body.role === "PROVIDER") {
        Provider.findOne({ email: body.email }, (err, userDB) => {
            if (err) {
                res.status(500).json({ ok: false, err });
            } else if (!userDB) {
                res.status(400).json({ ok: false, error: "Email no encontrado" })

            } else {
                res.status(200).json({ ok: true, message: "Provider encontrado" });
            }
        })
    } else {
        Customer.findOne({ email: body.email }, (err, userDB) => {
            if (err) {
                res.status(500).json({ ok: false, err });
            } else if (!userDB) {
                res.status(400).json({ ok: false, error: "Email no encontrado" })
            }else {
                res.status(200).json({ ok: true, message: "Customer encontrado" });
            }
        })
    }
})

module.exports = router;