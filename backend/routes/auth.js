const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Temporary in-memory database for hackathon (resets when server restarts)
const users = []; 

/**
 * @route   POST /api/auth/register
 * @desc    Register a new astronomer
 */
router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        if (!username || !password) {
            return res.status(400).json({ msg: 'Please enter all fields' });
        }

        // Check if user already exists
        const existingUser = users.find(u => u.username === username);
        if (existingUser) return res.status(400).json({ msg: 'User already exists' });

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Save user to our temporary list
        const newUser = { id: users.length + 1, username, password: hashedPassword };
        users.push(newUser);

        res.status(201).json({ msg: 'Personnel registered successfully', user: { username } });
    } catch (err) {
        res.status(500).send('Server Error during registration');
    }
});

/**
 * @route   POST /api/auth/login
 * @desc    Authenticate user & get token
 */
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        if (!username || !password) {
            return res.status(400).json({ msg: 'Please enter all fields' });
        }

        // Find user in our list
        const user = users.find(u => u.username === username);
        if (!user) {
            return res.status(400).json({ msg: 'Invalid credentials. Access denied.' });
        }

        // Verify Password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        // Create Token
        const payload = { user: { id: user.id } };
        jwt.sign(
            payload,
            'cosmic_secret_telemetry',
            { expiresIn: '1h' },
            (err, token) => {
                if (err) throw err;
                res.json({ token, user: { username: user.username } });
            }
        );
    } catch (err) {
        res.status(500).send('Server Error in Authentication');
    }
});

module.exports = router;