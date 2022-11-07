//requiring the required modules
const { StatusCodes } = require('http-status-codes')
const User=require("../models/user")
const {CustomAPIError} = require('../error/custom_error')
const { use } = require('passport')
const responseHelper = require('../helpers/response')


const register=async(req,res)=>{
var user = await User.create(req.body)
const use={name:user.name,email:user.email,password:user.password}
//status code created with a message
return responseHelper.success(res,use)
//console the user
console.log("user")   
}

const login=async(req,res)=>{
const { email, password } = req.body
  if (!email || !password) {
  throw new CustomAPIError('Please provide email and password',401)
  }
  const user = await User.findOne({ email },{__v:0})
  if (!user) {
  throw new CustomAPIError('user Credentials',401)
  }
  
//password comparison
const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
  //compare password,if not invalid password
  throw new CustomAPIError('Invalid password');
    }
//status code ok witha message,login successful
return responseHelper.success(res,user)

}
//module exporting,register and login
module.exports={register,login}