const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

const eventRoutes = require("./routes/events");
const goalRoutes = require("./routes/goals");

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/calendar", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use("/api/events", eventRoutes);
app.use("/api/goals", goalRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));