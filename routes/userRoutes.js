// import express from 'express';
// import {
//     authUser, logout,
//     all, register, update, remove, 
//     disable, changePassword
// } from '../controllers/userController.js';

const express = require('express');
const {
    verifyTokenGet, verifyTokenPost,
    login, logout,
    all, register, update, remove,
    disable, changePassword
} = require('../controllers/userController.js');

const router = express.Router();

//Verifiy Token via Get Request
//GET /api/users/verify-token-get
router.get('/verify-token-get', verifyTokenGet);

//Verifiy Token via Get Request
//GET /api/users/verify-token-get
router.post('/verify-token-post', verifyTokenPost);

//Login
//POST /api/users/login
router.post('/login', login);

//Logout
//POST /api/users/logout
router.post('/logout', logout);

//List All User
//GET /api/users
router.get('/', all);

//Register New User
//POST /api/users/register
router.post('/register', register);

//Update User
//PUT /api/users/update
router.put('/update', update);

//Remove User
//DELETE /api/users/remove
router.delete('/remove', remove);

//Disable User
//PUT /api/users/disable
router.put('/disable', disable);

//Change Password
//PUT /api/users/change-password
router.put('/change-password', changePassword);

module.exports = router;
