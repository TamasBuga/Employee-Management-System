


const express = require("express");
const router = express.Router();
const { uploadFiles, getFile, deleteFiles } = require("../controllers/uploadController");


router.post("/upload", uploadFiles);
router.get("/:id", getFile);
router.delete("/:id", deleteFiles);


module.exports = router;