const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        maxlength: 255,
    },
    password: {
        type: String,
        required: true,
        maxlength: 255,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    name: {
        type: String,
    },
    avatar: {
        type: String,
    },
    available: {
        type: Boolean,
        default: false,
    },
    timestamps: true,
});

module.exports = mongoose.model('User', UserSchema);
