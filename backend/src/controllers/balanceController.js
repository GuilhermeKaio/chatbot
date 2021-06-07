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
    let { target } = req.body;

    if (!target)
        return res.status(400).send({ error: 'Invalid currency'});

    const user = await Account.findOne({ _id: req.userId });

    if (!user)
        return res.status(400).send({ error: 'User not found'});

    if (user.currency === target)
        return res.status(400).send({ error: 'Invalid currency exchange' });

    await axios.get(`https://www.amdoren.com/api/currency.php?api_key=${authConfig.apiKey}&from=${user.currency}&to=${target}&amount=${user.balance}`)
        .then(async (response) => {
            if(response.data.error === 320){
                await Account.findOneAndUpdate(req.userId, { balance: response.data.amount, currency: target })
                return res.status(200).json({ amount: response.data.amount });
            }

            if(response.data.error > 0){
                return res.status(400).json({
                    error: response.data.error,
                    error_message: response.data.error_message
                });
            }

            await Account.findOneAndUpdate(req.userId, { balance: response.data.amount, currency: target })

            return res.status(200).json({ amount: response.data.amount });
        })
        .catch(err =>{
            return res.sendStatus(500);
        })
}

async function deposit(req, res) {
    let { amount } = req.body;

    if (!amount || amount <= 0)
        return res.status(400).send({ error: 'Invalid amount'});
    
    const user = await Account.findOne({ _id: req.userId });

    if (!user)
        return res.status(400).send({ error: 'User not found'});

    await Account.findOneAndUpdate(req.userId, { balance: user.balance + amount})
    return res.status(200).json({ balance: user.balance + amount });
}

async function withdraw(req, res) {
    let { amount } = req.body;

    if (!amount || amount <= 0)
        return res.status(400).send({ error: 'Invalid amount'});
    
    const user = await Account.findOne({ _id: req.userId });

    if (!user)
        return res.status(400).send({ error: 'User not found'});

    if (user.balance < amount)
        return res.status(400).send({ error: 'Insufficient balance'})

    await Account.findOneAndUpdate(req.userId, { balance: user.balance - amount})
    return res.status(200).json({ balance: user.balance - amount });
}

async function balance(req, res) {

    // get balance from DB

    return res.sendStatus(200);
}

module.exports = { currencyExchange, deposit, withdraw, balance, authenticate, register }