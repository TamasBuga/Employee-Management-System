

const mongoose = require('mongoose');



const employeeSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    birthDate: Date,
    email: {
        type: String,
        // required: true,
        lowercase: true
    },
    image: {
        type: mongoose.SchemaTypes.ObjectId,
    },
    phone: String,
    companyPhone: {
        type: String,
        unique: true,
        dropDups: true
        // validate: {
        //     validator: v => v.length < 4 || v.length > 4,
        //     message: props => `${props.value} Helytelen adat!`
        // }
    },
    enrollment: Date,
    annualLeave: Number,
    address: {
        zip: String,
        city: String,
        street: String,
        houseNumber: String,
        storey: String,
        door: String
    },
    department: {
        option: String,
        value: String
    },
    post: {
        option: String,
        value: String
    },
    createdAt: {
        type: Date,
        immutable: true,
        default: () => Date.now()
    },
    updatedAt: {
        type: Date,
        default: () => Date.now()
    }
})

module.exports = mongoose.model("Employee", employeeSchema);