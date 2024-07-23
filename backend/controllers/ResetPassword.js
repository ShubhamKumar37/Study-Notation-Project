const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const bcrypt = require("bcrypt");

// Reset Password Token 
exports.resetPasswordToken = async (req, res) => {
    try {
        // Take email from req body
        const email = req.body.email;

        // Existance of user
        const userExist = await User.findOne({ email });
        if (!userExist) {
            return res.status(401).json(
                {
                    success: false,
                    message: `This ${email} doesnot exist in database`
                }
            );
        }

        // Generate Token
        const token = crypto.randomUUID();

        const updatedDetails = await User.findOneAndUpdate({ email: email },
            { token: token, resetPasswordExpires: Date.now() + 5 * 60 * 1000 }, { new: true }
        );

        // Create URL for reset Password
        const url = `http://localhost:3000/update-password/${token}`;

        // Send mail of rest password url
        await mailSender("This is the password reset email", email, `Follow this link to reset the password - ${url}`);

        return res.status(200).json(
            {
                success: true,
                message: "A reset password link is sended to your email",
                data: updatedDetails
            }
        );
    }
    catch (Error) {
        return res.status(500).json(
            {
                success: false,
                message: Error.message,
                additionalInfo: "Error while creating reset password token (ResetPassword.js)"
            }
        );
    }
}


// Reset Password
exports.resetPassword = async (req, res) => {
    try {
        const { password, confirmPassword, token } = req.body;

        // Validation of extracted data
        if (!password || !confirmPassword || !token) {
            return res.status(401).json(
                {
                    success: false,
                    message: "All field are required"
                }
            );
        }

        if (password !== confirmPassword) {
            return res.status(400).json(
                {
                    success: false,
                    message: "Password is not matching with confirm password"
                }
            );
        }

        // Find user and vaildate the token expire time
        const userExist = await User.findOne({ token: token });

        if (!userExist) {
            return res.status(404).json(
                {
                    success: false,
                    message: "Your token is invalid"
                }
            );
        }

        if (userExist.resetPasswordExpires < Date.now()) {
            return res.status(400).json(
                {
                    success: false,
                    message: "Your token/link is expired for reseting the password"
                }
            );
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const updatedUser = await User.findOneAndUpdate({ token: token },
            { password: hashedPassword }, { new: true },
        );

        // Send a mail of confirm changed password
        await mailSender("Your password successfully changed", updatedUser.email, "<h1>Your password is changed</h1>")

        return res.status(200).json(
            {
                success: true,
                message: "Password resetted successfully",
                data: updatedUser
            }
        );
    }
    catch (Error) {
        return res.status(500).json(
            {
                success: false,
                message: Error.message,
                additionalInfo: "Error while resetting password (ResetPassword.js)"
            }
        );
    }
}