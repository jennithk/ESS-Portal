const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
    getAllPayrolls,
    createPayroll
} = require("../controllers/hrPayrollController");

router.get("/", protect, getAllPayrolls);

router.post("/", protect, createPayroll);

module.exports = router;