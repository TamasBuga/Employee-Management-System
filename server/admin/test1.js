// controller/controllere.js

const User = require("../models/user.models.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const multer = require("multer");
require("dotenv").config();

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "uploads/");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "_" + file.originalname.toLowerCase());
    },
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 5 },
}).single("profilePicture");

exports.signup = async (req, res) => {
    try {
        upload(req, res, async function (err) {
            if (err) {
                return res.status(400).json({ status: "error", message: err.message });
            }
            const generateDzID = Math.floor(Math.random() * 9000) + 1000;
            const { firstname, middlename, lastname, email, password, role } =
                req.body;
            const firstNameInitial = firstname.charAt(0).toUpperCase();
            const lastNameInitial = lastname.charAt(0).toUpperCase();
            const concatenated_DzID = `${firstNameInitial}${lastNameInitial}${generateDzID}`;
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: "User already registered" });
            }  
            const adminExists = await User.exists({ role: "admin" });
            if (role === "admin" && adminExists) {
                return res.status(400).json({ message: "Admin already exists" });
            }
            const url = req.protocol + "://" + req.get("host");
            const profilePicture = req.file ? url + "/" + req.file.path : null;
            // Hash the password
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);
            const user = new User({
                firstname,
                middlename,
                lastname,
                email,
                password: hashedPassword,
                role,
                dzID: concatenated_DzID,
                profilePicture,
            });
            await user.save();
            return res.status(201).json({
                message: "User created successfully",
                data: {
                    …user.toObject(),
                    dzID: concatenated_DzID,
                },
            });
        });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ message: "Internal server error" });
    }
};