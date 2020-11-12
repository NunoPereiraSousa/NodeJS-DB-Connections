const jwt = require("jsonwebtoken");

const generateToken = (userInfo, callback) => {
    let secret = process.env.JWT_KEY;
    let token = jwt.sign({
        data: userInfo,
    }, secret, {
        expiresIn: "12h"
    });
    return callback(token);
}

const validateToken = (token, callback) => {
    if (!token) return callback(false);
    let secret = process.env.JWT_KEY;
    jwt.verify(token.replace("Bearer ", ""), secret, (error, decoded) => {
        if (error) return callback(false);
        else return callback(true);
    })
}

module.exports = {
    generateToken,
    validateToken
};