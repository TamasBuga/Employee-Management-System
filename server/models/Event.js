

const mongoose = require('mongoose');


const eventSchema = new mongoose.Schema({
    userID: mongoose.SchemaTypes.ObjectId,
    startHour: String,
    startMinute: String,
    endHour: String,
    endMinute: String,
    title: String,
    description: String,
    color: String,
    date: String,
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

module.exports = mongoose.model("Event", eventSchema);