const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
    getAllLeaves,
    updateLeaveStatus
} = require("../controllers/hrLeaveController");

router.get("/", protect, getAllLeaves);

router.put("/:id", protect, updateLeaveStatus);

module.exports = router;