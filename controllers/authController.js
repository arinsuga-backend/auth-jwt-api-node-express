//modules
const jwt = require('jsonwebtoken');
const { serialize } = require('cookie');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

//helpers
const passwordHelper = require('../helpers/password.js');
const jwtToken = require('../helpers/jwtToken.js');

//Services
const userModel = require('../models/user.js');

//Login
//POST /api/users/login
const login = async (req, res) => {

    let username = req.body.username;
    let inputPassword = req.body.password;
    let password = '';

    try {

        let user = await userModel.findOne( { username: username } );
        password = user.password;

        let loginOk = await passwordHelper.isOk(inputPassword, password);
        if (loginOk) {

            // const token = jwt.sign({ username:req.body['username'] }, process.env.APP_SECRET, {expiresIn:'600s'})
            const token = jwtToken.create(user);
            const httpOnlyCookie = serialize('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'PROD',
                sameSite: 'strict',
                maxAge: process.env.APP_TOKEN_MAXAGE,
                path: '/'
        
            })

            res.setHeader('set-cookie', httpOnlyCookie)
            res.status(200).json({
                message: 'JSON - Login berhasil V1.0',
                token: token
            });
                    
        } else {

            res.status(500).json({
                status: 500,
                message: 'Tidak bisa login'
            });
                
        }

    } catch(err) {

        console.log(err);
        res.status(500).json({
            status: 500,
            message: 'Tidak bisa login...'
        });
            
    }

}

//Logout
//POST /api/users/logout
const logout = (req, res) => {

    res.setHeader('set-cookie', 'token=logouttoken; Max-Age=0; Path=/; HttpOnly; SameSite=Strict')
    res.status(200).json({
        message: 'Logout berhasil'
    });

}

//Register New User
//POST /api/users/register
const register = async (req, res) => {

    let username = req.body.username;
    let user = await userModel.findOne( { username: username } );

    if (user) {

        res.status(500).json({
            status: 500,
            message: 'Username sudah terdaftar'
        });

        return true;
        
    }

    //Initial data object
    const modelData = {};

    //valiadte if username defined
    if (req.body.username) {
        modelData.username = req.body.username;
    }

    //validate if pasword defined
    if (req.body.password) {

        let password = req.body.password;
        let saltRound = process.env.BCRYPT_SALTROUND;

        if (saltRound) {

            modelData.password = await  passwordHelper.encrypt(password, saltRound);
    
        }

    } //end if

    //validate if application name defined
    modelData.app = null;
    if (req.body.app) {
        modelData.app = req.body.app;
    }

    //validate if user roles defined
    modelData.roles = null;
    if (req.body.roles) {
        modelData.roles = req.body.roles;
    }

    if ( (req.body.username) && (req.body.password) ) {

        modelData.status = true;

        const model = new userModel(modelData);
        model.save()
        .then((err) => console.log('Registrasi berhasil...'));
        // model.save();

        res.status(200).json({
            status: 200,
            message: 'Registrasi user berhasil...',
            hashtemp: modelData.password
        });
            
    } else {

        res.status(500).json({
            status: 500,
            message: 'Registrasi user gagal'
        });
    
    }

}

module.exports = {
    login, logout, register
}
