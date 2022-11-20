//requiring the modules 
const express = require("express");
const router = express.Router();
const { register, login , balance,transfer} = require("../controller/auth");
const {userScheme,loginSchema,transferSchema,balanceSchema} = require('../middleware/joi_validation')
const authenticateUser = require('../middleware/authentication');



//post operation for redister and login
router.post("/register",userScheme, register);
router.post("/login" ,loginSchema, login);
router.post("/balance",authenticateUser,balanceSchema, balance);
router.post("/transfer",authenticateUser,transferSchema, transfer)

//exporting the modules
module.exports = router;