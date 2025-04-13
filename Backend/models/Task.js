const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    name: String,
    goalId: { type: mongoose.Schema.Types.ObjectId, ref: 'Goal' },
    color: String,
});

module.exports = mongoose.model('Task', taskSchema);
