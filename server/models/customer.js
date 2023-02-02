//const declaration
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const uniqueValidator = require("mongoose-unique-validator");

const validRoles = {
    values: ["CUSTOMER", "PROVIDER"],
    messages: "{VALUE} is not a valid role"
}

//Schema definition
const customerSchema = new Schema({
    photo: {
        type: String,
        required: [true, "Imagen requerida"],
        default: "./images/vu-anh-TiVPTYCG_3E-unsplash.jpg"
    },

    name: {
        type: String,
        required: [true, "¿Cómo te llamas?"]
    },

    surname: {
        type: String,
        required: [true, "¿Cómo es tu apellido?"]
    },

    phone: {
        type: String,
        required: [true, "¿Cuál es tu número de teléfono?"]
    },

    dateOfBirth: {
        type: Date,
        required: [true, "¿Cuándo naciste?"]
    },

    address: {
        city: {
            type: String
        },

        locality: {
            type: String
        },
        postalCode: {
            type: String,
            required: [true, "Indicanos tu Código Postal"]

        }

    },

    email: {
        type: String,
        unique: true,
        required: [true, "Necesitas un email válido"]
    },

    password: {
        type: String,
        required: [true, "Necesitas una contraseña"]
    },

    description: {
        type: String,
        default: "Descríbete, seguro que a la gente le encantará conocerte mejor"
    },

    rates: {
        type: Number,
    },

    remarks: {
        type: String,
    },

    role: {
        type: String,
        default: "CUSTOMER",
        enum: validRoles
    },

    active: {
        type: Boolean,
        default: true
    },

    chat: {
        active: {
            type: Boolean
        },

        message: {
            type: String
        },
        lastMessage: {
            type: Date
        }
    }


})

customerSchema.plugin(uniqueValidator, {message: "El {PATH} ya existe" });

module.exports = mongoose.model("Customer", customerSchema, "Customers");