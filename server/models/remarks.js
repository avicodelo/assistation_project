const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const remarksSchema = new Schema({
    userId: {
        type: String,
        required: "ID needed"
    },

    writer: {
        userImage: {
            type: String /*Añadir un getter (ver documentación: https://mongoosejs.com/docs/schematypes.html#arrays) */
        },
        userName: {
            type: String
        },
        writerId: {
            type: String
        }
    },

    rate: {
        type: Number,
        required: "¿Qué puntuación le das?"
    },

    title: {
        type: String,
        required: "Pon un título a tu opinión"
    },

    mainBody: {
        type: String,
        required: "Necesitamos tu opinión"
    },

    deployDate: {
        type: Date,
        default: new Date()
    }

})

module.exports = mongoose.model("Remarks", remarksSchema, "Remarks")