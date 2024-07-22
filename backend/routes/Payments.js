const express = require("express");
const router = express.Router();
const {auth, isStudent} = require("../middlewares/auth");
const {capturePayment, verifySignature} = require("../controllers/Payment");

// Payment process routes
router.post("/capture-payment", auth, isStudent, capturePayment);
router.post("/verify-signature", auth, verifySignature);

module.exports = router;