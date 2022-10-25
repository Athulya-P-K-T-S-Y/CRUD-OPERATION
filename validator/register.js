//* validators/register.validator.js
const Joi = require('joi');

const registerSchema = Joi.object({
    name: Joi.string().trim().min(3),
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().min(4).required(),
    //name: Joi.string().min(1).required(),
    //surname: Joi.string().min(1).required()
});

module.exports = registerSchema;