const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  budget: { type: Number, required: true },
  skillsRequired: { type: [String], required: true },
  founder: { type: mongoose.Schema.Types.ObjectId, ref: 'User',required:true},
  freelancer: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  status: { type: String, enum: ['Open', 'Assigned', 'Completed'], required: true }
});

module.exports = mongoose.model('Project', projectSchema);
