

const mongoose = require('mongoose');


const roleSchema = new mongoose.Schema({
    type: String,
    name: String
})

module.exports = mongoose.model("Role", roleSchema);