const express = require('express');
const router = express.Router();

const {
    addProgram,
    getPrograms,
    updateProgram,
    deleteProgram,
    getProgramsByDepartment 
} = require('../controllers/programController');

// CREATE
router.post('/programs', addProgram);

// READ
router.get('/programs', getPrograms);

// UPDATE
router.put('/programs/:id', updateProgram);

// DELETE
router.delete('/delete-programs/:id', deleteProgram);

// Department wise Program
router.get('/programs/:departmentId', getProgramsByDepartment);

module.exports = router;