const express = require('express');
const router = express.Router();
const { addDepartment, getDepartments, updateDepartment , deleteDepartment } = require('../controllers/departmentController');

// POST
router.post('/add-department', addDepartment);

// GET 
router.get('/departments', getDepartments);

// UPDATE
router.put('/update-department/:id', updateDepartment);

// DELETE
router.delete('/delete-department/:id', deleteDepartment);
module.exports = router;