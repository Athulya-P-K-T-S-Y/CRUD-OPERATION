const express = require('express')
const app = express()
require("express-async-errors")
const mongoose = require('mongoose')


const errorHandleMiddleware = require('./middleware/error_handler')
require("dotenv").config()

//const db="mongodb://localhost/BlockchainDBex"
//mongoose.connect(process.env.URL,{useNewUrlParser:true})
mongoose.connect(process.env.URL,{useNewUrlParser:true})


//console.log(process.env.URL)
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
app.listen(port, ()=>{
    console.log('server started')
})
