require("../config/config")

const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
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
                res.status(400).json({ ok: false, error: "Email not found" })
            } else if (!bcrypt.compareSync(body.password, userDB.password)) {
                res.status(400).json({ ok: false, error: "Wrong password" });
            } else {
                const token = jwt.sign({ userDB: userDB }, process.env.SEED, { expiresIn: 60 * 60 * 24 }); //aplicar css a página en blanco de dashboard cuando caduca sesión
                res.status(200).json({ ok: true, token, userDB:{_id: userDB._id, role: userDB.role } });
            }
        })
    } else if (body.role === "CUSTOMER") {
        Customer.findOne({ email: body.email }, (err, userDB) => {
            if (err) {
                res.status(500).json({ ok: false, err });
            } else if (!userDB) {
                res.status(400).json({ ok: false, error: "Email not found" })
            } else if (!bcrypt.compareSync(body.password, userDB.password)) {
                res.status(400).json({ ok: false, error: "Wrong password" });
            } else {
                const token = jwt.sign({ userDB: userDB }, process.env.SEED, { expiresIn: 60 * 60 * 24 });
                res.status(200).json({ ok: true, token, userDB:{_id: userDB._id, role: userDB.role } });
            }
        })
    }
})

module.exports = router;