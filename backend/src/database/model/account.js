const mongoose = require('mongoose');
const { model } = mongoose;
const bcrypt = require('bcryptjs');

const accountSchema = require('../schema/account');

accountSchema.pre('save', async function(next){
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;

    next();
});

const account = model('account', accountSchema);

module.exports = account;