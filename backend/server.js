import express from "express";
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';

dotenv.config();

const app = express();
const port = process.env.PORT;

app.get('/', (req, res) => {
    res.send('<H1>Halaman Utama</H1>');
});

//Route User
app.use('/api/users', userRoutes);

// Listen PORT
app.listen(port, () => {
    console.log(`Running server at localhost:${port}`);
});