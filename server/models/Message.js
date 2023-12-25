

const mongoose = require('mongoose');


const messageSchema = new mongoose.Schema({
    from: mongoose.SchemaTypes.ObjectId,
    to: mongoose.SchemaTypes.ObjectId,
    message: String,
    date: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model("Message", messageSchema);