const Material = require("../models/Material");
const fs = require("fs");

exports.uploadMaterial = async (
  req,
  res
) => {
  try {
    const {
      title,
      description,
      courseId,
    } = req.body;

    const facultyId =
      req.user.profileId;

    if (!req.file) {
      return res.status(400).json({
        message: "File required",
      });
    }

    const material =
      await Material.create({
        title,
        description,
        courseId,
        facultyId,
        fileName:
          req.file.originalname,
        filePath: req.file.path,
      });

    res.status(201).json({
      success: true,
      material,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

exports.getMaterialsByCourse =
  async (req, res) => {
    try {
      const materials =
        await Material.find({
          courseId:
            req.params.courseId,
        })
          .populate("courseId")
          .sort({
            createdAt: -1,
          });

      res.json(materials);
    } catch (error) {
      res.status(500).json({
        error: error.message,
      });
    }
  };

exports.updateMaterial =
  async (req, res) => {
    try {
      const material =
        await Material.findByIdAndUpdate(
          req.params.id,
          req.body,
          {
            new: true,
          }
        );

      res.json(material);
    } catch (error) {
      res.status(500).json({
        error: error.message,
      });
    }
  };

exports.deleteMaterial =
  async (req, res) => {
    try {
      const material =
        await Material.findById(
          req.params.id
        );

      if (!material) {
        return res
          .status(404)
          .json({
            message:
              "Material not found",
          });
      }

      if (
        fs.existsSync(
          material.filePath
        )
      ) {
        fs.unlinkSync(
          material.filePath
        );
      }

      await Material.findByIdAndDelete(
        req.params.id
      );

      res.json({
        success: true,
        message:
          "Material deleted successfully",
      });
    } catch (error) {
      res.status(500).json({
        error: error.message,
      });
    }
  };