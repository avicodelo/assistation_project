//Const declarations, collection "providers"
const express = require("express");
const providerSchema = require("../models/provider");
const router = express.Router();
const handleDate = require("../middlewares/handleDate");

//provider creation "POST"
router.post("/", (req, res) => {
    const body = req.body;
    ({ name, surname, phone, dateOfBirth, email, password, city, locality, postalCode, typeOfService } = body);

    const provider = new providerSchema({
        name,
        surname,
        phone,
        dateOfBirth: handleDate(dateOfBirth),
        email,
        password,
        address: {
            city,
            locality,
            postalCode
        },
        typeOfService
    });

    provider.save((err, providerData) => {
        if (err) {
            res.status(400).json({ ok: false, err: err.message, cause: "user error" });
        } else {
            res.status(200).json({ ok: true, providerData });

        }
    })/*Redireccion del usuario al dasboard */
});

//Search customer "GET"
router.get("/", (req, res) => {
    const filters = req.query;
    console.log(filters);
    providerSchema.find({active: true}).find(filters).exec((err, showProviders) => {
        if(err){
            res.status(400).json({ ok: false, err });
        } else {
            res.status(200).json({ ok: true, results: showProviders });
        }
    });
})

module.exports = router;