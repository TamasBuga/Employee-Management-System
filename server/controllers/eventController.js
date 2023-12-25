

const Event = require("../models/Event");
const mongoose = require("mongoose");


const getEvent = async (req, res) => {
    const id = new mongoose.Types.ObjectId(req.params.eventID.slice(1));
}
const getEvents = async (req, res) => {
    const events = await Event
        .find({})
        .exec()
        .catch(error => console.log(error));

    return res.json({ events });
}
const getUserEvents = async (req, res) => {
    const id = new mongoose.Types.ObjectId(req.params.userID.slice(1));
    const userEvents = await Event
        .find({ userID: id })
        .exec()
        .catch(error => console.log(error));

    return res.send({ events: userEvents });
}
const addEvent = async (req, res) => {
    const userID = new mongoose.Types.ObjectId(req.body.userID);
    const data = req.body;

    data.userID = userID;

    await Event
        .create(data)
        .then(() => console.log("Event created!"))
        .catch(error => console.log(error));

    return res.send({ message: "Event created!" });
}
const updateEvent = async (req, res) => {
    const id = new mongoose.Types.ObjectId(req.params.eventID.slice(1));
    const data = await req.body;
    await Event.findByIdAndUpdate({ _id: id }, data)
        .then(() => console.log("Event updated!"))
        .catch(error => console.log(error));

    return res.json({ message: "Event updated!" });
}
const deleteEvent = async (req, res) => {
    const id = new mongoose.Types.ObjectId(req.params.eventID.slice(1));
    await Event
        .findByIdAndDelete(id)
        .catch(error => res.json({ message: error.message }));

    return res.json({ message: "Event deleted!" });
}


module.exports = {
    addEvent,
    getEvent,
    getEvents,
    getUserEvents,
    deleteEvent,
    updateEvent
}