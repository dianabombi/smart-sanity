const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Login endpoint
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // For now, we'll use hardcoded credentials as requested
    // In production, you'd hash passwords and store them in database
    if (email === 'Dusan.drinka@smartsanit.sk' && password === 'WeAreAwesome2025@!') {
      // Try to update database, but don't fail if MongoDB is unavailable
      try {
        let user = await User.findOne({ email });
        if (!user) {
          user = new User({
            email,
            password: 'hashed_password_placeholder', // In production, hash this
            role: 'admin'
          });
          await user.save();
        }
        
        // Update last login
        user.lastLogin = new Date();
        await user.save();
      } catch (dbError) {
        console.log('Database unavailable, proceeding with hardcoded auth:', dbError.message);
      }

      res.json({
        success: true,
        message: 'Login successful',
        user: {
          id: 'admin',
          email: email,
          role: 'admin'
        }
      });
    } else {
      res.status(401).json({
        success: false,
        message: 'Nesprávne prihlasovacie údaje'
      });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// Logout endpoint
router.post('/logout', (req, res) => {
  res.json({
    success: true,
    message: 'Logout successful'
  });
});

// Check authentication status
router.get('/me', async (req, res) => {
  try {
    // In a real app, you'd verify JWT token here
    // For now, just return success
    res.json({
      success: true,
      user: {
        email: 'Dusan.drinka@smartsanit.sk',
        role: 'admin'
      }
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'Not authenticated'
    });
  }
});

module.exports = router;
