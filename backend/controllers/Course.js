const User = require("../models/User");
const Category = require("../models/Category");
const Course = require("../models/Course");
const SubSection = require("../models/SubSection");
const { uploadToCloudinary } = require("../utils/UploadCloudinary");
const { updateFileCloudinary } = require("../utils/UpdateCloudinary");
const { deleteSubSections } = require("../utils/DeleteSubSection");
require("dotenv").config();


// Create a Course handler - Working
exports.createCourse = async (req, res) => {
    try {
        // CHECK FOR THE ID WE ARE RECIEVEING FROM REQ 
        // IS THAT ID BELONG TO THE INSTRUCTOR OR NOT 


        const { courseName, courseDescription, whatYouWillLearn, price, category, status = "Draft", instructions, tag } = req.body;
        const thumbnail = req.files.thumbnailImage;

        // Validation of recieved data
        if (!courseName || !courseDescription || !whatYouWillLearn || !price || !category || !thumbnail) {
            return res.status(400).json(
                {
                    success: false,
                    message: "All data is required (Course.js)"
                }
            );
        }

        // Fetch data of Instructor
        const userId = req.user.id;
        const instructorExist = await User.findById(userId, { accountType: "Instructor" });

        if (!instructorExist) {
            return res.status(400).json(
                {
                    success: false,
                    message: "Instructor does not exist"
                }
            );
        }
        console.log("Instructor details : ", instructorExist);

        // Check given Category is valid or not
        const categoryExist = await Category.findById(category);
        if (!categoryExist) {
            return res.status(404).json(
                {
                    success: false,
                    message: "Category does not exist"
                }
            );
        }

        // Upload image to cloudinary
        const uploadThumbNailToCloudinary = await uploadToCloudinary(thumbnail, process.env.FILE_FOLDER);

        // Create new course
        const newCourseCreation = await Course.create({
            courseName,
            whatYouWillLearn,
            courseDescription,
            price,
            category: categoryExist._id,
            thumbnail: uploadThumbNailToCloudinary.secure_url,
            instructor: instructorExist._id,
            status,
            instructions: instructions,
            tag: [tag],
            publicId: uploadThumbNailToCloudinary.public_id
        });

        // Add this new course to instructor user Schema - not done
        const updateUserCourse = await User.findByIdAndUpdate({ _id: userId }, {
            $push: {
                courses: newCourseCreation._id
            }
        }, { new: true });

        // Update Category schema with new course - not done
        const updateCategoryCourse = await Category.findByIdAndUpdate({ _id: categoryExist._id }, {
            $push: {
                course: newCourseCreation._id
            }
        }, { new: true });

        return res.status(200).json(
            {
                success: true,
                message: "New course created successfully",
                data: { newCourseCreation, updateCategoryCourse, updateUserCourse }
            }
        );
    }
    catch (Error) {
        return res.status(500).json(
            {
                success: false,
                message: Error.message,
                additionalInfo: "Error occur while creating a course (Course.js)"
            }
        );
    }
}

// Working
exports.updateCourse = async (req, res) => {
    try {
        const { courseName, courseDescription, whatYouWillLearn, price, category, status = "Draft", instructions, courseId, tag } = req.body;
        const updateCourseOptions = {};

        // Adding only those data to options which are provided and remain will be same older
        if (courseName) updateCourseOptions.courseName = courseName;
        if (courseDescription) updateCourseOptions.courseDescription = courseDescription;
        if (whatYouWillLearn) updateCourseOptions.whatYouWillLearn = whatYouWillLearn
        if (price) updateCourseOptions.price = price;
        if (status) updateCourseOptions.status = status;
        if (instructions) updateCourseOptions.instructions = instructions;
        if (tag) updateCourseOptions.tag = tag;
        if (!courseId) return res.status(404).json({ success: false, message: "Course id is required" });
        if (!category) return res.status(404).json({ success: false, message: "Category id is required" });

        const categoryExist = await Category.findById(category);
        if (!categoryExist) return res.status(404).json({ success: false, message: "Category doesnot exist" });
        else {
            updateCourseOptions.category = category;
            const categoryId = await Course.findById({ _id: courseId });
            await Category.findByIdAndUpdate(
                { _id: categoryId.category },
                { $pull: { course: courseId } },
                { new: true }
            );
            await Category.findByIdAndUpdate(
                { _id: category },
                { $addToSet: { course: courseId } },
                { new: true }
            );
        }

        const courseValues = await Course.findById(
            { _id: courseId }
        );

        if (req.files) {
            const thumbnail = req.files.thumbnailImage;

            const updateResponse = await updateFileCloudinary(thumbnail, courseValues.publicId);
            updateCourseOptions.thumbnail = updateResponse.secure_url;
        }

        const updatedCourseDetails = await Course.findByIdAndUpdate(
            { _id: courseId },
            updateCourseOptions,
            { new: true },
        );

        return res.status(200).json(
            {
                success: true,
                message: "Course details are updated successfully",
                data: { updatedCourseDetails }
            }
        );
    }
    catch (Error) {
        return res.status(500).json(
            {
                success: false,
                message: Error.message,
                additionalInfo: "Error occur while updating course details (Course.js)"
            }
        );
    }
}

// Pending for future scope cases
exports.deleteCourse = async (req, res) => {
    try {
        const { courseId } = req.body;
    }
    catch (Error) {
        return res.status(500).json(
            {
                success: false,
                message: Error.message,
                additionalInfo: "Error occur while deleting the course (Course.js)"
            }
        );
    }
}

// Get all Course handler - Working (Need updatation time to time)
exports.getAllCourses = async (req, res) => {
    try {
        const allCourses = await Course.find({}, {
            courseName: 1,
            price: 1,
            category: 1,
            thumbnail: 1,
            instructor: 1,
            studentEnrolled: 1,
            ratingAndReviews: 1,
            studentCount: {$size: "$studentEnrolled"}
        }).populate("instructor").sort({studentEnrolled: -1}).exec();

        if (Course.length === 0) {
            return res.status(404).json(
                {
                    success: false,
                    message: "There is no course"
                }
            );
        }

        return res.status(200).json(
            {
                success: true,
                message: "These are the all course presented in database",
                data: allCourses
            }
        );
    }
    catch (Error) {
        return res.status(500).json(
            {
                success: false,
                message: Error.message,
                additionalInfo: "Error occur while getting all courses (Course.js)"
            }
        );
    }
}

// Working - (RatingAndReview)
exports.getCourseDetailById = async (req, res) => {
    try {
        const { courseId } = req.body;

        if (!courseId) {
            return res.status(400).json(
                {
                    success: false,
                    message: "Course Id is not provided",
                }
            );
        }

        const courseDetails = await Course.findById({ _id: courseId })
            .populate({
                path: "instructor",
                populate: { path: "additionalDetails" }
            })
            .populate("category")
            // .populate("RatingAndReviews")
            .populate(
                {
                    path: "courseContent",
                    populate: {
                        path: "subSection",
                    }
                }
            )
            .exec();

        if (!courseDetails) {
            return res.status(200).json(
                {
                    success: false,
                    message: "No course exist corresponding to this id"
                }
            );
        }

        return res.status(200).json(
            {
                success: true,
                message: "Data retrieved corresponding to course id",
                data: courseDetails
            }
        );
    }
    catch (Error) {
        return res.status(500).json(
            {
                success: false,
                message: Error.message,
                additionalInfo: "Error occur while getting all detail of a course by id (Course.js)"
            }
        );
    }
}