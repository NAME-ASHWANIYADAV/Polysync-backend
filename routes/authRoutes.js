const express = require('express');
const { signup, login, forgotPassword, getSecretQuestion, resetPassword } = require('../controllers/authController');
const router = express.Router();

// Signup route
router.post('/signup', signup);

// Login route
router.post('/login', login);

// Forgot password route (asks for email and retrieves secret question)
router.post('/forgot-password', forgotPassword);

// Route to get secret question based on email
router.get('/secret-question/:email', getSecretQuestion);

// Reset password route
router.post('/reset-password', resetPassword);

module.exports = router;
