//requiring the modules
const mongoose= require("mongoose")
var Joi = require('joi');
const bcrypt = require("bcryptjs")

//schema architecture
var userSchema = new mongoose.Schema({
  name: String,
  password: String,
	email: String,
  
},{versionKey:false})

//Password encryption using hash
userSchema.pre('save', async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

//password comparison
userSchema.methods.comparePassword = async function (canditatePassword) {
  const isMatch = await bcrypt.compare(canditatePassword, this.password);
  return isMatch;
};

//exporting modules
module.exports = mongoose.model('User', userSchema);


