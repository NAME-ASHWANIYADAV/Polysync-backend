const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes'); // Import the new feedback routes
const departmentRoutes = require('./routes/departmentRoutes');

const cors = require('cors');
const app = express();

app.use(cors({
    origin: '*',
    methods: 'GET,POST,PUT,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type,Authorization'
}));

const PORT = 5000;
const DB_URI = 'mongodb+srv://22ashwaniyadav:auS0pyECXF4KUA08@cluster0.ofq0r.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// Connect to MongoDB
mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB successfully!');
        
        // Start the server only after successful DB connection
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
app.use('/api', feedbackRoutes); // Add this line to use feedback routes under /api path
app.use('/api', departmentRoutes);
