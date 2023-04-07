const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const chatSchema = new Schema({
    participants: {
        provider: {
            type: Schema.Types.ObjectId,
            ref: "Provider"
        },
        customer: {
            type: Schema.Types.ObjectId,
            ref: "Customer"
        }

    },
    messages: [{
        sender: {
            provider: {
                type: Schema.Types.ObjectId,
                ref: "Provider"
            },
            customer: {
                type: Schema.Types.ObjectId,
                ref: "Customer"
            },
        },
        receiver: {
            provider: {
                type: Schema.Types.ObjectId,
                ref: "Provider"
            },
            customer: {
                type: Schema.Types.ObjectId,
                ref: "Customer"
            },
        },
        text: {
            type: String
        },
        read: {
            type: Boolean,
            default: false
        },
        createdAt: {
            type: Date,
            default: new Date()
        }
    }]
})


module.exports = mongoose.model("Chats", chatSchema, "Chats")