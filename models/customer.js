const mongoose = require('mongoose')

const Schema = mongoose.Schema
const customerSchema = new Schema({
    email: {
        type: String,
        validate: {
            validator: function(value) {
                return /\w+@+\w+\.\w/.test(value)
            },
            message: "Please insert a valid mail"
        },
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "Customer"
    }
})

const Customer = mongoose.model('Customer', customerSchema, 'Customers')

module.exports = Customer