const express = require("express");
const router = express.Router();

const { auth, isInstructor, isAdmin, isStudent } = require("../middlewares/auth");
const { createCourse, getAllCourses, getCourseDetailById, updateCourse } = require("../controllers/Course");
const { createCategory, getAllCategory, categoryPageDetails, updateCategory } = require("../controllers/Category");
const { createSubSection, deleteSubSection, updateSubSection } = require("../controllers/SubSection");
const { createSection, updateSection, getAllSection, deleteSection } = require("../controllers/Section");
const {
    createRatingAndReview,
    getAllRatingAndReview,
    getAllRatingAndReviewCourse,
    getAverageRating,
    updateRatingAndReview
} = require("../controllers/RatingAndReview");


// Courses routes
router.get("/get-all-courses", auth, getAllCourses); // Get all course exist in database - Working
router.get("/get-course-detail", auth, getCourseDetailById); // Get course by id present at req.body - Working
router.post("/create-course", auth, isInstructor, createCourse); // Create a course by only instructor - Working
router.put("/update-course", auth, isInstructor, updateCourse); // Update course using courseId done by Instructor - Working


// Subsection routes
router.put("/update-subsection", auth, isInstructor, updateSubSection); // Update subsection done by instructor - Working
router.post("/create-subsection", auth, isInstructor, createSubSection); // Create a subsection done by instructor - Working
router.delete("/delete-subsection", auth, isInstructor, deleteSubSection); // Delete subsection by instructor  - Working


// Section routes
router.get("/get-all-section", auth, getAllSection); // Get all section of a course by courseId present in req.body - Working
router.put("/update-section", auth, isInstructor, updateSection); // Update a section done by instructor - Working
router.post("/create-section", auth, isInstructor, createSection); // Create a section done by instructor - Working
router.delete("/delete-section", auth, isInstructor, deleteSection); // Delete a section done by instructor - Working


// Category routes
router.get("/get-all-category", auth, getAllCategory); // Get all category for courses - Working
router.put("/update-category", auth, isAdmin, updateCategory); // Update a category done by Admin - Working
router.get("/get-category-detail", auth, categoryPageDetails); // Get a category page detail where other will also present - Working
router.post("/create-category", auth, isAdmin, createCategory); // Create a category done by admin only - Working


// Rating and review routes
router.get("/get-average-rating", auth, getAverageRating); // Get average rating of a course
router.get("/get-all-rating", auth, getAllRatingAndReview); // Get all rating for all course
router.put("/update-rating", auth, isStudent, updateRatingAndReview); // If student want to update the rating
router.get("/get-all-course-rating", auth, getAllRatingAndReviewCourse); // Get all rating of a course
router.post("create-rating-review", auth, isStudent, createRatingAndReview); // Create a rating done by Student


module.exports = router;    

// Need to test 4 more 