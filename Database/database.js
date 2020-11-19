const {
    Sequelize,
    Model,
    DataTypes
} = require("sequelize");
// const mongoose = require("mongoose");

const sequelize = new Sequelize("joaoferr_tsiw", "joaoferr_tsiw", "GAa8xvmV3eKrVa8C", {
    host: "www.joaoferreira.eu",
    dialect: "mysql"
});

class Teacher extends Model {};

Teacher.init({
    nome: DataTypes.STRING, // name
    idade: DataTypes.INTEGER // age
}, {
    sequelize,
    modelName: "Lecture"
});

sequelize.sync().then().catch(error => {
    console.log(error);
})

// const studentSchema = new mongoose.Schema({
//     name: String,
//     age: Number
// });

// const student = mongoose.model("student", studentSchema);

// module.exports = student; 

// module.exports = Teacher;