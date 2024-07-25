const Section = require("../models/Section");
const SubSection = require("../models/SubSection");
const {uploadToCloudinary} = require("../utils/UploadCloudinary");
const {deleteFileCloudinary} = require("../utils/DeleteCloudinary");
const {updateFileCloudinary} = require("../utils/UpdateCloudinary");
require("dotenv").config();

// Create Subsection - Working
exports.createSubSection = async (req, res) => {
    try {
        // Data fetch and validate
        const { sectionId, title, description } = req.body;
        const video = req.files.videoFile;

        if (!sectionId || !title || !description || !video) {
            return res.status(404).json(
                {
                    success: false,
                    message: "All field are required to create a subsection"
                }
            );
        }

        const sectionExist = await Section.findById(sectionId);
        if(!sectionExist)
        {
            return res.status(404).json(
                {
                    success: false,
                    message: "Section doesnot exist"
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


// Delete subsection - Working
exports.deleteSubSection = async (req, res) => {
    try {
        const { sectionId, subSectionId } = req.body;

        if(!sectionId || !subSectionId)
        {
            return res.status(400).json(
                {
                    success: false,
                    message: "Please provide section id and sub section id"
                }
            );
        }

        // Update the Section by removing the reference ID of subsection
        const updatedSection = await Section.findByIdAndUpdate(
            { _id: sectionId },
            { $pull: { subSection: subSectionId } },
            { new: true }
        ).populate("subSection");

        if(!updatedSection)
        {
            return res.status(400).json(
                {
                    success: false,
                    message: "Section doesnot exist"
                }
            );
        }

        // Delete from cloudinary
        let subSectionData = await SubSection.findById({_id: subSectionId});
        if(!subSectionData)
        {
            return res.status(400).json(
                {
                    success: false,
                    message: "Sub Section does not exist"
                }
            );
        }
        const responseDelete = await deleteFileCloudinary(subSectionData.publicId, "video");

        // Delete the subsection
        subSectionData = await SubSection.findByIdAndDelete(subSectionId);

        return res.status(200).json(
            {
                success: true,
                message: "SubSection is deleted, Section is updated and deleted from cloudinary",
                data: {
                    sectionData: updatedSection,
                    responseDelete: responseDelete,
                    subSectionData: subSectionData
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

// Update subsection - Working
exports.updateSubSection = async (req, res) => {
    try {
        const {subSectionId, title, description} = req.body;
        let dataNeedToUpdate = {};

        if(!subSectionId || !subSectionId.length === 0) return res.status(404).json({success: false, message: "Please provide sub section id"});
        if(title) dataNeedToUpdate.title = title;
        if(description) dataNeedToUpdate.description = description;

        const subSectionExist = await SubSection.findById(subSectionId);
        if(!subSectionExist)
        {
            return res.status(404).json(
                {
                    success: false,
                    message: "Sub section doesnot exist"
                }
            );
        }

        let updateVideoCloudinaryResponse = null;
        if (req.files && req.files.videoFile) {
            updateVideoCloudinaryResponse = await updateFileCloudinary(req.files.videoFile, subSectionExist.publicId, "video");
            dataNeedToUpdate.secureUrl = updateVideoCloudinaryResponse.secure_url;
            dataNeedToUpdate.publicId = updateVideoCloudinaryResponse.public_id;
            dataNeedToUpdate.timeDuration = updateVideoCloudinaryResponse.duration;
        }
        // console.log(updateVideoCloudinaryResponse);

        const subSectionUpdateQuery = await SubSection.findByIdAndUpdate(
            { _id: subSectionId },
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