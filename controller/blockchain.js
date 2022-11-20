//requiring the modules
const express = require('express')
const Blockchains = require('../models/blockchains')
const {CustomAPIError} = require('../error/custom_error')
//const catchAsync = require('./catchAsync')
const responseHelper = require('../helpers/response')

//get request
 const getAllBlockchain = async(req,res)=>{
    try{
        const blockchain= await Blockchains.find({},{__v:0})
        //res.json(blockchain)
        return responseHelper.success(res,blockchain)
    }
    catch(err){
        res.send('Error'+err)
    }
}

//get request ID
const get1Blockchain = async(req,res,next)=>{
    const id = req.params.id
    const blockchains= await Blockchains.findById(id,{__v:0})
    console.log(blockchains)
    if(!blockchains)
    {
        throw new CustomAPIError(`no courses with this id:${id}`,404)
    }
//res.json({course:blockchains.course,sub:blockchains.sub,tech:blockchains.tech})
return responseHelper.success(res,blockchains)

}


//post request 
//error handling block
const CreateBlockchain = async(req,res)=>{
    try{
     const blockchains = await Blockchains.create({
        course: req.body.course,
        tech:req.body.tech,
        sub:req.body.sub
})
//const blockchain={course:blockchains.course,tech:blockchains.tech,sub:blockchains.sub}
return responseHelper.success(res,blockchains)

}catch(err){
    res.send('Error')
}
}

//upate or modify the data using Patch operation
const UpdateBlockchain = async(req,res)=>{
try{
    const id=req.params.id
    const blockchains = await Blockchains.findOneAndUpdate({id}, req.body,{new:true},)
    const block=({course:blockchains.course,sub:blockchains.sub,tech:blockchains.tech})
    return responseHelper.success(res,block)

}catch(err){
    res.send('Error')
}
}

//put operation
const PutBlockchain = async(req,res)=>{
    const blockchains=await Blockchains.updateOne({_id: req.params.id}, req.body).then(
    () => {
    res.status(201).json({
    message: 'success!'
    });
})
}

//delete operation to delete the specified data required
const DeleteBlockchain = async(req,res)=>{
try{
    const blockchains = await Blockchains.findById(req.params.id,{__v:0})
    const a1 = await blockchains.remove()
    //res.json(a1)
    return responseHelper.success(res,a1)


}catch(err){
    res.send('Error'+err)
    }
}
  
//module export
module.exports={getAllBlockchain,get1Blockchain,CreateBlockchain,UpdateBlockchain,PutBlockchain,DeleteBlockchain}