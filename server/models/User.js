

const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        // select: false
    },
    employee: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Employee"
    },
    role: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Role"
    }
})

module.exports = mongoose.model("User", userSchema);