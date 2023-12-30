const {addRowToArray} = require("../functions");
const {contactsFilePath} = require("../filesPath");

const addContactsController = async (req, res) => {

  try {
    const {
      firstName, lastName, phoneNumber, email, province, city, address,
    } = req.body;
debugger
    const user = req?.userInfo.phoneNumber;
    if (!req?.userInfo?.addContactAccess) {
      return res.status(403).json({message: 'شما مجوز دسترسی به این بخش را ندارید!'});
    }
    if (!phoneNumber || !name) {
      return res.status(400).json({message: 'شماره تماس و نام باید وارد شوند.'});
    }

    const newContact = {
      firstName, lastName, phoneNumber, email, user, province, city, address,
    };

    await addRowToArray(newContact, contactsFilePath, res);
    res.status(201).json({message: 'مخاطب به لیست کاربران سایت اضافه شد.'});
  } catch (err) {
    res.status(500).json({message: 'یه مشکلی موقع اضافه کردن مخاطب پیش اومد.'});
  }
};


module.exports = addContactsController;
