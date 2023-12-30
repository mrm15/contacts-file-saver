const jwt = require('jsonwebtoken');
const {json} = require("body-parser");

const verifyJWT = (req, res, next) => {

     
    const authHeader = req.headers.authorization || req.headers.Authorization;

    if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401);
    const token = authHeader.split(' ')[1];
    console.log(token)
    if(!token){
      res.status(401).json({message:"token invalid"})

    }
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err) {
               
              return res.status(403).json({
                message:'عدم دسترسی در  وریفای جی دابیلو تی  ' + JSON.stringify(err)
              });
            } //invalid token
            // req.user = decoded.UserInfo.username;
            req.userInfo=decoded.UserInfo
            next();
        }
    );
}

module.exports = verifyJWT