const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:4000/api/v1";

// COURSE AREA OF APIS ENDPOINT - done
export const categories = {
    GET_ALL_CATEGORIES_API: BASE_URL + "/course/get-all-category",
    UPDATE_CATEGORY: BASE_URL + "/course/update-category",
    CATEGORY_PAGE_DETAIL: BASE_URL + "/course/get-category-detail",
};

export const courses = {
    GET_All_COURSES: BASE_URL + "/course/get-all-courses",
    GET_COURSE_DETAIL_BY_ID: BASE_URL + "/course/get-course-detail",
    UPDATE_COURSE: BASE_URL + "/course/update-course",
    CREATE_COURSE: BASE_URL + "/course/create-course",
};

export const subSection = {
    UPDATE_SUBSECTION: BASE_URL + "/course/update-subsection",
    CREATE_SUBSECTION: BASE_URL + "/course/create-subsection",
    DELETE_SUBSECTION: BASE_URL + "/course/delete-subsection",
};

export const section = {
    UPDATE_SECTION: BASE_URL + "/course/update-section",
    DELETE_SECTION: BASE_URL + "/course/delete-section",
    CREATE_SECTION: BASE_URL + "/course/create-section",
    GET_ALL_SECTION: BASE_URL + "/course/get-all-section",
};

export const ratingAndReview = {
    GET_AVERAGE_RATING: BASE_URL + "/course/get-average-rating",
    GET_ALL_RATING: BASE_URL + "/course/get-all-rating",
    UPDATE_RATING: BASE_URL + "/course/update-rating",
    DELETE_RATING: BASE_URL + "/course/delete-rating",
    GET_ALL_COURSE_RATING: BASE_URL + "/course/get-all-course-rating",
    CREATE_RATING: BASE_URL + "/course/create-rating-review",
};

// USER AUTH APIS ENDPOINT
export const userAuth = {
    SIGNUP_USER: BASE_URL + "/auth/signup",
    LOGIN_USER: BASE_URL + "/auth/login",
    SEND_OTP_USER: BASE_URL + "/auth/sendOTP",
    CHANGE_PASSWORD_USER: BASE_URL + "/auth/change-password",
    RESET_PASSWORD_TOKEN_USER: BASE_URL + "/auth/reset-password-token",
    RESET_PASSWORD_USER: BASE_URL + "/auth/reset-password",
};

// USER PROFILE APIS ENDPOINT
export const userProfile = {
    UPDATE_PROFILE_USER: BASE_URL + "/profile/update-profile",
    GET_DETAIL_USER: BASE_URL + "/profile/get-user",
    GET_STUDENT_ENROLLED_COURSE_USER: BASE_URL + "/profile/get-student-enrolled",
    UPDATE_PROFILE_PICTURE_USER: BASE_URL + "/profile/update-profile-picture",
};