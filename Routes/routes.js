const express = require("express");
const teacherController = require("../Controllers/teacherController");
const studentsController = require("../Controllers/studentsController");

const router = express.Router();

router.get("/", teacherController.getTeachers);
router.post("/", teacherController.createTeacher);

router.get("/students", studentsController.getStudents);
router.get("/students/:name", studentsController.getStudentsByName);
router.post("/add-students", studentsController.newStudent);

module.exports = router;