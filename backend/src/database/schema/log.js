const mongoose = require('mongoose');
const { Schema } = mongoose;

const depositSchema = new Schema({
    code: {
        type: Number,
        required: [true, 'log without verification code']
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
        required: [true, 'log without date']
    }

});

const withdrawSchema = new Schema({
    code: {
        type: Number,
        required: [true, 'log without verification code']
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
        required: [true, 'log without date']
    }

});

const exchangeSchema = new Schema({
    code: {
        type: Number,
        required: [true, 'log without verification code']
    },
    nextCurrency: {
        type: String,
        required: [true, 'log without next currency']
    },
    previousCurrency: {
        type: String,
        required: [true, 'log without previous currency']
    },
    date: {
        type: Date,
        required: [true, 'log without date']
    }

});

//pode ter erros
module.exports = {depositSchema, withdrawSchema, exchangeSchema};