//Const declarations
const express = require("express");
const verifyToken = require("../middlewares/auth");
const bcrypt = require("bcrypt")
const router = express.Router()

const providerSchema = require("../models/provider");
const customerSchema = require("../models/customer");


router.get("/:userID", verifyToken, (req, res) => {

    const id = req.params.userID;
    const payload = req.payload["userDB"]
    const schema = payload.role === "PROVIDER" ? providerSchema : customerSchema
    
    schema.findOne({ active: true, _id: id }).exec((err, data) => {
        if (err) {
            res.status(401).json({ ok: false, err })
        } else {
            res.status(200).json({ ok: true, result: data, payload })
        }
    })
})

router.put("/:userID", verifyToken, (req, res) => {
    const id = req.params.userID;
    const payload = req.payload["userDB"];
    const body = req.body;
    const schema = payload.role === "PROVIDER" ? providerSchema : customerSchema

    schema.findByIdAndUpdate(
        id,
        body.password ? { password: bcrypt.hashSync(body.password, 10) } :  body ,

        {
            new: true,
            runValidators: true,
        },

        (err, updatedUser) => {
            if (err) {
                res.status(400).json({ ok: false, err })
            } else {
                res.status(200).json({ ok: true, updatedUser })
            }
        });
})

router.delete("/:userID", verifyToken, (req, res) => {
    const id = req.params.userID;
    const payload = req.payload["userDB"];
    const body = req.body;
    const schema = payload.role === "PROVIDER" ? providerSchema : customerSchema

    schema.findByIdAndUpdate(
        id,
        { active: false },

        {
            new: true,
            runValidators: true,
        },

        (err, userDB) => {
            if (err) {
                res.status(500).json({ ok: false, err });

            } else if (!bcrypt.compareSync(body.password, userDB.password)) {
                res.status(400).json({ ok: false, error: "Wrong password" });

            } else {

                res.status(200).json({ ok: true, message: "User deleted" });
            }
        }
    )
})


module.exports = router;