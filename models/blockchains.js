const mongoose= require('mongoose')
//Rrequiring mongoose
//schema architecture

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
//modele exporting

module.exports=mongoose.model('Blockchains',blockchainsSchema)