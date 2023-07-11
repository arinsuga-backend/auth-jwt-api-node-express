//Login
//POST /api/users/auth
const authUser = (req, res) => {
    res.setHeader('set-cookie', ['auth=8282732sjhgdisarc; httponly'])
    res.status(200).json({
        message: 'JSON - Login berhasil'
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
    authUser, logout,
    all, register, update, remove,
    disable, changePassword
}
