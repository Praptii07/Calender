const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // Load environment variables from .env

const app = express();

// CORS config – replace with your actual frontend domain
const allowedOrigins = [
    'http://localhost:5173',
    'https://calendar-app.vercel.app'
];

app.use(cors({
    origin: function (origin, callback) {
        // allow requests with no origin (like mobile apps or curl requests)
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));

app.use(express.json());

// MongoDB Atlas connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch((err) => console.error('MongoDB connection error:', err));

// Mongoose Models
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

// Use environment variable for port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
