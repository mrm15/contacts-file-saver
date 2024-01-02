require('dotenv').config();
const {getCurrentTimeStamp} = require("../../utils/timing");
const {loginCodeGenerator, generateLoginSms} = require("../../utils/number");
const jwt = require('jsonwebtoken');
const {sendSms} = require("../../utils/sendSms");
const {findObjectByPhoneNumber, updateArray} = require("../functions");
const path = require("path");
// const usersFilePath = path.join(__dirname, 'users.json');
const {usersFilePath} = require('../filesPath')


const handleLoginSMS = async (req, res) => {


  let {phoneNumber: phoneNumber} = req.body;

  if (!phoneNumber) return res.status(400).json({'message': 'شماره تلفن یافت نشد'});

  try {
    const user = await findObjectByPhoneNumber(phoneNumber, usersFilePath, res);
    console.log(user)
     
    console.log(user)
    // اگه این آدم قبلا ثبت نام کرده بود. باید بگیم داری کلا اشتباه میزنی و گزینه ی آیا تا ب حال ثبت نام شده فعال بود دیگه نباید اجازه بدیم ادامه بده
    if (!user) {
      return res.status(401).json({
        status: false, message: "کاربری با این شماره تلفن یافت نشد! ."
      });
    }


    const loginCode = loginCodeGenerator()
    const text = generateLoginSms(loginCode)
    const isSend = await sendSms(text, phoneNumber)
    if (!isSend) {
      return res.status(500).json({status: true, message: "ارسال پیام موفقیت آمیز نبود"})

    }


    const currentTimeStamp = getCurrentTimeStamp()


    //user.phoneNumber = phoneNumber
    user.loginCode = loginCode
    user.loginCodeSendDate = currentTimeStamp
    user.updateAt = currentTimeStamp
    await updateArray(user, usersFilePath, res);

    return res.status(200).json({'status': true, message: "کد ورود به سایت پیامک شد.", text});



  } catch (err) {
     return res.status(500).json({'message': err.message});
  }

}


const verifyLoginSMS = async (req, res) => {

  const cookies = req.cookies;
  //console.log(`cookie available at login: ${JSON.stringify(cookies)}`);
  const {phoneNumber: phoneNumber, loginCode: loginCode} = req.body;
  if (!phoneNumber) return res.status(400).json({'message': 'شماره تلفن را وارد کنید'});
  if (!loginCode) return res.status(400).json({'message': 'کد ورود را وارد کنید'});

  // const foundUser = await User.findOne({phoneNumber}).exec();
  const foundUser = await findObjectByPhoneNumber(phoneNumber, usersFilePath, res);


  if (!foundUser) return res.status(401).json({'message': 'کاربری با این شماره تلفن یافت نشد'}); //Unauthorized


  //  چون بعد از لاگین کد ورود رو پاک میکنم پس اگه کد ورود خالی بود. ینی کاربر هنوز درخواست کد ورود نداده
  if (foundUser.loginCode === "") {
    return res.status(401).json({'message': 'لطفا مجددا درخواست ارسال کد ورود دهید.'})
  }


  if (+foundUser.loginCode !== +loginCode) {
    return res.status(401).json({'message': 'کد ورود صحیح نیست'})
  }


  // create JWTs  accessToken
  const accessToken = jwt.sign({
    "UserInfo": {...foundUser}
  }, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1000000000s'});
  const newRefreshToken = jwt.sign( //
    { //
      "phoneNumber": foundUser.phoneNumber //
    }, //
    process.env.REFRESH_TOKEN_SECRET, {expiresIn: '1d'});


  if (cookies?.jwt) {

    /*
    Scenario added here:
        1) User logs in but never uses RT and does not logout
        2) RT is stolen
        3) If 1 & 2, reuse detection is needed to clear all RTs when user logs in
    */
    const refreshToken = cookies.jwt;
    // const foundToken = await User.findOne({refreshToken}).exec();
    let foundToken = await findObjectByPhoneNumber(phoneNumber, usersFilePath, res)
    foundToken = foundToken?.['refreshToken']

    // Detected refresh token reuse!
    if (!foundToken) {
      console.log('attempted refresh token reuse at login!')
      // clear out ALL previous refresh tokens
    }

    res.clearCookie('jwt', {httpOnly: true, sameSite: 'None', secure: true});
  }

  // Saving refreshToken with current user
  foundUser.refreshToken = newRefreshToken;
  foundUser.loginCode = "";
  foundUser.updateAt = getCurrentTimeStamp();
  const result = await updateArray(foundUser, usersFilePath, res);
  // console.log(result);
  // console.log(isAdmin);

  res.cookie('jwt', newRefreshToken, {httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000});

  // Creates Secure Cookie with refresh token
  // res.cookie('jwt', newRefreshToken, {
    // httpOnly: true,
    // secure: false,
    // sameSite: 'None',
    // sameSite: 'Lax',
    // maxAge: 24 * 60 * 60 * 1000,//
  // });

  // Send authorization roles and access token to user
  res.json({
    accessToken, userInfo: {
      phoneNumber: foundUser.phoneNumber,
      name: foundUser.name,
      addContactAccess: foundUser.addContactAccess,
      editContactAccess: foundUser.editContactAccess,
      deleteContactAccess: foundUser.deleteContactAccess,
      listAllContactAccess: foundUser.listAllContactAccess,
      listOwnContactAccess: foundUser.listOwnContactAccess,
      addUserAccess: foundUser.addUserAccess,
      deleteUserAccess: foundUser.deleteUserAccess,
      editUserAccess: foundUser.editUserAccess,
      exportContactAccess: foundUser.exportContactAccess,

    }
  });
}
module.exports = {handleLoginSMS, verifyLoginSMS}