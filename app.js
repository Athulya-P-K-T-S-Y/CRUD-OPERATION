
//requiring the modules
const express = require('express')
const app = express()
require("express-async-errors")
const mongoose = require('mongoose')
const errorHandleMiddleware = require('./middleware/error_handler')
require("dotenv").config()
//const authenticateUser = require('./middleware/authentication');


//const db="mongodb://localhost/BlockchainDBex"
//connecting the env url
mongoose.connect(process.env.URL,{useNewUrlParser:true})



const con = mongoose.connection

con.on("open",()=>{
    console.log('connected..')
})
app.use(express.json())
const authrouter = require('./routes/auth')
const blockchainsRouter = require('./routes/blockchain')
app.use('/', authrouter)
app.use('/blockchain',blockchainsRouter)
app.use(errorHandleMiddleware)
const port=process.env.PORT||4000
console.log(port)
app.listen(port, ()=>{
    console.log('server started')
})
