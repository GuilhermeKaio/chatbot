const mongoose = require('mongoose');
const { Schema } = mongoose;

const depositSchema = new Schema({
    code: {
        type: String,
        required: [true, 'log without verification code']
    },
    accountId:{
        type: Schema.ObjectId,
        required: [true, 'log without Account Id']
    },
    depositValue: {
        type: Number,
        required: [true, 'log without deposit value']
    },
    previousBalance: {
        type: Number,
        required: [true, 'log without previous balance']
    },
    date: {
        type: Date,
        required: [true, 'log without date'],
        default: Date.now
    }

});

const withdrawSchema = new Schema({
    code: {
        type: String,
        required: [true, 'log without verification code']
    },
    accountId:{
        type: Schema.ObjectId,
        required: [true, 'log without Account Id']
    },
    withdrawValue: {
        type: Number,
        required: [true, 'log without withdraw value']
    },
    previousBalance: {
        type: Number,
        required: [true, 'log without previous balance']
    },
    date: {
        type: Date,
        required: [true, 'log without date'],
        default: Date.now
    }

});

const exchangeSchema = new Schema({
    code: {
        type: String,
        required: [true, 'log without verification code']
    },
    accountId:{
        type: Schema.ObjectId,
        required: [true, 'log without Account Id']
    },
    nextCurrency: {
        type: String,
        required: [true, 'log without next currency'],
        uppercase: true
    },
    previousCurrency: {
        type: String,
        required: [true, 'log without previous currency'],
        uppercase: true
    },
    date: {
        type: Date,
        required: [true, 'log without date'],
        default: Date.now
    }

});

//pode ter erros
module.exports = {depositSchema, withdrawSchema, exchangeSchema};