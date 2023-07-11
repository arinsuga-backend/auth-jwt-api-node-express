//const express = require('express');
import express from 'express';

const app = express(); 
const port = 8015;

app.get('/', (req, res) => {
    res.send('<H1>Halaman Utama</H1>');
});

// Listen PORT
app.listen(port, () => {
    console.log(`Running server at localhost:${port}`);
});