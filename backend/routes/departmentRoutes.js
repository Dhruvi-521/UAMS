const express = require('express');
const router = express.Router();
const { addDepartment, getDepartments } = require('../controllers/departmentController');

// POST
router.post('/add-department', addDepartment);

// GET 
router.get('/departments', getDepartments);

module.exports = router;