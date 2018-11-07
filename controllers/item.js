const Item = require('../models/item.js')
class Controller {
    static getItems(req, res) {
        Item
        .find()
        .then(data => {
            res.status(200).json({data: data})
        })
        .catch(err => {
            console.log('err')
            res.status(500).json({message: err.message, note: 'Please see console log for details'})
        })
    }
    static addItem(req, res) {
        let newItem = new Item ({
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            stock: req.body.stock,
            category: req.body.category
        })
        newItem.save(function (err) {
            if (err) {
                console.log(err)
                res.status(500).json({ message: err.message, note: 'Please see console log for details' })
            } else {
                res.status(201).json({message: 'Item succesfully added'})
            }
        })
    }
    static editItem(req, res) {
        Item
            .update({
                _id: req.body._id
            },{
                name: req.body.name,
                price: req.body.price,
                description: req.body.description,
                stock: req.body.stock,
                category: req.body.category
            })
            .then(data => {
                if(data.n !== 0) {
                    console.log('ok')
                    res.status(200).json({message: "Data has been updated"})
                } else {
                    console.log("item not found")
                    res.status(500).json({message: "Item not found", note: 'Please see console log for details'})
                }
            })
            .catch(err => {
                console.log(err)
                res.status(500).json({message: err.message, note: 'Please see console log for details'})
            })
    }
    static deleteItem(req, res) {
        Item
            .deleteOne({
                _id: req.body._id
            })
            .then(data => {
                if(data.n !== 0) {
                    console.log('ok')
                    res.status(200).json({message: "Data has been Deleted"})
                } else {
                    console.log("item not found")
                    res.status(500).json({message: "Item not found", note: 'Please see console log for details'})
                }
            })
            .catch(err => {
                console.log(err)
                res.status(500).json({message: err.message, note: 'Please see console log for details'})
            })
    }
}

module.exports = Controller