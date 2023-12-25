

const express = require("express");
const router = express.Router();
const { getEvent, getEvents, getUserEvents, addEvent, updateEvent, deleteEvent } = require('../controllers/eventController');


router.get('/:eventID', getEvent);
router.get('/', getEvents);
router.get('/user/:userID', getUserEvents);
router.post('/add-event', addEvent);
router.put('/:eventID', updateEvent);
router.delete('/:eventID', deleteEvent);


module.exports = router;


