const Account = require('../database/model/account');
const axios = require('axios');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const authConfig = require('../config/auth')

function generateToken(params = {}) {
    return jwt.sign(params, authConfig.secret, { 
        expiresIn: 86400,
    });
}

async function register(req, res){
    const { email } = req.body;

    try {
        if (await Account.findOne({ email }))
            return res.status(400).send({ error: 'User already exists' });
        
            const user = await Account.create(req.body);

            user.password = undefined;

            return res.send({ 
                user,
                token: generateToken({ id: user.id })
            });
    }
    catch (err) {
        return res.status(400).send({ error: err });
    }

}

async function authenticate(req, res){
    const { email, password } = req.body;

    const user = await Account.findOne({ email }).select('+password');

    if (!user)
        return res.status(400).send({ error: 'User not found' });
    
    if (!await bcrypt.compare(password, user.password))
        return res.status(400).send({ error: 'Invalid password'});

    user.password = undefined;

    res.send({ 
        user, 
        token: generateToken({ id: user.id })
    });
}

async function currencyExchange(req, res){
    let { target } = req.params;    

    let amount = 52;

    await axios.get(`https://www.amdoren.com/api/currency.php?api_key=${authConfig.apiKey}&from=EUR&to=GBD&amount=${amount}`)
        .then(response => {
            if(response.data.error > 0){
                return res.status(400).json({
                    error: response.data.error,
                    error_message: response.data.error_message,
                    id: req.userId
                });
            }

            return res.status(200).json({ amount: response.data.amount });
        })
        .catch(err =>{
            return res.sendStatus(500);
        })
}

async function deposit(req, res) {
    let { amount } = req.params;

    // do something in the DB

    return res.sendStatus(200);
}

async function withdraw(req, res) {
    let { amount } = req.params;

    // do something in the DB

    return res.sendStatus(200);
}

async function balance(req, res) {

    // get balance from DB

    return res.sendStatus(200);
}

module.exports = { currencyExchange, deposit, withdraw, balance, authenticate, register }