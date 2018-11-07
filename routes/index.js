const router = require('express').Router()

router.post('/', (req, res) => {
    res.send('Welcome')
})


module.exports = router