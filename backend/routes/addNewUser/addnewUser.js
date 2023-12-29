const express = require('express');
const router = express.Router();
const addNewUser = require('../../controllers/addNewContactController');

router.post('/new', addNewUser.postRequest);
router.get('/new', addNewUser.getRequest);
router.get('/getAllContacts', addNewContactController.getAllContacts);

module.exports = router;