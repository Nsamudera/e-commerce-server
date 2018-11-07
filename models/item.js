const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/shopping-cart', {useNewUrlParser:true});

const Schema = mongoose.Schema
const itemSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    // image: {
    //     type: String,
    //     required: true
    // }
    stock: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    }
})

const Item = mongoose.model('Item', itemSchema, 'Items')

module.exports = Item