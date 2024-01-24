const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
// const HttpError = require('../models/ErrorModel');
const { HttpError } = require("../models/ErrorModel");

async function authMiddleware(req, res, next) {
    const authorization = req.headers.authorization|| req.headers.Authorization;
    if(!authorization||!authorization.startsWith('Bearer')){
        return next(new HttpError('Failed to read authorization token', 401));
    }
    try {
        const token = authorization.split(' ')[1];
        // const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        // req.user = decodedToken;
        // next();

        jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
            if(err){
                return next(new HttpError('Invalid token', 401));
            }
            req.user = decoded;
            next();
        })
    } catch (error) {
        return next(new HttpError('Invalid token', 401));
    }
}

module.exports = authMiddleware;