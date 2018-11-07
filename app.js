const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const mongoose = require('mongoose')
// const cors = require('cors')
//routes
const customer = require('./routes/customer.js')
const item = require('./routes/item.js')
const cart = require('./routes/cart.js')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
// app.use(cors())

//connect mongoose
mongoose.connect('mongodb://localhost:27017/shopping-cart', {useNewUrlParser:true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log(('You are Mongected'));
});

//path
app.use('/nile/customer', customer)
app.use('/nile/item', item)
app.use('/nile/cart', cart)


app.listen(port, () => {
    console.log(`Listening to port ${port}`);
})


