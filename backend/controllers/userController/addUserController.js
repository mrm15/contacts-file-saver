const fs = require('fs').promises;
const {addRowToArray} = require("../functions");
const {usersFilePath} = require("../filesPath");

const addUserController = async (req, res) => {
  debugger
  try {
    const {
      phoneNumber,
      name,
      addContactAccess,
      editContactAccess,
      deleteContactAccess,
      listAllContactAccess,
      listOwnContactAccess,
      exportContactAccess,// اینو توی فرانت بر این اساس اجازه  اکسپورت از دیتای لیست رو میدم یا نه
      //////////////
      addUserAccess,
      deleteUserAccess,
      editUserAccess,
      listUserAccess,

    } = req.body;

    if (!req?.userInfo?.addUserAccess) {
      return res.status(403).json({message: 'شما مجوز دسترسی به این بخش را ندارید!'});
    }

    if (!phoneNumber || !name) {
      return res.status(400).json({message: 'شماره تماس کاربر و نام کاربر باید وارد شوند.'});
    }

    const newUser = {
      phoneNumber,
      name,
      addContactAccess,
      editContactAccess,
      deleteContactAccess,
      listAllContactAccess,
      listOwnContactAccess,
      exportContactAccess,
//////////////////////////
      addUserAccess,
      deleteUserAccess,
      editUserAccess,
      listUserAccess,
      loginCode: "",
      loginCodeSendDate: "",
      updateAt: "",
      refreshToken: ""
    };

    await addRowToArray(newUser, usersFilePath, res);
    res.status(201).json({message: 'کاربر به لیست کاربران سایت اضافه شد.'});
  } catch (err) {
    res.status(500).json({message: 'یه مشکلی موقع اضافه کردن کاربر پیش اومد.'});
  }
};


module.exports = addUserController;
