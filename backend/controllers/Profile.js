require("dotenv").config();
const User = require("../models/User");
const Profile = require("../models/Profile");
const { uploadToCloudinary } = require("../utils/UploadCloudinary");
const { updateFileCloudinary } = require("../utils/UpdateCloudinary");

// Update the profile of user - Working
exports.updateProfile = async (req, res) => {
    try {
        const { firstName, lastName, gender, about, dateOfBirth = null, contactNumber = null } = req.body;
        const userId = req.user.id;

        if (!userId) {
            return res.status(400).json({ error: "User not found. Try logging in again." });
        }

        // Update user details
        let updateValueOption = {};
        if (firstName) updateValueOption.firstName = firstName;
        if (lastName) updateValueOption.lastName = lastName;

        const userDetails = await User.findByIdAndUpdate(userId, { $set: updateValueOption }, { new: true })
            .populate('additionalDetails');

        // Update profile details
        updateValueOption = {};
        if (gender) updateValueOption.gender = gender;
        if (about) updateValueOption.about = about;
        if (dateOfBirth) updateValueOption.dateOfBirth = dateOfBirth;
        if (contactNumber) updateValueOption.contactNumber = contactNumber;

        const profileDetails = await Profile.findByIdAndUpdate(userDetails.additionalDetails, updateValueOption, { new: true });

        return res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            data: { userDetails, profileDetails },
        });
    } catch (Error) {
        console.error(Error); // Log error for debugging
        return res.status(500).json({
            success: false,
            message: Error.message,
            additionalInfo: "Error occurred while updating the profile (Profile.js)"
        });
    }
}


// Get all user details - Working
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

// Get student enrolled in how much course - Working
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

// Update profile picture - Working
exports.updateProfilePicture = async (req, res) => {
    try {
        const userId = req.user.id;
        const userImage = req.files.image;

        const userDetails = await User.findById(userId);
        if (!userDetails) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        let responseUploadImage;

        if (!userDetails.publicId) {
            // Upload new image
            responseUploadImage = await uploadToCloudinary(userImage, process.env.FILE_FOLDER, 90);
        } else {
            // Ensure publicId is properly formatted without folders
            // const cleanPublicId = userDetails.publicId.split('/').pop().split('.')[0];
            responseUploadImage = await updateFileCloudinary(userImage, userDetails.publicId, "image");
        }

        // Update user with new image URL and publicId
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {
                image: responseUploadImage.secure_url,
                publicId: responseUploadImage.public_id
            },
            { new: true }
        ).populate("additionalDetails");

        return res.status(200).json({
            success: true,
            message: "User profile picture updated successfully",
            data: updatedUser
        });
    } catch (error) {
        console.error("Error while updating profile picture (Profile.js):", error);
        return res.status(500).json({
            success: false,
            message: error.message,
            additionalInfo: "Error occurred while updating profile picture"
        });
    }
};

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