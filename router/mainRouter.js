const express = require('express');
const routers = express.Router()
const user = require('./userRouter')
const vendor = require('./vendorRouter')
const product = require('./productRouter')

routers.use('/user', user)
routers.use('/vendor',vendor)
routers.use('/product',product)

module.exports = routers