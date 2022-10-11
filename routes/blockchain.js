const express = require('express')
const router = express.Router()
const Blockchains = require('./models/blockchains')
const {CustomAPIError} = require('../error/custom_error')
//const blockchains = require('./models/blockchains')

//get request

router.get('/',async(req,res)=>{
    try{
        const blockchain= await Blockchains.find()
        res.json(blockchain)
    }
    catch(err){
        res.send('Error'+err)
    }
    

})
//get request ID

router.get('/:id',async(req,res)=>{
    //try{
        const { id:courseID}=req.params
        const blockchains= await Blockchains.findOne({_id:courseID})
        //res.json(blockchains)
        if(!blockchains)
        {
            throw new CustomAPIError(`no courses with this id:${courseID}`,404)
        }
        res.json({blockchains})
        
  //  }
    //catch(err){
     //   res.send('Error'+err)
   //}
    

})



//post request 
//error handling block
router.post('/', async(req,res)=>{
     const blockchains = new Blockchains({
        course: req.body.course,
        tech:req.body.tech,
        sub:req.body.sub
     })
try{
   const a1=await blockchains.save()
   console.log("a1",a1)
   //res.json(a1)
   res.json({
    success: true,
    message: "Courses added", 
    name : a1.course,
    //type: "a1.type"
    })
}catch(err){
    res.send('Error')
}
})
//upate or modify the data using Patch operation

router.patch('/:id',async(req,res)=>{
    try{
        const id=req.params
        const blockchains = await Blockchains.findOneAndUpdate(id,req.body,{new:true})
      //  blockchains.sub = req.body.sub
        //const a1 = await blockchains.save()
        res.json(a1)
    }catch(err){
        res.send('Error')
    }
})

//delete operation to delete the specified data required
router.delete('/:id',async(req,res)=>{
    try{
        const blockchains = await Blockchains.findById(req.params.id)
        const a1 = await blockchains.remove()
        res.json(a1)
    }catch(err){
        res.send('Error'+err)
    }
})

    


module.exports=router