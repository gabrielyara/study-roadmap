const mongoose = require('mongoose');

const stepSchema = new mongoose.Schema({
  id: Number,
  title: String,
  description: String,
  duration: String,
  progress: { type: Number, default: 0, min: 0, max: 100 }
});

const roadmapSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  area: { type: String, required: true },
  steps: [stepSchema],
  overallProgress: { type: Number, default: 0 },
  lastUpdated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Roadmap', roadmapSchema);