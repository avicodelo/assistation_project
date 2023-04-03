const express = require("express")
const router = express.Router();
const providerSchema = require("../models/provider")
const customerSchema = require("../models/customer")
const remarksSchema = require("../models/remarks")
const verifyToken = require("../middlewares/auth")


router.get("/getRemarks/:userID", async (req, res) => {
    const id = req.params.userID
    const { page } = req.query

    const PAGE_SIZE = 1;
    const totalEntries = await remarksSchema.countDocuments({ userId: id });
    const totalPages = Math.ceil(totalEntries / PAGE_SIZE);
    const pageSelected = page || 1;

    remarksSchema.find({ userId: id })
        .skip((pageSelected - 1) * PAGE_SIZE)
        .limit(PAGE_SIZE)
        .populate("writer", {
            photo: 1,
            name: 1,
            surname: 1,
            "address.city": 1
        })
        .exec((err, remarks) => {
            if (err) {
                res.status(400).json({ ok: false, message: err })
            } else {
                res.status(200).json({ ok: true, totalPages, results: remarks })
            }
        })
})


//PUT to modify remarks and check that user is only customer (only customers write remarks to providers)
router.post("/postRemark/:userID", verifyToken, async (req, res) => {
    const id = req.params.userID;
    const payload = req.payload["userDB"];
    let body = req.body;

    if (payload.role === "CUSTOMER") {

        const remark = new remarksSchema({
            userId: id,
            writer: payload._id,
            rate: body.rate,
            title: body.title,
            mainBody: body.mainBody,

        })
        const provider = await providerSchema.findOne({ _id: id })
        const customer= await customerSchema.findOne({_id: payload._id })

        remark.save(async (err, remarkSaved) => {
            if (err) {
                res.status(400).json({ ok: false, message: err })
            } else {
                provider.rates = provider.rates.concat(remarkSaved.rate)
                provider.remarks = provider.remarks.concat(remarkSaved._id)

                customer.writenRemarks = customer.writenRemarks.concat(remarkSaved._id)

                await provider.save(); await customer.save()
                res.status(200).json({ ok: true, remarkSaved })
            }
        })

    } else {
        res.status(400).json({ ok: false, message: "Es necesario haber contratado el servicio para escribir un comentario" })
    }

})




module.exports = router