//Const declarations
const express = require("express")
const router = express.Router()
const providerSchema = require("../models/provider");

router.get("/:userID", (req, res) => {
    const id = req.params.userID;
    providerSchema.find({ active: true, _id: id }).exec((err, data)=>{
        if(data){
            res.status(200).json({ok:true, result: data})
        }
    })
    

})


module.exports = router;