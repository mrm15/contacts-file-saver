require('dotenv').config();
const {getCurrentTimeStamp} = require("../../utils/timing");
const {loginCodeGenerator, generateLoginSms} = require("../../utils/number");
const jwt = require('jsonwebtoken');
const {sendSms} = require("../../utils/sendSms");
const {findObjectByPhoneNumber, updateArray} = require("../functions");
const path = require("path");
// const usersFilePath = path.join(__dirname, 'users.json');
const {usersFilePath} = require('../filesPath')


const handleLogout = async (req, res) => {

  debugger
  let phoneNumber= req?.userInfo?.phoneNumber

  if (!phoneNumber) return res.status(400).json({'message': 'شماره تلفن یافت نشد'});

  try {
    debugger
    const user = await findObjectByPhoneNumber(phoneNumber, usersFilePath, res);
    console.log(user)


    // اگه این آدم قبلا ثبت نام کرده بود. باید بگیم داری کلا اشتباه میزنی و گزینه ی آیا تا ب حال ثبت نام شده فعال بود دیگه نباید اجازه بدیم ادامه بده
    if (!user) {
      return res.status(401).json({
        status: false, message: "کاربری با این شماره تلفن یافت نشد! ."
      });
    }


    const currentTimeStamp = getCurrentTimeStamp()


    //user.phoneNumber = phoneNumber
    user.loginCode = ""
    user.refreshToken = ""
    user.updateAt = currentTimeStamp
    await updateArray(user, usersFilePath, res);

    const message = 'خروج موفقیت آمیز بود'
    res.status(200).json({'status': true, message});


  } catch (err) {
    res.status(500).json({'message': err.message});
  }

}


module.exports = {handleLogout}