const jwt = require('jsonwebtoken')
const { serialize } = require('cookie')
const userModel = require('../models/user.js')
const passwordHelper = require('../helpers/password.js')

//List User
//GET /api/users
const all = (req, res) => {
    // const data = userModel.find();
    // const dataSerialized = serialize('data', data);
    
    let data = null;
    userModel.find()
    .then((doc) => {

        data = doc;
        res.status(200).json({
            status: 200,
            message: 'Menampilkan semua user',
            data: data
        });

    })
    .catch((err) => {

        handleError(err);
        console.log(err);
        res.status(404).json({
            status: 404,
            message: 'Data user tidak ditemukan / empty'
        });
    
    })

}

//User Detail
//GET /api/users/:userId
const byId = (req, res) => {
    // const data = userModel.find();
    // const dataSerialized = serialize('data', data);
    
    let data = null;
    userModel.findById(req.params._id)
    .then((doc) => {

        data = doc;
        res.status(200).json({
            status: 200,
            message: 'Menampilkan detail user',
            request: req.params._id,
            data: data
        });
        
    })
    .catch((err) => {

        handleError(err);
        console.log(err);
        res.status(404).json({
            status: 404,
            message: 'Data user tidak ditemukan / empty'
        });
    
    })

}

//Update User
//PUT /api/users/update
const update = async (req, res) => {

    let data = null;
    let input = {
        username:req.body.username,
        password:req.body.password
    };

    try {

        data = await userModel.findByIdAndUpdate(req.params._id, input, { new:true });
        res.status(200).json({
            status: 200,
            message: 'Update data berhasil',
            request: req.params._id,
            data: data
        });

    } catch(err) {

        console.log(err);
        res.status(404).json({
            status: 404,
            message: 'Update data gagal'
        });

    }
}

//Remove User
//DELETE /api/users/remove
const remove = (req, res) => {
    let data = null;
    userModel.findByIdAndDelete(req.params._id)
    .then((doc) => {

        data = doc;
        res.status(200).json({
            status: 200,
            message: 'Hapus data berhasil',
            request: req.params._id,
            data: data
        });
        
    })
    .catch((err) => {

        console.log(err);
        res.status(404).json({
            status: 404,
            message: 'Data gagal di hapus'
        });
    
    })

}


//Activate User
//PUT /api/users/:_id/activate
const activate = async (req, res) => {
    let data = null;
    let input = { status: true };

    try {

        data = await userModel.findByIdAndUpdate(req.params._id, input, {new:true});
        res.status(200).json({
            status: 200,
            message: 'User berhasil di aktifkan',
            data: data
        })

    } catch(err) {

        console.log(err);
        res.status(404).json({
            status: 404,
            message: 'User gagal di aktifkan'
        });

    }

}

//Deactivate User
//PUT /api/users/:_id/deactivate
const deactivate = async (req, res) => {
    let data = null;
    let input = { status: false };

    try {

        data = await userModel.findByIdAndUpdate(req.params._id, input, {new:true});
        res.status(200).json({
            status: 200,
            message: 'User berhasil di non aktifkan',
            data: data
        })

    } catch(err) {

        console.log(err);
        res.status(404).json({
            status: 404,
            message: 'User gagal di non aktifkan'
        });

    }

}

//Change Password
//PUT /api/users/change-password
const changePassword = async (req, res) => {
    let result = null;
    let oripassword = null;
    let oldpassword = req.body.oldpassword;
    let newpassword1 = req.body.newpassword1;
    let newpassword2 = req.body.newpassword2;

    try {

        let data = await userModel.findById(req.params._id);
        let oripassword = data.password;
        let passwordChanged = await passwordHelper.change(oldpassword, oripassword, newpassword1, newpassword2);

        if (passwordChanged) {

            //coding update new password to database
            let input = { password: newpassword1 };
            data = await userModel.findByIdAndUpdate(req.params._id, input, {new:true});

            res.status(200).json({
                status: 200,
                message: 'Ganti password berhasil',
                data: data
            });

        } else {

            console.log(err);
            res.status(404).json({
                message: 'Ganti password gagal'
            });
    
        }


    } catch(err) {

        console.log(err);
        res.status(404).json({
            message: 'Ganti password gagal'
        });
    
    }

}


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

module.exports = {
    verifyTokenGet, verifyTokenPost,
    all, byId, update, remove,
    activate, deactivate, changePassword
}
