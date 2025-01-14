const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        require: [true, "Please provide a name."],
        minlength: 3,
        maxlength: 50
    },
    email: {
        type: String,
        require: [true, "Please provide an email."],
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please provide a valid email."
        ],
        unique: true
    },
    password: {
        type: String,
        require: [true, "Please provide a password"],
        minlength: 6,
        maxlength: 12
    }
})

module.exports = mongoose.model('User', UserSchema)