const mongoose = require('mongoose');
const { model } = mongoose;
const bcrypt = require('bcryptjs');

const { depositSchema, withdrawSchema, exchangeSchema } = require('../schema/log');

depositSchema.pre('save', async function(next){
    const hash = await bcrypt.hash(this.code, 10);
    this.code = hash;

    next();
});

withdrawSchema.pre('save', async function(next){
    const hash = await bcrypt.hash(this.code, 10);
    this.code = hash;

    next();
});

exchangeSchema.pre('save', async function(next){
    const hash = await bcrypt.hash(this.code, 10);
    this.code = hash;

    next();
});

const deposit = model('deposit', depositSchema, 'logs');
const withdraw = model('withdraw', withdrawSchema, 'logs');
const exchange = model('exchange', exchangeSchema, 'logs');

module.exports = { depositLog: deposit, withdrawLog: withdraw, exchangeLog: exchange };