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
      username: savedFaculty.email,
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

// UPDATE FACULTY

exports.updateFaculty = async (req, res) => {
  try {
    const { id } = req.params; // This is "FAC-2026-001"

    // Use findOneAndUpdate to search by the 'facultyId' field
    const updatedFaculty = await Faculty.findOneAndUpdate(
      { facultyId: id }, // Match the custom ID field
      req.body,
      { new: true, runValidators: true } 
    );

    if (!updatedFaculty) {
      return res.status(404).json({
        success: false,
        message: "Faculty not found with ID: " + id
      });
    }

    // UPDATE User table when you updated university email id of faculty table
    await Users.findOneAndUpdate(
      { userID: updatedFaculty._id },
      { username: updatedFaculty.email }
    );

    res.json({
      success: true,
      message: "Faculty updated successfully",
      data: updatedFaculty
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating faculty",
      error: error.message
    });
  }
};

// DELETE FACULTY (using facultyId)
exports.deleteFaculty = async (req, res) => {
  try {
    const { id } = req.params; // this is FAC-2026-001

    const deletedFaculty = await Faculty.findOneAndDelete({
      facultyId: id
    });

    if (!deletedFaculty) {
      return res.status(404).json({
        success: false,
        message: "Faculty not found with ID: " + id
      });
    }

    // ALSO DELETE FROM USERS COLLECTION (important 🔥)
    await Users.findOneAndDelete({
      userID: deletedFaculty._id
    });

    res.json({
      success: true,
      message: "Faculty deleted successfully"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting faculty",
      error: error.message
    });
  }
};