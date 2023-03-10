const express = require('express');
const routers = express.Router()
const user = require('./userRouter')
const vendor = require('./vendorRouter')

routers.use('/user', user)
routers.use('/vendor',vendor)

module.exports = routers