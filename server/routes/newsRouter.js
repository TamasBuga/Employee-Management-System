

const express = require("express");
const router = express.Router();
const { getNews, getAllNews, addNews, updateNews, deleteNews } = require('../controllers/newsController');



router.get('/:newsID', getNews);

router.get('/', getAllNews);

router.post('/add-news', addNews);

router.put('/:newsID', updateNews);

router.delete('/:newsID', deleteNews);


module.exports = router;


