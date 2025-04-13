const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
    goalId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Goal",
    },
    name: String,
    color: String,
});

module.exports = mongoose.model("Task", TaskSchema);