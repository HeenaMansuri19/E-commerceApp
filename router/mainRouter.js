const express = require('express');
const routers = express.Router()
const user = require('./userRouter')
const vendor = require('./vendorRouter')
const product = require('./productRouter')
const review = require('./reviewRouter')
const cart = require('./cartRouter')

routers.use('/user', user)
routers.use('/vendor',vendor)
routers.use('/product',product)
routers.use('/review',review)
routers.use('/cart',cart)

module.exports = routers