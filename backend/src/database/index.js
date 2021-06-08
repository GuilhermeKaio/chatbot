const mongoose = require('mongoose');
const authConfig = require('../config/auth');

mongoose
    .connect(authConfig.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .catch(e => {
        console.error('Connection error', e.message)
    })

mongoose.set('useFindAndModify', false);

const db = mongoose.connection

module.exports = db