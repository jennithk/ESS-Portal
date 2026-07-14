const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
    getDashboard,
    getUsers
} = require("../controllers/adminController");

router.get("/dashboard", protect, getDashboard);

router.get("/users", protect, getUsers);

module.exports = router;