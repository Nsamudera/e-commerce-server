//Model
const Customer = require('../models/customer.js')
//Bcrypt
const bcrypt = require('bcrypt');
const saltRounds = 10;
//Helpers
const createJWTToken = require('../helpers/createJWT_Token.js')

class Controller {
    static signUp(req, res) {
        //check if email is unique
        Customer
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
                            let newCustomer = new Customer({
                                email: req.body.email,
                                password: hashedPass,
                            })
                            newCustomer.save(function (err) {
                                if (err) {
                                    console.log(err)
                                    res.status(400).json({ message: err.message, note: 'Please see console log for details' })
                                } else {
                                    res.status(201).json({ message: `You have successfully signed up` })
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
        // find in database customer with email given
        Customer
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
                                    res.status(200).json({ message: 'Successfully signed in. Please take note of your token', token: token })
                                })

                        } else {
                            res.status(400).json({ message: 'Password is incorrect' })
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