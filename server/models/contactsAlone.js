//const declaration
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const uniqueValidator = require("mongoose-unique-validator");

//Schema definition
const contactAloneSchema = new Schema({
    name: {
        type: String,
        required: [true, "¿Cómo te llamas?"]
    },
    surname: {
        type: String
    },

    email: {
        type: String,
        unique: true,
        required: [true, "¿Cuál es tu email?"]
    }

})

contactAloneSchema.plugin(uniqueValidator, { message: "{PATH} ya existe" });

module.exports = mongoose.model("ContactAlone", contactAloneSchema, "ContactsAlone");