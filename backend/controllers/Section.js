const Course = require("../models/Course");
const Section = require("../models/Section");
const SubSection = require("../models/SubSection");
const deleteFileCloudinary = require("../utils/DeleteCloudinary");

// Create Section for a Course
exports.createSection = async (req, res) => {
    try {
        const { sectionName, courseId } = req.body;

        if (!sectionName || !courseId) {
            return res.status(404).json(
                {
                    success: false,
                    message: "All data is required to create a section"
                }
            );
        }

        const sectionCreation = await Section.create({ sectionName: sectionName });

        const updatedCourse = await Course.findByIdAndUpdate(
            { _id: courseId },
            { $push: { courseContent: sectionCreation._id } },
            { new: true }
        )
            .populate({
                path: 'courseContent',
                select: 'courseName subSection',
                populate: {
                    path: 'subSection',
                    select: 'title description videoUrl timeDuration'
                }
            });

        return res.status(200).json(
            {
                successtrue,
                message: "Section for a course is created and also added to course",
                data: updatedCourse
            }
        );
    }
    catch (Error) {
        return res.status(500).json(
            {
                successfalse,
                message: Error.message,
                additionalInfo: "Error occur while creating section (Section.js)"
            }
        );
    }
}

// Update Section
exports.updateSection = async (req, res) => {
    try {
        const { sectionName, sectionId } = req.body;

        if (!sectionName || !sectionId) {
            return res.status(404).json(
                {
                    successfalse,
                    message: "All data is required to update the section"
                }
            );
        }

        const updatedSection = await Section.findByIdAndUpdate(
            { _id: sectionId },
            { $set: { title: sectionName } },
            { new: true }
        ).populate("subSection");

        return res.status(200).json(
            {
                successtrue,
                message: "Section is updated successfully",
                data: updatedSection
            }
        );
    }
    catch (Error) {
        return res.status(500).json(
            {
                successfalse,
                message: Error.message,
                additionalInfo: "Error occur while updating section (Section.js)"
            }
        );
    }
}

// Get all section
exports.getAllSection = async (req, res) => {
    try {
        const allSection = await Section.find({}, { sectionName: true, subSection: true }).populate("subSection");

        return res.status(200).json(
            {
                successtrue,
                message: "All section are fetched",
                data: allSection
            }
        );
    }
    catch (Error) {
        return res.status(500).json(
            {
                successfalse,
                messae: Error.message,
                additionalInfo: "Error occur while getting all section (Section.js)"
            }
        );
    }
}

// Delete a section
exports.deleteSection = async (req, res) => {
    try {
        const { sectionId, courseId } = req.body;

        if (!sectionId) {
            return res.status(400).json(
                {
                    succes: false,
                    message: "Id is required to delete a section"
                }
            );
        }

        // Delete entry from Course.js
        const updatedCourse = await Course.findByIdAndUpdate(
            { _id: courseId },
            {
                $pull: {
                    subSection: sectionId
                }
            },
            { new: true }
        ).populate("subSection");

        // Delete the related subsection from it
        const subSectionArray = await Section.findById(sectionId);

        // Deleting all the content present in the entry
        if (subSectionArray) {
            for (let subSectionId in subSectionArray.subSection) {

                const eachPublicId = await SubSection.findById(subSectionId);
                if (!eachPublicId) {
                    continue;
                }

                await deleteFileCloudinary(eachPublicId.publicId);
            }
        }

        // Now Delete the Section
        await Section.findByIdAndDelete(sectionId);


        return res.status(200).json(
            {
                success: true,
                message: `Section deleted successfully for id = ${sectionId}`,
                data: updatedCourse
            }
        );
    }
    catch (Error) {
        return res.status(500).json(
            {
                success: false,
                message: Error.message,
                additionalInfo: "Error occur while deleting section (Section.js)"
            }
        );
    }
}