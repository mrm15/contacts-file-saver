const { deleteRowFromArray, findObjectByPhoneNumber} = require("../functions");
const { contactsFilePath } = require("../filesPath");

const deleteContactsController = async (req, res) => {
  try {
    const { phoneNumber } = req.body;

    // Check if the requester has "delete" access
    // Assuming userInfo is set earlier in the middleware

    if (!req?.userInfo?.deleteContactAccess) {
      return res.status(403).json({ message: 'شما مجوز دسترسی به حذف مخاطب را ندارید!' });
    }

    if (!phoneNumber) {
      return res.status(400).json({ message: 'شماره تماس در پارامتر ارسالی موجود نیست.' });
    }

    const objectFound =await findObjectByPhoneNumber(phoneNumber,contactsFilePath,res)
     
    if(objectFound){

     try{
       await deleteRowFromArray(phoneNumber, contactsFilePath, res);
       return res.status(200).json({ message: ' با موفقیت حذف شد.' });
     }catch (error){
       return res.status(406).json({ message: error });
     }

    }else {
      return res.status(200).json({ message: 'موردی با این شماره تلفن یافت نشد.' });

    }

  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: 'یه مشکلی موقع به حذف کردن  پیش اومد.' + err  });
  }
};

module.exports = deleteContactsController;
