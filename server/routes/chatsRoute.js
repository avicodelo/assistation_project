const router = require("express").Router()

const chatSchema = require("../models/chats")
const providerSchema = require("../models/provider")
const customerSchema = require("../models/customer")

const verifyToken = require("../middlewares/auth")

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
        res.json({ ok: true, chatList })
    }
    catch (error) {
        next(error)
    }

})

router.get("/chatroom", verifyToken, async (req, res, next) => {

    const chatID = req.query.chatroom


    try {
        const chatroom = await chatSchema.findOne({ _id: chatID })
        res.json({ ok: true, chatroom })
    }
    catch (error) {
        next(error)
    }

})

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
        sender: { [senderRole]: senderID },
        receiver: { [receiverRole]: receiverID },
        text: text
    }

    const participants = {
        [senderRole]: senderID,
        [receiverRole]: receiverID
    }

    //Verify if there is any chat active between customer and provider
    /*  const chatExist = provider.chats.map(chat=> customer.chats.includes(chat)).includes(true) */
    const chatExist = provider.chats.find(chatProv => customer.chats.includes(chatProv))
    console.log(chatExist);
    if (chatID) {
        const chatActivated = await chatSchema.findById(chatID)
        chatActivated.messages = chatActivated.messages.concat(messageSended)
        try {
            await chatActivated.save()
            res.json({ chatActivated })
        }
        catch (error) {
            next(error)
        }

    } else if (chatExist) {
        try {
            res.status(200).json({chatExist: chatExist})
        }
        catch (error) {
            next(error)
        }

    } else {
        const newChat = new chatSchema({
            participants: { ...participants }
        })


        try {
            await newChat.save()
            customer.chats = customer.chats.concat(newChat._id)
            provider.chats = provider.chats.concat(newChat._id)
            await customer.save(); await provider.save()

            res.json({ text: "sended" })
        }

        catch (error) {
            next(error)
        }
    }
})


module.exports = router