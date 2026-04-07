exports.getFaculty = async (req, res) => {
    try {
        const data = await Faculty.find();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// const Faculty = require("../models/Faculty");

// // ADD FACULTY

// exports.addFaculty = async (req, res) => {
//   try {
//     const newFaculty = new Faculty(req.body);
//     const savedFaculty = await newFaculty.save();

//     res.status(201).json({
//       success: true,
//       message: "Faculty added successfully",
//       data: savedFaculty
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Error adding faculty",
//       error: error.message
//     });
//   }
// };

const mongoose = require("mongoose");
const Faculty = require("../models/Faculty");
const Users = require("../models/Users"); // Make sure this path is correct

// GET ALL FACULTY
exports.getFaculty = async (req, res) => {
    try {
        const data = await Faculty.find();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ADD FACULTY (Double Save Logic)
exports.addFaculty = async (req, res) => {
  try {
    // 1. Save Faculty first
    const newFaculty = new Faculty(req.body);
    const savedFaculty = await newFaculty.save();

    // 2. Save User next (No session needed)
    const newUser = new Users({
      userID: savedFaculty._id,
      onModel: "Faculty",
      role: "faculty",
      password: req.body.password || "SU1234"
    });
    await newUser.save();

    res.status(201).json({
      success: true,
      message: "Faculty and User created successfully!",
      data: savedFaculty
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error adding faculty",
      error: error.message
    });
  }
};