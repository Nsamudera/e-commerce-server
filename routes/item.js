const router = require('express').Router()
const Controller = require('../controllers/item.js')

router.get('/', Controller.getItems)
router.post('/add', Controller.addItem)
router.put('/edit', Controller.editItem)
router.delete('/delete', Controller.deleteItem)


module.exports = router