//const fetch = requere('node-fetch');


// import express from "express";
// import dotenv from 'dotenv';
// import userRoutes from './routes/userRoutes.js';

const express = require('express');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes.js');


dotenv.config();
const app = express();
const port = process.env.APP_PORT;

//midleware for json encode/decode
app.use(express.json());
//middleware for enabled post request.body (input form / json input)
app.use(express.urlencoded({ extended: true }));

//Route User
app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
    res.send('<H1>Halaman Utama</H1>');
});


// Listen PORT
app.listen(port, () => {
    console.log(`Running server at localhost:${port}`);
});