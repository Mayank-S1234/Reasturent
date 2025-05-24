const userData = require("../models/userData");


// User info fetch karne ka API endpoint (using async/await)
const showcontroller = async (req, res) => {
    try {
        const user = await userData.findById(req.userId).select('name');
        if (user) {
            res.json({ name: user.name });
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        console.error('Error fetching user info:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


module.exports = showcontroller;