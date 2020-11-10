const {
    Sequelize,
    Model,
    DataTypes
} = require("sequelize");
const mongoose = require("mongoose");

const sequelize = new Sequelize("joaoferr_dtam", "joaoferr_dtam", "5SNhnBGKPUJTYy2M", {
    host: "www.joaoferreira.eu",
    dialect: "mysql"
});

class Teacher extends Model {};

Teacher.init({
    nome: DataTypes.STRING,
    idade: DataTypes.INTEGER
}, {
    sequelize,
    modelName: "NunoTeacher"
});

sequelize.sync().then().catch(error => {
    console.log(error);
})

const studentSchema = new mongoose.Schema({
    name: String,
    age: Number
});

const student = mongoose.model("student", studentSchema);

module.exports = student; 

// module.exports = Teacher;