

const User = require('../models/User');
const Employee = require('../models/Employee');
const Role = require('../models/Role');
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { authenticationErrorMessage, serverErrorMessage } = require("../resources/errorMessages");


// get Admin
const getAdmin = async (req, res) => {
    const id = new mongoose.Types.ObjectId(req.params.userID.slice(1));
    const user = await User
        .findById(id)
        .select("-password")
        .select("-username")
        .populate("employee")
        .populate("role")
        .catch(error => res.json({ message: error.message }));
    if (!user) return res.status(401);

    return res.send({ user });
}

// create admin
const createAdmin = async (req, res) => {
    const data = await req.body;

    if (!data.username || !data.password || !data.confirmPassword)
        return res.json({ message: authenticationErrorMessage.incorrectInput });
    if (data.password !== data.confirmPassword)
        return res.json({ message: authenticationErrorMessage.incorrectInput });
    const adminExists = await User.findOne({ username: data.username })
        .catch(error => console.log(error));
    if (adminExists)
        return res.json({ message: authenticationErrorMessage.userExists });

    const salt = await bcrypt.genSalt(10)
    const generatedPassword = await bcrypt.hash(data.password, salt);
    const id = new mongoose.Types.ObjectId(data.employee);
    const employee = await Employee.findById(id);
    const role = await Role.findOne({ type: "ADMIN" });
    const createAdmin = await User.create({
        username: data.username,
        password: generatedPassword,
        employee: employee,
        role: role
    })
        .catch(error => console.log(error));


    return res.json({ message: "Admin felvéve!" });
}





module.exports = {
    getAdmin,
    createAdmin
}