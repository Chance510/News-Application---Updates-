const express = require('express');
const router = express.Router();
const saveController = require('../controllers/saveController.js');

router.get('/', saveController);

module.exports = router