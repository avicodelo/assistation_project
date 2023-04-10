//Const declarations, collection "customer"
const router = require("express").Router();
const bcrypt = require("bcrypt");

//Schemas
const customerSquema = require("../models/customer");

//Middles
const handleDate = require("../middlewares/handleDate");

//customer creation "POST"
router.post("/", (req, res) => {
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
        password: bcrypt.hashSync(password, 10),
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