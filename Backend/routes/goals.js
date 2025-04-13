const express = require("express");
const router = express.Router();
const Goal = require("../models/Goal");
const Task = require("../models/Task");

router.get("/", async (req, res) => {
    const goals = await Goal.find();
    res.json(goals);
});

router.get("/:goalId/tasks", async (req, res) => {
    const tasks = await Task.find({ goalId: req.params.goalId });
    res.json(tasks);
});

module.exports = router;
