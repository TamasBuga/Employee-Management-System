

const Employee = require('../models/Employee');
const mongoose = require('mongoose');



// get Employee
const getEmployee = async (req, res) => {
    const id = new mongoose.Types.ObjectId(req.params.empID.slice(1));
    const employee = await Employee
        .findById(id)
        .exec()
        .catch(error => res.json({ message: error.message }))
    if (!employee)
        return res.status(404).json({ Message: "Employee not found!" });

    return res.json({ employee });
}


// get Employees
const getEmployees = async (req, res) => {
    const employees = await Employee
        .find()
        .exec()
        .catch(error => res.json({ message: error.message }));

    return res.json({ employees });
}


// add Employee
const addEmployee = async (req, res) => {
    if (!req.body)
        return res.json({ message: "No data!" });
    const data = {
        ...req.body,
        enrollment: Date.now(),
        annualLeave: 22,
        events: [],
        createdAt: Date.now(),
        updatedAt: Date.now()
    }
    await Employee
        .create(data)
        .catch(error => res.json({ message: error.message }));

    return res.json({ message: "Employee created!" });
}


// update Employee
const updateEmployee = async (req, res) => {
    const id = new mongoose.Types.ObjectId(req.params.empID.slice(1));
    const data = req.body;
    if (!id || !data)
        return res.json({ message: "No Data!" })

    data.updatedAt = Date.now();

    await Employee
        .findByIdAndUpdate({ _id: id }, data)
        .then(() => console.log("User updated"))
        .catch(error => console.log(error));

    return res.json({ message: "User updated!" });
}


// delete Employee
const deleteEmployee = async (req, res) => {
    const id = new mongoose.Types.ObjectId(req.params.empID.slice(1));
    await Employee
        .findByIdAndDelete(id)
        .catch(error => res.json({ message: error.message }));

    return res.json({ message: "User deleted!" });
}



module.exports = {
    getEmployee,
    getEmployees,
    addEmployee,
    updateEmployee,
    deleteEmployee
}