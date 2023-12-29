
require("dotenv").config();

const express = require('express');
const app = express();
const cors = require('cors');
const api = require('./admin/api');
const helmet = require("helmet");
const mongoose = require('mongoose');
const cookieParser = require("cookie-parser");

// Connect to MONGO DB
(async () => {
    await mongoose.connect(process.env.MONGODB_URL);
})()

const corsOptions = {
    origin: "http://localhost:5173", // for vite application
    credentials: true,
    optionsSuccessStatus: 200,
};

// middlewares
app.use(helmet());
app.use(cors(corsOptions));
app.use(express.json({ limit: "1.6mb" }));
app.use(cookieParser());

app.use('/api/v1', api);

// Running db and app
mongoose.connection.once("open", () => {
    app.listen(process.env.SERVER_PORT, () => {
        console.log("server is successfully running!");
    });
})