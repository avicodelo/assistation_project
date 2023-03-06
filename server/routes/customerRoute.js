//Const declarations, collection "customer"
const express = require("express");
const bcrypt = require("bcrypt");
const customerSquema = require("../models/customer");
const router = express.Router();
const handleDate = require("../middlewares/handleDate");

//customer creation "POST"
router.post("/", (req, res) => {
    //body received

    const { name, surname, phone, dateOfBirth, nationality, email, password, 
        street, number, flat, city, locality, postalCode, country } = req.body

    //create new customer and save
    const customer = new customerSquema({
        name,
        surname,
        phone,
        dateOfBirth: handleDate(dateOfBirth),
        nationality,
        email,
        password : bcrypt.hashSync(password, 10),
        address: {
            street,
            number,
            flat,
            city,
            locality,
            postalCode,
            country
        }
    })

    customer.save((err, newCustomer) => {
        if (err) {
            res.status(400).json({ ok: false, err: err.message, cause: "user error" });
        } else {
            res.status(201).json({ ok: true, newCustomer });
        }
    })
});



module.exports = router;