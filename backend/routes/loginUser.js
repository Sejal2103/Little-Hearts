const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const user = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwtSecret = "84956b46507ad49c4e37d864e12a8d88e0375e00e4c2c9e8380f875e40b69f28007ac874bef67497dd25a6a724231bebaded6314f40aa2854dbe3059329";

router.post('/loginuser', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Enter correct password').isLength({ min: 5 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const curRes = await user.findOne({ email: req.body.email });

        if (!curRes) {
            return res.status(400).json({ error: 'Email not found' });
        }

        const cmpPassword = await bcrypt.compare(req.body.password,curRes.password)
        
        if (!cmpPassword) {
            return res.status(400).json({ error: 'Incorrect password' });
        }

        const accessToken = jwt.sign(
          {  user: {
                id:curRes.id
            }},
            jwtSecret
        )

        return res.status(200).json({ success: true , accessToken : accessToken  });
    } catch (err) {
        // Add this log to check if there are any errors during the process
        console.error('Error during login:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
