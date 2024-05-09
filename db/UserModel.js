

const mongoose = require('mongoose');

const userSchema = mongoose.Schema({

    username: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },

    image:{
        type: String,
        required: false

    },
    

    createdAt: {
        type: Date,
        default: Date.now
    },
});
mongoose.models = {}
module.exports = mongoose.model('User', userSchema);

