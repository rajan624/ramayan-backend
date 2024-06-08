const Router = require("express");
const router = Router.Router();
const authController = require("../Controller/authController");
router.post("/login", authController.login);
router.post("/signUp" , authController.signUp)
module.exports = router;
