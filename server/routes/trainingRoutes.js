const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
    getTrainings,
    getTrainingById,
    createTraining
} = require("../controllers/trainingController");

router.get("/", protect, getTrainings);

router.get("/:id", protect, getTrainingById);

router.post("/", protect, createTraining);

module.exports = router;