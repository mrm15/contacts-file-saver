// const User = require('../models/User');
let {usersFilePath} = require("./filesPath");
const jwt = require('jsonwebtoken');
const {findObjectByRefreshToken, updateArray, findObjectByPhoneNumber} = require("./functions");

const handleRefreshToken = async (req, res) => {

  debugger
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.status(401).json({
    message:`
    کوکی های ارسالی شامل اون     جی دابلیو تی  که لازم داریم نیست   شرمنده `
  });

  const refreshToken = cookies.jwt;
  res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });

  // const foundUser = await User.findOne({ refreshToken }).exec();


  const foundRefreshToken = await findObjectByRefreshToken(refreshToken, usersFilePath, res)

  // Detected refresh token reuse!
  if (!foundRefreshToken) {

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
    return res.status(401).json({
      message:' توکن معتبر نیست'
    }); //
  }

  // const newRefreshTokenArray = foundUser.refreshToken.filter(rt => rt !== refreshToken);

  // evaluate jwt
  jwt.verify(
    refreshToken,

    process.env.REFRESH_TOKEN_SECRET,
    async (err, decoded) => {
      debugger
      if (err) {
        debugger
        console.log('expired refresh token')
        return res.status(500).json({'status': false, message: err+'this is here '});
      }


      const phoneNumber = decoded?.phoneNumber
      // Refresh token was still valid

      if(!phoneNumber){
        return  res.status(401).json({
          message:'توکن معتبر نیست..... شماره توی توکن نبود که!! رفرش توکن اشتباهه',
        })
      }


      const foundUser = await findObjectByPhoneNumber(phoneNumber,usersFilePath,res)

      const accessToken = jwt.sign({
        "UserInfo": {...foundUser},
      },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '3600s' }
      );

      //
      const newRefreshToken = jwt.sign( //
        { //
          "phoneNumber": foundUser.phoneNumber //
        }, //
        process.env.REFRESH_TOKEN_SECRET, {expiresIn: '1d'});

      // Saving refreshToken with current user
      foundUser.refreshToken =  newRefreshToken;
      await updateArray(foundUser,usersFilePath,res)

      // Creates Secure Cookie with refresh token
      res.cookie('jwt', newRefreshToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });

      const userInfo = {
        phoneNumber: foundUser.phoneNumber,
        name: foundUser.name,
        addContactAccess: foundUser.addContactAccess,
        editContactAccess: foundUser.editContactAccess,
        deleteContactAccess: foundUser.deleteContactAccess,
        listAllContactAccess: foundUser.listAllContactAccess,
        listOwnContactAccess: foundUser.listOwnContactAccess,
        addUserAccess: foundUser.addUserAccess,
        deleteUserAccess: foundUser.deleteUserAccess,
        editUserAccess: foundUser.editUserAccess,
        exportContactAccess: foundUser.exportContactAccess,
      }
      return res.json({ userInfo, accessToken })
    }
  );
}

module.exports = {handleRefreshToken}


