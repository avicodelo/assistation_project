//Const settings, collection "chats"
const router = require("express").Router()

//Schemas
const chatSchema = require("../models/chats")
const providerSchema = require("../models/provider")
const customerSchema = require("../models/customer")

//Middles
const verifyToken = require("../middlewares/auth")

//Gets all chats where user is included
router.get("/", verifyToken, async (req, res, next) => {
    const payload = req.payload["userDB"];
    const { _id, role } = payload;
    const receiverRole = payload.role === "CUSTOMER" ? "provider" : "customer"

    const schema = role === "PROVIDER" ? providerSchema : customerSchema

    try {
        const userToFind = await schema
            .findOne({ _id: _id })
            .populate({
                path: 'chats',
                populate: {
                    path: `participants.${receiverRole}`,
                    select: "photo name surname typeOfService"
                }
            });
        const chatList = userToFind.chats
        res.status(200).json({ ok: true, chatList })
    }
    catch (error) {
        next(error)
    }

})

//Gets all messages inside a chat
router.get("/chatroom", verifyToken, async (req, res, next) => {

    const chatID = req.query.chatroom
    const payload = req.payload["userDB"]

    try {
        const chatroom = await chatSchema.findOne({ _id: chatID })
        //Checks if user is a chat's participant
        if (JSON.stringify(Object.values(chatroom.participants)).includes(payload._id)) {
            res.json({ ok: true, chekID: payload._id, chatroom })
        } else {
            res.status(400).json({ ok: false, error: "No participas en este chat" })
        }
    }
    catch (error) {
        next(error)
    }

})

//Posts new messages 
router.post("/", verifyToken, async (req, res, next) => {
    const payload = req.payload["userDB"];
    const receiverID = req.query.sendTo
    const senderID = payload._id
    const receiverRole = payload.role === "CUSTOMER" ? "provider" : "customer"
    const senderRole = payload.role === "CUSTOMER" ? "customer" : "provider"
    const { text, chatID } = req.body;

    const customer = await customerSchema.findById(payload.role === "CUSTOMER" ? senderID : receiverID)
    const provider = await providerSchema.findById(payload.role === "PROVIDER" ? senderID : receiverID)

    const messageSended = {
        sender: senderID,
        receiver: receiverID,
        text: text,
        createdAt: new Date
    }

    const participants = {
        [senderRole]: senderID,
        [receiverRole]: receiverID
    }

    //Verifies if there is any chat active between customer and provider 
    const chatExist = provider.chats.find(chatProv => customer.chats.includes(chatProv))

    //If there is a chat with ID, it's possible add new messages
    if (chatID) {

        if(!text){
            res.status(400).json({ok:false, error:"Escribe un mensaje"})
        }

        const chatActivated = await chatSchema.findById(chatID)
        chatActivated.messages = chatActivated.messages.concat(messageSended)

        try {
            await chatActivated.save()
            res.status(200).json({ok: true, chatActivated: chatActivated })
        }
        catch (error) {
            next(error)
        }
    }
    //Gives the chat ID
    else if (chatExist) {
        try {
            res.status(200).json({ ok: true, chatExist: chatExist })
        }
        catch (error) {
            next(error)
        }
    }
    //If there isn´t any chat, create new one and gives the ID
    else {
        const newChat = new chatSchema({
            participants: { ...participants }
        })


        try {
            await newChat.save()
            customer.chats = customer.chats.concat(newChat._id)
            provider.chats = provider.chats.concat(newChat._id)
            await customer.save(); await provider.save()

            res.status(200).json({ok:true, newChatID: newChat._id })
        }

        catch (error) {
            next(error)
        }
    }
})


module.exports = router