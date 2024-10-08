const Course = require("../models/Course");
const Section = require("../models/Section");
const SubSection = require("../models/SubSection");
const { deleteFileCloudinary } = require("../utils/DeleteCloudinary");
const { deleteSubSections } = require("../utils/DeleteSubSection");

// Create Section for a Course - Working
exports.createSection = async (req, res) => {
    try {
        const { sectionName, courseId } = req.body;

        if (!sectionName || !courseId || sectionName.length === 0) {
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
                select: 'sectionName subSection',
                populate: {
                    path: 'subSection',
                    select: 'title description videoUrl timeDuration'
                }
            });

        return res.status(200).json(
            {
                success: true,
                message: "Section for a course is created and also added to course",
                data: updatedCourse
            }
        );
    }
    catch (Error) {
        return res.status(500).json(
            {
                success: false,
                message: Error.message,
                additionalInfo: "Error occur while creating section (Section.js)"
            }
        );
    }
}

// Update Section - Working
exports.updateSection = async (req, res) => {
    try {
        const { sectionName, sectionId } = req.body;

        if (!sectionName || !sectionId) {
            return res.status(404).json(
                {
                    success: false,
                    message: "All data is required to update the section"
                }
            );
        }

        const updatedSection = await Section.findByIdAndUpdate(
            { _id: sectionId },
            { $set: { sectionName: sectionName } },
            { new: true }
        ).populate("subSection");

        if (!updatedSection) {
            return res.status(404).json(
                {
                    success: false,
                    message: "Section not found"
                }
            );
        }

        return res.status(200).json(
            {
                success: true,
                message: "Section is updated successfully",
                data: updatedSection
            }
        );
    }
    catch (Error) {
        return res.status(500).json(
            {
                success: false,
                message: Error.message,
                additionalInfo: "Error occur while updating section (Section.js)"
            }
        );
    }
}

// Get all section - Working
exports.getAllSection = async (req, res) => {
    try {
        const { courseId } = req.body;

        const allSection = await Course.findById({ _id: courseId }).populate({
            path: "courseContent",
            populate: {
                path: "subSection",
            }
        });

        if (!allSection) return res.status(404).json({ success: false, message: "No section present at the moment" });
        return res.status(200).json(
            {
                success: true,
                message: "All section are fetched",
                data: allSection
            }
        );
    }
    catch (Error) {
        return res.status(500).json(
            {
                success: false,
                messae: Error.message,
                additionalInfo: "Error occur while getting all section (Section.js)"
            }
        );
    }
}

// Delete a section - Working
exports.deleteSection = async (req, res) => {
    try {
        const { sectionId, courseId } = req.body;

        if (!sectionId || !courseId) {
            return res.status(400).json(
                {
                    succes: false,
                    message: "Id is required to delete a section or course"
                }
            );
        }

        // Delete entry from Course.js
        const updatedCourse = await Course.findByIdAndUpdate(
            courseId,
            {
                $pull: {
                    courseContent: sectionId
                }
            },
            { new: true }
        );

        if (!updatedCourse) {
            return res.status(404).json(
                {
                    success: false,
                    message: "Course id is not correct"
                }
            );
        }

        // Delete the related subsection from it
        const sectionExist = await Section.findById(sectionId).populate("subSection").exec();
        if (!sectionExist) {
            return res.status(404).json(
                {
                    success: false,
                    message: "Section does not exist"
                }
            );
        }

        let length = sectionExist.subSection.length;
        let deleteResponseSubSection = [];
        for (let i = 0; i < length; i++) {
            const deleteResponse = await deleteFileCloudinary(sectionExist.subSection[i].publicId, "video");
            const deleteSubSection = await SubSection.findByIdAndDelete(sectionExist.subSection[i]._id);
            deleteResponseSubSection.push(deleteResponse);
        }

        // Now Delete the Section
        const sectionDelete = await Section.findByIdAndDelete(sectionId);


        return res.status(200).json(
            {
                success: true,
                message: `Section deleted successfully for id = ${sectionId}`,
                data: { updatedCourse, sectionExist, sectionDelete, deleteResponseSubSection }
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