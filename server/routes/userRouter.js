

const express = require("express");
const router = express.Router();
const { getAdmin, createAdmin } = require('../controllers/userController');



router.get('/:userID', getAdmin);
router.post('/', createAdmin);



module.exports = router;


