

const express = require("express");
const router = express.Router();
const { getEmployee, getEmployees, addEmployee, updateEmployee, deleteEmployee } = require('../controllers/employeeController');


router.get('/:empID', getEmployee);
router.get('/', getEmployees);
router.post('/add-employee', addEmployee);
router.put('/:empID', updateEmployee);
router.delete('/:empID', deleteEmployee);


module.exports = router;


