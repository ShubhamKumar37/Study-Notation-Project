const express = require("express");
const router = express.Router();
const { signUp, login, changePassword, sendOTP } = require("../controllers/Auth");
const { auth } = require("../middlewares/auth");
const { resetPassword, resetPasswordToken } = require("../controllers/ResetPassword");

// For login and signup the account
router.post("/signup", signUp); // Working
router.post("/login", login); // Working
router.post("/sendOTP", sendOTP); //Working

// reset password or change after login
router.put("/change-password", auth, changePassword); // Working
router.put("/reset-password-token", resetPasswordToken); // Working
router.put("/reset-password", resetPassword); // Working

module.exports = router;