const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
require('dotenv').config(); // Load environment variables

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(passport.initialize());

// Check if MONGO_URI is loaded correctly
if (!process.env.MONGO_URI) {
  console.error('MONGO_URI is not defined in the .env file.');
  process.exit(1); // Exit the application with an error
}

// Database connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected successfully!"))
  .catch((error) => console.log(error));

// Routes
const authRoutes = require('./routes/auth');
const projectRoutes = require('./routes/projects');
const communicationRoutes = require('./routes/communication');
const paymentRoutes = require('./routes/payments');
const registerForProject=require('./routes/freelancerApplyForProject');

app.use('/auth', authRoutes);
app.use('/projects', projectRoutes);
app.use('/communication', communicationRoutes);
app.use('/payments', paymentRoutes);
app.use('/',registerForProject)

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: err.message });
});

// Server start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use('/', (req, res) => {
    res.send("<h1> Welcome to Developers Hub</h1>");
})

