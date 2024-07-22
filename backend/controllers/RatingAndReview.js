const RatingAndReview = require("../models/RatingAndReview");
const User = require("../models/User");
const Course = require("../models/Course");


// Create a RatingAndReview
exports.createRatingAndReview = async (req, res) => {
    try {
        const userId = req.user.id;
        const { rating, review, courseId } = req.body;


        if (!rating || !courseId) {
            return res.status(404).json(
                {
                    success: false,
                    message: "Please provide a proper info of rating and review of a course"
                }
            );
        }

        // Check if the user is enrolled in the course
        const enrolledStudentCheck = await Course.findOne(
            { _id: courseId },
            {
                studentEnrolled: { $elemMatch: { $eq: userId } }
            }
        );
        if (!enrolledStudentCheck) {
            return res.status(404).json({
                success: false,
                message: "You are not enrolled in this course, so unable to rate and review"
            });
        }

        // Check if user already created a rating and review
        const existingReview = await RatingAndReview.findOne({ user: userId, courseId: courseId });
        if (existingReview) {
            return res.status(200).json({
                success: false,
                message: "You already created a rating and review. Try updating it."
            });
        }
        // A review and rating is created
        const responseRatingAndReview = await RatingAndReview.create(
            {
                user: userId,
                rating: rating,
                review: review,
                course: courseId
            }
        );

        // Add this rating review to Course
        const addToCourse = await Course.findByIdAndUpdate(
            { _id: courseId },
            { $push: { ratingAndReviews: responseRatingAndReview._id } },
            { new: true }
        );
        console.log(addToCourse);

        return res.status(200).json(
            {
                success: true,
                message: "A rating a review is created successfully",
                data: { addToCourse, responseRatingAndReview }
            }
        );
    }
    catch (Error) {
        return res.status(500).json(
            {
                success: false,
                message: Error.message,
                additionalInfo: "Error occur while creating rating and review (RatingAndReview.js)"
            }
        );
    }
}

// Get average rating for a course
exports.getAverageRating = async (req, res) => {
    try {
        // const userId = req.user.id;
        const { courseId } = req.body;

        if (!courseId) {
            return res.status(404).json(
                {
                    success: false,
                    message: "Course id is not provided"
                }
            );
        }

        // const courseDetails = await Course.findById(courseId).populate("ratingAndReviews");
        // let numberOfRating = courseDetails.ratingAndReviews.length;
        // let averageRating = 0;

        // for (let i = 0; i < numberOfRating; i++) {
        //     averageRating += courseDetails.ratingAndReviews[i].rating;
        // }

        // averageRating = averageRating / numberOfRating;

        const result = await RatingAndReview.aggregate([
            {
                $match: {
                    course: new mongoose.Types.ObjectId(courseId)
                },
                $group: {
                    _id: null,
                    averageRating: { $avg: "$rating" },
                }
            }
        ])

        return res.status(200).json(
            {
                success: true,
                message: "Average rating for this course is calculated",
                averageRating: result[0].averageRating,
                data: courseDetails
            }
        );
    }
    catch (Error) {
        return res.status(500).json(
            {
                success: false,
                message: Error.message,
                additionalInfo: "Error occur while getting average rating (RatingAndReview.js)"
            }
        );
    }
}

// Get all rating and review of a course
exports.getAllRatingAndReviewCourse = async (req, res) => {
    try {
        const { courseId } = req.body;

        if (!courseId) {
            return res.status(400).json(
                {
                    success: false,
                    message: "Course id is not provided"
                }
            );
        }

        const responseGetAllRatingAndReview = await RatingAndReview.find({ course: courseId })
            .populate(
                {
                    path: "user",
                    select: "firstName lastName email image"
                }
            )
            .populate(
                {
                    path: "course",
                    select: "courseName"
                }
            )
            .sort({ rating: "desc" }).exec();

        return res.status(200).json(
            {
                success: true,
                message: "All the rating and review of a course is given below",
                data: responseGetAllRatingAndReview.ratingAndReviews
            }
        );
    }
    catch (Error) {
        return res.status(500).json(
            {
                success: false,
                message: Error.message,
                additionalInfo: "Error occur while getting all rating and review (RatingAndReview.js)"
            }
        );
    }

}

// Get all rating and review 
exports.getAllRatingAndReview = async (req, res) => {
    try {

        const responseGetAllRatingAndReview = await RatingAndReview.find({})
            .populate(
                {
                    path: "user",
                    select: "firstName lastName email image"
                }
            )
            .populate(
                {
                    path: "course",
                    select: "courseName"
                }
            )
            .sort({ rating: "desc" }).exec();

        return res.status(200).json(
            {
                success: true,
                message: "All the rating and review is given below",
                data: responseGetAllRatingAndReview.ratingAndReviews
            }
        );
    }
    catch (Error) {
        return res.status(500).json(
            {
                success: false,
                message: Error.message,
                additionalInfo: "Error occur while getting all rating and review"
            }
        );
    }
}

// Update rating and review
exports.updateRatingAndReview = async (req, res) => {
    try
    {
        const {ratingId, rating, review} = req.body;

        const updateReview = await RatingAndReview.findByIdAndUpdate(
            {_id: ratingId},
            {rating: rating, review: review},
            {new: true},
        );

        return res.status(200).json(
            {
                success: true,
                message: "Rating and review is updated",
                data: updateReview
            }
        );

    }
    catch(Error)
    {
        return res.status(500).json(
            {
                success: false,
                message: Error.message,
                additionalInfo: "Error occur while updating rating and review"
            }
        );
    }
}