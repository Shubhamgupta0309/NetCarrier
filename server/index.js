// app.js

// Require necessary packages
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors'); // Import the cors module
const User = require('./models/User');

// Create Express app
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Enable CORS
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('Connected to MongoDB database');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB database:', error);
    });

// Login route
app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if the user exists in the database
        const user = await User.findOne({ email });

        if (!user) {
            // User not found
            return res.status(404).json({ message: 'User not found. Please create an account.' });
        }

        // Check if the password is correct
        if (user.password !== password) {
            // Invalid password
            return res.status(401).json({ message: 'Invalid password' });
        }

        // Login successful
        res.status(200).json({ message: 'Login successful', user });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Signup route
app.post('/signup', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if the user already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            // User already exists
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create a new user
        const newUser = new User({ email, password });
        await newUser.save();

        // Registration successful
        res.status(201).json({ message: 'Registration successful', user: newUser });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
