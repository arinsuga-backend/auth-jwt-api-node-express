const jwt = require('jsonwebtoken')
const { serialize } = require('cookie')


//Verifiy Token
const verifyToken = (req, res, next) => {

    try {

        let token = req.cookies['token'];
        let secret = process.env.APP_SECRET;
        let decoded = jwt.verify(token, secret);
        next();
    
    } catch {

        res.status(401).json({
            status: 401,
            message: "verify-token - Unauthorized",
            verify_result: false
        })
    } //end try

}
module.exports = verifyToken
