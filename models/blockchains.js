//Rrequiring mongoose
const mongoose= require('mongoose')

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
},{versionKey:false})

//modele exporting
module.exports=mongoose.model('Blockchains',blockchainsSchema)