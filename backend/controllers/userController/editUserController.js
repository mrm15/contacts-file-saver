const {updateArray} = require("../functions");
const {usersFilePath} = require("../filesPath");

const editUserController = async (req, res) => {

  try {

    let {
      phoneNumber,
      name,
      addContactAccess,
      editContactAccess,
      deleteContactAccess,
      listAllContactAccess,
      listOwnContactAccess,
      addUserAccess,
      deleteUserAccess,
      editUserAccess,
    } = req.body;
    // آیا کاربر درخواست کننده ادمین هست یا نه؟

    // برای سری اول فرض میکنم که موردی نیست و فرض میکنم ائمی خودمم دار متست میکنم
    if (!req?.userInfo?.editUserAccess) res.status(406).send({
      message: 'شما مجوز دسترسی به این بخش را ندارید!'
    });

    if (!phoneNumber) {
      res.status(500).send({message: 'شماره تماس در پارامتر ارسالی موجود نیست.'});
    }
    if (!name) {
      res.status(500).send({message: '  نام در پارامتر ارسالی موجود نیست.'});
    }

    const updatedUser = {
      phoneNumber: phoneNumber || undefined, // شماره تماس برای ورد بکار میره
      name: name || undefined, // نام کاربر برای نمایش در سایت

      addContactAccess, // دسترسی افزودن مخاطب
      editContactAccess,// دسترسی ویرایش مخاطب
      deleteContactAccess,// دسترسی حذف مخاطب
      listAllContactAccess,// دسترسی مشاهده لیست تمام مخاطبین
      listOwnContactAccess, // دسترسی مشاهده مخاطبین خودش که ثبت کرده
      addUserAccess, // دسترسی افزودن مخاطب
      deleteUserAccess,  // دسترسی حذف مخاطب
      editUserAccess, // دسترسی ویرایش مخاطب
    };

    await updateArray(updatedUser, usersFilePath, res)

    res.send({
      message: 'کاربر در لیست کابران به روز شد.',
    });
  } catch (err) {
    //console.error('Error saving contact:', err);
    res.status(500).send({
      message: 'یه مشکلی موقع به روز رسانی کردن کاربر پیش اومد.'
    });
  }
};




module.exports = editUserController;
