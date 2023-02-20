//Const declarations
const express = require("express");
const verifyToken = require("../middlewares/auth");
const router = express.Router()

const providerSchema = require("../models/provider");
const customerSchema = require("../models/customer");


router.get("/:userID", verifyToken, (req, res) => {

    const id = req.params.userID;
    const payload = req.payload
    if (payload.userDB.role === "PROVIDER") {
        providerSchema.findOne({ active: true, _id: id }).exec((err, data) => {
            if (err) {
                res.status(401).json({ ok: false, err })
            } else {
                res.status(200).json({ ok: true, result: data, payload })
            }
        })

    } else if (payload.userDB.role === "CUSTOMER") {
        customerSchema.findOne({ active: true, _id: id }).exec((err, data) => {
            if (err) {
                res.status(401).json({ ok: false, err })
            } else {
                res.status(200).json({ ok: true, result: data, payload })
            }
        })
    }
})







module.exports = router;