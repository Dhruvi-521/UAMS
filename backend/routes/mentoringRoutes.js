const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");

const {
  createSlots,
  getMySlots,
  getOpenSlots,
  bookSlot,
  deleteSlot,
  cancelSlot,
  getAvailableSlotsForStudent,
  getMyBookedSlots
} = require("../controllers/mentoringController");

/**
 * Faculty Creates Slots
 */
router.post(
  "/create-slots",
  verifyToken,
  createSlots
);

/**
 * Logged In Faculty Slots
 */
router.get(
  "/my-slots",
  verifyToken,
  getMySlots
);

/**
 * Student View Open Slots
 */
router.get(
  "/open-slots",
  verifyToken,
  getOpenSlots
);

/**
 * Student Books Slot
 */
router.post(
  "/book-slot",
  verifyToken,
  bookSlot
);

/**
 * Delete Slot
 */
router.delete(
  "/:slotId",
  verifyToken,
  deleteSlot
);

/**
 * Cancel Slot
 */
router.patch(
  "/cancel/:slotId",
  verifyToken,
  cancelSlot
);

// Student side Mentoring routes 
router.get(
    "/student/available-slots",
    verifyToken,
    getAvailableSlotsForStudent
);

router.get(
    "/student/my-bookings",
    verifyToken,
    getMyBookedSlots
);

module.exports = router;