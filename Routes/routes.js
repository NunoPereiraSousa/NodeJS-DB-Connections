const express = require("express");
const teacherController = require("../Controllers/teacherController");
const studentsController = require("../Controllers/studentsController");
const usersController = require("../Controllers/usersController")

const router = express.Router();

router.get("/", teacherController.getTeachers);
router.post("/", teacherController.createTeacher);

router.get("/students", studentsController.getStudents);
router.get("/students/:name", studentsController.getStudentsByName);
router.post("/add-students", studentsController.newStudent);

router.post("/login", usersController.login);

module.exports = router;