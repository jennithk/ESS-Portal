const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
    getPerformances,
    getPerformanceById,
    createPerformance
} = require("../controllers/performanceController");

router.get("/", protect, getPerformances);

router.get("/:id", protect, getPerformanceById);

router.post("/", protect, createPerformance);

module.exports = router;