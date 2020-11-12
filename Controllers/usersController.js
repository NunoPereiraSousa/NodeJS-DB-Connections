const user = require("../Models/usersModel");
const bcrypt = require("bcrypt");
const tokenMiddleware = require("../Middleware/webTokens");

const login = (req, res) => {
    user.find({
        username: req.body.username
    }, (err, user) => {
        if (err) res.status(400).send(err);
        if (user.length > 0) {
            bcrypt.compare(req.body.password, user[0].password).then(function (result) {
                if (result) {
                    tokenMiddleware.generateToken({
                        user: req.body.username
                    }, (token) => {
                        console.log(1);
                        res.status(200).json(token);
                    })
                } else res.status(401).send("Not Authorized");
            });
        } else res.status(401).send("Not Authorized");
    });
}

module.exports = {
    login
};