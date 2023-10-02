// import express from 'express';
// import {
//     verifyTokenGet, verifyTokenPost,
//     all, update, remove,
//     disable, changePassword
// } from '../controllers/userController.js';

const express = require('express');
const {
    verifyTokenGet, verifyTokenPost,
    all, byId, update, remove,
    activate, deactivate, changePassword
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

//User Detail
//GET /api/users/:userId
router.get('/:_id', verifyToken, byId);

//List All User
//GET /api/users
router.get('/', verifyToken, all);

//Update User
//PUT /api/users/:_id
router.put('/:_id', verifyToken, update);

//Remove User
//DELETE /api/users/remove
router.delete('/:_id',verifyToken,  remove);

//Activate User
//PUT /api/users/:_id/activate
router.put('/:_id/activate', verifyToken, activate);

//Deactivate User
//PUT /api/users/:_id/deactivate
router.put('/:_id/deactivate', verifyToken, deactivate);

//Change Password
//PUT /api/users/change-password
router.put('/:_id/change-password', verifyToken, changePassword);

module.exports = router;
