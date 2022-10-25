const {CustomAPIError} =require('../error/custom_error')
const errorHandleMiddleware = (err,req,res,next) =>{
    if (err instanceof CustomAPIError){
    
        return res.status(err.statuscode).json({ msg:err.message})
    }
    console.log(err)
    return res.status(500).json({msg: 'something went wrong,please try again'})
}

module.exports= errorHandleMiddleware