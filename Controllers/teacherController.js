const Teacher = require("../Database/database");

const getTeachers = (req, res) => {
    Teacher.findAll().then((teachers) => {
        res.status(200).json(teachers);
    }).catch(error => {
        res.status(400).send(error);
    })
}

const createTeacher = (req, res) => {
    Teacher.create({
        nome: req.body.nome, // name
        idade: req.body.idade // age
    }).then(newTeacher => {
        res.status(201).json(newTeacher);
    }).catch(error => {
        res.status(400).send(error);
    })
}

module.exports = {
    getTeachers,
    createTeacher
};