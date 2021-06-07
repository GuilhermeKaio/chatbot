const mongoose = require('mongoose');
const { model } = mongoose;

const { depositSchema, withdrawSchema, exchangeSchema } = require('../schema/log');

//look if this works
const deposit = model('logs', depositSchema);
const withdraw = model('logs', withdrawSchema);
const exchange = model('logs', exchangeSchema);

module.exports = { deposit, withdraw, exchange };