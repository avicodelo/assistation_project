const router = require("express").Router()

const userEmailSchema = require("../models/usersEmail")

router.post("/", async (req, res) => {

    const{email, postalCode, city}= req.body
    
    const newEmail = new userEmailSchema({
        email,
        postalCode,
        city
    })

    const emailExist = await userEmailSchema.findOne({ email: email })

    if (emailExist) {
        res.status(400).json({ ok: false, error: "Email exist" })
    } else {
        try {
            await newEmail.save()
            res.status(200).json({ ok: true, message: "Email saved" });
        }
        catch (error) {
            next(error)
        }
    }


})

module.exports = router