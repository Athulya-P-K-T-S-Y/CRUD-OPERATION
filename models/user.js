const { required } = require('joi')
const mongoose = require('mongoose')
//const bcrypt = require('bcryptjs')
//const jwt = require('jsonwebtoken')
const Joi = required('joi')
// const UserSchema = new mongoose.Schema({
  
	
// 		username: Joi.string()
// 				.min(5)
// 				.max(30)
// 				.required(),
					
// 		email: Joi.string()
// 			.email()
// 			.min(5)
// 			.max(50)
// 			.optional(),
				
// 		date_of_birth: Joi.date()
// 					.optional(),
						
// 		account_status: Joi.string()
// 						.valid('activated')
// 						.valid('unactivated')
// 						.optional(),
	

//   })
const UserSchema = Joi.object({
  name: Joi.string().trim().min(3),
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().min(4).required(),
  //name: Joi.string().min(1).required(),
  //surname: Joi.string().min(1).required()
});


module.exports = mongoose.model('User', UserSchema)


