//requiring the required modules
const { StatusCodes } = require('http-status-codes')
const User=require("../models/user")
const {CustomAPIError} = require('../error/custom_error')
const { use } = require('passport')
const responseHelper = require('../helpers/response')
const { ethers } = require("ethers");
const Wallet = require('ethereumjs-wallet');
const INFURA_ID = '2de122430cac4415abdc69ec89693c6a'
const provider = new ethers.providers.JsonRpcProvider(`https://goerli.infura.io/v3/${INFURA_ID}`)
  
//0x204321b0e4612E8B2B540FA5176211f2F7D85f70 acnt 1
//0x4bE8832D4949739740586a4BfeDf9640AE60E3EF acnt 2

const register=async(req,res)=>{

const EthWallet = await Wallet.default.generate();
const address= await EthWallet.getAddressString();
console.log("address: " + EthWallet.getAddressString());
console.log("privateKey: " + EthWallet.getPrivateKeyString());


const user = await User.create({email:req.body.email,name:req.body.name,password:req.body.password,address:address})
//console.log(user._id)
//const use={name:user.name,email:user.email,password:user.password,balance:balance}
//status code created with a message
const use = await User.findById(user._id, {'name':1, '_id':1})
console.log(use)
return responseHelper.success(res,user) 
}

const login=async(req,res)=>{
console.log('login',req)
const { email, password } = req.body
  if (!email || !password) {
  throw new CustomAPIError('Please provide email and password',401)
  }
  const user = await User.findOne({ email },{__v:0})
  if (!user) {
  throw new CustomAPIError('user Credentials,data not exit',401)
  }
  
//password comparison
const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
  //compare password,if not invalid password
  throw new CustomAPIError('Invalid password');
  }

//jwt token generating
const token = user.createJWT();
const newUser = {email:user.email,password:user.password,token}
//status code ok witha message,login successful
return responseHelper.success(res,newUser)

}

//wallet balance
const balance= async (req,res)=>{ 
//const address = '0x4bE8832D4949739740586a4BfeDf9640AE60E3EF'
const address = req.body.address
const balance = await provider.getBalance(address)
var bal = `${ethers.utils.formatEther(balance)}`
const bala={address:address, balance:bal}
return responseHelper.success(res,bala)         
}


//wallet transfer from one account to another
const transfer= async (req,res)=>{
const account2 = req.body.account2// Your account address 1,sender
const account1 = req.body.account1 // Your account address 2,receiver

const privateKey1 = process.env.PRIVATE_KEY // Private key of account 2
const wallet = new ethers.Wallet(privateKey1, provider)


const senderBalanceBefore = await provider.getBalance(account2) //show account1 balance before transfer
const recieverBalanceBefore = await provider.getBalance(account1) //show account2 balance before transfer

const senderBefore = `${ethers.utils.formatEther(senderBalanceBefore)}`
const receiverBefore = `${ethers.utils.formatEther(recieverBalanceBefore)}`

//send etherss
const tx = await wallet.sendTransaction({
  to: account1,
  value: ethers.utils.parseEther((req.body.amount).toString())
})
//wait for transaction to be mined
await tx.wait()
console.log(tx)

const senderBalanceAfter = await provider.getBalance(account2) //show account1 balance after transfer
const recieverBalanceAfter = await provider.getBalance(account1)//show account2 balance after transfer

const senderAfter=` ${ethers.utils.formatEther(senderBalanceAfter)}`
const receiverAfter=`${ethers.utils.formatEther(recieverBalanceAfter)}`
const transfer ={senderBalanceBefore:senderBefore, receiverBlanaceBefore:receiverBefore, senderBalanceAfter:senderAfter, receiverBalanceAfter:receiverAfter}
return responseHelper.success(res,transfer)         

}


//module exporting,register and login
module.exports={register,login,balance,transfer}


