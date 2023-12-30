const {updateArray} = require("../functions");
const {contactsFilePath} = require("../filesPath");

const editContactsController = async (req, res) => {

  try {

    const {
      firstName, lastName, phoneNumber, email, province, city, address,
    } = req.body;

    const user = req?.userInfo.phoneNumber;
    // برای سری اول فرض میکنم که موردی نیست و فرض میکنم ائمی خودمم دار متست میکنم
    if (!req?.userInfo?.editContactAccess) res.status(406).send({
      message: 'شما مجوز دسترسی به این بخش را ندارید!'
    });

    if (!phoneNumber) {
      res.status(500).send({message: 'شماره تماس در پارامتر ارسالی موجود نیست.'});
    }


    const updatedContact = {
      firstName, lastName, phoneNumber, email, user, province, city, address,
    };

    await updateArray(updatedContact, contactsFilePath, res)

    res.send({
      message: 'مخاطب در لیست مخاطبین به روز شد.',
    });
  } catch (err) {
    //console.error('Error saving contact:', err);
    res.status(500).send({
      message: 'یه مشکلی موقع به روز رسانی کردن مخاطب پیش اومد.'
    });
  }
};




module.exports = editContactsController;
