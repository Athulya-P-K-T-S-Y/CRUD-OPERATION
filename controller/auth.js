const { StatusCodes } = require('http-status-codes')
const User=require("../models/user")
//const { BadRequestError,UnauthenticatedError} = require('../errors')
const {CustomAPIError} = require('../error/custom_error')

const register=async(req,res)=>{
    const user = await User.create({ ...req.body })
    res.status(StatusCodes.CREATED).json({user:{name:user.name}})
}
const login=async(req,res)=>{
    const { email, password } = req.body

  if (!email || !password) {
    throw new CustomAPIError('Please provide email and password',401)
  }
  const user = await User.findOne({ email })
  if (!user) {
    throw new CustomAPIError('Invalid Credentials',401)
  }
  res.status(StatusCodes.OK).json({ user: { name: user.name}})
}

module.exports={register,login}