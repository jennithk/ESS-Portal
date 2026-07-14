const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
    getProfile,
    getDashboard
} = require("../controllers/employeeController");

router.get("/profile", protect, getProfile);

router.get("/dashboard", protect, getDashboard);

module.exports = router;