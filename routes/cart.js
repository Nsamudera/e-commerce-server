const router = require('express').Router()
const Controller = require('../controllers/cart.js')

router.get('/', Controller.createCart)


module.exports = router