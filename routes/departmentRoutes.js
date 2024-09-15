const express = require('express');
const router = express.Router();

// List of government departments in India
const departments = [
    "Ministry of Agriculture",
    "Ministry of Commerce and Industry",
    "Ministry of Defence",
    "Ministry of Education",
    "Ministry of Finance",
    "Ministry of Health and Family Welfare",
    "Ministry of Home Affairs",
    "Ministry of Information and Broadcasting",
    "Ministry of Labour and Employment",
    "Ministry of Law and Justice",
    "Ministry of Power",
    "Ministry of Road Transport and Highways",
    "Ministry of Rural Development",
    "Ministry of Science and Technology",
    "Ministry of Social Justice and Empowerment",
    "Ministry of Urban Affairs",
    "Ministry of Water Resources",
    "Ministry of Youth Affairs and Sports"
];

// Get departments
router.get('/departments', (req, res) => {
    res.json(departments);
});

module.exports = router;
