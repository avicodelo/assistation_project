//Const declarations, collection "customer"
const express = require("express");
const customerSquema = require("../models/customer");
const router = express.Router();
const handleDate = require("../middlewares/handleDate");

//customer creation "POST"
router.post("/", (req, res) => {
    //body received
    const body = req.body;
    ({ name, surname, dateOfBirth, phone, email, password, city, locality, postalCode } = body)

    //create new customer and save
    const customer = new customerSquema({
        name,
        surname,
        dateOfBirth: handleDate(dateOfBirth),
        phone,
        email,
        password,
        address: {
            city,
            locality,
            postalCode
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