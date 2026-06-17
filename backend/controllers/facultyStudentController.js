const User = require("../models/Users");
const Faculty = require("../models/Faculty");
const Department = require("../models/Department");
const Program = require("../models/Program");
const Student = require("../models/Student");

const getDepartmentStudents = async (req, res) => {
  try {
    console.log("JWT User:", req.user);

    // STEP 1: Find User from JWT
    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // console.log("User Found:", user);

    // STEP 2: Find Faculty using user.userID
    const faculty = await Faculty.findById(user.userID);

    if (!faculty) {
      return res.status(404).json({
        success: false,
        message: "Faculty not found",
      });
    }

    // console.log("Faculty Found:", faculty);

    // STEP 3: Find Department
    const department = await Department.findOne({
      DepartmentName: faculty.department,
    });

    if (!department) {
      return res.status(404).json({
        success: false,
        message: "Department not found",
      });
    }

    // console.log("Department Found:", department);

    // STEP 4: Find Programs for Department
    let programs = await Program.find({
      "departmentName._id": department._id,
    });

    // Fallback if schema stores ObjectId directly
    if (programs.length === 0) {
      programs = await Program.find({
        departmentName: department._id,
      });
    }

    // console.log("Programs Found:", programs.length);

    const programIds = programs.map((program) => program._id);

    // console.log("Program IDs:", programIds);

    // STEP 5: Find Students
    let students = await Student.find({
      "program._id": { $in: programIds },
    });

    // Fallback if schema stores program as ObjectId
    if (students.length === 0) {
      students = await Student.find({
        program: { $in: programIds },
      }).populate("program");
    }

    // console.log("Students Found:", students.length);

    return res.status(200).json({
      success: true,
      department: department.DepartmentName,
      totalPrograms: programs.length,
      totalStudents: students.length,
      students,
    });
  } catch (error) {
    console.error("Department Students Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getDepartmentStudents,
};