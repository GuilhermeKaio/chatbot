const mongoose = require('mongoose')

mongoose
    .connect('mongodb+srv://admin:admin@cluster1.9prkb.mongodb.net/chatbot', { useNewUrlParser: true, useUnifiedTopology: true })
    .catch(e => {
        console.error('Connection error', e.message)
    })

mongoose.set('useFindAndModify', false);

const db = mongoose.connection

module.exports = db