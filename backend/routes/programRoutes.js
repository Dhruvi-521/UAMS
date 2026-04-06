const express = require('express');
const router = express.Router();

const {
    addProgram,
    getPrograms,
    updateProgram,
    deleteProgram
} = require('../controllers/programController');

// CREATE
router.post('/programs', addProgram);

// READ
router.get('/programs', getPrograms);

// UPDATE
router.put('/programs/:id', updateProgram);

// DELETE
router.delete('/programs/:id', deleteProgram);

module.exports = router;