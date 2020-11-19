// const student = require("../Models/studentModel");
const student = require("../Models/studentModel");
const {
    validationResult,
    body,
    param
} = require("express-validator");

const getStudents = (req, res) => {
    student.find(function (err, students) {
        if (err) {
            res.status(400).send(err);
        }
        res.status(200).json(students);
    })
}

const getStudentsByName = (req, res) => {
    param("name").notEmpty().escape();
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        student.find({
            name: req.params.name
        }, function (err, students) {
            if (err) {
                res.status(400).send(err);
            }
            res.status(200).json(students);
        })
    } else res.status(404).json({
        errors: errors.array()
    });
}

const newStudent = (req, res) => {
    body("name").notEmpty().escape();
    body("age").isNumeric();
    const errors = validationResult(req);

    if (errors.isEmpty()) {
        const studentToCreate = new student({
            name: req.body.name,
            age: req.body.age
        });

        studentToCreate.save(function (err, newStudent) {
            if (err) {
                res.status(400).send(err);
            }
            res.status(200).json(newStudent);
        })
    } else res.status(404).json({
        errors: errors.array()
    })
}

module.exports = {
    getStudents,
    getStudentsByName,
    newStudent
};