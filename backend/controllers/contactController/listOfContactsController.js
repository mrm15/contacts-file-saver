const {readArrayFile} = require("../functions");
const {contactsFilePath} = require("../filesPath");

const listOfContactsController = async (req, res) => {

  const user = req.userInfo.phoneNumber; // user that request data


  try {


    const listOwnContactAccess = req?.userInfo?.listOwnContactAccess
    const listAllContactAccess = req?.userInfo?.listAllContactAccess
    if (listOwnContactAccess || listAllContactAccess) {
      // دسترسی داره پس مخاطبین رو بیار
      const data = await readArrayFile(contactsFilePath);

      if (listAllContactAccess) {
        res.status(200).json(data);
      }

      if (listOwnContactAccess) {
        const user = req?.userInfo?.phoneNumber; // user that request data

        const result = data.filter(v => {
          return v.user === user
        })
        res.status(200).json(result);
      }


    } else {
      res.status(406).send({
        message: 'شما مجوز دسترسی به این بخش را ندارید!'
      });
    }


    //////////////////////////////////////////////
    const data = await readArrayFile(contactsFilePath);
    res.status(200).json(data);

//


    // اگه فقط به فایل های خودش دسترسی داشت باید با یوزر فیلتر کنیم. و مخاطبینی که کسی ویرایش کرده میره توی لیت خودش


  } catch (err) {
    if (err.code === 'ENOENT') {
      res.status(404).json([]);
    } else {
      res.status(500).json({message: 'در هنگام دریافت اطلاعات خطایی رخ داد.'});
    }
  }
};


module.exports = listOfContactsController;
