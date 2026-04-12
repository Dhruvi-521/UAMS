const Department = require('../models/Department');

// ✅ CREATE
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

// ✅ GET all departments
exports.getDepartments = async (req, res) => {
    try {
        const data = await Department.find();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ✅ UPDATE Department (FIXED 🔥)
exports.updateDepartment = async (req, res) => {
    try {
        const { id } = req.params;

        const updatedDept = await Department.findByIdAndUpdate(
            id,
            {
                $set: req.body,        // ✅ correct update
                $inc: { __v: 1 }       // ✅ increment version
            },
            { new: true }
        );

        if (!updatedDept) {
            return res.status(404).json({
                message: "Department not found"
            });
        }

        res.json({
            message: "Department updated successfully",
            data: updatedDept,
            updateCount: updatedDept.__v   // optional
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Deleting Department

exports.deleteDepartment = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedDept = await Department.findByIdAndDelete(id);

        if (!deletedDept) {
            return res.status(404).json({
                message: "Department not found"
            });
        }

        res.json({
            message: "Department deleted successfully",
            data: deletedDept
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};