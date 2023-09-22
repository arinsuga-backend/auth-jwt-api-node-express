// import express from 'express';
// import {
//     login, logout, register
// } from '../controllers/authController.js';

const express = require('express');
const {
    login, logout, register
} = require('../controllers/authController.js');

const router = express.Router();

/**
 * authController
 */
//Login
//POST /api/users/login
router.post('/login', login);

//Logout
//POST /api/users/logout
router.post('/logout', logout);

//Register New User
//POST /api/users/register
router.post('/register', register);

module.exports = router;
