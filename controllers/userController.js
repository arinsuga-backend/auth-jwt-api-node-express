const jwt = require('jsonwebtoken')
const { serialize } = require('cookie')

//Login
//POST /api/users/auth
const login = (req, res) => {

    const token = jwt.sign({ username:req.body['username'] }, process.env.APP_SECRET, {expiresIn:'600s'})
    const tokenSerialized = serialize('token', token, {
        httpOnly: true,
        secure: process.env.APP_ENV === 'PROD',
        sameSite: 'strict',
        maxAge: 60 * 5,
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

//Update User
//PUT /api/users/update
const update = (req, res) => {
    res.status(200).json({
        message: 'Update user berhasil'
    });
}

//Remove User
//DELETE /api/users/remove
const remove = (req, res) => {
    res.status(200).json({
        message: 'Delete user berhasil'
    });
}

//List User
//GET /api/users
const all = (req, res) => {
    res.status(200).json({
        message: 'Menampilkan semua user'
    });
}

//Disable User
//PUT /api/users/disable
const disable = (req, res) => {
    res.status(200).json({
        message: 'Disable user berhasil'
    });
}

//Change Password
//PUT /api/users/change-password
const changePassword = (req, res) => {
    res.status(200).json({
        message: 'Ganti password berhasil'
    });
}


module.exports = {
    login, logout,
    all, register, update, remove,
    disable, changePassword
}
