//Const declarations, collection "providers"
const express = require("express");
const bcrypt = require("bcrypt");
const providerSchema = require("../models/provider");
const router = express.Router();
const handleDate = require("../middlewares/handleDate");
const verifyToken = require("../middlewares/auth");

//provider creation "POST"
router.post("/", (req, res) => {

    const { name, surname, phone, dateOfBirth, nationality, email, password,
        street, number, flat, city, locality, postalCode, country, typeOfService } = req.body;

    const provider = new providerSchema({
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
        },
        typeOfService
    });

    provider.save((err, providerData) => {
        if (err) {
            res.status(400).json({ ok: false, err: err.message, cause: "user error" });
        } else {
            res.status(200).json({ ok: true, providerData });

        }
    })
});

//Search customer "GET" to Card
router.get("/", verifyToken, (req, res) => {
    const { order, ...filters } = req.query;
    const payload = req.payload;

    //Conditions to find
    let sortBy;
    order === "highPrice" && (sortBy = { price: -1 })
    order === "lowPrice" && (sortBy = { price: 1 })
    order === "highRate" && (sortBy = { rates: 1 })
    order === "lowRate" && (sortBy = { rates: -1 })

    filters.price && (filters.price = { $lte: parseInt(filters.price) });
    filters.rates && (filters.rates = { $gte: parseInt(filters.rates) });
    filters["address.city"] && (filters["address.city"] = { $regex: filters["address.city"], $options: 'i' })
    filters["address.locality"] && (filters["address.locality"] = { $regex: filters["address.locality"], $options: 'i' })

    providerSchema.find({ active: true, price: { $exists: true } }).find(filters).sort(order !== "standard" && sortBy).exec((err, showProviders) => {
        if (err) {
            res.status(400).json({ ok: false, err });
        } else {
            res.status(200).json({ ok: true, results: showProviders, payload });
        }
    });
})

//PUT to modify remarks and check that user is only customer (only customers write remarks to providers)
router.put("/setRemark/:userID", verifyToken, (req, res) => {
    const id = req.params.userID;
    const payload = req.payload["userDB"];
    let body = req.body;

    if (payload.role === "CUSTOMER") {
        body = {
            ...body,
            writer: {
                userImage: payload.photo,
                userName: payload.name + " " + payload.surname,
                userId: payload._id
            }
        }
        providerSchema.findByIdAndUpdate(
            id,
            { $push: { remarks: body, rates: body.rate } },

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
    } else {
        res.status(400).json({ ok: false, message: "Es necesario haber contratado el servicio para escribir un comentario" })
    }
})

module.exports = router;