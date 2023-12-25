

const mongoose = require('mongoose');


const newsSchema = new mongoose.Schema({
    userID: mongoose.SchemaTypes.ObjectId,
    title: String,
    description: String,
    image: mongoose.SchemaTypes.ObjectId,
    updatedAt: {
        type: Date,
        default: new Date()
    },
    createdAt: {
        type: Date,
        default: new Date(),
        immutable: true
    }
})

module.exports = mongoose.model("News", newsSchema);