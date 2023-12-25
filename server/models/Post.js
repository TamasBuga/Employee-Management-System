

const mongoose = require('mongoose');


const postSchema = new mongoose.Schema({
    option: String,
    value: String,
    code: String,
    description: String
})

module.exports = mongoose.model("Post", postSchema);