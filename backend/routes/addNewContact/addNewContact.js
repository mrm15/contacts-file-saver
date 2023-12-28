const express = require('express');
const router = express.Router();
const addNewContactController = require('../../controllers/addNewContactController');

router.post('/', addNewContactController);

module.exports = router;