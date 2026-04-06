const express = require('express');
const router = express.Router();
const { addDepartment, getDepartments, updateDepartment } = require('../controllers/departmentController');

// POST
router.post('/add-department', addDepartment);

// GET 
router.get('/departments', getDepartments);

// UPDATE
router.put('/update-department/:id', updateDepartment);

module.exports = router;