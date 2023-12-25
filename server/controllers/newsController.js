

const News = require('../models/News');
const mongoose = require('mongoose');


// get News
const getNews = async (req, res) => {
    const id = new mongoose.Types.ObjectId(req.params.newsID.slice(1));
    const news = await News
        .findOne({ _id: id })
        .catch(error => res.json({ message: error.message }));
    if (!news)
        return res.status(401).json({ Message: "News not found!" });

    return res.json({ news });
}


// get AllNews
const getAllNews = async (req, res) => {
    const news = await News
        .find()
        .exec()
        .catch(error => res.json({ message: error.message }));

    return res.json({ news });
}


// add News
const addNews = async (req, res) => {
    const data = req.body;
    await News
        .create(data)
        .catch(error => res.json({ message: error.message }));
    const allNews = await News.find().exec();
    return res.json({ news: allNews, message: "A bejegyzés sikeresen feltöltve!" })
}


// update News
const updateNews = async (req, res) => {
    const id = new mongoose.Types.ObjectId(req.params.newsID.slice(1));
    await News
        .findByIdAndUpdate(id, req.body)
        .then(() => res.json({ message: "News updated!" }))
        .catch(error => res.json({ message: error.message }));
}


// delete News
const deleteNews = async (req, res) => {
    const id = new mongoose.Types.ObjectId(req.params.newsID.slice(1));
    await News
        .findByIdAndDelete(id)
        .then(() => res.json({ message: "News deleted!" }))
        .catch(error => res.json({ message: error.message }));
}



module.exports = {
    getNews,
    getAllNews,
    addNews,
    updateNews,
    deleteNews
}