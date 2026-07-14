const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
    getAllPerformance,
    createPerformance
} = require("../controllers/hrPerformanceController");

router.get("/", protect, getAllPerformance);

router.post("/", protect, createPerformance);

module.exports = router;