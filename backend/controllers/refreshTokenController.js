// const User = require('../models/User');
let {usersFilePath} = require("./filesPath");
const jwt = require('jsonwebtoken');
const {findObjectByRefreshToken, updateArray} = require("./functions");

const handleRefreshToken = async (req, res) => {

  debugger
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401);
  const refreshToken = cookies.jwt;
  res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });

  // const foundUser = await User.findOne({ refreshToken }).exec();


  const foundUser = await findObjectByRefreshToken(refreshToken, usersFilePath, res)

  // Detected refresh token reuse!
  if (!foundUser) {

    // jwt.verify(
    //   refreshToken,
    //   process.env.REFRESH_TOKEN_SECRET,
    //   async (err, decoded) => {
    //     if (err) return res.sendStatus(403).json({
    //       message:'عدم دسترسی در  رفرش توکن'
    //     }); //Forbidden
    //     console.log('attempted refresh token reuse!')
    //     const hackedUser = await User.findOne({ username: decoded.username }).exec();
    //     hackedUser.refreshToken = [];
    //     const result = await hackedUser.save();
    //     console.log(result);
    //   }
    // )
    return res.sendStatus(403).json({
      message:'عدم دسترسی به  رفرش توکن'
    }); //Forbidden
  }

  // const newRefreshTokenArray = foundUser.refreshToken.filter(rt => rt !== refreshToken);

  // evaluate jwt
  jwt.verify(
    refreshToken,

    process.env.REFRESH_TOKEN_SECRET,
    async (err, decoded) => {
      if (err) {
        debugger
        console.log('expired refresh token')
        foundUser.refreshToken =refreshToken;
        const result = await updateArray(foundUser,usersFilePath,res)
        console.log(result);
      }
      if (err || foundUser.username !== decoded.username)
        return res.sendStatus(403).json({
        message:'عدم دسترسی در  رفرش کنترلر'
      });

      // Refresh token was still valid
      const userInfo =       {
        "phoneNumber": foundUser.phoneNumber,
        "name": foundUser.name,
        "addContactAccess": foundUser.addContactAccess,
        "editContactAccess": foundUser.editContactAccess,
        "deleteContactAccess": foundUser.deleteContactAccess,
        "listAllContactAccess": foundUser.listAllContactAccess,
        "listOwnContactAccess": foundUser.listOwnContactAccess,
        "addUserAccess": foundUser.addUserAccess,
        "deleteUserAccess": foundUser.deleteUserAccess,
        "editUserAccess": foundUser.editUserAccess,
        "listUserAccess": foundUser.listUserAccess,
      }


      const accessToken = jwt.sign(
        {
          "UserInfo": decoded.userInfo
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '3600s' }
      );

      const newRefreshToken = jwt.sign(
        { "phoneNumber": foundUser.phoneNumber },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: '1d' }
      );
      // Saving refreshToken with current user
      foundUser.refreshToken =  newRefreshToken;
      const result = await updateArray(foundUser,usersFilePath,res)

      // Creates Secure Cookie with refresh token
      res.cookie('jwt', newRefreshToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });

      debugger
      return res.json({ userInfo, accessToken })
    }
  );
}

module.exports = {handleRefreshToken}


