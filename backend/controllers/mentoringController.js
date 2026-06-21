const MentoringSlot = require("../models/MentoringSlot");

/**
 * Create Multiple Slots
 */
const createSlots = async (req, res) => {
    try {
        const faculty = req.user.profileId;

        const { slots } = req.body;

        if (!slots || slots.length === 0) {
            return res.status(400).json({
                success: false,
                message: "No slots provided",
            });
        }

        const createdSlots = [];
        const duplicateSlots = [];

        for (const slot of slots) {
            const exists = await MentoringSlot.findOne({
                faculty,
                date: slot.date,
                startTime: slot.startTime,
                endTime: slot.endTime,
            });

            if (exists) {
                duplicateSlots.push({
                    date: slot.date,
                    startTime: slot.startTime,
                    endTime: slot.endTime,
                });

                continue;
            }

            const newSlot = await MentoringSlot.create({
                faculty,
                program: slot.program,
                semester: slot.semester,
                date: slot.date,
                startTime: slot.startTime,
                endTime: slot.endTime,
            });

            createdSlots.push(newSlot);
        }

        return res.status(201).json({
            success: true,
            message: "Slots created successfully",
            createdCount: createdSlots.length,
            duplicateCount: duplicateSlots.length,
            createdSlots,
            duplicateSlots,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

/**
 * Logged-in Faculty Slots
 */
const getMySlots = async (req, res) => {
    try {
        const facultyId = req.user.profileId;

        const slots = await MentoringSlot.find({
            faculty: facultyId,
        })
            .populate("program", "programName")
            .populate(
                "student",
                "studentId firstName middleName lastName"
            )
            .sort({
                date: 1,
                startTime: 1,
            });

        return res.status(200).json({
            success: true,
            count: slots.length,
            slots,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

/**
 * Open Slots For Students
 */
const getOpenSlots = async (req, res) => {
    try {
        const slots = await MentoringSlot.find({
            status: "OPEN",
        })
            .populate(
                "faculty",
                "facultyId firstName middleName lastName"
            )
            .populate("program", "programName")
            .sort({
                date: 1,
                startTime: 1,
            });

        return res.status(200).json({
            success: true,
            count: slots.length,
            slots,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

/**
 * Student Books Slot
 */
const bookSlot = async (req, res) => {
    try {

        const { slotId } = req.body;

        const student = await Student.findById(
            req.user.profileId
        );

        if (!student) {
            return res.status(404).json({
                success: false,
                message: "Student not found"
            });
        }

        const slot = await MentoringSlot.findById(slotId);

        if (!slot) {
            return res.status(404).json({
                success: false,
                message: "Slot not found"
            });
        }

        if (slot.status !== "OPEN") {
            return res.status(400).json({
                success: false,
                message: "Slot already booked"
            });
        }

        slot.student = student._id;
        slot.status = "BOOKED";

        await slot.save();

        return res.status(200).json({
            success: true,
            message: "Slot booked successfully"
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

/**
 * Delete Slot
 */
const deleteSlot = async (req, res) => {
    try {
        const slot = await MentoringSlot.findById(
            req.params.slotId
        );

        if (!slot) {
            return res.status(404).json({
                success: false,
                message: "Slot not found",
            });
        }

        if (
            slot.faculty.toString() !==
            req.user.profileId
        ) {
            return res.status(403).json({
                success: false,
                message: "Unauthorized",
            });
        }

        await MentoringSlot.findByIdAndDelete(
            req.params.slotId
        );

        return res.status(200).json({
            success: true,
            message: "Slot deleted successfully",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

/**
 * Cancel Slot
 */
const cancelSlot = async (req, res) => {
    try {
        const slot = await MentoringSlot.findById(
            req.params.slotId
        );

        if (!slot) {
            return res.status(404).json({
                success: false,
                message: "Slot not found",
            });
        }

        slot.status = "CANCELLED";

        await slot.save();

        return res.status(200).json({
            success: true,
            message: "Slot cancelled successfully",
            slot,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Student side mentoring controller 
const Student = require("../models/Student");

const getAvailableSlotsForStudent = async (req, res) => {
    try {

        const student = await Student.findById(
            req.user.profileId
        ).populate("program");

        if (!student) {
            return res.status(404).json({
                success: false,
                message: "Student not found"
            });
        }

        const slots = await MentoringSlot.find({
            program: student.program._id,
            semester: student.semester,
            status: "OPEN"
        })
            .populate(
                "faculty",
                "facultyId firstName middleName lastName department designation"
            )
            .populate(
                "program",
                "programName"
            )
            .sort({
                date: 1,
                startTime: 1
            });

        return res.status(200).json({
            success: true,
            studentProgram: student.program.programName,
            studentSemester: student.semester,
            count: slots.length,
            slots
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

const getMyBookedSlots = async (req, res) => {
    try {

        const studentId = req.user.profileId;

        const slots = await MentoringSlot.find({
            student: studentId
        })
            .populate(
                "faculty",
                "facultyId firstName middleName lastName"
            )
            .populate(
                "program",
                "programName"
            )
            .sort({
                date: 1
            });

        return res.status(200).json({
            success: true,
            slots
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
};


module.exports = {
    createSlots,
    getMySlots,
    getOpenSlots,
    bookSlot,
    deleteSlot,
    cancelSlot,
    getAvailableSlotsForStudent,
    getMyBookedSlots
};