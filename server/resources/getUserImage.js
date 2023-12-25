
require("dotenv").config();
const { GridFSBucket } = require("mongodb");
const { MongoClient, ObjectId } = require("mongodb");
const client = new MongoClient(process.env.MONGODB_URL);

const getImage = async (imageId) => {
    const id = new ObjectId(imageId);
    const gridFS = new GridFSBucket(client.db(), { bucketName: "photos" });
    const files = await gridFS.find({ _id: id }).toArray();
    if (files.length < 1) {
        return null;
    } else {
        const stream = gridFS.openDownloadStream(id);
        const chunks = await stream.toArray();
        return chunks;
    }
}

module.exports = {
    getImage
}