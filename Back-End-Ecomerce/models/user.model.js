const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    telephone: {
        type: String
    },
    role: {
        type: String,
        default: 'CLIENT_ROLE'
    },
    image: {
        type: String,  
        default: ""
    }
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
