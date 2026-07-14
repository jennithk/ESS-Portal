const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
    getPayrolls,
    getPayrollById,
    createPayroll
} = require("../controllers/payrollController");

router.get("/", protect, getPayrolls);

router.get("/:id", protect, getPayrollById);

router.post("/", protect, createPayroll);

module.exports = router;