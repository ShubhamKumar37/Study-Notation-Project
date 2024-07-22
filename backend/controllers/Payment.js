const { instance } = require("../config/razorpay");
const User = require("../models/User");
const Course = require("../models/Course");
const mailSender = require("../utils/mailSender");
const { courseEnrollmentEmail } = require("../mail/templates/courseEnrollmentEmail");


// Capture the razorpay payment and initiate the razorpay orders
exports.capturePayment = async (req, res) => {
    try {
        const { courseId } = req.body;
        const userId = req.user.id;

        // Validate the course id
        if (!courseId) {
            return res.status(400).json(
                {
                    success: false,
                    message: "Please provide valid course id"
                }
            );
        }

        // Validate Course details
        let course;
        try {
            course = await Course.findById(courseId);
            if (!course) {
                return res.status(404).json(
                    {
                        success: false,
                        message: `No course exist for this course id ${courseId}`
                    }
                );
            }

            // Change the userId to object id and check for user already purchased or not
            const uid = new mongoose.Types.ObjectId(userId);
            if (course.studentEnrolled.includes(uid)) {
                return res.status(200).json(
                    {
                        success: false,
                        message: "You are already a student of this course donot try to re-buy it"
                    }
                );
            }
        }
        catch (Error) {
            return res.status(400).json(
                {
                    success: false,
                    message: "Error occur while validating the course details (Payment.js)"
                }
            );
        }

        // Create Order
        const amount = course.price;
        const currency = "INR";
        const options = {
            amount: amount * 100,
            currency: currency,
            receipt: Math.random(Date.now()).toString(),
            notes: {
                message: `Payment for course - ${course.courseName}`,
                courseId,
                userId
            }
        }

        // Inititate the payment using Razorpay
        try {
            const paymentResponse = await instance.orders.create(options);
            console.log(paymentResponse);
            const responsePaymentOptions = {
                courseName: course.courseName,
                courseDescription: course.courseDescription,
                thumbnail: course.thumbnail,
                orderId: paymentResponse.id,
                amount: paymentResponse.amount,
            }

            return res.status(200).json(
                {
                    success: true,
                    responsePaymentOptions
                }
            );
        }
        catch (Error) {
            console.log(Error);
            return res.status(400).json(
                {
                    success: false,
                    message: "Error occur while initiating payment using razorpay (Payment.js)"
                }
            );
        }

    }
    catch (Error) {
        return res.status(500).json(
            {
                success: false,
                message: Error.message,
                additionalInfo: "Error occur while capturing payment and creating order (Payment.js)"
            }
        );
    }
}

// Verify signature of Razorpay and server
exports.verifySignature = async (req, res) => {
    try {
        const webhookSecret = "12345678";

        const signature = req.headers["x-razorpay-signature"];

        const shasum = crypto.createHmac("sha256", webhookSecret).update(JSON.stringify(req.body));
        const digest = shasum.digest("hex");

        if (digest === signature) {
            console.log("Payment is authorized");

            const { userId, courseId } = req.body.payLoad.payment.entity.notes;

            try {
                // Update user and add the course id to courses array for marking user as enrolled student in the course
                const updatedUser = await User.findByIdAndUpdate(
                    { _id: userId },
                    { $push: { courses: courseId } },
                    { new: true }
                );

                // Update course by adding user id to mark course have this user enrolled
                const updatedCourse = await Course.findByIdAndUpdate(
                    { _id: courseId },
                    { $push: { studentEnrolled: userId } },
                    { new: true }
                );

                // Send mail of confirmation to user
                const responseMailSend = await mailSender("Successfull Course enrollment", updatedUser.email, courseEnrollmentEmail(updatedCourse.courseName, `${updatedUser.firstName} ${updatedUser.lastName}`)); s

                console.log(responseMailSend);

                return res.status(200).json(
                    {
                        success: true,
                        message: "Course enrolled successfully",
                        data: { updatedUser, updatedCourse }
                    }
                );
            }
            catch (Error) {
                return res.status(400).json(
                    {
                        success: false,
                        message: Error.message,
                        additionalInfo: "Error occur while enrolling in course (Payment.js)"
                    }
                );
            }
        }
        else {
            return res.status(400).json(
                {
                    success: false,
                    message: "Signature doesnot match"
                }
            );
        }
    }
    catch (Error) {
        return res.status(500).json(
            {
                success: false,
                message: Error.message,
                additionalInfo: "Error occur while verifing the signature with razorpay (Payment.js)"
            }
        );
    }
}