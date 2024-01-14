const {readArrayFile} = require("../functions");
const {usersFilePath} = require("../filesPath");

const listOfUsersController = async (req, res) => {

  debugger
  try {
    if (!req?.userInfo?.listUserAccess) {
      res.status(406).send({
        message: 'شما مجوز دسترسی به این بخش را ندارید!'
      });
    }
    const data = await readArrayFile(usersFilePath);

    res.status(200).json(data);
  } catch (err) {
    if (err.code === 'ENOENT') {
      res.status(404).json([]);
    } else {
      res.status(500).json({message: 'در هنگام دریافت اطلاعات خطایی رخ داد.'});
    }
  }
};


module.exports = listOfUsersController;
