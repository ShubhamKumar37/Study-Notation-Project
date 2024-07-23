const User = require("../models/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Working (cookies, body)
exports.auth = async (req, res, next) => {
    try {
        const token = req.body.token || req.cookies.token || req.header("Authorisation").replace("Bearer", "");

        if (!token) {
            return res.status(404).json(
                {
                    success: false,
                    message: "Token is missing"
                }
            );
        }
        // console.log(1);
        
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.user = decoded;
            // console.log(2);
            // console.log(decoded);
        }
        catch (Error) {
            return res.status(401).json(
                {
                    success: false,
                    message: Error.message,
                    additionalInfo: "Token is invalid"
                }
            );
        }
        
        // console.log(3);
        next();
    }
    catch (Error) {
       return  res.status(500).json(
            {
                success: false,
                message: Error.message,
                additionalInfo: "Error while authenticating user"
            }
        );
    }
}

// Verify Student - Working
exports.isStudent = async (req, res, next) => {
    try {
        if (req.user.accountType !== "Student") {
            return res.status(401).json(
                {
                    success: false,
                    message: "This is protected route for only student"
                }
            );
        }

        next();
    }
    catch (Error) {
        return res.status(500).json(
            {
                success: false,
                message: Error.message,
                additionalInfo: "Error while verifying student"
            }
        );
    }
}

// Verify Admin - Working
exports.isAdmin = async (req, res, next) => {
    try {
        console.log(req.user.accountType);
        if (req.user.accountType !== "Admin") {
            return res.status(401).json(
                {
                    success: false,
                    message: "This is protected route for only Admin"
                }
            );
        }

        next();
    }
    catch (Error) {
        return res.status(500).json(
            {
                success: false,
                message: Error.message,
                additionalInfo: "Error while verifying Admin"
            }
        );
    }
}

// Verify Instructor - Working
exports.isInstructor = async (req, res, next) => {
    try {
        if (req.user.accountType !== "Instructor") {
            return res.status(401).json(
                {
                    success: false,
                    message: "This is protected route for only Instructor"
                }
            );
        }

        next();
    }
    catch (Error) {
        return res.status(500).json(
            {
                success: false,
                message: Error.message,
                additionalInfo: "Error while verifying Instructor"
            }
        );
    }
}