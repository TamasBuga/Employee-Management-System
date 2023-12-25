
const express = require("express");
const router = express.Router();
const { getRole, getRoles } = require('../controllers/roleController');


router.get('/:roleID', getRole);
router.get('/', getRoles);


module.exports = router;


