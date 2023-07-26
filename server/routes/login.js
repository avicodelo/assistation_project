//Const settings
const router = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

//Schemas
const customer = require("../models/customer");
const provider = require("../models/provider");

//Checks if user and password are correct
router.post("/", (req, res) => {
    const body = req.body;
    const schema = body.role === "PROVIDER" ? provider : customer;

    schema.findOne({ email: body.email }, (error, userDB) => {
        if (error) {
            res.status(500).json({ ok: false, error });

        } else if (!userDB) {
            res.status(400).json({ ok: false, error: "Email not found" })

        } else if (!bcrypt.compareSync(body.password, userDB.password)) {
            res.status(400).json({ ok: false, error: "Wrong password" });

        } else {
            const token = jwt.sign({ userDB: userDB }, process.env.SEED, { expiresIn: 60 * 60 * 24 });
            res.status(200).json({ ok: true, token, userDB: { _id: userDB._id, role: userDB.role } });
        }
    })

})

module.exports = router;