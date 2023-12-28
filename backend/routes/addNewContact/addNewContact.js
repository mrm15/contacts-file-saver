const express = require('express');
const router = express.Router();
const addNewContactController = require('../../controllers/addNewContactController');

router.post('/new', addNewContactController.postRequest);
router.get('/new', addNewContactController.getRequest);
router.get('/getAllContacts', addNewContactController.getAllContacts);

module.exports = router;

