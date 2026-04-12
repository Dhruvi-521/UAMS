const Program = require('../models/Program');

// ✅ CREATE Program
exports.addProgram = async (req, res) => {
    try {
        if (!req.body.StartDate) {
            delete req.body.StartDate;
        }

        const program = await Program.create(req.body);

        res.status(201).json({
            message: "Program added successfully",
            data: program
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

// ✅ GET All Programs
exports.getPrograms = async (req, res) => {
    try {
        const data = await Program.find().populate('departmentName');
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ✅ UPDATE Program (FIXED 🔥)
exports.updateProgram = async (req, res) => {
    try {
        const updated = await Program.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,        // ✅ correct update
                $inc: { __v: 1 }       // ✅ increment version
            },
            { new: true }
        );

        if (!updated) {
            return res.status(404).json({ message: "Program not found" });
        }

        res.json({
            message: "Program updated successfully",
            data: updated,
            updateCount: updated.__v   // optional
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ✅ DELETE Program
// exports.deleteProgram = async (req, res) => {
//     try {
//         await Program.findByIdAndDelete(req.params.id);
//         res.json({ message: "Program deleted successfully" });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// ✅ DELETE Program
exports.deleteProgram = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedProgram = await Program.findByIdAndDelete(id);

        if (!deletedProgram) {
            return res.status(404).json({
                message: "Program not found"
            });
        }

        res.json({
            message: "Program deleted successfully",
            data: deletedProgram
        });

    } catch (error) {
        console.error("DELETE ERROR:", error); // 🔥 VERY IMPORTANT
        res.status(500).json({ error: error.message });
    }
};

// ✅ GET Programs by Department
exports.getProgramsByDepartment = async (req, res) => {
    try {
        const { departmentId } = req.params;

        const programs = await Program.find({
            departmentName: departmentId
        }).populate('departmentName');

        res.json(programs);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};