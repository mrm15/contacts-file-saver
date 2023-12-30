const express = require('express');
const router = express.Router();
const addContactsController = require('../../controllers/contactController/addContactsController');

router.post('/add', addContactsController);
// router.post('/edit', contactsRouts.postRequest);
// router.post('/delete', contactsRouts.postRequest);
// router.post('/list', contactsRouts.postRequest);


// router.get('/new', addNewUser.getRequest);
// router.get('/getAllContacts', addNewContactController.getAllContacts);

module.exports = router;