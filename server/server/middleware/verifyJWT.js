const jwt = require(`jsonwebtoken`);
require("dotenv").config();

const verifyJWT = (req, res, next) => {
    
    if (!req.cookies?.jwt) {
        return res.status(401).send(`UnAuthrized`)
    }
    const token = req.cookies.jwt

    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(403).send({ auth: false, msg: "forbidden" });
        }
        req.username = decoded.userInfo.username
        req.roles=decoded.userInfo.roles
        console.log(req.username)
        console.log (req.roles)
        next();
    });
};

module.exports = verifyJWT