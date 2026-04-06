const Department = require('../models/Department');

// CREATE
exports.addDepartment = async (req, res) => {
    try {
        if (!req.body.StartDate) {
            delete req.body.StartDate;
        }

        const dept = await Department.create(req.body);

        res.json({
            message: "Department added successfully",
            data: dept
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// GET all departments
exports.getDepartments = async (req, res) => {
    try {
        const data = await Department.find();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};