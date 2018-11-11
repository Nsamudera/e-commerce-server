//Model
const User = require('../models/user.js')
const Cart = require('../models/cart.js')
//Bcrypt
const bcrypt = require('bcrypt');
const saltRounds = 10;
//Helpers
const createJWTToken = require('../helpers/createJWT_Token.js')

class Controller {
    static signUp(req, res) {
        //check if email is unique
        User
            .findOne({
                email: req.body.email
            })
            .then(data => {
                //if email found, state that email is not unique
                if (data) {
                    res.status(400).json({ message: 'Email already taken' })
                    //email is not taken ('data' is null)
                } else {
                    //encrypt password
                    bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
                        if (err) {
                            console.log(err)
                            res.status(500).json({ message: err.message, note: 'Please see console log for details' })
                        } else {
                            //add user to database
                            let hashedPass = ''
                            if (req.body.password) {
                                hashedPass = hash
                            } else {
                                hashedPass = req.body.password
                            }
                            let newUser = new User({
                                email: req.body.email,
                                password: hashedPass,
                                role: req.body.role
                            })
                            newUser.save(function (err) {
                                if (err) {
                                    console.log(err)
                                    res.status(400).json({ message: err.message, note: 'Please see console log for details' })
                                } else {
                                    //create empty cart for registered user
                                    let newCart = new Cart({
                                        customerId: newUser._id
                                    })
                                    newCart.save(function (err) {
                                        if (err) {
                                            console.log(err)
                                            res.status(400).json({ message: err.message, note: 'Please see console log for details' })
                                        } else {
                                            res.status(201).json({message: `You have successfully signed up`, data: newUser})
                                        }
                                    })
                                }
                            })
                        }
                    });
                }
            })
            .catch(err => {
                console.log(err)
                res.status(500).json({ message: err.message, note: 'Please see console log for details' })
            })
    }
    static signIn(req, res) {
        // find in database User with email given
        User
            .findOne({
                email: req.body.email
            })
            .then(data => {
                //check password
                let hash = data.password
                bcrypt.compare(req.body.password, hash, function (err, result) {
                    if (err) {
                        console.log(err)
                        res.status(500).json({ message: err.message, note: 'Please see console log for details' })
                    } else {
                        if (result) {
                            return createJWTToken(data)
                                .then(token => {
                                    res.status(200).json({message: 'Successfully signed in. Please take note of your token', token: token, role: data.role})
                                })

                        } else {
                            res.status(400).json({message: 'Password is incorrect'})
                        }

                    }
                });
            })
            .catch(err => {
                console.log(err)
                res.status(500).json(
                    {
                        message: err.message,
                        note: 'Please see console log for further details'
                    })
            })
    }

}

module.exports = Controller