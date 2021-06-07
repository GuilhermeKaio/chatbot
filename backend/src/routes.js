const express = require('express');
const authMiddleware = require('./middleware/auth');

const balanceController = require('./controllers/balanceController');

const router = express.Router();

router.post('/api/auth', balanceController.authenticate);
router.post('/api/reg', balanceController.register);

router.use(authMiddleware);

router.get('/api/exchange', balanceController.currencyExchange);


module.exports = router; 