const { CustomAPIError } = require("../errors/custom-errors");
const joi = require("joi");

const blockchainsSchema = (req, res, next) => {
  //create schema object
  const schema = joi.object({
    name: joi.string().required().min(3).max(25),
    //Imageurl: joi.string(),
    email: joi.string().required().min(4).max(25),
    password: joi.number().min(6),
    //price: joi.number().required().min(200),
  });
  //schema options
  const options = {
    abortEarly: false, //include all errors
  };
  //validate request body
  const { error, value } = schema.validate(req.body, options);
  if (error) {
    throw new CustomAPIError(`validation error:${error.message}`);
  } else {
    req.body = value;
    next();
  }
};
module.exports = bookSchema;