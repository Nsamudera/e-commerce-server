const jwt = require('jsonwebtoken')
require('dotenv').config()

function createJWTToken(data) {
    return new Promise(function(resolve, reject) {
        let tokenContent = {
            _id: data.id,
            email: data.email,
            role: data.role
        }
        let token = jwt.sign(tokenContent, process.env.JWT_secret)
        resolve(token)
    })
}

module.exports = createJWTToken