const mongoose = require('mongoose')


const Schema = mongoose.Schema

const User = new Schema(
    {
        passwords: { type: String, default: '' },
        username: { type: String, default: '' },
        image: { type: String, default: '' },
        name: { type: String, default: '' },
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('User', User);