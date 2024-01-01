const express = require('express');
const router = express.Router();
const loginController = require('../../controllers/LoginRegisterSms/loginController');

router.post('/new', loginController.handleLoginSMS);
router.get('/new', (req,res)=>{


  res.status(200).send("در خواست ورود به سایت")
});
router.post('/verify', loginController.verifyLoginSMS);

module.exports = router;