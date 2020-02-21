const mongoose = require('mongoose');
const schema = mongoose.Schema,
    ObjectId = schema.ObjectId;

var userSchema = new schema({
    is_deleted: {
        type: Boolean,
        default: false
    },
    first_name: {
        type: String
    },
    last_name: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    socket_id: {
        type: String
    },
    token: {
        type: String
    }
})

module.exports = mongoose.model('users', userSchema);