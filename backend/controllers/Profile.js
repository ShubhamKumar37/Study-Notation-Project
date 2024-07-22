require("dotenv").config();
const User = require("../models/User");
const Profile = require("../models/Profile");
const {uploadToCloudinary} = require("../utils/UploadCloudinary");

// Update the profile of user
exports.updateProfile = async (req, res) => {
    try {
        const { gender = "", about = "", dateOfBirth = null, contactNumber = null } = req.body;
        const userId = req.user.id;

        if (!userId) {
            return res.status(400).json({ error: "User not found. Try login again" });
        }

        // Get the User details
        const userDetails = await User.findById(userId);

        // Get the profile 
        const profileDetails = await Profile.findById(userDetails.additionalDetails);

        profileDetails.gender = gender;
        profileDetails.about = about;
        profileDetails.dateOfBirth = dateOfBirth;
        profileDetails.contactNumber = contactNumber;

        await profileDetails.save();

        return res.status(200).json(
            {
                success: true,
                message: "Profile updated successfully",
                data: userDetails,
            }
        );
    }
    catch (Error) {
        return res.status(500).json(
            {
                success: false,
                message: Error.message,
                additionalInfo: "Error occur while updating the profile (Profile.js)"
            }
        );
    }
}

// Get all user details
exports.getUserDetails = async (req, res) => {
    try {
        const userId = req.user.id;

        const userDetails = await User.findById(userId).populate("additionalDetails").exec();

        return res.status(200).json(
            {
                success: true,
                message: "All user detail given below",
                data: userDetails,
            }
        );

    }
    catch (Error) {
        return res.status(500).json(
            {
                success: false,
                message: Error.message,
                additionalInfo: "Error occur while getting all detail of user (Profile.js)"
            }
        );
    }
}

// Get student enrolled in how much course
exports.getStudentEnrolledCourse = async (req, res) => {
    try {
        const userId = req.user.id;

        const courseEnrolledDetail = await User.findById(userId).populate("courses").exec();

        return res.status(200).json(
            {
                success: true,
                message: "These are the course student enrolled",
                data: courseEnrolledDetail
            }
        );
    }
    catch (Error) {
        return res.status(500).json(
            {
                success: false,
                message: Error.message,
                additionalInfo: "Error occur while getting student enrolled in course (Profile.js)"
            }
        );
    }
}

// Update profile picture of user
exports.updateProfilePicture = async (req, res) => {
    try{
        const userId = req.user.id;
        const {userImage} = req.files.image;

        const responseUploadImage = await uploadToCloudinary(userImage, process.env.FILE_FOLDER, 80);

        const updateUser = await User.findByIdAndUpdate(
            {_id: userId},
            {image: responseUploadImage.secure_url},
            {new: true}
        );

        return res.status(200).json(
            {
                success: true,
                message: "User profile picture is changed now",
                data: updateUser
            }
        );
    }
    catch(Error)
    {
        return res.status(500).json(
            {
                success: false,
                message: Error.message,
                additionalInfo: "Error occur while updating profile picture (Profile.js)"
            }
        );
    }
}

// Delete the profile where the logic will be different for (Student, Instructor, Admin)
// exports.deleteProfile = async (req, res) =>
// {
//     try
//     {

//     }
//     catch(Error)
//     {
//         return res.status(500).json(
//             {
//                 success: false,
//                 message: Error.message,
//                 additionalInfo: "Error occur while deleting the profile (Profile.js)"
//             }
//         );
//     }
// }