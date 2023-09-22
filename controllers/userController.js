const jwt = require('jsonwebtoken')
const { serialize } = require('cookie')


//Verifiy Token via Get Request
//GET /api/users/verify-token-get
const verifyTokenGet = (req, res) => {

    let token = req.cookies['token'];
    let secret = process.env.APP_SECRET;

    try {

        let decoded = jwt.verify(token, secret);
        res.status(200).json({
            status: 200,
            message: "verify-token-get - OK",
            verify_result: true
        })
    
    } catch {

        res.status(401).json({
            status: 401,
            message: "verify-token-get - Unauthorized",
            verify_result: false
        })
    } //end try

}

//Verifiy Token via Post Request
//POST /api/users/verify-token-post
const verifyTokenPost = (req, res) => {

    let token = req.cookies['token'];
    let secret = process.env.APP_SECRET;

    try {

        let decoded = jwt.verify(token, secret);
        res.status(200).json({
            status: 200,
            message: "verify-token-post - OK",
            verify_result: true
        })
    
    } catch {

        res.status(401).json({
            status: 401,
            message: "verify-token-post - Unauthorized",
            verify_result: false
        })
    } //end try

}

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
    verifyTokenGet, verifyTokenPost,
    login, logout,
    all, register, update, remove,
    disable, changePassword
}
