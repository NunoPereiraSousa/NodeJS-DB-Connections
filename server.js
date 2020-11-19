require("dotenv").config(); 
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require("mongoose");
const router = require("./Routes/routes.js");
const {
    Sequelize
} = require("sequelize");
const bodyParser = require('body-parser');
const tokenMiddleware = require("./Middleware/webTokens");

// Swagger
const swaggerUi = require("swagger-ui-express"); 
const swaggerDocument = require("./Swagger JSON/swagger.json")

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, {explorer: true})); 

// SEQUELIZE
// const sequelize = new Sequelize("joaoferr_tsiw", "joaoferr_tsiw", "GAa8xvmV3eKrVa8C", {
//     host: "www.joaoferreira.eu",
//     dialect: "mysql"
// });

// sequelize.authenticate().then(errors => {
//     errors ? console.error(`Unable to connect to the database: ${errors}`) : console.log("Connected to mysql")
// });

const auth = function(req, res, next) {
    let exceptions = ["/login", "/register", "/api-docs"]; 
    if(exceptions.indexOf(req.url) >= 0) {
        next();
    } else {
        tokenMiddleware.validateToken(req.headers.authorization, (result) => {
            if(result) {
                next(); 
            } else {
                res.status(401).send("Invalid Token"); 
            }
        });
    }
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(auth); 
app.use(router);

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