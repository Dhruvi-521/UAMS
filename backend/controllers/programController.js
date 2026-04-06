const Program = require('../models/Program');

// ✅ CREATE Program
exports.addProgram = async (req, res) => {
    try {
        // remove empty StartDate (for default to work)
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


// ✅ GET All Programs (with department details 🔥)
exports.getPrograms = async (req, res) => {
    try {
        const data = await Program.find()
            .populate('departmentName');  // 🔥 join with Department

        res.json(data);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// ✅ UPDATE Program
exports.updateProgram = async (req, res) => {
    try {
        const updated = await Program.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json(updated);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// ✅ DELETE Program
exports.deleteProgram = async (req, res) => {
    try {
        await Program.findByIdAndDelete(req.params.id);

        res.json({ message: "Program deleted successfully" });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// ✅ GET Programs by Department
exports.getProgramsByDepartment = async (req, res) => {
    try {
        const { departmentId } = req.params;

        const programs = await Program.find({
            departmentName: departmentId   // filtering by department
        }).populate('departmentName'); // optional (for extra info)

        res.json(programs);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};