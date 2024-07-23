const express = require("express");
const router = express.Router();
const {auth} = require("../middlewares/auth");
const { updateProfile, getUserDetails, getStudentEnrolledCourse, updateProfilePicture} = require("../controllers/Profile");

// Profile routes
router.put("/update-profile", auth, updateProfile); // Working
router.get("/get-user", auth, getUserDetails); // Working
router.get("/get-student-enrolled", auth, getStudentEnrolledCourse); // Working
router.put("/update-profile-picture", auth, updateProfilePicture); // Working

module.exports = router;