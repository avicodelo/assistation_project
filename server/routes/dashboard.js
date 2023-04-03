//Const declarations
const express = require("express");
const router = express.Router()
const bcrypt = require("bcrypt")

//Middles
const verifyToken = require("../middlewares/auth");
const sharpUserAvatar = require("../middlewares/sharpUserAvatar.js")

const providerSchema = require("../models/provider");
const customerSchema = require("../models/customer");


router.get("/:userID", verifyToken, (req, res) => {

    const id = req.params.userID;
    const payload = req.payload["userDB"]
    const schema = payload.role === "PROVIDER" ? providerSchema : customerSchema
    schema.findOne({ active: true, _id: id }).exec((err, data) => {

        if (err) {
            res.status(401).json({ ok: false, err })
        } else if (id !== payload._id) {
            res.status(401).json({ ok: false, message: "ID Manipulado" })
        } else {
            res.status(200).json({ ok: true, result: data, payload })
        }
    })
})

router.get("/public/:userID", verifyToken, (req, res) => {
    const id = req.params.userID;

    providerSchema.findOne({ active: true, _id: id }).populate("remarks").exec((err, showProvider) => {
        if (err) {
            res.status(400).json({ ok: false, err });
        } else {
            res.status(200).json({ ok: true, result: showProvider });
        }
    });
})

router.post("/uploadImage/:userID", sharpUserAvatar, verifyToken, async (req, res) => {
    const id = req.params.userID;
    const payload = req.payload["userDB"];
    const schema = payload.role === "PROVIDER" ? providerSchema : customerSchema
    const imageName = req.imageName

    schema.findByIdAndUpdate(
        id,
        { photo: imageName },

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

router.put("/:userID", verifyToken, (req, res) => {
    const id = req.params.userID;
    const payload = req.payload["userDB"];
    const body = req.body;
    const schema = payload.role === "PROVIDER" ? providerSchema : customerSchema

    schema.findByIdAndUpdate(
        id,
        body.password ? { password: bcrypt.hashSync(body.password, 10) } : body,

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