const express = require('express');
const router = express.Router();
const addContactsController = require('../../controllers/contactController/addContactsController');
const deleteContactsController = require('../../controllers/contactController/deleteContactsController');
const editContactsController = require('../../controllers/contactController/editContactsController');
const listOfContactsController = require('../../controllers/contactController/listOfContactsController');

router.post('/add', addContactsController);
router.post('/delete', deleteContactsController);
router.post('/edit', editContactsController);
router.get('/list', listOfContactsController);



module.exports = router;