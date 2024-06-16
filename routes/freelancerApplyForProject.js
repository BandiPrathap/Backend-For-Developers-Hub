const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const User = require('../models/User');

// Endpoint to apply for a job (project)
router.post('/apply', async (req, res) => {
  const { projectId, freelancerId } = req.body;

  try {
    // Find the project by projectId
    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Check if the project is already assigned or completed
    if (project.status !== 'Open') {
      return res.status(400).json({ message: 'Project is not open for applications' });
    }

    // Check if freelancerId is valid (optional, depending on your validation needs)
    const freelancer = await User.findById(freelancerId);
    if (!freelancer || freelancer.role !== 'freelancer') {
      return res.status(400).json({ message: 'Invalid freelancer ID' });
    }

    // Update the project's freelancer array
    project.freelancer.push(freelancerId);
    await project.save();

    res.status(200).json({ message: 'Freelancer applied successfully', project });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
