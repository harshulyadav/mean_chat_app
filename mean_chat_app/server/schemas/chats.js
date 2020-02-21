const mongoose = require('mongoose');
const schema = mongoose.Schema,
    ObjectId = schema.ObjectId;

var chatSchema = new schema ({
    message: {
        type: String
    },
    sent_by: {
        type: String
    },
    is_deleted: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('chats', chatSchema);