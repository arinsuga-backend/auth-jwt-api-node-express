const mongoose = require('mongoose')
const schema = mongoose.Schema;

const modelSchema = new schema({
    username: String,
    password: String,
    status: Boolean
});

module.exports = mongoose.model('user', modelSchema);
