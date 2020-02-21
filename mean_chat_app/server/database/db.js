const mongoose = require('mongoose');
const chatModel = require('../schemas/chats');

mongoose.connect('mongodb://localhost/chatRoom', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}, (err) => {
    if (err) throw err;
    else {
        console.log('Database connected successfully');
    }
});