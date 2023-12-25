

const mongoose = require('mongoose');


const departmentSchema = new mongoose.Schema({
    option: String,
    value: String,
    code: String,
    description: String
})

module.exports = mongoose.model("Department", departmentSchema);