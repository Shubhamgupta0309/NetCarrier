const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const auth0 = require('auth0');

const auth0Client = new auth0.AuthenticationClient({
  domain: 'dev-u80nmwvps65pcjw0.us.auth0.com',
  clientId: 'DDd3V7ghzM6yA4u6QmxIy0Xx2xXURigS',
  clientSecret: '8Q1kjN5WRZuKB9JJNQ852Sjw_KUGkIK4NTAJN3yhXCs4bFUzDwa2NmS-D7A4TRx7'
});

// Signup route
router.post('/signup', async (req, res) => {
  try {
    const { email, password } = req.body;
    // Use Auth0's signup method
    await auth0Client.database.signUp({
      email,
      password,
      connection: 'Username-Password-Authentication' // Change connection as per your Auth0 settings
    });
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error signing up:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Login route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    // Use Auth0's login method
    const response = await auth0Client.passwordGrant({
      username: email,
      password,
      audience: 'https://dev-u80nmwvps65pcjw0.us.auth0.com/api/v2/', // Specify your API identifier
      scope: 'openid profile email'
    });
    // Extract user information from response and create JWT token
    const token = response.access_token;
    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
