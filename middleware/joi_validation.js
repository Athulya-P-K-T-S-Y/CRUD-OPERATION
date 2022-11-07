//requiring the required necessary modules
const  {CustomAPIError}  = require("../error/custom_error");
const Joi = require("joi");


const  userScheme = (req, res, next) => {
//create schema object which is necessary
const schema = Joi.object({
  name: Joi.string().min(6).max(30).required(),
	password: Joi.string().min(8).max(30).regex(/[a-zA-Z0-9]{3,30}/).required(),
	email: Joi.string().email().required()
});

  
const options = {
  abortEarly: false, //include all errors
};

//validate request body
const { error, value } = schema.validate(req.body, options);
if (error) {
  throw new CustomAPIError(`validation error:${error.message}`,403);
} else {
  req.body = value;
  next();
}
};

//validation for loginSchema
const  loginSchema = (req, res, next) => {
//create schema object
const schema = Joi.object({
	password: Joi.string().min(8).max(30).regex(/[a-zA-Z0-9]{3,30}/).required(),
	email: Joi.string().email().required()
});

const options = {
  abortEarly: false, //include all errors
};
//validate request body
const { error, value } = schema.validate(req.body, options);
if (error) {
  throw new CustomAPIError(`validation error:${error.message}`,403);
} else {
  req.body = value;
  next();
}
};

//exporting the modules userScheme,loginSchema
module.exports = {userScheme,loginSchema};