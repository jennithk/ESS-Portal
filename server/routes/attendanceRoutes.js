const express = require("express");

const router = express.Router();

const {
    checkIn,
    checkOut,
    getAttendance
} = require("../controllers/attendanceController");

const authMiddleware = require("../middleware/authMiddleware");

router.post("/checkin", authMiddleware, checkIn);

router.post("/checkout", authMiddleware, checkOut);

router.get("/", authMiddleware, getAttendance);

module.exports = router;