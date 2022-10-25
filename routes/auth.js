const express = require("express");
const router = express.Router();

const { register, login } = require("../controller/auth");

const validation_middleware = require("../middleware/validation_middleware")

router.post("/register",validation_middleware('register'),register);
router.post("/login",validation_middleware('login') ,login);

module.exports = router;