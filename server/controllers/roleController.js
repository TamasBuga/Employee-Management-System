

const Role = require("../models/Role");
const mongoose = require("mongoose");


const getRole = async (req, res) => {
    const id = new mongoose.Types.ObjectId(req.params.roleID.slice(1));
    const role = await Role
        .findById(id)
        .exec()
        .catch(error => res.json({ message: error.message }))
    if (!role)
        return res.status(404).json({ Message: "Role not found!" });

    return res.json({ role });
}

const getRoles = async (req, res) => {
    const roles = await Role
        .find({})
        .catch(error => res.json({ message: error.message }))
    if (!roles)
        return res.status(404).json({ Message: "No roles!" });

    return res.json({ roles });
}


module.exports = {
    getRole,
    getRoles
}