//requiring the modules 
const express = require("express");
const router = express.Router();
const { register, login } = require("../controller/auth");
const {userScheme,loginSchema} = require('../middleware/joi_validation')

//post operation for redister and login
router.post("/register",userScheme, register);
router.post("/login" ,loginSchema, login);

//exporting the modules
module.exports = router;