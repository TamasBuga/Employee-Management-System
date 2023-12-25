

require("dotenv").config();
const util = require("util");
const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");
const url = process.env.MONGODB_URL;


const storage = new GridFsStorage({
    url,
    file: (req, file) => {
        //If it is an image, save to photos bucket
        if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
            return {
                bucketName: "photos",
                filename: `${Date.now()}_${file.originalname}`,
            }
        } else {
            //Otherwise save to default bucket
            return `${Date.now()}_${file.originalname}`
        }
    },

})


// Set multer storage engine to the newly created object
const uploadFiles = multer({ storage, limits: { fileSize: 1_500_000 } }).single("image");
const uploadFilesMiddleware = util.promisify(uploadFiles);


module.exports = uploadFilesMiddleware;