const express = require('express');
const router = express.Router()
// const { ValidationError } = require('@hapi/joi/lib/errors');
const cart = require('../controller/cartController')

router.post('/addCart/:userId/:productId',cart.addCart)
router.get('/getcart',cart.cartList)
router.patch('/editcart/:cartId',cart.editCart)
router.delete('/deletecart/:cartId',cart.deleteCart)

module.exports = router;