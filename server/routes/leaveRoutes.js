const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
    applyLeave,
    getLeaves,
    getLeaveById
} = require("../controllers/leaveController");

router.post("/", protect, applyLeave);

router.get("/", protect, getLeaves);

router.get("/:id", protect, getLeaveById);

module.exports = router;