//const fetch = requere('node-fetch');


// import express from "express";
// import dotenv from 'dotenv';
// import userRoutes from './routes/userRoutes.js';

const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes.js');
const userRoutes = require('./routes/userRoutes.js');

dotenv.config();
const app = express();
const port = process.env.APP_PORT;
const dbConn = process.env.MONGODB_CONN;

//Connet MonggoDB database
mongoose.connect(dbConn);
//midleware for json encode/decode
app.use(express.json());
//middleware for enabled post request.body (input form / json input) x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
//middleware for cookie-parser (read cookie)
app.use(cookieParser());

//Route Auth
app.use('/api/auth', authRoutes);
//Route User
app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
    res.send('<H1>Halaman Utama</H1>');
});


// Listen PORT
app.listen(port, () => {
    console.log(`Running server at localhost:${port}`);
});