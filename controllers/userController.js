const jwt = require('jsonwebtoken')
const { serialize } = require('cookie')

//Verifiy Token via Get Request
//GET /api/users/verify-token-get
const verifyTokenGet = (req, res) => {

    res.status(200).json({
        status: 200,
        message: "verify-token-get - OK",
        verify_result: true
    })

}

//Verifiy Token via Post Request
//POST /api/users/verify-token-post
const verifyTokenPost = (req, res) => {

    res.status(200).json({
        status: 200,
        message: "verify-token-post - OK",
        verify_result: true
    })

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
    all, update, remove,
    disable, changePassword
}
