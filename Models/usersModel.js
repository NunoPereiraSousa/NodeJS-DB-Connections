const mongoose = require("mongoose");

const UsersSchema = new mongoose.Schema({
    username: String,
    password: String
})

const user = mongoose.model("tbl_users", UsersSchema);

module.exports = user;