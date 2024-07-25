const cloudinary = require("cloudinary").v2;

// Delete a file from cloudinary
exports.deleteFileCloudinary = async (publicId, resourceType) =>
    {
        try
    {
        // console.log(111, publicId);
        const options = {
            resource_type: resourceType
        };
        const Response = cloudinary.uploader.destroy(publicId, options).then(result => console.log("this is also a result", result));
        // cloudinary.uploader.destroy("qxli6fyvjyvu6x1ykcxy").then(result => console.log("This is the actual result", result));
        
        // console.log(222);
        // console.log(`File is deleted for this id = ${publicId}     Study_Notion/qxli6fyvjyvu6x1ykcxy`);
        // console.log("This is the result ", result);
        // console.log(333);
        return Response;
    }
    catch(Error)
    {
        console.log(Error);
        console.log("Error occur in (DeleteCloudinary.js)");
    }
}