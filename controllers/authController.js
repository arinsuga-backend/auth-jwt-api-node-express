const jwt = require('jsonwebtoken')
const { serialize } = require('cookie')
const mongoose = require('mongoose')
//const dotenv = require('dotenv')

const userSchema = require('../models/user.js')

//Login
//POST /api/users/login
const login = (req, res) => {

    const token = jwt.sign({ username:req.body['username'] }, process.env.APP_SECRET, {expiresIn:'600s'})
    const tokenSerialized = serialize('token', token, {
        httpOnly: true,
        secure: process.env.APP_ENV === 'PROD',
        sameSite: 'strict',
        maxAge: process.env.APP_TOKEN_MAXAGE,
        path: '/'

    })

    // res.setHeader('set-cookie', ['auth=8282732sjhgdisarc; httponly'])
    res.setHeader('set-cookie', tokenSerialized)
    res.status(200).json({
        message: 'JSON - Login berhasil V1.0',
        token: token,
        response: {
            username: req.body['username'],
            password: req.body['password']
        }
    });
}

//Logout
//POST /api/users/logout
const logout = (req, res) => {
    res.status(200).json({
        message: 'Logout berhasil'
    });
}

//Register New User
//POST /api/users/register
const register = (req, res) => {

    const modelData = {};
    if (req.body.username) {
        modelData.username = req.body.username;
    }
    if (req.body.password) {
        modelData.password = req.body.password;
    }
    if ( (req.body.username) && (req.body.password) ) {

        modelData.status = true;

        console.log(modelData);

        const model = new userSchema(modelData);
        model.save().then((err) => console.log('Registrasi berhasil'));

        res.status(200).json({
            status: 200,
            message: 'Registrasi user berhasil'
        });
            
    }

    res.status(200).json({
        status: 500,
        message: 'Registrasi user gagal'
    });
}

module.exports = {
    login, logout, register
}
