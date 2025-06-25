const { Joi } = require('express-validation');
const errorMessages = require('../utils/errorMessages');

exports.registerUser = {
    body: Joi.object({
        firstName: Joi.string().trim().min(3).max(30).required().messages(errorMessages('First Name', 3, 30)),
        lastName: Joi.string().trim().min(2).max(30).required().messages(errorMessages('Last Name', 2, 30)),
        email: Joi.string().trim().email().required().messages(errorMessages('Email', null, null, null, 'email')),
        password: Joi.string().trim().min(6).max(50).required().messages(errorMessages('Password', 6, 50)),
        profileImage: Joi.object().optional().allow(null),
    }),
};

exports.loginUser = {
    body: Joi.object({
        email: Joi.string().trim().email().required().messages(errorMessages('Email', null, null, null, 'email')),
        password: Joi.string().trim().min(6).max(50).required().messages(errorMessages('Password', 6, 50)),
    }),
};


