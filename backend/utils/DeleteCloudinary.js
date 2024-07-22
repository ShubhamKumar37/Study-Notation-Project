const cloudinary = require("../config/cloudinary");

// Delete a file from cloudinary
exports.deleteFileCloudinary = async (publicId) =>
{
    try
    {
        const result = await cloudinary.uploader.destroy(publicId);

        console.log(`File is deleted for this id = ${publicId}`);
        console.log(result);
        return result;
    }
    catch(Error)
    {
        console.log(Error);
        console.log("Error occur in (DeleteCloudinary.js)");
    }
}