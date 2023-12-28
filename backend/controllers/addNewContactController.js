const fs = require("fs").promises;

const CONTACTS_FILE_NAME = 'contacts.json'

const getRequest = (req, res) => {
  res.send({status: true, message: 'این ریکوئست مخفیه 😉',});
}
const postRequest = async (req, res) => {
  try {
    let {lastName, firstName, phone, email} = req.body;
    firstName = firstName || 'بدون نام';
    lastName = lastName || '';
    phone = phone || '00000000000';
    email = email || '';

    const newContact = {firstName, lastName, phone, email};

    // Read existing contacts from JSON file
    let contacts = [];
    try {
      const data = await fs.readFile(CONTACTS_FILE_NAME, 'utf8');
      contacts = JSON.parse(data);
    } catch (err) {
      if (err.code !== 'ENOENT') {
        //throw err; // Re-throw the error if it's not 'File Not Found'
        res.status(500).send({
          message: 'فایل  مخاطبین بر روی سرور یافت نشد.'
        });
      }
      // If the file doesn't exist, we start with an empty array
    }

    // Add new contact to array
    contacts.push(newContact);

    // Write updated contacts back to JSON file
    await fs.writeFile(CONTACTS_FILE_NAME, JSON.stringify(contacts, null, 2));

    res.send({
      message: 'مخاطب به لیست مخاطبین اضافه شد.',
    });
  } catch (err) {
    //console.error('Error saving contact:', err);
    res.status(500).send('یه مشکلی موقع اضافه کردن مخاطب پیش اومد.');
  }
};



const getAllContacts = async (req, res) => {
  try {
    const data = await fs.readFile(CONTACTS_FILE_NAME, 'utf8');
    const contacts = JSON.parse(data);
    res.json(contacts);
  } catch (err) {
    if (err.code === 'ENOENT') {
      // If the file doesn't exist, send an empty array
      res.json([]);
    } else {
      //console.error('Error reading contacts:', err);
      res.status(500).send({ message:'در هنگام دریافت مخاطبین خطایی رخ داد، احتمالا فایل ویرایش شده! .'});
    }
  }
};


module.exports = {postRequest, getRequest, getAllContacts};
