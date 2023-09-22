const jwt = require('jsonwebtoken')
const { serialize } = require('cookie')

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
    res.status(200).json({
        message: 'Registrasi user berhasil'
    });
}

module.exports = {
    login, logout, register
}
