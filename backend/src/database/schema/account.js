const mongoose = require('mongoose');
const { Schema } = mongoose;

const accountSchema = new Schema({
    balance: {
        type: Number,
        default: 0
    },
    currency: {
        type: String,
        required: [true, 'account without currency code']
    },
    email:{
        type: String,
        unique: [true, 'account with not unique email'],
        required: [true, 'account without email'],
        lowercase: true
    },
    password:{
        type: String,
        required: [true, 'account without password'],
        select: false
    }

});

  module.exports = accountSchema;