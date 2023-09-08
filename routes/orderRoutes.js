const express = require('express');
const { orderController } = require('../controllers/orderController');
const verifyUser = require('../middleware/verifyUser');

const router = express.Router();

router.route('/').post(verifyUser, orderController);
module.exports = router;
