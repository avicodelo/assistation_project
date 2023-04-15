//Const declarations
const router = require("express").Router();
const bcrypt = require("bcrypt")

//Schemas
const providerSchema = require("../models/provider");
const customerSchema = require("../models/customer");

//Middles
const verifyToken = require("../middlewares/auth");
const sharpUserAvatar = require("../middlewares/sharpUserAvatar.js")

//Get user Data using ID
router.get("/:userID", verifyToken, (req, res) => {
    const id = req.params.userID;
    const payload = req.payload["userDB"]
    const schema = payload.role === "PROVIDER" ? providerSchema : customerSchema

    schema.findOne({ active: true, _id: id }).exec((error, data) => {
        if (error) {
            res.status(401).json({ ok: false, error })
        } else if (id !== payload._id) {
            res.status(401).json({ ok: false, error: "ID Manipulado" })
        } else {
            res.status(200).json({ ok: true, result: data, payload })
        }
    })
})

//Get user Data that can be showed to public
router.get("/public/:userID", verifyToken, (req, res) => {
    const id = req.params.userID;
    const payload = req.payload["userDB"]

    if (payload.role === "CUSTOMER") {
        providerSchema.findOne({ active: true, _id: id }).populate("remarks").exec((error, showProvider) => {
            if (error) {
                res.status(400).json({ ok: false, error });
            } else {
                res.status(200).json({ ok: true, result: showProvider });
            }
        });
    } else {
        res.status(400).json({ ok: false, error: "No eres un cliente" })
    }
})

//Upload a personal image
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

        (error, updatedUser) => {
            if (error) {
                res.status(400).json({ ok: false, error })
            } else {
                res.status(200).json({ ok: true, updatedUser })
            }
        });

})

//Modify information about user
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

        (error, updatedUser) => {
            if (error) {
                res.status(400).json({ ok: false, error })
            } else {
                res.status(200).json({ ok: true, updatedUser })
            }
        });
})

//Deactivate a user
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

        (error, userDB) => {
            if (error) {
                res.status(500).json({ ok: false, error });

            } else if (!bcrypt.compareSync(body.password, userDB.password)) {
                res.status(400).json({ ok: false, error: "Wrong password" });

            } else {
                res.status(200).json({ ok: true, message: "User deleted" });
            }
        }
    )
})


module.exports = router;