const fs = require('fs').promises;


const readArrayFile = async (filePath) => {
  try {
     
    const data = await fs.readFile(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    if (error.code === 'ENOENT') {
      // If the file does not exist, return an empty array
      return [];
    } else {
      throw error;
    }
  }
}


// Assuming fs and usersFilePath are defined elsewhere in your code

const writeArrayFile = async (row, usersFilePath, res) => {
  try {
    await fs.writeFile(usersFilePath, JSON.stringify(row, null, 2));
  } catch (err) {
    res.status(500).json({message: 'Error writing to users file'});
  }
};

const findObjectByPhoneNumber = async (phoneNumber, filePath, res) => {
  try {
     
    const myArray = await readArrayFile(filePath);
     
    const temp = myArray.find(row => row.phoneNumber === phoneNumber);
     
    return temp;
  } catch (err) {
    res.status(500).json({message: 'Error finding user by phone number'});
  }
};

const updateArray = async (caseToUpdate, filePath, res) => {
  try {
    const users = await readArrayFile(filePath);
    const updatedArray = users.map(v => {
      let row = {...v}
      if(row.phoneNumber === caseToUpdate.phoneNumber){
         row = {...row , ...caseToUpdate}
      }

      return  row
      // row.phoneNumber === caseToUpdate.phoneNumber ? caseToUpdate : row
    });
    await writeArrayFile(updatedArray, filePath, res);
  } catch (err) {
     
    res.status(500).json({message: 'Error updating Array'});
  }
};

const addRowToArray = async (newRow, filePath, res) => {
  try {
    const myArray = await readArrayFile(filePath);
    myArray.push(newRow);
    await writeArrayFile(myArray, filePath, res);
  } catch (err) {
    res.status(500).json({message: 'Error adding new user'});
  }
};
const deleteRowFromArray = async (phoneNumber, filePath, res) => {
  try {
    const myArray = await readArrayFile(filePath);

    // Filter out the user with the specified phone number
    const filteredArray = myArray.filter(row => row.phoneNumber !== phoneNumber);

    // Write the updated array back to the file
    await writeArrayFile(filteredArray, filePath, res);

    // Optionally, you can send a response indicating success
    res.status(200).json({ message: 'حذف شد' });
  } catch (err) {
    res.status(500).json({ message: 'مشکلی در حذف پیش اومد.. حذف نشد.' });
  }
};

const findObjectByRefreshToken = async (refreshToken, filePath, res)=>{
  try {

    const myArray = await readArrayFile(filePath);

    return myArray.find(row => row.refreshToken === refreshToken);
  } catch (err) {
    res.status(500).json({message: 'Error finding user by phone number'});
  }
}


module.exports = {
  addRowToArray, updateArray, findObjectByPhoneNumber,deleteRowFromArray,
  readArrayFile,
  findObjectByRefreshToken
}