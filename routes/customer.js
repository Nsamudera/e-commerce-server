const router = require('express').Router()
const Controller = require('../controllers/customer.js')

router.post('/signup', Controller.signUp)
router.post('/signin', Controller.signIn)


module.exports = router