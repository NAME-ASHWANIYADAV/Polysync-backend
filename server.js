const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');
const departmentRoutes = require('./routes/departmentRoutes');
const cors = require('cors');

const app = express();

app.use(cors({
    origin: '*',
    methods: 'GET,POST,PUT,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type,Authorization'
}));

const PORT = 5000;
const DB_URI = 'your-mongodb-uri-here'; // Replace with your actual DB URI

// Connect to MongoDB
mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB successfully!');
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
app.use('/auth', authRoutes);
app.use('/api', feedbackRoutes); // Feedback routes
app.use('/api', departmentRoutes); // Department routes
