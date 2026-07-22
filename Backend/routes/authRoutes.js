const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// @route   POST api/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post('/login', authController.login);

// @route   POST api/auth/department-login
// @desc    Department SSO login
// @access  Public
router.post('/department-login', authController.departmentLogin);

// @route   POST api/auth/register
// @desc    Register a new user
// @access  Public
router.post('/register', authController.register);

module.exports = router;
