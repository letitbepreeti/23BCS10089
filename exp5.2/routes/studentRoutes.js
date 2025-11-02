const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

// Routes mapping controller methods
router.post('/', studentController.createStudent);      // Create student
router.get('/', studentController.getAllStudents);      // Get all students
router.get('/:id', studentController.getStudentById);   // Get student by ID
router.put('/:id', studentController.updateStudent);    // Update student
router.delete('/:id', studentController.deleteStudent); // Delete student

module.exports = router;
