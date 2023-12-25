

const express = require("express");
const router = express.Router();
const { getDepartment, getDepartments, addDepartment, updateDepartment, deleteDepartment } = require('../controllers/departmentController');



router.get('/:depID', getDepartment);

router.get('/', getDepartments);

router.post('/add-department', addDepartment);

router.put('/:depID', updateDepartment);

router.delete('/:depID', deleteDepartment);


module.exports = router;


