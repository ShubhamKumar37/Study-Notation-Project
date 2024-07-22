const Section = require("../models/Section");
const SubSection = require("../models/SubSection");
const uploadToCloudinary = require("../utils/UploadCloudinary");
const deleteFileCloudinary = require("../utils/DeleteCloudinary");
const updateFileCloudinary = require("../utils/UpdateCloudinary");
require("dotenv").config();

// Create Subsection
exports.createSubSection = async (req, res) => {
    try {
        // Data fetch and validate
        const { sectionId, title, description, timeDuration } = req.body;
        const video = req.files.videoFile;

        if (!sectionId || !title || !description || !timeDuration || !video) {
            return res.status(404).json(
                {
                    success: false,
                    message: "All field are required to create a subsection"
                }
            );
        }

        const videoUpload = await uploadToCloudinary(video, process.env.FILE_FOLDER);

        const subSectionCreation = await SubSection.create({ title, description, timeDuration: videoUpload.duration, videoUrl: videoUpload.secure_url, publicId: videoUpload.public_id });

        const updatedSection = await Section.findByIdAndUpdate(
            { _id: sectionId },
            { $push: { subSection: subSectionCreation._id } },
            { new: true }
        ).populate("subSection");

        return res.status(200).json(
            {
                success: true,
                message: "SubSection created successfully",
                data: updatedSection
            }
        );
    }
    catch (Error) {
        return res.status(500).json(
            {
                success: false,
                message: Error.message,
                additionalInfo: "Error occur while creating a subsection (SubSection.js)"
            }
        );
    }
}

// Get all subsection
// exports.getAllSubSection = async (req, res) => {
//     try {
//         const subSections = await SubSection.find({});

//         return res.status(200).json(
//             {
//                 success: true,
//                 message: "All subsection are fetched",
//                 data: subSections
//             }
//         );
//     }
//     catch (Error) {
//         return res.status(500).json(
//             {
//                 success: false,
//                 message: Error.message,
//                 additionalInfo: "Error occur while getting all subsection (SubSection.js)"
//             }
//         );
//     }
// }

// Delete subsection
exports.deleteSubSection = async (req, res) => {
    try {
        const { publicId, sectionId, subSectionId } = req.body;

        // Update the Section by removing the reference ID of subsection
        const updatedSection = await Section.findByIdAndUpdate(
            { _id: sectionId },
            { $pull: { subSection: publicId } },
            { new: true }
        ).populate("subSection");

        // Delete from cloudinary
        const responseDelete = await deleteFileCloudinary(publicId);

        // Delete the subsection
        const sectionDelete = await SubSection.findByIdAndDelete(subSectionId);

        return res.status(200).json(
            {
                success: true,
                message: "SubSection is deleted, Section is updated and deleted from cloudinary",
                data: {
                    sectionData: updatedSection,
                    cloudinaryResponse: responseDelete,
                    subSectionData: sectionDelete
                }
            }
        );
    }
    catch (Error) {
        return res.status(500).json(
            {
                success: false,
                message: Error.message,
                additionalInfo: "Error occur while deleting a subsection (SubSection.js)"
            }
        );
    }
}

// Update subsection
exports.updateSubSection = async (req, res) => {
    try {
        const Arr = [publicId, subSectionId, title, description, timeDuration];
        let dataNeedToUpdate = {};

        for (let key in Arr) {
            if (key !== null || key !== undefined) {
                dataNeedToUpdate.key = req.body.key;
            }
        }

        let updateVideoCloudinaryResponse = null;
        if (req.body.videoFile) {
            updateVideoCloudinaryResponse = await updateFileCloudinary(req.body.videoFile, publicId);
            dataNeedToUpdate.secureUrl = updateVideoCloudinaryResponse.secure_url;
        }

        const subSectionUpdateQuery = await SubSection.findByIdAndUpdate(
            { _id: dataNeedToUpdate.subSectionId },
            { $set: dataNeedToUpdate },
            { new: true }
        );

        return res.status(200).json(
            {
                success: true,
                message: "SubSection updated successfully",
                data: subSectionUpdateQuery
            }
        );

    }
    catch (Error) {
        return res.status(500).json(
            {
                success: false,
                message: Error.message,
                additionalInfo: "Error occur while updating a subsection (SubSection.js)"
            }
        );
    }
}