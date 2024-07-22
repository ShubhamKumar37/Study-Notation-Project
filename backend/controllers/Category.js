const Category = require("../models/Category");
const Course = require("../models/Course");

// Create a new tag
exports.createCategory = async (req, res) => {
    try {
        const { name, description = "" } = req.body;

        if (!name) {
            return res.status(400).json(
                {
                    successfalse,
                    message: "All data is required to create a tag"
                }
            );
        }

        const categoryCreation = await Category.create({ name: name, description: description });

        return res.status(200).json(
            {
                success: true,
                message: "Tag created successfully",
                category: categoryCreation
            }
        );
    }
    catch (Error) {
        return res.status(500).json(
            {
                success: false,
                message: Error.message,
                additionalInfo: "Error occure while creating tag (Tag.js)"
            }
        );
    }
}

// Get all the category present in database
exports.getAllCategory = async (req, res) => {
    try {

        // Making sure that the entry must contain the name and description
        const allCategoryInfo = await Category.find({}, { name: true, description: true });

        if (!allCategoryInfo) {
            return res.status(400).json(
                {
                    successfalse,
                    message: "No tag present in database"
                }
            );
        }

        return res.status(200).json(
            {
                successtrue,
                message: "These are the all tag present in database",
                category: allCategoryInfo
            }
        );
    }
    catch (Error) {
        return res.status(500).json(
            {
                successfalse,
                message: Error.message,
                additionalInfo: "Error occure while getting all tags (Tag.js)"
            }
        );
    }
}

// Category page have which type of course and others
exports.categoryPageDetails = async (req, res) => {
    try {
        const { categoryId } = req.body;

        if (!categoryId) {
            return res.status(404).json(
                {
                    success: false,
                    message: "Please provide category id"
                }
            );
        }
        const categoryDetails = await Category.findById(categoryId).populate("course").exec();
        if (!categoryDetails) {
            return res.status(404).json(
                {
                    success: false,
                    message: "No data found"
                }
            );
        }


        const differentCategoryDetails = await Category.find({ _id: { $ne: categoryId } }).populate("course").exec();

        const topSellingCourse = await Course.find({}).sort({ studentEnrolled: -1 }).limit(10).exec();


        return res.status(200).json(
            {
                success: true,
                message: "Category details are provided",
                data: { categoryDetails, differentCategoryDetails, topSellingCourse }
            }
        );
    }
    catch (Error) {
        return res.status(500).json(
            {
                success: false,
                message: Error.message,
                additionalInfo: "Error occur while geting the category page details (Category.js)"
            }
        );
    }

}

// Update category
exports.updateCategory = async (req, res) => {
    try {
        const { name, description, categoryId } = req.body;

        const responseUpdateCategory = await Category.findByIdAndUpdate(
            { _id: categoryId },
            {
                name,
                description,
            },
            { new: true },
        );

        return res.status(200).json(
            {
                success: true,
                message: "Category is updated",
                data: responseUpdateCategory
            }
        );
    }
    catch (Error) {
        return res.status(500).json(
            {
                success: false,
                message: Error.message,
                additionalInfo: "Error occur while updating a category"
            }
        );
    }
}