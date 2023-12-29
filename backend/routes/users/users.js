const express = require('express');
const router = express.Router();
const addUserController = require('../../controllers/userController/addUserController');
const editUserController = require('../../controllers/userController/editUserController');
const deleteUserController = require('../../controllers/userController/deleteUserController');
const listOfUsersController = require('../../controllers/userController/listOfUsersController');

router.post('/add', addUserController);
router.post('/edit', editUserController);
router.post('/delete', deleteUserController);
router.post('/list', listOfUsersController);


module.exports = router;