const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const uniqueValidator = require("mongoose-unique-validator");

//Schema definition
const userEmailSchema = new Schema({

    email: {
        type: String,
        unique: true,
        required: [true, "¿Cuál es tu email?"]
    },

    postalCode:{
        type: String,
        required: [true, "Indique el código postal"]
    },

    city: {
        type: String
    }

})

userEmailSchema.plugin(uniqueValidator, { message: "{PATH} ya existe" });

module.exports = mongoose.model("UserEmail", userEmailSchema, "UsersEmail");