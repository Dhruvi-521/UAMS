const express = require("express");

const router = express.Router();

const upload = require(
  "../middleware/uploadMaterial"
);

const {
  uploadMaterial,
  getMaterialsByCourse,
  updateMaterial,
  deleteMaterial,
} = require(
  "../controllers/materialController"
);

const auth = require(
  "../middleware/authMiddleware"
);

router.post(
  "/upload",
  auth,
  upload.single("file"),
  uploadMaterial
);

router.get(
  "/course/:courseId",
  auth,
  getMaterialsByCourse
);

router.put(
  "/:id",
  auth,
  updateMaterial
);

router.delete(
  "/:id",
  auth,
  deleteMaterial
);

module.exports = router;