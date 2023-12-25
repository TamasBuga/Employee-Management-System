

const Department = require('../models/Department');
const mongoose = require("mongoose");


// get Department
const getDepartment = async (req, res) => {
    const id = new mongoose.Types.ObjectId(req.params.depID.slice(1));
    const department = await Department
        .findOne({ _id: id })
        .catch(error => res.json({ message: error.message }));
    if (!department)
        res.status(401).json({ Message: "Post not found!" });

    return res.json({ department });
}


// get Departments
const getDepartments = async (req, res) => {
    const departments = await Department
        .find()
        .exec()
        .catch(error => res.json({ message: error.message }));

    return res.json({ departments });
}


// add Department
const addDepartment = async (req, res) => {
    const data = req.body;
    await Department
        .create(data)
        .then(() => res.json({ message: "Department Created!" }))
        .catch(error => res.json({ message: error.message }));
}


// update Department
const updateDepartment = async (req, res) => {
    const id = new mongoose.Types.ObjectId(req.params.depID.slice(1));
    await Department
        .findByIdAndUpdate(id, req.body)
        .then(() => res.json({ message: "Department updated!" }))
        .catch(error => res.json({ message: error.message }));
}


// delete Department
const deleteDepartment = async (req, res) => {
    const id = new mongoose.Types.ObjectId(req.params.depID.slice(1));
    await Department
        .findByIdAndDelete(id)
        .then(() => res.json({ message: "Department deleted!" }))
        .catch(error => res.json({ message: error.message }));
}



module.exports = {
    getDepartment,
    getDepartments,
    addDepartment,
    updateDepartment,
    deleteDepartment
}