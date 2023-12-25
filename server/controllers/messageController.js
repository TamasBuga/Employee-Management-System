

const Message = require('../models/Message');
const mongoose = require("mongoose");


// get Message
const getMessage = async (req, res) => {
    const id = new mongoose.Types.ObjectId(req.params.msgID.slice(1));
    const getMessage = await Message
        .findOne({ _id: id })
        .catch(error => res.json({ message: error.message }));
    if (!getMessage)
        return res.status(401).json({ Message: "Üzenet nem található" });

    return res.json({ message: getMessage });
}


// get Messages
const getMessages = async (req, res) => {
    const messages = await Message
        .find()
        .exec()
        .catch(error => res.json({ message: error.message }));

    return res.json({ messages });
}


// add Message
const addMessage = async (req, res) => {
    const data = req.body;
    await Message
        .create(data)
        .then(() => res.json({ message: "Üzenet elküldve!" }))
        .catch(error => res.json({ message: error.message }));
}


module.exports = {
    getMessage,
    getMessages,
    addMessage
}