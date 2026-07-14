const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
    getEmployees,
    getEmployee
} = require("../controllers/hrController");

router.get("/employees", protect, getEmployees);

router.get("/employees/:id", protect, getEmployee);

module.exports = router;