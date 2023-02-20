require("../config/config")

const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();

const Customer = require("../models/customer");
const Provider = require("../models/provider");



router.post("/", (req, res) => {
    const body = req.body;
    if (body.typeOfUser === "provider") {
        Provider.findOne({ email: body.email }, (err, userDB) => {
            if (err) {
                res.status(500).json({ ok: false, err });
            } else if (!userDB) {
                res.status(400).json({ ok: false, error: "Email not found" })
            } else if (body.password !== userDB.password) {
                res.status(400).json({ ok: false, error: "Wrong password" });
            } else {
                const token = jwt.sign({ userDB: userDB }, process.env.SEED, { expiresIn: 60 * 60 * 24 });
                res.status(200).json({ ok: true, token, userDB });
            }
        })
    } else {
        Customer.findOne({ email: body.email }, (err, userDB) => {
            if (err) {
                res.status(500).json({ ok: false, err });
            } else if (!userDB) {
                res.status(400).json({ ok: false, error: "Email not found" })
            } /* else if (body.password !== userDB.password) {
                res.status(400).json({ ok: false, error: "Wrong password" });
            } */ else {
                const token = jwt.sign({ userDB: userDB }, process.env.SEED, { expiresIn: 60 * 60 * 24 });
                res.status(200).json({ ok: true, token, userDB });
            }
        })
    }
})

module.exports = router;