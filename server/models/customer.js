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
        default: "blank-profile.png"
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

    nationality:{
        type: String,
        required: [true, "¿Dónde naciste?"]
    },

    address: {
        street: {
            type: String
        },

        number: {
            type: String
        },

        flat:{
            type: String
        },

        city: {
            type: String
        },

        locality: {
            type: String
        },

        country: {
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
        required: [true, "Necesitas un email válido"],
        set: v => v.toLowerCase()
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

    writenRemarks: [{
        type: Schema.Types.ObjectId,
        ref: "Remarks"
    }],

    role: {
        type: String,
        default: "CUSTOMER",
        enum: validRoles
    },

    active: {
        type: Boolean,
        default: true
    },

    chats:[{
        type: Schema.Types.ObjectId,
        ref: "Chats"
    }]


})

customerSchema.methods.toJSON = function () {
    const customer = this.toObject();
    delete customer.password;
    delete customer.active;
    delete customer.__v;
    return customer;
}

customerSchema.plugin(uniqueValidator, { message: "El {PATH} ya existe" });

module.exports = mongoose.model("Customer", customerSchema, "Customers");