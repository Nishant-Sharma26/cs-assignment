const mongoose = require('mongoose');

const listSchema = new mongoose.Schema({
  agentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Agent', required: true },
  firstName: { type: String, required: true },
  phone: { type: Number, required: true },
  notes: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('List', listSchema);