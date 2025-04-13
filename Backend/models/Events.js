const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
    title: String,
    start: Date,
    end: Date,
    category: String,
    color: String,
});

module.exports = mongoose.model("Event", EventSchema);
