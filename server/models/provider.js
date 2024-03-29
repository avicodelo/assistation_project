const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const uniqueValidator = require("mongoose-unique-validator");

const validRoles = {
    values: ["PROVIDER"],
    messages: "{VALUE} is not a valid role"
}


//Schema definition
const providerSchema = new Schema({
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

    creationDate:{
        type: Date,
        default: new Date()
    },

    nationality: {
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

        flat: {
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
            type: Number,
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

    typeOfService: {
        type: String,
        required: [true, "Necesitamos saber el tipo de servicio que vas a prestar"],
    },

    areaOfResponsibility: [String],

    price: {
        type: Number
    },

    description: {
        type: String,
        default: "Descríbete, seguro que a la gente le encantará conocerte mejor"
    },

    rates: [Number],

    remarks:[{
        type: Schema.Types.ObjectId,
        ref: "Remarks"
    }],

    avgRate:{
        type: Number
    },

    role: {
        type: String,
        default: "PROVIDER",
        enum: validRoles
    },

    active: {
        type: Boolean,
        default: true
    },

    chats: [{
        type: Schema.Types.ObjectId,
        ref: "Chats"
    }],

    activationCode: {
        type: Number
    }
})

providerSchema.methods.toJSON = function () {
    const provider = this.toObject();
    delete provider.password;
    delete provider.active;
    delete provider.__v;
    return provider;
}
providerSchema.plugin(uniqueValidator, { message: "El {PATH} ya existe" });

module.exports = mongoose.model("Provider", providerSchema, "Providers");