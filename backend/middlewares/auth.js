const User = require("../models/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = async (res, req, next) => {
    try {
        const token = req.body.token || req.cookies.token || req.header("Authorisation").replace("Bearer", "");

        if (!token) {
            return res.status(404).json(
                {
                    status: false,
                    message: "Token is missing"
                }
            );
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log(decoded);

            req.user = decoded;
        }
        catch (Error) {
            return res.status(401).json(
                {
                    status: false,
                    message: Error.message,
                    additionalInfo: "Token is invalid"
                }
            );
        }

        next();
    }
    catch (Error) {
        return res.status(400).json(
            {
                status: true,
                message: Error.message,
                additionalInfo: "Error while authenticating user"
            }
        );
    }
}

// Verify Student
exports.isStudent = async (req, res, next) => {
    try {
        if (req.user.accountType !== "Student") {
            return res.status(401).json(
                {
                    status: false,
                    message: "This is protected route for only student"
                }
            );
        }

        next();
    }
    catch (Error) {
        return res.status(500).json(
            {
                status: false,
                message: Error.message,
                additionalInfo: "Error while verifying student"
            }
        );
    }
}

// Verify Admin
exports.isAdmin = async (req, res, next) => {
    try {
        if (req.user.accountType !== "Admin") {
            return res.status(401).json(
                {
                    status: false,
                    message: "This is protected route for only Admin"
                }
            );
        }

        next();
    }
    catch (Error) {
        return res.status(500).json(
            {
                status: false,
                message: Error.message,
                additionalInfo: "Error while verifying Admin"
            }
        );
    }
}

// Verify Instructor
exports.isInstructor = async (req, res, next) => {
    try {
        if (req.user.accountType !== "Instructor") {
            return res.status(401).json(
                {
                    status: false,
                    message: "This is protected route for only Instructor"
                }
            );
        }

        next();
    }
    catch (Error) {
        return res.status(500).json(
            {
                status: false,
                message: Error.message,
                additionalInfo: "Error while verifying Instructor"
            }
        );
    }
}