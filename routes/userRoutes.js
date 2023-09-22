// import express from 'express';
// import {
//     verifyTokenGet, verifyTokenPost,
//     all, update, remove,
//     disable, changePassword
// } from '../controllers/userController.js';

const express = require('express');
const {
    verifyTokenGet, verifyTokenPost,
    all, update, remove,
    disable, changePassword
} = require('../controllers/userController.js')
const verifyToken= require('../middlewares/verifyToken.js')


const router = express.Router();

/**
 * userController
 */

//Verifiy Token via Get Request
//GET /api/users/verify-token-get
router.get('/verify-token-get', verifyToken, verifyTokenGet);

//Verifiy Token via Get Request
//GET /api/users/verify-token-get
router.post('/verify-token-post', verifyToken, verifyTokenPost);

//List All User
//GET /api/users
router.get('/', verifyToken, all);

//Update User
//PUT /api/users/update
router.put('/update', verifyToken, update);

//Remove User
//DELETE /api/users/remove
router.delete('/remove',verifyToken,  remove);

//Disable User
//PUT /api/users/disable
router.put('/disable', verifyToken, disable);

//Change Password
//PUT /api/users/change-password
router.put('/change-password', verifyToken, changePassword);

module.exports = router;
