
require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(
    process.env.MONGODB_URL,
    () => {
        console.log('Mongoose connectesd to the DATABASE!');
    },
    e => console.log(e)
)