const router = require('express').Router()
const Controller = require('../controllers/index.js')

router.get('/', Controller.index)


module.exports = router