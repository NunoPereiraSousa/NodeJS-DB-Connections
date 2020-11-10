const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require("mongoose");
const router = require("./Routes/routes.js");
const {
    Sequelize
} = require("sequelize");
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(router);

// SEQUELIZE
const sequelize = new Sequelize("joaoferr_dtam", "joaoferr_dtam", "5SNhnBGKPUJTYy2M", {
    host: "www.joaoferreira.eu",
    dialect: "mysql"
});

sequelize.authenticate().then(errors => {
    errors ? console.error(`Unable to connect to the database: ${errors}`) : console.log("Connected to mysql")
});

// MONGOOSE
mongoose.connect("mongodb+srv://dtam:5SNhnBGKPUJTYy2M@cluster0.wsbmj.mongodb.net/DTAM?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error: "));
db.once("open", function () {
    console.log("Connected to mongoose")
});

app.listen(port, () => console.log(`Serving working on port ${port}`));