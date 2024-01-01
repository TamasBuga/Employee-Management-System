

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');



router.post('/login', async (req, res) => {
    const data = req.body;

    if (!data.username || !data.password)
        return res.status(401).send("Hibás felhasználónév vagy jelszó!");

    const user = await User
        .findOne({ username: data.username })
        .populate("role")
        .populate("employee")
        .catch(error => res.json({ message: error.message }));

    if (!user)
        return res.status(401).send("Hibás felhasználónév vagy jelszó!");

    const checkPassword = await bcrypt
        .compare(data.password, user.password)
        .catch(error => console.log(error));

    if (!checkPassword)
        return res.status(401).send("Hibás felhasználónév vagy jelszó!");

    return res.json({
        user: {
            id: user._id,
            role: user.role.type
        }
    })

});


module.exports = router;