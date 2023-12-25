

require("dotenv").config();
const { GridFSBucket } = require("mongodb");
const upload = require("../midllewares/upload");
const { MongoClient, ObjectId } = require("mongodb");
const client = new MongoClient(process.env.MONGODB_URL);


const uploadFiles = async (req, res) => {
    try {
        await upload(req, res);
        if (req.file == undefined) {
            return res.json({
                message: "You must select a file.",
            });
        }
        return res.json({
            message: "File has been uploaded.",
            id: req.file.id
        });
    } catch (error) {
        console.log("Error: ", error);
        return res.json({
            message: `Error when trying upload image: ${error}`,
        });
    }
};


const getFile = async (req, res) => {
    const id = new ObjectId(req.params.id.slice(1));
    const gridFS = new GridFSBucket(client.db(), { bucketName: "photos" });
    const files = await gridFS.find({ _id: id }).toArray();
    const stream = gridFS.openDownloadStream(id);
    res.setHeader('Content-Type', files[0].contentType);
    stream.pipe(res);
}


const deleteFiles = async (req, res) => {
    const id = new ObjectId(req.params.id.slice(1));
    const gridFS = new GridFSBucket(client.db(), { bucketName: "photos" });
    await gridFS.delete(id);
    res.json({ message: "Files deleted" });
}


module.exports = {
    uploadFiles,
    getFile,
    deleteFiles
};