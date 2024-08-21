const mongoose = require('mongoose');
const mailSender = require('../utils/mailSender');
const { otpTemplate } = require("../mail/templates/emailVerificationTemplate");

const OTPSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
        },
        otp: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now(),
            expires: Date.now() + 5 * 60,
        }
    }
);

async function sendVerficationEmail(email, otp) {
    try {
        const mailResponse = await mailSender(otpTemplate(otp), email, otp);
        console.log(`Email sended to ${email}`);
        console.log(mailResponse);

    }
    catch (Error) {
        console.log("This error occur in OTP Model ", Error);
    }
}

OTPSchema.pre("save", async (next) => {
    if (this.isNew) {
        await sendVerficationEmail(this.email, this.otp);
    }
    next();
})

module.exports = mongoose.model("OTP", OTPSchema);