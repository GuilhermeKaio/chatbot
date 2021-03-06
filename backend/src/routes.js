const express = require('express');
const authMiddleware = require('./middleware/auth');

const balanceController = require('./controllers/balanceController');

const router = express.Router();

router.post('/api/auth', balanceController.authenticate);
router.post('/api/reg', balanceController.register);

router.use(authMiddleware);

router.post('/api/exchange', balanceController.currencyExchange);
router.post('/api/deposit', balanceController.deposit);
router.post('/api/withdraw', balanceController.withdraw);
router.get('/api/balance', balanceController.balance);


module.exports = router;