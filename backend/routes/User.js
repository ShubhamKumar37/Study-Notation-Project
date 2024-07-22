const express = require("express");
const router = express.Router();
const { signUp, login, changePassword, sendOTP } = require("../controllers/Auth");
const { auth } = require("../middlewares/auth");
const { resetPassword, resetPasswordToken } = require("../controllers/ResetPassword");

// For login and signup the account
router.post("/signup", signUp);
router.post("/login", login);
router.post("/sendOTP", sendOTP);

// reset password or change after login
router.post("/changepassword", auth, changePassword);
router.post("/reset-password-token", resetPasswordToken);
router.post("/reset-password", resetPassword);

module.exports = router;