const requireAuth = require('../middleware/requireAuth')
const express = require('express');
const {getNews, getTopicalNews, getSingleNews, getFeedNews} = require('../controllers/newsController');

const router = express.Router();

router.get('/all', getNews);
router.get('/topics/:topic', getTopicalNews);
router.get('/news/:id', getSingleNews);

router.use(requireAuth);

router.get('/myfeed', getFeedNews);

module.exports = router;