const bcrypt = require('bcrypt');

// encrypt password
const encrypt = async (password, saltRound) => {

    let result = '';
    let saltRoundNumber = null;
    if (saltRound) {
        saltRoundNumber = parseInt(saltRound);
    } else {
        saltRoundNumber = 10;
    }

    let hash = await bcrypt.hash(password, saltRoundNumber);

    if (hash) {
        result = hash;
    }

    return result
}

// change password
const change = async (oldpassword, oripassword, newpassword1, newpassword2) => {

    let result = false;
    let matchOldPassword = await bcrypt.compare(oldpassword, oripassword);

    if (matchOldPassword) {

        if (newpassword1 == newpassword2) {

            return true;

        } else {

            return false;

        } //endif

            
    } else {

        return false;
        
    } //endif

    return result;
}

// valiadte password
const isOk = async (inputPassword, password) => {
    let result = false;
    let matchPassword = await bcrypt.compare(inputPassword, password);

    if (matchPassword) {
        result = true;
    }

    return result;
}

module.exports = { encrypt, change, isOk }