const express = require("express");
const router = express.Router();
const {auth} = require("../middlewares/auth");
const { updateProfile, getUserDetails, getStudentEnrolledCourse, updateProfilePicture} = require("../controllers/Profile");

// Profile routes
router.put("/update-profile", auth, updateProfile);
router.get("/get-user", auth, getUserDetails);
router.get("/get-student-enrolled", auth, getStudentEnrolledCourse);
router.put("/update-profile-picture", auth, updateProfilePicture);

module.exports = router;