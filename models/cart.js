const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/shopping-cart', {useNewUrlParser:true});

const Schema = mongoose.Schema
const cartSchema = new Schema({
    customerId: [{
        type: Schema.Types.ObjectId,
        ref: 'Customer',
		required: true
    }],
    cart: [{
        type: Schema.Types.ObjectId,
        ref: 'Item',
	}]
})

const Cart = mongoose.model('Cart', cartSchema, 'Carts')

module.exports = Cart