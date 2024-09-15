const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    aadhar: { type: String, required: true },
    secretQuestion: { type: String, required: true },
    secretAnswer: { type: String, required: true }
});

// Remove or adjust unique index
// Remove any incorrect index that might be causing the issue
userSchema.index({ email: 1 }, { unique: true });

// Define the model
const User = mongoose.model('User', userSchema);

module.exports = User;
