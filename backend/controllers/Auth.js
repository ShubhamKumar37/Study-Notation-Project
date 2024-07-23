const User = require("../models/User");
const OTP = require("../models/OTP");
const Profile = require("../models/Profile");
const otpGenerater = require("otp-generator");
const mailSender = require("../utils/mailSender");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { passwordUpdated } = require("../mail/templates/passwordUpdate");
const { otpTemplate } = require("../mail/templates/emailVerificationTemplate");
require("dotenv").config();

//Generate OTP - Working
exports.sendOTP = async (req, res) => {
    try {
        const email = req.body.email;

        //Check for existence of email
        const checkExistEmail = await User.findOne({ email });
        if (checkExistEmail) {
            return res.status(401).json(
                {
                    success: false,
                    message: "User already exist"
                }
            );
        }

        // Now generate OTP for sending
        // Check for uniqness of OTP
        let otp = null;
        while (true) {
            otp = otpGenerater.generate(6, {
                lowerCaseAlphabets: false,
                upperCaseAlphabets: false,
                specialChars: false,
            });

            const checkExistOTP = await OTP.findOne({ otp: otp });
            if (!checkExistOTP) {
                break;
            }
        }

        // Create entry of OTP in database
        const otpEntry = await OTP.create({ email: email, otp: otp });

        const mailResponse = await mailSender("OTP for your Signup", email, otpTemplate(otp));

        // return a response to server 
        return res.status(200).json(
            {
                success: true,
                message: "OTP created successfully, Check your spam folder",
                data: { otpEntry, mailResponse }
            }
        );
    }
    catch (Error) {
        res.status(500).json(
            {
                success: false,
                message: Error.message,
                addtionalInfo: "Error occur in while sending OTP"
            }
        );
    }
}

// Signup - Working
exports.signUp = async (req, res) => {
    try {
        // Get data from request
        const {
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            accountType,
            otp,
        } = req.body;

        // All data exist
        if (!firstName || !lastName || !email || !password || !confirmPassword || !otp) {
            return res.status(403).json(
                {
                    success: false,
                    message: "All fields are required",
                }
            );
        }

        // Match both password
        if (password !== confirmPassword) {
            return res.status(403).json(
                {
                    success: false,
                    message: "Password doesnot match with confirm password",
                }
            );
        }

        // Check for existance of user in database
        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(401).json(
                {
                    success: false,
                    message: "Email already exist try login"
                }
            );
        }

        // Check for OTP exist (latest one)
        const otpExist = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
        if (otpExist.length === 0) {
            return res.status(400).json(
                {
                    success: false,
                    message: "OTP doesnot exist"
                }
            );
        }
        else if (otpExist[0].otp !== otp) {
            return res.status(401).json(
                {
                    success: false,
                    message: "Invalid OTP"
                }
            );
        }
        console.log(otpExist);

        // Hash Password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create Profile with default value
        const additionalDetails = await Profile.create({
            gender: null,
            dateOfBirth: null,
            about: null,
            contactNumber: null,
        })

        // Create Entry of User
        const userEntry = await User.create({
            firstName,
            lastName,
            email,
            accountType,
            password: hashedPassword,
            additionalDetails: additionalDetails._id,
            image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName}_${lastName}`,
        });

        return res.status(200).json(
            {
                success: true,
                message: "Entry created successfully",
                data: userEntry
            }
        );
    }
    catch (Error) {
        return res.status(500).json(
            {
                success: false,
                message: Error.message,
                addtionalInfo: "Error occur in while signup"
            }
        );
    }
}

// Login - Working
exports.login = async (req, res) => {
    try {
        // Fetch the data from request body
        const { email, password } = req.body;
        console.log(email, password, " <- this is the password");

        // Validate data
        if (!email || !password) {
            return res.status(404).json(
                {
                    success: false,
                    message: "All field are required"
                }
            );
        }
        
        // Check for user existence
        const userExist = await User.findOne({ email }).populate("additionalDetails").exec();
        if (userExist.length === 0) {
            return res.status(400).json(
                {
                    success: false,
                    message: "User not found"
                }
            );
        }
        
        
        // Match password and generate JWT token
        if (await bcrypt.compare(password, userExist.password)) {
            const payLoad = {
                email: userExist.email,
                accountType: userExist.accountType,
                id: userExist._id
            }
            
            // After verifing token the payload is not visible due to which req.user.id is undefined
            const token = jwt.sign(payLoad, process.env.JWT_SECRET, { expiresIn: "2h" });
            userExist.token = token;
            userExist.password = undefined;

            // Create a cookie file for it 
            const options = {
                httpOnly: true,
                expireIn: new Date(Date.now()) + 3 * 24 * 60 * 60 * 1000
            }
            
            res.cookie("token", token, options).status(200).json(
                {
                    success: true,
                    message: "User Logged in successfully",
                    token,
                    userExist
                }
            );
        }
        else {
            return res.status(400).json({
                success: false,
                message: "Password is incorrect"
            });
        }
        
    }
    catch (Error) {
        console.log(Error);
        return res.status(500).json(
            {
                success: false,
                message: Error.message,
                addtionalInfo: "Error occur in while login"
            }
        );
    }
}

// Password Change
exports.changePassword = async (req, res) => {
    try {
        const { oldPassword, newPassword, confirmNewPassword } = req.body;
        const userId = req.user.id;

        if (!oldPassword || !newPassword || confirmNewPassword) {
            return res.status(401).json(
                {
                    successfalse,
                    message: "All field are required"
                }
            );
        }

        const userExist = await User.findById(userId);
        if (!userExist) {
            return res.status(404).json(
                {
                    successfalse,
                    message: "User does not exist for this email"
                }
            );
        }

        if (!await bcrypt.compare(oldPassword, userExist.password)) {
            return res.status(401).json(
                {
                    success: false,
                    message: "Old Password is incorrect"
                }
            );
        }

        if (newPassword !== confirmNewPassword) {
            return res.status(401).json(
                {
                    successfalse,
                    message: "New password doesnot match with confirm password"
                }
            );
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        const updateUserPassword = await User.findOneAndUpdate({ email: email }, { $set: { password: hashedPassword } });
        updateUserPassword.password = undefined;

        const mailInfo = await mailSender("Password changed successfully", userExist.email, passwordUpdated(userExist.email, `${firstName} ${lastName}`));
        console.log(mailInfo);

        return res.status(200).json(
            {
                success: true,
                message: "Password updated successfully",
                data: updateUserPassword
            }
        );
    }
    catch (Error) {
        return res.status(500).json(
            {
                success: false,
                message: Error.message,
                addtionalInfo: "Error occur in while changing password (Auth.js)"
            }
        );
    }
}