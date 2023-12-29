const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {

    debugger
    const authHeader = req.headers.authorization || req.headers.Authorization;

    if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401);
    const token = authHeader.split(' ')[1];
    console.log(token)

    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err) {
              debugger
              return res.sendStatus(403).json({
                message:'عدم دسترسی در  وریفای جی دابیلو تی  '
              });
            } //invalid token
            // req.user = decoded.UserInfo.username;
            req.userInfo=decoded.UserInfo
            next();
        }
    );
}

module.exports = verifyJWT