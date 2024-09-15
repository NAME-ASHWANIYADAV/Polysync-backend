const User = require('../models/userModel');
const bcrypt = require('bcrypt');

// Signup logic
// Signup logic
const signup = async (req, res) => {
    const { name, email, password, aadhar, secretQuestion, secretAnswer } = req.body;

    try {
        // Check if user already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Hash secret answer
        const hashedSecretAnswer = await bcrypt.hash(secretAnswer, salt);

        // Create new user
        user = new User({
            name,
            email,
            password: hashedPassword,
            aadhar,
            secretQuestion,
            secretAnswer: hashedSecretAnswer
        });

        await user.save();
        res.status(201).json({ msg: 'User registered successfully' });
    } catch (err) {
        console.error('Error in signup:', err);  // Detailed error log
        res.status(500).json({ msg: 'Server error', error: err.message });
    }
};
// Login logic
const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        res.status(200).json({ msg: 'Login successful' });
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
};

// Forgot password logic - get the secret question based on email
const forgotPassword = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'User not found' });
        }

        res.status(200).json({ secretQuestion: user.secretQuestion });
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
};

// Get secret question based on email
const getSecretQuestion = async (req, res) => {
    const { email } = req.params;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'User not found' });
        }

        res.status(200).json({ secretQuestion: user.secretQuestion });
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
};

// Reset password logic
const resetPassword = async (req, res) => {
    const { email, newPassword, secretAnswer } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'User not found' });
        }

        // Check if the secret answer matches
        const isAnswerMatch = await bcrypt.compare(secretAnswer, user.secretAnswer);
        if (!isAnswerMatch) {
            return res.status(400).json({ msg: 'Incorrect secret answer' });
        }

        // Hash new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        user.password = hashedPassword;
        await user.save();

        res.status(200).json({ msg: 'Password reset successfully' });
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
};

module.exports = { signup, login, forgotPassword, getSecretQuestion, resetPassword };
