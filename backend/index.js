const express = require("express");
const app = express();

const userRoutes = require("./routes/User");
const courseRoutes = require("./routes/Course");
const profileRoutes = require("./routes/Profile");
const paymentRoutes = require("./routes/Payments");

const cors = require("cors");
const dotenv = require("dotenv");
const CookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const { dbConnection } = require("./config/database");
const cloudinaryConnection = require("./config/cloudinary");

dotenv.config();
const PORT = process.env.PORT_NO || 4000;

// Database connection
dbConnection();

// Add middlewares
app.use(CookieParser);
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(
    fileUpload(
        {
            useTempFiles: true,
            tempFileDir: "/tmp",
        }
    )
);

// Cloudinary connection
cloudinaryConnection();

// Mount routes
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/payment", paymentRoutes);

// Default route
app.get("/", (req, res) => {
    res.send(json(
        {
            success: true,
            message: "You are now at default route and your server is running",
            req
        }
    ));
})

// Start the server
app.listen(PORT, () => {
    console.log(`Server is start on port number ${PORT}`);
});