const mongoose = require('mongoose');

const activityLogSchema = new mongoose.Schema({
  action: { type: String, required: true },
  performedBy: { type: String, required: true },
  performedByRole: { type: String, enum: ['admin', 'teacher'] },
  performedById: { type: mongoose.Schema.Types.ObjectId },
  target: { type: String },
  targetId: { type: mongoose.Schema.Types.ObjectId },
  details: { type: String },
  ipAddress: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('ActivityLog', activityLogSchema);
