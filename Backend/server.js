const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost/calendar', { useNewUrlParser: true, useUnifiedTopology: true });

const Event = mongoose.model('Event', new mongoose.Schema({
    title: String,
    category: String,
    start: Date,
    end: Date,
}));

const Goal = mongoose.model('Goal', new mongoose.Schema({
    name: String,
    color: String,
}));

const Task = mongoose.model('Task', new mongoose.Schema({
    goalId: mongoose.Schema.Types.ObjectId,
    name: String,
}));

// Routes
app.get('/api/events', async (req, res) => {
    const events = await Event.find();
    res.json(events);
});

app.post('/api/events', async (req, res) => {
    const event = new Event(req.body);
    await event.save();
    res.status(201).json(event);
});

app.put('/api/events/:id', async (req, res) => {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(event);
});

app.delete('/api/events/:id', async (req, res) => {
    await Event.findByIdAndDelete(req.params.id);
    res.status(204).send();
});

app.get('/api/goals', async (req, res) => {
    const goals = await Goal.find();
    res.json(goals);
});

app.get('/api/tasks/:goalId', async (req, res) => {
    const tasks = await Task.find({ goalId: req.params.goalId });
    res.json(tasks);
});

app.listen(5000, () => console.log('Server is running on port 5000'));
