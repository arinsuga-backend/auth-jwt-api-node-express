const jwt = require('jsonwebtoken');
const { serialize } = require('cookie');

const create = (user) => {
    let result = null;

    try {

        let currentOS = process.platform;
        let addTimeMillis = process.env.JWT_EXP; //1 jam ( ngetes aja )
        let today = new Date();
        let iat = today.getTime();
        let nbf = 0;
        
        let exp = 10000;
        if (process.env.JWT_EXP) {
            exp = parseInt(process.env.JWT_EXP);
        }

        let sub = user._id.toString();
        let aud = process.env.JWT_AUD;
        let options = { }
    
        options.expiresIn = exp;
        options.issuer = process.env.JWT_ISS;
    
        //check if server using windows OS then do not use nbf options
        //because its has to be manualy sync datetime
        if (currentOS.toLowerCase() != 'win32') {
    
            options.notBefore = nbf;
    
        }
    
        options.audience = aud;
        options.subject = sub;      
    
    
        result = jwt.sign(
            {
                user: {
                    username: user.username,
                    app: user.app,
                    roles: user.roles
                },
                iat: iat
            },
            process.env.JWT_TOKEN_SECRET, options);
    
    
        return result;
    
    } catch(err) {

        console.log(err);

    }

}

const toHttpOnlyCookie = (token) => {
    let result = '';

    result = serialize('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'PROD',
        sameSite: 'strict',
        maxAge: process.env.APP_TOKEN_MAXAGE,
        path: '/'

    })

    return result;
}

const deleteCookie = (token) => {
    let result = '';

    return result;
}

module.exports = {
    create, toHttpOnlyCookie, deleteCookie
}