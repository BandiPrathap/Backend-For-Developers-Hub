const express = require('express');
const Project = require('../models/Project');
const User = require('../models/User');
const router = express.Router();

// Project listing
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Project creation
router.post('/', async (req, res) => {
  const { title, description, budget, skillsRequired,founder,status } = req.body;

  try {
    const project = new Project({ title, description, budget, skillsRequired, founder,status });
    await project.save();
    res.status(201).json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:projectId', async (req, res) => {
    const { projectId } = req.params;
    const { status } = req.body;
  
    try {
      // Find the project by projectId
      const project = await Project.findById(projectId);
  
      if (!project) {
        return res.status(404).json({ message: 'Project not found' });
      }
  
      // Update the project status
      project.status = status;
      await project.save();
  
      res.status(200).json({ message: 'Project status updated successfully', project });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  });

  


// Endpoint to update project details
router.put('/update/:projectId', async (req, res) => {
  const { projectId } = req.params;
  const { title, description, budget, skillsRequired } = req.body;

  try {
    // Find the project by projectId
    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Update project details
    project.title = title || project.title;
    project.description = description || project.description;
    project.budget = budget || project.budget;
    project.skillsRequired = skillsRequired || project.skillsRequired;

    await project.save();

    res.status(200).json({ message: 'Project details updated successfully', project });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Endpoint to assign a freelancer to a project
router.put('/assign/:projectId/', async (req, res) => {
    const { projectId } = req.params;
    const { freelancerId } = req.body;
  
    try {
      // Find the project by projectId
      const project = await Project.findById(projectId);
  
      if (!project) {
        return res.status(404).json({ message: 'Project not found' });
      }
  
      // Update freelancer assignment
      if (!project.freelancer.includes(freelancerId)) {
        project.freelancer.push(freelancerId);
      }
  
      await project.save();
  
      res.status(200).json({ message: 'Freelancer assigned to project', project });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  });

  // Endpoint to delete a project
router.delete('/delete/:projectId', async (req, res) => {
    const { projectId } = req.params;
  
    try {
      // Find the project by projectId and remove it
      const project = await Project.findByIdAndRemove(projectId);
  
      if (!project) {
        return res.status(404).json({ message: 'Project not found' });
      }
  
      res.status(200).json({ message: 'Project deleted successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  });
  

module.exports = router;
