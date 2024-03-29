const express = require('express');
const router = express.Router();
const { createUser } = require('../controllers/userController');

// Route to create a new user
router.post('/', createUser);

module.exports = router;
