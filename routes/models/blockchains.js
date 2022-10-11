const mongoose= require('mongoose')


const blockchainsSchema = new mongoose.Schema({
            course:{
                type:String,
                required : true
            },
            tech:{
                type:String,
                required : true
            },
            sub:{
                type:Boolean,
                required:true,
                default:false
            }
})

module.exports=mongoose.model('Blockchains',blockchainsSchema)