const Router = require("express");
const router = Router.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken")
const authController = require("../Controller/authController");
const cors = require("cors");
const JWT_SECRET = process.env.JWT_SECRET;
router.post("/login", authController.login);
router.post("/signUp" , authController.signUp)
module.exports = router;
