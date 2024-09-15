// Import dependencies
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Route imports
const authRoutes = require('./routes/authRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');
const departmentRoutes = require('./routes/departmentRoutes');

// Load environment variables from .env file
dotenv.config();

// Initialize the app
const app = express();

// Middleware to handle CORS
app.use(cors({
    origin: '*',
    methods: 'GET,POST,PUT,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type,Authorization'
}));

// Environment variables and defaults
const PORT = process.env.PORT || 5000;
const DB_URI = process.env.DB_URI || 'mongodb+srv://22ashwaniyadav:auS0pyECXF4KUA08@cluster0.ofq0r.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'; // Ensure your .env file contains DB_URI

// Connect to MongoDB
mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB successfully!');
        // Start the server
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err);
    });

// Middleware to parse incoming JSON
app.use(express.json());

// Routes
app.use('/auth', authRoutes);              // Authentication routes
app.use('/api/feedback', feedbackRoutes);   // Feedback routes
app.use('/api/department', departmentRoutes); // Department routes

// Default route for handling 404
app.use((req, res) => {
    res.status(404).json({ message: 'Endpoint not found' });
});
