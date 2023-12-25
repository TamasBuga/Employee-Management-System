

const express = require("express");
const router = express.Router();
const { getMessage, getMessages, addMessage } = require('../controllers/messageController');


router.get('/:msgID', getMessage);
router.get('/', getMessages);
router.post('/add-message', addMessage);


module.exports = router;


